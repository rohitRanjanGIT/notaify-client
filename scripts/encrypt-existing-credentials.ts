/**
 * Migration Script: Encrypt existing project credentials in the database.
 * 
 * Run this ONCE after deploying the encryption feature to encrypt
 * any pre-existing plaintext credentials stored in the database.
 * 
 * Usage: npx tsx scripts/encrypt-existing-credentials.ts
 */

import 'dotenv/config';

async function main() {
    // Dynamic imports to work with the project's module system
    const { prisma } = await import('../lib/prisma/prisma');
    const { encrypt, decrypt } = await import('../lib/utils/encryption');

    console.log('🔐 Starting credential encryption migration...\n');

    const projects = await prisma.project.findMany();
    console.log(`Found ${projects.length} project(s) to process.\n`);

    let updated = 0;
    let skipped = 0;

    for (const project of projects) {
        const fieldsToEncrypt: { field: string; value: string | null }[] = [
            { field: 'llmApiKey', value: project.llmApiKey },
            { field: 'smtpPass', value: project.smtpPass },
            { field: 'notaifyApiKey', value: project.notaifyApiKey },
        ];

        const updateData: Record<string, string> = {};
        let needsUpdate = false;

        for (const { field, value } of fieldsToEncrypt) {
            if (!value) continue;

            // Check if the value is already encrypted (format: iv:authTag:ciphertext)
            const parts = value.split(':');
            if (parts.length === 3) {
                // Try to decrypt - if it works, it's already encrypted
                try {
                    decrypt(value);
                    console.log(`  [${project.projectName}] ${field}: Already encrypted, skipping.`);
                    continue;
                } catch {
                    // Not encrypted, proceed to encrypt
                }
            }

            // Encrypt the plaintext value
            updateData[field] = encrypt(value);
            needsUpdate = true;
            console.log(`  [${project.projectName}] ${field}: Encrypting...`);
        }

        if (needsUpdate) {
            await prisma.project.update({
                where: { id: project.id },
                data: updateData,
            });
            updated++;
            console.log(`  ✅ ${project.projectName} — updated.\n`);
        } else {
            skipped++;
            console.log(`  ⏭️  ${project.projectName} — no changes needed.\n`);
        }
    }

    console.log(`\n🎉 Migration complete! Updated: ${updated}, Skipped: ${skipped}`);
    process.exit(0);
}

main().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
});
