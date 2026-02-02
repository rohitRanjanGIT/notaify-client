'use client';

import { useState } from 'react';
import { Copy, RefreshCw, X, Check } from 'lucide-react';
import { maskApiKey } from '@/lib/utils/apiKeyGenerator';

interface ApiKeyDialogProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  onApiKeyGenerated: (apiKey: string, apiKeyId: string) => void;
}

export default function ApiKeyDialog({
  projectId,
  projectName,
  isOpen,
  onClose,
  onApiKeyGenerated,
}: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyId, setApiKeyId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullKey, setShowFullKey] = useState(false);

  const handleGenerateApiKey = async () => {
    setIsLoading(true);
    try {
      console.log('Generating API key for:', { projectId, projectName });
      
      const response = await fetch('/api/generateApiKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          projectName,
        }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error response:', errorData);
        throw new Error(errorData.error || 'Failed to generate API key');
      }

      const data = await response.json();
      console.log('API Key generated successfully');
      const newApiKey = data.apiKey;
      const keyId = data.apiKeyId;
      setApiKey(newApiKey);
      setApiKeyId(keyId);
      onApiKeyGenerated(newApiKey, keyId);
    } catch (error) {
      console.error('Failed to generate API key:', error);
      alert('Failed to generate API key. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyApiKey = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy API key:', error);
        alert('Failed to copy API key to clipboard');
      }
    }
  };

  const handleRegenerate = () => {
    if (window.confirm('Regenerating the API key will invalidate the previous one. Continue?')) {
      setApiKey(null);
      setApiKeyId('');
      setShowFullKey(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            🔑 Generate API Key
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Project Info */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-gray-600 dark:text-gray-400">Project Name</p>
            <p className="font-semibold text-gray-900 dark:text-white">{projectName}</p>
          </div>

          {/* API Key Display */}
          {apiKey ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key ID
                </label>
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                  {apiKeyId}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secret Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowFullKey(!showFullKey)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {showFullKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                  {showFullKey ? apiKey : maskApiKey(apiKey)}
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyApiKey}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Secret Key
                  </>
                )}
              </button>

              {/* Regenerate Button */}
              <button
                onClick={handleRegenerate}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate Key
              </button>

              {/* Info Box */}
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 border border-amber-200 dark:border-amber-900">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Important:</strong> Save this key securely. You won&apos;t be able to see it again!
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click the button below to generate a new API key for this project.
              </p>
              <button
                onClick={handleGenerateApiKey}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Generate API Key
                  </>
                )}
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
