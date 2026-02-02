'use client';

import { ProjectConfig } from '@/lib/types/types';
import Link from 'next/link';
import { KeyRound, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  project: ProjectConfig;
  onDelete?: (id: string) => void;
  onUpdate?: (project: ProjectConfig) => void;
}

function generateNotaifyApiKey() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `notaify_${crypto.randomUUID().replace(/-/g, '')}`;
  }
  return `notaify_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export default function ProjectCard({ project, onDelete, onUpdate }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project.projectName}"?`)) {
      setIsDeleting(true);
      onDelete?.(project.project_id);
    }
  };

  const handleGenerateApiKey = () => {
    setIsGeneratingKey(true);
    const newKey = generateNotaifyApiKey();
    onUpdate?.({
      ...project,
      notaifyApiKey: newKey,
      updatedAt: new Date(),
    });
    setIsGeneratingKey(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href={`/dashboard/addProject?id=${project.project_id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              {project.projectName}
            </h3>
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              href={`/dashboard/addProject?id=${project.project_id}`}
              className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Config
            </Link>
            <button
              type="button"
              onClick={handleGenerateApiKey}
              disabled={isGeneratingKey}
              className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {project.notaifyApiKey ? 'Regenerate API Key' : 'Create API Key'}
            </button>
          </div>
          {project.notaifyApiKey && (
            <div className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              Notaify API Key: {project.notaifyApiKey}
            </div>
          )}
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:opacity-50 dark:hover:bg-gray-800"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
        Created {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : '—'}
      </div>
    </div>
  );
}
