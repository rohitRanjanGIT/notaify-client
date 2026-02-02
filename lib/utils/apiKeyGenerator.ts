import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'notaify-secret-key-default';

/**
 * Generates a short, user-friendly API key
 * Format: nfy_XXXXXXXXXX (14-16 chars total)
 * @param projectId - The project ID to encode in the token
 * @param projectName - The project name
 * @returns Generated short API key
 */
export function generateApiKey(projectId: string, projectName: string): string {
    try {
        // Generate a random 10-character hex string
        // nfy_ (4) + 10 hex chars = 14 chars total
        const randomPart = crypto.randomBytes(5).toString('hex');
        const shortKey = `nfy_${randomPart}`;

        // The projectId and projectName would be stored in a database mapping
        // for verification purposes in production
        console.log(`Generated key for project ${projectName} (${projectId})`);

        return shortKey;
    } catch (error) {
        console.error('Failed to generate API key:', error);
        throw new Error('Failed to generate API key');
    }
}

/**
 * Verifies and decodes an API key
 * @param apiKey - The API key to verify
 * @returns Decoded payload or null if invalid
 */
export function verifyApiKey(apiKey: string): { projectId: string; projectName: string; type: string; iat: number } | null {
    try {
        const decoded = jwt.verify(apiKey, SECRET_KEY) as { projectId: string; projectName: string; type: string; iat: number };
        return decoded;
    } catch (error) {
        console.error('Failed to verify API key:', error);
        return null;
    }
}

/**
 * Masks an API key for display (shows first 4 and last 4 characters)
 * @param apiKey - The API key to mask
 * @returns Masked API key
 */
export function maskApiKey(apiKey: string): string {
    if (apiKey.length <= 10) {
        return '••••••••••';
    }
    return `${apiKey.substring(0, 4)}••••••${apiKey.substring(apiKey.length - 4)}`;
}

/**
 * Generates a display-friendly API key identifier
 * @param projectName - The project name
 * @returns API key identifier
 */
export function generateApiKeyId(projectName: string): string {
    const timestamp = Date.now().toString().slice(-6);
    const cleaned = projectName.replace(/[^a-z0-9]/gi, '').slice(0, 8);
    return `nfy_${cleaned.toLowerCase()}_${timestamp}`;
}
