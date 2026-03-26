#!/usr/bin/env node
/**
 * Upload StartSuite vault markdown files to Google Drive as Google Docs.
 *
 * Usage:
 *   node scripts/upload-vault-to-gdrive.mjs
 *
 * First run will open a browser for OAuth consent. Token is cached for future runs.
 * Uses Desktop OAuth client with loopback redirect (http://localhost:PORT).
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { Readable } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VAULT_DIR = path.join(__dirname, '..', 'vault');
const CREDENTIALS_PATH = path.join(process.env.HOME, 'Downloads', 'client_secret_683314262148-ibt0mi5meoi057tffl984v9k338cpmm1.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', '.gdrive-token.json');

// GDrive folder ID mapping (existing folders)
const FOLDER_MAP = {
  '00-Overview': '1wHK73FAjSU3SKAhVxaUP3D9EoUXGyy5-',
  '01-Identity': '1JiZ0gipFOH2qi3CKoGPBtHXyZOXWs1b6',
  '02-Company': '1MwIgn5kx0B9IuGHnQmeeLZhWcz_Scj75',
  '03-Visual': '17m5r9nRRH7y0GelFGiZnVHoMJah23H2_',
  '04-Verbal': '1X4n-R7pB6txoWSKM6I32hBcjeA-1T287',
  '05-Services': '1MUX8aUXDMsIlyGE88_g_devHk0BXB2PJ',
  '06-Audience': '1B_bVJUwEral2G410BOkl7X46jOYMkt9l',
  '07-Competitive': '1f5LJK4PB4Fi0rZIiSFKLrSvRZ1VGR9-C',
  '08-Digital': '1WlUOd_b6C8ecfpA6cR03hS7AiwFZqYNf',
  '09-Go-to-Market': '1bgSwfDYeCbPeabaZk3wn8BR0TIoG3aWB',
  '10-Journey': '1Wlk1wnG4QPu04icSNz6QedxZaMXpa_oD',
  '11-Product': '17OhWVjYNg1l5egoZb6CrBwYHEcGiGpbR',
  '12-Portfolio': '1F4U0KOvJ7E-DypocJxIoy-ULIhbegYJp',
  '13-Workspace': '1aYqK95QCb7LzwSc8ho55P78p2JfkZ48V',
  'Assets': '1OhS-CSvaohhK2vaxIId9ATnF-0Lhb8D_',
};

const ROOT_FOLDER_ID = '1IyOSPmn9INr1aQUxjfOL6WU3FQ0kjUXI';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

function openBrowser(url) {
  exec(`open "${url}"`);
}

/**
 * Desktop OAuth: start a local HTTP server on a random port,
 * use http://localhost:PORT as the redirect_uri (Google allows this for Desktop clients),
 * open the consent screen, and wait for the code callback.
 */
async function getAuthClient() {
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = creds.installed;

  // For Desktop clients, Google allows loopback redirects on any port.
  // We start a server first to get the actual port, then build the redirect URI.
  const server = http.createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const redirectUri = `http://localhost:${port}`;
  server.close();

  const oauth2 = new google.auth.OAuth2(client_id, client_secret, redirectUri);

  // Check cached token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oauth2.setCredentials(token);
    try {
      await google.drive({ version: 'v3', auth: oauth2 }).about.get({ fields: 'user' });
      console.log('  Using cached token.');
      return oauth2;
    } catch {
      console.log('  Cached token expired, re-authenticating...');
      fs.unlinkSync(TOKEN_PATH);
    }
  }

  // Start server to receive callback
  const tokens = await new Promise((resolve, reject) => {
    const callbackServer = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url, redirectUri);
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h1>❌ Authorization denied: ${error}</h1>`);
          callbackServer.close();
          reject(new Error(`Auth error: ${error}`));
          return;
        }

        if (code) {
          const { tokens } = await oauth2.getToken({ code, redirect_uri: redirectUri });
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>✅ Authorized! You can close this tab and return to the terminal.</h1>');
          callbackServer.close();
          resolve(tokens);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<p>Waiting for authorization...</p>');
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Error: ${err.message}</h1>`);
        callbackServer.close();
        reject(err);
      }
    });

    callbackServer.listen(port, () => {
      const authUrl = oauth2.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
        redirect_uri: redirectUri,
      });
      console.log(`  Local server on port ${port}`);
      console.log('  Opening browser for authorization...');
      console.log(`  If browser doesn't open, visit: ${authUrl}`);
      openBrowser(authUrl);
    });

    callbackServer.on('error', reject);
  });

  oauth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('  Token cached successfully.');
  return oauth2;
}

async function createFolder(drive, name, parentId) {
  const res = await drive.files.create({
    requestBody: { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] },
    fields: 'id, name',
  });
  console.log(`  📁 Created folder: ${name} (${res.data.id})`);
  return res.data.id;
}

async function uploadMarkdownAsDoc(drive, filePath, folderId) {
  const fileName = path.basename(filePath, '.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: 'application/vnd.google-apps.document',
      parents: [folderId],
    },
    media: {
      mimeType: 'text/plain',
      body: Readable.from([content]),
    },
    fields: 'id, name, webViewLink',
  });

  console.log(`  ✅ ${fileName} → ${res.data.webViewLink}`);
  return res.data;
}

async function main() {
  console.log('🔐 Authenticating with Google Drive...\n');
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  console.log('\n📂 Creating new folders for new tabs...');
  const newFolders = ['14-Gap-Analysis', '15-Revenue-Model', '16-Decision-Log', '17-Report-Card', '_Prompts', '_Weekly-Research'];
  for (const name of newFolders) {
    FOLDER_MAP[name] = await createFolder(drive, name, ROOT_FOLDER_ID);
  }

  console.log('\n📤 Uploading vault files...');
  let uploaded = 0, errors = 0;

  for (const [dirName, folderId] of Object.entries(FOLDER_MAP)) {
    const dirPath = path.join(VAULT_DIR, dirName);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    if (!files.length) continue;

    console.log(`\n📁 ${dirName} (${files.length} files)`);
    for (const file of files) {
      try {
        await uploadMarkdownAsDoc(drive, path.join(dirPath, file), folderId);
        uploaded++;
      } catch (err) {
        console.error(`  ❌ Failed: ${file} — ${err.message}`);
        errors++;
      }
    }
  }

  // Root-level files
  console.log('\n📁 Root-level files');
  for (const file of ['MASTER_CHECKLIST.md']) {
    const fp = path.join(VAULT_DIR, file);
    if (fs.existsSync(fp)) {
      try { await uploadMarkdownAsDoc(drive, fp, ROOT_FOLDER_ID); uploaded++; }
      catch (err) { console.error(`  ❌ Failed: ${file} — ${err.message}`); errors++; }
    }
  }

  console.log(`\n✨ Done! ${uploaded} files uploaded, ${errors} errors.`);
}

main().catch(console.error);
