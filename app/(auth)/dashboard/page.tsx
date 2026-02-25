'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import { Plus, Trash2, Edit2, Copy, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

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
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage all your projects
            </p>
          </div>
          <Link href="/dashboard/addProject">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-[150px]" /></CardTitle>
              <CardDescription><Skeleton className="h-4 w-[250px]" /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ) : projects.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
            <CardHeader className="items-center pb-2">
              <CardTitle>No projects yet</CardTitle>
              <CardDescription>Get started by creating your first project.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/addProject">
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>LLM Type</TableHead>
                    <TableHead>API ID</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.project_id}>
                      <TableCell className="font-medium">{project.projectName}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={project.description || '-'}>
                        {project.description || '-'}
                      </TableCell>
                      <TableCell>
                        {project.llmType ? (
                          <Badge variant="secondary" className="uppercase">{project.llmType}</Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-muted-foreground">
                            {project.notaifyApiKeyId || '-'}
                          </code>
                          {project.notaifyApiKeyId && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-foreground"
                              onClick={() => copyToClipboard(project.notaifyApiKeyId || '')}
                              title="Copy API ID"
                            >
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy API ID</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-muted-foreground">
                            {visibleKeys.has(project.project_id)
                              ? project.notaifyApiKey || '-'
                              : maskApiKey(project.notaifyApiKey || '')}
                          </code>
                          {project.notaifyApiKey && (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                onClick={() => toggleKeyVisibility(project.project_id)}
                                title={visibleKeys.has(project.project_id) ? 'Hide API Key' : 'Show API Key'}
                              >
                                {visibleKeys.has(project.project_id) ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                                <span className="sr-only">Toggle API Key visibility</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                onClick={() => copyToClipboard(project.notaifyApiKey || '')}
                                title="Copy API Key"
                              >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy API Key</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(project.createdAt)}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(project.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/dashboard/addProject?id=${project.project_id}`}>
                            <Button variant="ghost" size="icon" title="Edit Project" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <Edit2 className="h-4 w-4" />
                              <span className="sr-only">Edit Project</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete Project"
                            className="h-8 w-8 text-destructive focus:text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteProject(project.project_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Project</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
