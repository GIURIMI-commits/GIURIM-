const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all mdx files
const files = execSync('find content -name "*.mdx"').toString().trim().split('\n');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace <section className="..."> with nothing
    content = content.replace(/<section className="[^"]+">\n/g, '\n');
    content = content.replace(/<\/section>\n?/g, '\n');

    // Replace the space-y-2 and h2 block with SectionTitle
    // Case 1: with a number step like "1) Title"
    content = content.replace(
        /<div className="space-y-2">\s*<h2 className="text-xl font-semibold">(\d+)\)\s*(.*?)<\/h2>([\s\S]*?)<\/div>/g,
        (match, step, title, innerContent) => {
            return `<SectionTitle step={${step}} title="${title}" />\n\n${innerContent.trim()}\n`;
        }
    );

    // Case 2: without step
    content = content.replace(
        /<div className="space-y-2">\s*<h2 className="text-xl font-semibold">(?!.*?\)\s*)(.*?)<\/h2>([\s\S]*?)<\/div>/g,
        (match, title, innerContent) => {
            return `<SectionTitle title="${title}" />\n\n${innerContent.trim()}\n`;
        }
    );

    // Also remove the manual <ul> and <li> from ResourceFooter to avoid nesting issues
    content = content.replace(/<ul className="[^"]+">/g, '\n\n');
    content = content.replace(/<\/ul>/g, '\n\n');
    content = content.replace(/<li>/g, '- ');
    content = content.replace(/<\/li>/g, '');

    fs.writeFileSync(file, content);
});

console.log("Replaced h2 and sections with SectionTitle in " + files.length + " files.");
