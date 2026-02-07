import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDir = path.join(process.cwd(), 'content');

// Validation Schemas
const LessonSchema = z.object({
    slug: z.string(),
    title: z.string(),
    area: z.string(),
    module: z.string(),
    order: z.number(),
    duration_minutes: z.number(),
    // ... add more as needed
});

async function validate() {
    console.log("🔍 Validating content...");
    let errors = 0;

    // 1. Validate Areas
    const areasPath = path.join(contentDir, 'areas.json');
    if (!fs.existsSync(areasPath)) {
        console.error("❌ Missing content/areas.json");
        errors++;
    }

    // 2. Validate Glossary
    const glossaryPath = path.join(contentDir, 'glossary/terms.json');
    if (!fs.existsSync(glossaryPath)) {
        console.error("❌ Missing content/glossary/terms.json");
        errors++;
    }

    // 3. Recursive walk for MDX
    // Simple version: just finding MDX and checking frontmatter
    function walkDir(dir: string) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.mdx')) {
                const content = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(content);
                const result = LessonSchema.safeParse(data);
                if (!result.success) {
                    console.error(`❌ Invalid frontmatter in ${file}:`, result.error.format());
                    errors++;
                }
            }
        }
    }

    walkDir(contentDir);

    if (errors === 0) {
        console.log("✅ All content is valid!");
    } else {
        console.error(`Found ${errors} errors.`);
        process.exit(1);
    }
}

validate();
