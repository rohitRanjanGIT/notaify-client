'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  Loader2,
  Brain,
  Mail,
  KeyRound,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  FileText,
  FlaskConical,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AddProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userId } = useAuth();
  const projectId = searchParams.get('id');
  const isEditMode = Boolean(projectId);
  const [formData, setFormData] = useState<ProjectConfig>({
    project_id: '',
    llmType: '',
    llmApiKey: '',
    llmApiModel: '',
    smtpUser: '',
    smtpPass: '',
    emailTo: '',
    projectName: '',
    notaifyApiKey: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showNewApiKeyDialog, setShowNewApiKeyDialog] = useState(false);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<{ apiKey: string; apiKeyId: string } | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [visibleApiKey, setVisibleApiKey] = useState(false);
  const [originalFormData, setOriginalFormData] = useState<ProjectConfig | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showRegenConfirm, setShowRegenConfirm] = useState(false);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [testResult, setTestResult] = useState<{
    smtp: { type: 'success' | 'error' | 'pending'; message: string };
    llm: { type: 'success' | 'error' | 'pending'; message: string };
  } | null>(null);
  const [isCustomModel, setIsCustomModel] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadProjectConfig = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`);

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            const text = await response.text();
            errorData = { error: text || `HTTP ${response.status}` };
          }
          throw new Error(errorData.error || 'Failed to fetch project');
        }

        const { project } = await response.json();

        if (project) {
          const loadedData = {
            project_id: project.id,
            projectName: project.projectName || '',
            llmType: project.llmType || '',
            llmApiKey: project.llmApiKey || '',
            llmApiModel: project.llmApiModel || '',
            smtpUser: project.smtpUser || '',
            smtpPass: project.smtpPass || '',
            emailTo: project.emailTo || '',
            notaifyApiKey: project.notaifyApiKey || '',
            notaifyApiKeyId: project.notaifyApiKeyId || '',
          };
          setFormData(loadedData);
          setOriginalFormData(loadedData);

          // Check if the loaded model is custom
          if (project.llmType && project.llmApiModel) {
            // Function exists below but we can just do a basic check here or we evaluate on render.
            // Let's rely on checking if the loaded value matches known options later, or simply assume it's custom 
            // if it doesn't exist in the list. To keep it simple, we'll just check it when getting model options.
          }
        }
      } catch (err) {
        console.error('Failed to load project config:', err);
        setError('Failed to load project data');
      }
    };

    loadProjectConfig();
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'llmType' ? { llmApiModel: '' } : {}),
    }));
  };

  const handleLlmTypeChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      llmType: value as ProjectConfig['llmType'],
      llmApiModel: '',
    }));
    setIsCustomModel(false);
  };

  const handleModelChange = (value: string) => {
    if (value === 'other') {
      setIsCustomModel(true);
      setFormData((prevData) => ({
        ...prevData,
        llmApiModel: '',
      }));
    } else {
      setIsCustomModel(false);
      setFormData((prevData) => ({
        ...prevData,
        llmApiModel: value,
      }));
    }
  };

  const handleRegenerateApiKey = async () => {
    if (!formData.project_id) return;
    setIsRegenerating(true);
    setShowRegenConfirm(false);

    try {
      const generateResponse = await fetch('/api/generateApiKey', {
        method: 'POST',
      });

      if (!generateResponse.ok) {
        throw new Error('Failed to generate API key');
      }

      const { apiKey, apiKeyId } = await generateResponse.json();

      const updateResponse = await fetch('/api/project', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: formData.project_id,
          name: formData.projectName,
          description: `Project: ${formData.projectName}`,
          projectName: formData.projectName,
          llmType: formData.llmType,
          llmApiKey: formData.llmApiKey,
          llmApiModel: formData.llmApiModel,
          smtpUser: formData.smtpUser,
          smtpPass: formData.smtpPass,
          emailTo: formData.emailTo,
          notaifyApiKey: apiKey,
          notaifyApiKeyId: apiKeyId,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update project with new API key');
      }

      setFormData((prev) => ({
        ...prev,
        notaifyApiKey: apiKey,
        notaifyApiKeyId: apiKeyId,
      }));

      setNewlyGeneratedKey({ apiKey, apiKeyId });
      setShowNewApiKeyDialog(true);
      setVisibleApiKey(true);
      setSuccess('API key regenerated successfully!');
    } catch (err) {
      console.error('Error regenerating API key:', err);
      setError('Failed to regenerate API key');
    } finally {
      setIsRegenerating(false);
    }
  };

  const getModelOptions = () => {
    switch (formData.llmType) {
      case 'openai':
        return [
          { value: 'gpt-5.2', label: 'GPT-5.2 (Latest Expert)' },
          { value: 'gpt-5.1-chat-latest', label: 'GPT-5.1 Chat' },
          { value: 'gpt-5.2-codex', label: 'GPT-5.2 Codex' },
          { value: 'gpt-4.5-turbo', label: 'GPT-4.5 Turbo' },
          { value: 'gpt-4o', label: 'GPT-4o' },
          { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
          { value: 'o1-preview', label: 'o1 Preview' },
          { value: 'other', label: 'Other (Manual Entry)' },
        ];
      case 'claude':
        return [
          { value: 'claude-opus-4-6', label: 'Claude 4.6 Opus (Latest)' },
          { value: 'claude-sonnet-4-6', label: 'Claude 4.6 Sonnet' },
          { value: 'claude-haiku-4-5', label: 'Claude 4.5 Haiku' },
          { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
          { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
          { value: 'other', label: 'Other (Manual Entry)' },
        ];
      case 'google':
        return [
          { value: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro (Preview)' },
          { value: 'gemini-3-flash-preview', label: 'Gemini 3 Flash (Preview)' },
          { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Stable)' },
          { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Stable)' },
          { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite' },
          { value: 'other', label: 'Other (Manual Entry)' },
        ];
      default:
        return [];
    }
  };

  // Helper check for when loading initial data
  useEffect(() => {
    if (formData.llmType && formData.llmApiModel) {
      // Inline the options check here to prevent useCallback/exhaustive-deps issues
      let knownOptions: string[] = [];
      if (formData.llmType === 'openai') {
        knownOptions = ['gpt-5.2', 'gpt-5.1-chat-latest', 'gpt-5.2-codex', 'gpt-4.5-turbo', 'gpt-4o', 'gpt-4o-mini', 'o1-preview', 'other'];
      } else if (formData.llmType === 'claude') {
        knownOptions = ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5', 'claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'other'];
      } else if (formData.llmType === 'google') {
        knownOptions = ['gemini-3.1-pro-preview', 'gemini-3-flash-preview', 'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'other'];
      }

      const isKnown = knownOptions.includes(formData.llmApiModel);
      if (!isKnown && formData.llmApiModel !== '') {
        setIsCustomModel(true);
      }
    }
  }, [formData.llmType, formData.llmApiModel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!userId) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }

    try {
      if (isEditMode && projectId) {
        const hasChanges = originalFormData && (
          formData.projectName !== originalFormData.projectName ||
          formData.llmType !== originalFormData.llmType ||
          formData.llmApiKey !== originalFormData.llmApiKey ||
          formData.llmApiModel !== originalFormData.llmApiModel ||
          formData.smtpUser !== originalFormData.smtpUser ||
          formData.smtpPass !== originalFormData.smtpPass ||
          formData.emailTo !== originalFormData.emailTo
        );

        if (!hasChanges) {
          setSuccess('No changes detected.');
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/project', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: projectId,
            name: formData.projectName,
            description: `Project: ${formData.projectName}`,
            projectName: formData.projectName,
            llmType: formData.llmType,
            llmApiKey: formData.llmApiKey,
            llmApiModel: formData.llmApiModel,
            smtpUser: formData.smtpUser,
            smtpPass: formData.smtpPass,
            emailTo: formData.emailTo,
            notaifyApiKey: formData.notaifyApiKey,
            notaifyApiKeyId: formData.notaifyApiKeyId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update project');
        }

        setSuccess('Project updated successfully!');
        setOriginalFormData(formData);
        setIsLoading(false);
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        const response = await fetch('/api/project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            name: formData.projectName,
            description: `Project: ${formData.projectName}`,
            projectName: formData.projectName,
            llmType: formData.llmType || null,
            llmApiKey: formData.llmApiKey || null,
            llmApiModel: formData.llmApiModel || null,
            smtpUser: formData.smtpUser || null,
            smtpPass: formData.smtpPass || null,
            emailTo: formData.emailTo || null,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create project');
        }

        const { project } = await response.json();

        const generateResponse = await fetch('/api/generateApiKey', {
          method: 'POST',
        });

        if (!generateResponse.ok) {
          throw new Error('Failed to generate API key');
        }

        const { apiKey, apiKeyId } = await generateResponse.json();

        const updateResponse = await fetch('/api/project', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: project.id,
            name: formData.projectName,
            description: `Project: ${formData.projectName}`,
            projectName: formData.projectName,
            llmType: formData.llmType || null,
            llmApiKey: formData.llmApiKey || null,
            llmApiModel: formData.llmApiModel || null,
            smtpUser: formData.smtpUser || null,
            smtpPass: formData.smtpPass || null,
            emailTo: formData.emailTo || null,
            notaifyApiKey: apiKey,
            notaifyApiKeyId: apiKeyId,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to save API key');
        }

        setNewlyGeneratedKey({ apiKey, apiKeyId });
        setFormData({
          ...formData,
          project_id: project.id,
          notaifyApiKey: apiKey,
          notaifyApiKeyId: apiKeyId,
        });
        setSuccess('Project created successfully! API key has been auto-generated.');
        setVisibleApiKey(true);
        setShowNewApiKeyDialog(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please try again.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTestAllConfigs = async () => {
    // Basic validation
    let hasError = false;
    let initialSmtpState: { type: 'success' | 'error' | 'pending'; message: string } = { type: 'pending', message: 'Ready to test...' };
    let initialLlmState: { type: 'success' | 'error' | 'pending'; message: string } = { type: 'pending', message: 'Ready to test...' };

    if (!formData.smtpUser || !formData.smtpPass || !formData.emailTo) {
      initialSmtpState = { type: 'error', message: 'Missing required SMTP fields (User, Pass, To Email).' };
      hasError = true;
    }
    if (!formData.llmType || !formData.llmApiKey || !formData.llmApiModel) {
      initialLlmState = { type: 'error', message: 'Missing required LLM API fields (Provider, Key, Model).' };
      hasError = true;
    } else if (hasError && initialLlmState.type !== 'error') {
      // If LLM is fine but SMTP failed, LLM would fail too (it needs SMTP)
      initialLlmState = { type: 'error', message: 'LLM config requires valid SMTP credentials to test.' };
    }

    setTestResult({ smtp: initialSmtpState, llm: initialLlmState });

    if (hasError) return;

    setIsTestingAll(true);
    setTestResult({
      smtp: { type: 'pending', message: 'Testing SMTP credentials...' },
      llm: { type: 'pending', message: 'Testing LLM generated error via API...' }
    });

    try {
      // Run both API requests concurrently
      const [smtpRes, llmRes] = await Promise.allSettled([
        fetch('/api/package/nodexp/trialMail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            smtpUser: formData.smtpUser,
            smtpPass: formData.smtpPass,
            emailTo: formData.emailTo,
          }),
        }),
        fetch('/api/package/nodexp/trialLlm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: formData.llmType,
            apiKey: formData.llmApiKey,
            modelName: formData.llmApiModel,
            smtpUser: formData.smtpUser,
            smtpPass: formData.smtpPass,
            emailTo: formData.emailTo,
          }),
        })
      ]);

      setTestResult(prev => {
        const newResult = {
          smtp: prev?.smtp || { type: 'error', message: 'Failed' },
          llm: prev?.llm || { type: 'error', message: 'Failed' }
        };

        // Handle SMTP Results
        if (smtpRes.status === 'fulfilled') {
          smtpRes.value.json().then(data => {
            setTestResult(cur => ({
              ...cur!,
              smtp: smtpRes.value.ok && data.message === 'success'
                ? { type: 'success', message: data.data || 'SMTP setup is valid!' }
                : { type: 'error', message: data.error || 'Failed to authenticate SMTP.' }
            }));
          });
        } else {
          newResult.smtp = { type: 'error', message: 'Network error communicating with SMTP test route.' };
        }

        // Handle LLM Results
        if (llmRes.status === 'fulfilled') {
          llmRes.value.json().then(data => {
            setTestResult(cur => ({
              ...cur!,
              llm: llmRes.value.ok && data.message === 'success'
                ? { type: 'success', message: 'LLM Key valid & test generated!' }
                : { type: 'error', message: data.error || 'LLM error validation failed.' }
            }));
          });
        } else {
          newResult.llm = { type: 'error', message: 'Network error communicating with LLM test route.' };
        }

        return newResult;
      });

    } catch (err) {
      console.error('Unified test error:', err);
    } finally {
      // Give the promises a moment to parse JSON before unlocking the button
      setTimeout(() => setIsTestingAll(false), 800);
    }
  };

  const handleCancel = () => {
    if (isEditMode && originalFormData) {
      setFormData(originalFormData);
      setError(null);
      setSuccess(null);
      setTestResult(null);
    }
    router.push('/dashboard');
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header Section */}
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                {isEditMode ? (
                  <FileText className="h-5 w-5 text-primary" />
                ) : (
                  <Plus className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {isEditMode ? 'Update Project' : 'Create New Project'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure your project settings and integrate with LLM and email services.
                </p>
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/30 dark:text-green-100 [&>svg]:text-green-600 dark:[&>svg]:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Give your project a unique, descriptive name.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="projectName">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Production API Monitor"
                    className="max-w-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LLM Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-4 w-4 text-purple-500" />
                    LLM Configuration
                  </CardTitle>
                  <CardDescription>
                    Connect your preferred language model provider.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="llmType">
                      LLM Provider <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.llmType || undefined}
                      onValueChange={handleLlmTypeChange}
                      required
                    >
                      <SelectTrigger id="llmType">
                        <SelectValue placeholder="Select LLM Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">🤖 OpenAI</SelectItem>
                        <SelectItem value="claude">🧠 Claude (Anthropic)</SelectItem>
                        <SelectItem value="google">🔍 Google (Gemini)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="llmApiModel">
                        Model <span className="text-destructive">*</span>
                      </Label>
                      {formData.llmType ? (
                        <Select
                          value={isCustomModel ? 'other' : (formData.llmApiModel || undefined)}
                          onValueChange={handleModelChange}
                          required
                        >
                          <SelectTrigger id="llmApiModel">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            {getModelOptions().map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="llmApiModel"
                          disabled
                          placeholder="Select an LLM provider first"
                          className="cursor-not-allowed"
                        />
                      )}
                    </div>

                    {isCustomModel && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="customModelInput" className="text-muted-foreground text-xs">
                          Enter Custom Model ID <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="customModelInput"
                          name="llmApiModel"
                          value={formData.llmApiModel}
                          onChange={handleChange}
                          placeholder="e.g. gemini-1.5-pro-exp-0827"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="llmApiKey">
                      API Key <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="password"
                      id="llmApiKey"
                      name="llmApiKey"
                      value={formData.llmApiKey}
                      onChange={handleChange}
                      required
                      placeholder="sk-••••••••••••••••"
                    />
                  </div>

                </CardContent>
              </Card>

              {/* SMTP Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Mail className="h-4 w-4 text-green-500" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>
                    Set up SMTP credentials for email notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">
                        SMTP Username <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="smtpUser"
                        name="smtpUser"
                        value={formData.smtpUser}
                        onChange={handleChange}
                        required
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPass">
                        SMTP Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        id="smtpPass"
                        name="smtpPass"
                        value={formData.smtpPass}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailTo">
                      To Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="emailTo"
                      name="emailTo"
                      value={formData.emailTo}
                      onChange={handleChange}
                      required
                      placeholder="recipient@example.com"
                    />
                  </div>

                </CardContent>
              </Card>
            </div>

            {/* Unified Test Configuration Section */}
            <Card className="border-dashed border-2 bg-slate-50 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-blue-500" />
                      Test Your Configurations
                    </h3>
                    <p className="text-sm text-muted-foreground">Verify both LLM and SMTP integrations before saving.</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto shrink-0 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:bg-slate-950 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    onClick={handleTestAllConfigs}
                    disabled={isTestingAll}
                  >
                    {isTestingAll ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running Tests…
                      </>
                    ) : (
                      <>
                        Test Both Features
                      </>
                    )}
                  </Button>
                </div>

                {testResult && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 top-border border-t pt-4">
                    {/* SMTP Result Card */}
                    <Alert
                      variant={testResult.smtp.type === 'error' ? 'destructive' : 'default'}
                      className={
                        testResult.smtp.type === 'success'
                          ? 'border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/30 dark:text-green-100'
                          : testResult.smtp.type === 'pending'
                            ? 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100'
                            : ''
                      }
                    >
                      {testResult.smtp.type === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                      ) : testResult.smtp.type === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin !text-blue-600 dark:!text-blue-400" />
                      )}
                      <AlertTitle className="text-sm font-medium">SMTP Connection</AlertTitle>
                      <AlertDescription className="text-xs">
                        {testResult.smtp.message}
                      </AlertDescription>
                    </Alert>

                    {/* LLM Result Card */}
                    <Alert
                      variant={testResult.llm.type === 'error' ? 'destructive' : 'default'}
                      className={
                        testResult.llm.type === 'success'
                          ? 'border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/30 dark:text-green-100'
                          : testResult.llm.type === 'pending'
                            ? 'border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-100'
                            : ''
                      }
                    >
                      {testResult.llm.type === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                      ) : testResult.llm.type === 'error' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin !text-purple-600 dark:!text-purple-400" />
                      )}
                      <AlertTitle className="text-sm font-medium">LLM API Call</AlertTitle>
                      <AlertDescription className="text-xs">
                        {testResult.llm.message}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* API Key Section (Edit Mode) */}
            {isEditMode && formData.notaifyApiKeyId && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <KeyRound className="h-4 w-4 text-amber-500" />
                      Notaify API Key
                    </CardTitle>
                    <CardDescription>
                      Use this key to authenticate API requests from your application.
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRegenConfirm(true)}
                    disabled={isRegenerating}
                  >
                    {isRegenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Regenerate
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4 space-y-4">
                  {/* API ID */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">API ID</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-md border bg-muted/50 px-3 py-2.5 font-mono text-sm">
                        {formData.notaifyApiKeyId}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                            onClick={() => copyToClipboard(formData.notaifyApiKeyId || '', 'apiId')}
                          >
                            {copiedField === 'apiId' ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copiedField === 'apiId' ? 'Copied!' : 'Copy API ID'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  {/* API Key */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">Secret Key</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-md border bg-muted/50 px-3 py-2.5 font-mono text-sm break-all">
                        {visibleApiKey && formData.notaifyApiKey
                          ? formData.notaifyApiKey
                          : formData.notaifyApiKey
                            ? '•'.repeat(Math.min(formData.notaifyApiKey.length, 24))
                            : '—'}
                      </code>
                      {formData.notaifyApiKey && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                onClick={() => setVisibleApiKey(!visibleApiKey)}
                              >
                                {visibleApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{visibleApiKey ? 'Hide' : 'Show'} API Key</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                onClick={() => copyToClipboard(formData.notaifyApiKey || '', 'apiKey')}
                              >
                                {copiedField === 'apiKey' ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedField === 'apiKey' ? 'Copied!' : 'Copy API Key'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col-reverse sm:flex-row justify-end gap-3 py-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleCancel}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : isEditMode ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Project
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project &amp; Generate Key
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>

          {/* Regenerate Confirmation Dialog */}
          <AlertDialog open={showRegenConfirm} onOpenChange={setShowRegenConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  Regenerate API Key?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Regenerating the API key will invalidate the previous one. Any integrations using the old key will stop working.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRegenerateApiKey}>
                  Regenerate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* New API Key Success Dialog */}
          <Dialog open={showNewApiKeyDialog} onOpenChange={setShowNewApiKeyDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <DialogTitle className="text-center">API Key Generated</DialogTitle>
                <DialogDescription className="text-center">
                  Save this key securely — you won&apos;t be able to see it again.
                </DialogDescription>
              </DialogHeader>

              {newlyGeneratedKey && (
                <div className="space-y-4">
                  {/* API ID */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">API ID</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono break-all">
                        {newlyGeneratedKey.apiKeyId}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                            onClick={() => copyToClipboard(newlyGeneratedKey.apiKeyId, 'dialogApiId')}
                          >
                            {copiedField === 'dialogApiId' ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copiedField === 'dialogApiId' ? 'Copied!' : 'Copy'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* API Key */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Secret Key</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono break-all">
                        {visibleApiKey
                          ? newlyGeneratedKey.apiKey
                          : '•'.repeat(Math.min(newlyGeneratedKey.apiKey.length, 24))}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                            onClick={() => setVisibleApiKey(!visibleApiKey)}
                          >
                            {visibleApiKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{visibleApiKey ? 'Hide' : 'Show'}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                            onClick={() => copyToClipboard(newlyGeneratedKey.apiKey, 'dialogApiKey')}
                          >
                            {copiedField === 'dialogApiKey' ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copiedField === 'dialogApiKey' ? 'Copied!' : 'Copy'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Warning */}
                  <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Store this key in a secure location. It will not be displayed again after closing this dialog.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <DialogFooter className="sm:justify-center">
                <Button
                  onClick={() => {
                    setShowNewApiKeyDialog(false);
                    setNewlyGeneratedKey(null);
                    if (!isEditMode) {
                      setTimeout(() => router.push('/dashboard'), 300);
                    }
                  }}
                  className="w-full sm:w-auto"
                >
                  {isEditMode ? 'Done' : 'Go to Dashboard'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </TooltipProvider>
  );
}
