'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Edit2,
  Copy,
  Eye,
  EyeOff,
  AlertCircle,
  FolderOpen,
  Layers,
  Brain,
  Mail,
  Check,
  Sparkles,
} from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    });
  };

  const maskApiKey = (key: string) => {
    if (!key) return '-';
    if (key.length <= 8) return key;
    return key.slice(0, 4) + '•'.repeat(Math.min(key.length - 8, 16)) + key.slice(-4);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stats
  const totalProjects = projects.length;
  const activeLLMs = projects.filter((p) => p.llmType).length;
  const emailConfigured = projects.filter((p) => p.smtpUser).length;

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: Layers,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: 'LLM Configured',
      value: activeLLMs,
      icon: Brain,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
    },
    {
      label: 'Email Enabled',
      value: emailConfigured,
      icon: Mail,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/40',
    },
  ];

  const getLLMBadgeVariant = (type: string) => {
    switch (type) {
      case 'openai':
        return 'default';
      case 'claude':
        return 'secondary';
      case 'google':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage your projects, API keys, and integrations.
              </p>
            </div>
            <Link href="/dashboard/addProject">
              <Button size="lg" className="shadow-sm">
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

          {/* Stats Cards */}
          {!isLoading && projects.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[150px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[250px]" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[300px]" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : projects.length === 0 ? (
            /* Empty State */
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Create your first project to get started with Notaify. Configure LLM providers, email alerts, and generate API keys.
                </p>
                <Link href="/dashboard/addProject">
                  <Button>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            /* Projects Table */
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Projects</CardTitle>
                <CardDescription>
                  {totalProjects} project{totalProjects !== 1 ? 's' : ''} configured
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6">Project Name</TableHead>
                        <TableHead>LLM</TableHead>
                        <TableHead>API ID</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.project_id} className="group">
                          {/* Project Name */}
                          <TableCell className="pl-6">
                            <div className="flex flex-col">
                              <span className="font-medium">{project.projectName}</span>
                              {project.description && (
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {project.description}
                                </span>
                              )}
                            </div>
                          </TableCell>

                          {/* LLM Type */}
                          <TableCell>
                            {project.llmType ? (
                              <Badge variant={getLLMBadgeVariant(project.llmType)} className="uppercase text-[10px] font-semibold">
                                {project.llmType}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </TableCell>

                          {/* API ID */}
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                                {project.notaifyApiKeyId
                                  ? project.notaifyApiKeyId.slice(0, 12) + '…'
                                  : '—'}
                              </code>
                              {project.notaifyApiKeyId && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                      onClick={() =>
                                        copyToClipboard(project.notaifyApiKeyId || '', `id-${project.project_id}`)
                                      }
                                    >
                                      {copiedId === `id-${project.project_id}` ? (
                                        <Check className="h-3 w-3 text-green-500" />
                                      ) : (
                                        <Copy className="h-3 w-3" />
                                      )}
                                      <span className="sr-only">Copy API ID</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{copiedId === `id-${project.project_id}` ? 'Copied!' : 'Copy API ID'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>

                          {/* API Key */}
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground max-w-[140px] truncate block">
                                {visibleKeys.has(project.project_id)
                                  ? project.notaifyApiKey || '—'
                                  : maskApiKey(project.notaifyApiKey || '')}
                              </code>
                              {project.notaifyApiKey && (
                                <div className="flex items-center gap-0.5">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                        onClick={() => toggleKeyVisibility(project.project_id)}
                                      >
                                        {visibleKeys.has(project.project_id) ? (
                                          <EyeOff className="h-3 w-3" />
                                        ) : (
                                          <Eye className="h-3 w-3" />
                                        )}
                                        <span className="sr-only">Toggle visibility</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{visibleKeys.has(project.project_id) ? 'Hide' : 'Show'} API Key</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                        onClick={() =>
                                          copyToClipboard(project.notaifyApiKey || '', `key-${project.project_id}`)
                                        }
                                      >
                                        {copiedId === `key-${project.project_id}` ? (
                                          <Check className="h-3 w-3 text-green-500" />
                                        ) : (
                                          <Copy className="h-3 w-3" />
                                        )}
                                        <span className="sr-only">Copy API Key</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{copiedId === `key-${project.project_id}` ? 'Copied!' : 'Copy API Key'}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                          </TableCell>

                          {/* Created Date */}
                          <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                            {formatDate(project.createdAt)}
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right pr-6">
                            <div className="flex items-center justify-end gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    asChild
                                  >
                                    <Link href={`/dashboard/addProject?id=${project.project_id}`}>
                                      <Edit2 className="h-4 w-4" />
                                      <span className="sr-only">Edit Project</span>
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Edit Project</p></TooltipContent>
                              </Tooltip>

                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete Project</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Delete Project</p></TooltipContent>
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}
