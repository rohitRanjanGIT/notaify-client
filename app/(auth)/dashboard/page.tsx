'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  AlertCircle,
  FolderOpen,
  Search,
  Sparkles,
  Mail,
  Brain,
  Loader2,
  CheckCircle2,
  FlaskConical,
  BookOpenText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function DashboardPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testingConfigId, setTestingConfigId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/project?userId=${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const { projects: fetchedProjects } = await response.json();

        const transformedProjects: ProjectConfig[] = fetchedProjects.map((p: any) => ({
          project_id: p.id,
          projectName: p.projectName,
          description: p.description || '',
          llmType: p.llmType || '',
          llmApiKey: p.llmApiKey || '',
          llmApiModel: p.llmApiModel || '',
          smtpUser: p.smtpUser || '',
          smtpPass: p.smtpPass || '',
          emailTo: p.emailTo || '',
          notaifyApiKey: p.notaifyApiKey || '',
          notaifyApiKeyId: p.notaifyApiKeyId || '',
          createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : undefined,
        }));

        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects from server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/project?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter((p) => p.project_id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTestConfigs = async (projectId: string, hasLlm: boolean) => {
    setTestingConfigId(projectId);
    setError(null);
    setSuccess(null);

    const project = projects.find(p => p.project_id === projectId);
    if (!project) {
      setError("Project not found.");
      setTestingConfigId(null);
      return;
    }

    const apiKeyId = project.notaifyApiKeyId;
    const apiKey = project.notaifyApiKey;

    if (!apiKeyId || !apiKey) {
      setError("Notaify API credentials (Key and ID) are required to test configurations. Please generate an API Key first.");
      setTestingConfigId(null);
      return;
    }

    try {
      if (hasLlm) {
        // Run both tests if LLM is configured
        const [mailRes, llmRes] = await Promise.allSettled([
          fetch('/api/package/nodexp/trialMail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKeyId, apiKey }),
          }),
          fetch('/api/package/nodexp/trialLlm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKeyId, apiKey }),
          })
        ]);

        let allSuccess = true;
        let messages = [];

        if (mailRes.status === 'fulfilled') {
          if (mailRes.value.ok) {
            messages.push('SMTP Test Email Sent');
          } else {
            allSuccess = false;
            try {
              const data = await mailRes.value.json();
              messages.push(`SMTP Test Failed: ${data.error || 'Unknown error'}`);
            } catch {
              messages.push('SMTP Test Failed');
            }
          }
        } else {
          allSuccess = false;
          messages.push('SMTP Request Failed');
        }

        if (llmRes.status === 'fulfilled') {
          if (llmRes.value.ok) {
            messages.push('LLM Integration Successful');
          } else {
            allSuccess = false;
            try {
              const data = await llmRes.value.json();
              messages.push(`LLM Test Failed: ${data.error || 'Unknown error'}`);
            } catch {
              messages.push('LLM Test Failed');
            }
          }
        } else {
          allSuccess = false;
          messages.push('LLM Request Failed');
        }

        if (allSuccess) {
          setSuccess('All Configurations Verified: ' + messages.join(' & ') + '!');
        } else {
          setError('Some tests failed: ' + messages.join(' | '));
        }

      } else {
        // Only run Mail test if no LLM configured
        const response = await fetch('/api/package/nodexp/trialMail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKeyId, apiKey }),
        });
        const data = await response.json();

        if (response.ok && data.message === 'success') {
          setSuccess(data.data || 'SMTP Test Email Sent successfully!');
        } else {
          setError(data.error || 'Failed to send test email.');
        }
      }
    } catch (err) {
      console.error('Test config error:', err);
      setError('Network error testing configurations.');
    } finally {
      setTestingConfigId(null);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Stats
  const totalProjects = projects.length;
  const activeLLMs = projects.filter((p) => p.llmType).length;
  const emailConfigured = projects.filter((p) => p.smtpUser).length;
  const apiKeysGenerated = projects.filter((p) => p.notaifyApiKey).length;

  // Search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.projectName.toLowerCase().includes(q) ||
        (p.llmType && p.llmType.toLowerCase().includes(q)) ||
        (p.llmApiModel && p.llmApiModel.toLowerCase().includes(q))
    );
  }, [projects, searchQuery]);

  const displayName = user?.firstName
    ? `${user.firstName}'s projects`
    : 'Your projects';

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">{displayName}</h1>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/addProject">
                <Button variant="outline" size="sm">
                  New project
                </Button>
              </Link>
              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Error and Success Alerts */}
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

          {/* Stats Row */}
          {!isLoading && projects.length > 0 && (
            <div className="rounded-lg border border-border">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
                <div className="px-5 py-4">
                  <p className="text-xs text-muted-foreground mb-1">📁 Projects</p>
                  <p className="text-lg font-semibold">{totalProjects}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-muted-foreground mb-1">🤖 LLM configured</p>
                  <p className="text-lg font-semibold">{activeLLMs}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-muted-foreground mb-1">📧 Email enabled</p>
                  <p className="text-lg font-semibold">{emailConfigured}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-muted-foreground mb-1">🔑 API keys</p>
                  <p className="text-lg font-semibold">{apiKeysGenerated}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-[72px] w-full rounded-lg" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-9 w-full rounded-md" />
              <div className="space-y-0 rounded-lg border border-border overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-6 px-5 py-4 border-b border-border last:border-0">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[160px]" />
                    <Skeleton className="h-4 w-[140px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
              </div>
            </div>
          ) : projects.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
                <FolderOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-1">No projects yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Get started by creating your first project. Configure LLM providers, email alerts, and generate API keys.
              </p>
              <Link href="/dashboard/addProject">
                <Button size="sm">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Create your first project
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Project Count */}
              <h2 className="text-base font-semibold">
                {totalProjects} Project{totalProjects !== 1 ? 's' : ''}
              </h2>

              {/* Projects Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-5 text-xs font-medium text-muted-foreground">Name</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">LLM Provider</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Model</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Created at</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">API Key / ID</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground text-right pr-5">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-sm text-muted-foreground">
                          No projects match &ldquo;{searchQuery}&rdquo;
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProjects.map((project) => (
                        <TableRow key={project.project_id} className="group">
                          {/* Name */}
                          <TableCell className="pl-5 font-medium">
                            <Link
                              href={`/dashboard/addProject?id=${project.project_id}`}
                              className="hover:underline underline-offset-4"
                            >
                              {project.projectName}
                            </Link>
                          </TableCell>

                          {/* LLM Provider */}
                          <TableCell>
                            {project.llmType ? (
                              <span className="text-sm capitalize">{project.llmType}</span>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </TableCell>

                          {/* Model */}
                          <TableCell>
                            {project.llmApiModel ? (
                              <Badge variant="secondary" className="font-mono text-[11px] font-normal">
                                {project.llmApiModel}
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </TableCell>

                          {/* Created */}
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatDate(project.createdAt)}
                          </TableCell>

                          {/* API Key / ID */}
                          <TableCell className="pl-2">
                            <div className="flex items-center gap-1 -ml-2">
                              {project.notaifyApiKeyId && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1.5"
                                      onClick={() => copyToClipboard(project.notaifyApiKeyId || '', `id-${project.project_id}`)}
                                    >
                                      {copiedId === `id-${project.project_id}` ? (
                                        <Check className="h-3 w-3 text-green-500" />
                                      ) : (
                                        <Copy className="h-3 w-3" />
                                      )}
                                      API ID
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    <p>{copiedId === `id-${project.project_id}` ? 'Copied!' : 'Copy API ID'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {project.notaifyApiKey && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1.5"
                                      onClick={() => copyToClipboard(project.notaifyApiKey || '', `key-${project.project_id}`)}
                                    >
                                      {copiedId === `key-${project.project_id}` ? (
                                        <Check className="h-3 w-3 text-green-500" />
                                      ) : (
                                        <Copy className="h-3 w-3" />
                                      )}
                                      API Key
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    <p>{copiedId === `key-${project.project_id}` ? 'Copied!' : 'Copy API Key'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {!project.notaifyApiKeyId && !project.notaifyApiKey && (
                                <span className="text-sm text-muted-foreground">—</span>
                              )}
                            </div>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right pr-5">
                            <div className="flex items-center justify-end gap-0.5">
                              {/* Quick Actions (Test Configs) */}
                              {(project.smtpUser || project.llmType) && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-blue-950/30"
                                      onClick={() => handleTestConfigs(project.project_id, !!project.llmType)}
                                      disabled={testingConfigId === project.project_id}
                                    >
                                      {testingConfigId === project.project_id ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                      ) : (
                                        <FlaskConical className="h-3.5 w-3.5" />
                                      )}
                                      <span className="sr-only">Test LLM & Mail</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom"><p>Test LLM & Mail</p></TooltipContent>
                                </Tooltip>
                              )}

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-500 dark:hover:text-green-400 dark:hover:bg-green-950/30"
                                    asChild
                                  >
                                    <Link href={`/dashboard/logs?projectId=${project.project_id}`}>
                                      <BookOpenText className="h-3.5 w-3.5" />
                                      <span className="sr-only">View Logs</span>
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom"><p>View Logs</p></TooltipContent>
                              </Tooltip>

                              <div className="w-px h-4 bg-border mx-1 hidden sm:block"></div>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                    asChild
                                  >
                                    <Link href={`/dashboard/addProject?id=${project.project_id}`}>
                                      <Edit2 className="h-3.5 w-3.5" />
                                      <span className="sr-only">Edit</span>
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom"><p>Edit</p></TooltipContent>
                              </Tooltip>

                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom"><p>Delete</p></TooltipContent>
                                </Tooltip>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete &ldquo;{project.projectName}&rdquo;?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. The project and its associated API keys will be permanently deleted.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteProject(project.project_id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}
