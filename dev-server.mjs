import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                
                if (req.url === '/api/save-article') {
                    const { id, title, isEdit } = data;
                    console.log(`Received ${isEdit ? 'edit' : 'publish'} request for: ${title}`);
                    await updateScriptData(id, data);
                    await updateIndexHtml(id, data, isEdit);
                } else if (req.url === '/api/delete-article') {
                    const { id } = data;
                    console.log(`Received delete request for: ${id}`);
                    await deleteArticleData(id);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Source code updated successfully' }));
            } catch (error) {
                console.error('Error updating files:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
    } else {
        // Simple static file serving for convenience (optional but helpful)
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        const extname = path.extname(filePath);
        let contentType = 'text/html';
        
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

async function updateScriptData(id, article) {
    const scriptPath = path.join(__dirname, 'script.js');
    let content = fs.readFileSync(scriptPath, 'utf8');

    // Find the articlesData object
    const startRegex = /const\s+articlesData\s*=\s*\{/;
    const match = content.match(startRegex);

    if (match) {
        const startIndex = match.index + match[0].length;
        
        // Prepare the article snippet
        const articleSnippet = `
    '${id}': {
        title: '${article.title.replace(/'/g, "\\'")}',
        meta: '${article.meta}',
        images: ${JSON.stringify(article.images, null, 12).replace(/\]$/, '        ]')},
        body: \`${article.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`
    },`;

        if (article.isEdit && content.includes(`'${id}': {`)) {
            // Replace existing entry
            const entryRegex = new RegExp(`'${id}': \\{[\\s\\S]*?\\},`, 'm');
            content = content.replace(entryRegex, articleSnippet);
        } else {
            // Add new entry at the top of the object
            content = content.slice(0, startIndex) + articleSnippet + content.slice(startIndex);
        }

        fs.writeFileSync(scriptPath, content, 'utf8');
    }
}

async function updateIndexHtml(id, article, isEdit) {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');

    const firstImage = article.images[0] || '';
    const moreImages = article.images.length > 1 ? `<div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">+${article.images.length - 1} More</div>` : '';
    const introText = article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + (article.content.length > 150 ? '...' : '');

    const articleHtml = `
                    <article class="article-card animate-up" id="card-${article.id}" onclick="openArticle('${article.id}')">
                        <div class="article-image">
                            <img src="${firstImage}" alt="${article.title}">
                            ${moreImages}
                        </div>
                        <div class="article-info">
                            <span class="article-meta">${article.meta}</span>
                            <h3>${article.title}</h3>
                            <p>${introText}</p>
                            <a href="javascript:void(0)" class="read-more-btn">Read More →</a>
                            <div class="admin-actions">
                                <button class="edit-article-btn" onclick="event.stopPropagation(); initEdit('${article.id}')">Edit</button>
                                <button class="delete-article-btn" onclick="event.stopPropagation(); initDelete('${article.id}')">Delete</button>
                            </div>
                        </div>
                    </article>`;

    if (isEdit) {
        // Try to replace existing static card or dynamic card structure
        const cardRegex = new RegExp(`<article[^>]*?['"]${article.id}['"][\\s\\S]*?</article>`, 'm');
        if (content.match(cardRegex)) {
            content = content.replace(cardRegex, articleHtml.trim());
        }
    } else {
        // Insert at the beginning of news-grid
        const gridRegex = /<div\s+class=["'][^"']*news-grid[^"']*["']\s*>/;
        const match = content.match(gridRegex);
        if (match) {
            const insertIndex = match.index + match[0].length;
            content = content.slice(0, insertIndex) + articleHtml + content.slice(insertIndex);
        } else {
            console.error('Could not find news-grid in index.html');
        }
    }

    fs.writeFileSync(indexPath, content, 'utf8');
}

async function deleteArticleData(id) {
    const scriptPath = path.join(__dirname, 'script.js');
    const indexPath = path.join(__dirname, 'index.html');

    // Remove from script.js
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const entryRegex = new RegExp(`'${id}': \\{[\\s\\S]*?\\},`, 'm');
    scriptContent = scriptContent.replace(entryRegex, '');
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');

    // Remove from index.html
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    const cardRegex = new RegExp(`<article[^>]*?['"]${id}['"][\\s\\S]*?</article>`, 'm');
    indexContent = indexContent.replace(cardRegex, '');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
}

server.listen(PORT, () => {
    console.log(`
🚀 SINAG Dev Server Started!
----------------------------
Local access: http://localhost:${PORT}
The server is ready to persist your article changes directly to your source code.
    `);
});
