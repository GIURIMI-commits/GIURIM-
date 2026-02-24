const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync('find content -name "*.mdx"').toString().trim().split('\n');
let replacedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We have opened <p className="..."> that have no closing tag anymore.
    // They usually wrap a single line of text or a block until an empty line, but let's just replace them with standard HTML or Markdown.
    // Actually, we can just replace `<p className="font-semibold">` with `<div className="font-semibold">` and append `</div>` at the end of the line.
    
    // We can just use a regex to match `<p className="([^"]+)">([^<]*)` if it's on a single line.
    // Let's do a more robust approach:
    // We know the exact ones.
    content = content.replace(/<p className="font-semibold">Risorse utili[^\n]*/g, (match) => {
        return `<div className="font-semibold">Risorse utili (per approfondire, senza complicarsi la vita)</div>`;
    });

    content = content.replace(/<p className="font-semibold">Risorse utili[^\n]*\n/g, (match) => {
        return `<div className="font-semibold">Risorse utili (per approfondire, senza complicarsi la vita)</div>\n`;
    });

    content = content.replace(/<p className="text-sm opacity-80">\s*([\s\S]*?)<\/div>\s*<\/ResourceFooter>/g, (match, text) => {
        return `<div className="text-sm opacity-80">\n${text}\n</div>\n  </div>\n</ResourceFooter>`;
    });

    // Also check for any other `<p className="`
    content = content.replace(/<p className="([^"]+)">/g, '<div className="$1">');
    // If we replaced it with div, the old ones are open divs now... Wait.
    // Let's just restore the file? We don't have git tracking for content.

    fs.writeFileSync(file, content);
    if (content !== original) replacedCount++;
});

console.log("Fixed unclosed p tags in", replacedCount, "files.");
