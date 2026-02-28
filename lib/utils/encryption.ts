import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;    // 128-bit IV for GCM
const AUTH_TAG_LENGTH = 16;

/**
 * Get the encryption key from the environment variable.
 * Must be a 32-byte (64 hex character) key.
 */
function getKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_KEY environment variable is not set. Cannot encrypt/decrypt credentials.');
    }
    // The key must be exactly 32 bytes (64 hex characters) for AES-256
    return Buffer.from(key, 'hex');
}

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Returns a string in the format: iv:authTag:ciphertext (all hex-encoded).
 */
export function encrypt(plaintext: string): string {
    const key = getKey();
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    // Format: iv:authTag:ciphertext
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an encrypted string (iv:authTag:ciphertext format) using AES-256-GCM.
 * Returns the original plaintext string.
 */
export function decrypt(encryptedText: string): string {
    const key = getKey();
    const parts = encryptedText.split(':');

    if (parts.length !== 3) {
        // If the value doesn't match the encrypted format, return it as-is.
        // This handles backward compatibility with pre-encryption data.
        return encryptedText;
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const ciphertext = parts[2];

    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch {
        // If decryption fails (e.g., data is not actually encrypted), return as-is
        // This ensures backward compatibility for existing unencrypted data
        return encryptedText;
    }
}

/**
 * Encrypts a value only if it's non-null and non-empty.
 */
export function encryptIfPresent(value: string | null | undefined): string | null {
    if (!value) return null;
    return encrypt(value);
}

/**
 * Decrypts a value only if it's non-null and non-empty.
 */
export function decryptIfPresent(value: string | null | undefined): string | null {
    if (!value) return null;
    return decrypt(value);
}

// Sensitive fields on the Project model that require encryption
export const SENSITIVE_FIELDS = ['llmApiKey', 'smtpPass', 'notaifyApiKey'] as const;

/**
 * Encrypts all sensitive fields on a project data object before saving to DB.
 */
export function encryptProjectSecrets(data: Record<string, unknown>): Record<string, unknown> {
    const encrypted = { ...data };
    for (const field of SENSITIVE_FIELDS) {
        if (typeof encrypted[field] === 'string' && encrypted[field]) {
            encrypted[field] = encrypt(encrypted[field] as string);
        }
    }
    return encrypted;
}

/**
 * Decrypts all sensitive fields on a project object read from DB.
 */
export function decryptProjectSecrets<T extends Record<string, unknown>>(project: T): T {
    const decrypted = { ...project } as Record<string, unknown>;
    for (const field of SENSITIVE_FIELDS) {
        if (typeof decrypted[field] === 'string' && decrypted[field]) {
            decrypted[field] = decrypt(decrypted[field] as string);
        }
    }
    return decrypted as T;
}

/**
 * Finds a project by Notaify API credentials.
 * Looks up by apiKeyId (unencrypted), then decrypts the stored notaifyApiKey
 * and compares it with the provided apiKey.
 * Returns the project with ALL sensitive fields decrypted, or null if not found.
 */
export async function findProjectByApiCredentials(
    apiKeyId: string,
    apiKey: string
) {
    // Dynamic import to avoid circular dependencies
    const { prisma } = await import('@/lib/prisma/prisma');

    // apiKeyId is NOT encrypted, so we can query on it directly
    const projects = await prisma.project.findMany({
        where: { notaifyApiKeyId: apiKeyId },
    });

    for (const project of projects) {
        const decryptedApiKey = decryptIfPresent(project.notaifyApiKey);
        if (decryptedApiKey === apiKey) {
            // Return project with all secrets decrypted
            return decryptProjectSecrets(project as unknown as Record<string, unknown>);
        }
    }

    return null;
}

