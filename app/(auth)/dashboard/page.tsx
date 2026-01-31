'use client';

import { useState, useEffect } from 'react';
import { ProjectConfig } from '@/lib/types/types';
import ProjectCard from '@/lib/components/dashboard/project-card';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects from localStorage (for now)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('projectConfigs');
      if (stored) {
        setProjects(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (updatedProjects: ProjectConfig[]) => {
    try {
      localStorage.setItem('projectConfigs', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (err) {
      console.error('Error saving projects:', err);
      setError('Failed to save projects');
    }
  };

  const handleDeleteProject = (id: string) => {
    saveProjects(projects.filter((p) => p.id !== id));
  };

  const handleUpdateProject = (updated: ProjectConfig) => {
    saveProjects(projects.map((project) => (project.id === updated.id ? updated : project)));
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
              Manage all your projects in one place
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

        {/* Projects Grid */}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
                onUpdate={handleUpdateProject}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
 