'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';

export default function AddProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const isEditMode = Boolean(projectId);
  const [formData, setFormData] = useState<ProjectConfig>({
    project_id: '',
    llmType: '',
    llmApiKey: '',
    llmApiModel: '',
    smtpUser: '',
    smtpPass: '',
    emailFrom: '',
    emailTo: '',
    projectName: '',
    notaifyApiKey: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    try {
      const stored = localStorage.getItem('projectConfigs');
      const existing: ProjectConfig[] = stored ? JSON.parse(stored) : [];
      const current = existing.find((p) => p.project_id === projectId);
      if (current) {
        setFormData({
          ...current,
          notaifyApiKey: current.notaifyApiKey ?? '',
        });
      }
    } catch (err) {
      console.error('Failed to load project config:', err);
    }
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Reset model when LLM type changes
      ...(name === 'llmType' ? { llmApiModel: '' } : {}),
    }));
  };

  // Model options based on selected LLM type
  const getModelOptions = () => {
    switch (formData.llmType) {
      case 'openai':
        return [
          { value: 'gpt-4o', label: 'GPT-4o (Latest)' },
          { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
          { value: 'o1', label: 'o1 (Reasoning)' },
          { value: 'o1-mini', label: 'o1 Mini' },
          { value: 'o1-preview', label: 'o1 Preview' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        ];
      case 'claude':
        return [
          { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Latest)' },
          { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
          { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
          { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
          { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
        ];
      case 'google':
        return [
          { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash (Experimental)' },
          { value: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro (Latest)' },
          { value: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash (Latest)' },
          { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
          { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
          { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
        ];
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const existingProjectsString = localStorage.getItem('projectConfigs');
      const existingProjects: ProjectConfig[] = existingProjectsString ? JSON.parse(existingProjectsString) : [];

      if (isEditMode && projectId) {
        const updatedProjects = existingProjects.map((project) =>
          project.project_id === projectId
            ? {
                ...project,
                ...formData,
                project_id: projectId,
              }
            : project
        );
        localStorage.setItem('projectConfigs', JSON.stringify(updatedProjects));
        setSuccess('Project updated successfully!');
      } else {
        const projectWithId: ProjectConfig = {
          ...formData,
          project_id: Date.now().toString()
        };
        localStorage.setItem('projectConfigs', JSON.stringify([projectWithId, ...existingProjects]));
        setSuccess('Project created successfully!');
      }

      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
      <div className="container mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? '✏️ Update Project' : '✨ Create New Project'}
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Configure your project settings and integrate with LLMs and email services for seamless automation.
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 flex items-start animate-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-red-800 dark:text-red-400">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 p-4 flex items-start animate-in slide-in-from-top-2 duration-300">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-800 dark:text-green-400">{success}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Project Name Section - Full Width */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h2>
            </div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              placeholder="e.g., Production API Monitor"
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            />
          </div>

          {/* Two Column Layout for LLM and Email Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LLM Configuration Section */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">LLM Configuration</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="llmType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LLM Provider <span className="text-red-500">*</span>
                </label>
                <select
                  id="llmType"
                  name="llmType"
                  value={formData.llmType}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20"
                >
                  <option value="">Select LLM Provider</option>
                  <option value="openai">🤖 OpenAI</option>
                  <option value="claude">🧠 Claude (Anthropic)</option>
                  <option value="google">🔍 Google (Gemini)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="llmApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="llmApiKey"
                  name="llmApiKey"
                  value={formData.llmApiKey}
                  onChange={handleChange}
                  required
                  placeholder="sk-••••••••••••••••"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400 dark:focus:ring-purple-400/20"
                />
              </div>
              
              <div>
                <label htmlFor="llmApiModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model Name <span className="text-red-500">*</span>
                </label>
                {formData.llmType ? (
                  <select
                    id="llmApiModel"
                    name="llmApiModel"
                    value={formData.llmApiModel}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/20"
                  >
                    <option value="">Select a model</option>
                    {getModelOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id="llmApiModel"
                    name="llmApiModel"
                    value={formData.llmApiModel}
                    onChange={handleChange}
                    required
                    disabled
                    placeholder="Please select an LLM provider first"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 placeholder-gray-400 shadow-sm cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 dark:placeholder-gray-500"
                  />
                )}
              </div>
            </div>
          </div>

            {/* SMTP Configuration Section */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Configuration</h2>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="smtpUser"
                    name="smtpUser"
                    value={formData.smtpUser}
                    onChange={handleChange}
                    required
                    placeholder="user@example.com"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-green-400 dark:focus:ring-green-400/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="smtpPass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="smtpPass"
                    name="smtpPass"
                    value={formData.smtpPass}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-green-400 dark:focus:ring-green-400/20"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emailFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailFrom"
                    name="emailFrom"
                    value={formData.emailFrom}
                    onChange={handleChange}
                    required
                    placeholder="sender@example.com"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-green-400 dark:focus:ring-green-400/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="emailTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailTo"
                    name="emailTo"
                    value={formData.emailTo}
                    onChange={handleChange}
                    required
                    placeholder="recipient@example.com"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-green-400 dark:focus:ring-green-400/20"
                  />
                </div>
              </div>
            </div>
          </div>
          
          </div>

          {/* Action Buttons - Full Width */}
          <div className="rounded-xl border border-gray-200 shadow-lg dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm px-6 sm:px-8 py-6 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  {isEditMode ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Project
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Project
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
