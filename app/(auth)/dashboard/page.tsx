'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import { Plus, Trash2, Edit2, Copy, Eye, EyeOff } from 'lucide-react';

export default function DashboardPage() {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  // Load projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/project?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const { projects: fetchedProjects } = await response.json();
        
        // Transform backend data to match ProjectConfig
        const transformedProjects: ProjectConfig[] = fetchedProjects.map((p: any) => ({
          project_id: p.id,
          projectName: p.projectName,
          description: p.description || '',
          llmType: p.llmType || '',
          llmApiKey: p.llmApiKey || '',
          llmApiModel: p.llmApiModel || '',
          smtpUser: p.smtpUser || '',
          smtpPass: p.smtpPass || '',
          emailFrom: p.emailFrom || '',
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
    if (!confirm('Are you sure you want to delete this project?')) return;
    
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

  const toggleKeyVisibility = (projectId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(projectId)) {
      newVisible.delete(projectId);
    } else {
      newVisible.add(projectId);
    }
    setVisibleKeys(newVisible);
  };

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const maskApiKey = (key: string) => {
    if (!key) return '-';
    if (key.length <= 8) return key;
    return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage all your projects
            </p>
          </div>
          <Link
            href="/dashboard/addProject"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900/50">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No projects yet
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Get started by creating your first project
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    LLM Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    API ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    API Key
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {projects.map((project) => (
                  <tr
                    key={project.project_id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/30"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {project.projectName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <span title={project.description || '-'}>
                        {project.description ? (project.description.length > 30 ? project.description.substring(0, 30) + '...' : project.description) : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium uppercase dark:bg-gray-800">
                        {project.llmType || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-900">
                          {project.notaifyApiKeyId || '-'}
                        </code>
                        {project.notaifyApiKeyId && (
                          <button
                            onClick={() => copyToClipboard(project.notaifyApiKeyId || '')}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Copy API ID"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-900">
                          {visibleKeys.has(project.project_id)
                            ? project.notaifyApiKey || '-'
                            : maskApiKey(project.notaifyApiKey || '')}
                        </code>
                        {project.notaifyApiKey && (
                          <>
                            <button
                              onClick={() => toggleKeyVisibility(project.project_id)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              title={visibleKeys.has(project.project_id) ? 'Hide API Key' : 'Show API Key'}
                            >
                              {visibleKeys.has(project.project_id) ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(project.notaifyApiKey || '')}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              title="Copy API Key"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(project.updatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/addProject?id=${project.project_id}`}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="Edit Project"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.project_id)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete Project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
 