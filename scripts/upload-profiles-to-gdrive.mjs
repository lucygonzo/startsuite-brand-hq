#!/usr/bin/env node
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { Readable } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(process.env.HOME, 'Downloads', 'client_secret_683314262148-ibt0mi5meoi057tffl984v9k338cpmm1.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '..', '.gdrive-token.json');
const PROFILES_DIR = path.join(__dirname, '..', 'vault', '07-Competitive', 'profiles');
const URL_MAP_PATH = path.join(PROFILES_DIR, '_gdrive-urls.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const DELAY_MS = 2500;
const PROFILES_FOLDER_ID = '1YBOCsS2tK4dRZpG4n6c-GVrSTmqH_XOO';

function openBrowser(url) { exec('open "' + url + '"'); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getAuthClient() {
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = creds.installed;
  const server = http.createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const redirectUri = 'http://localhost:' + port;
  server.close();
  const oauth2 = new google.auth.OAuth2(client_id, client_secret, redirectUri);
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oauth2.setCredentials(token);
    try {
      await google.drive({ version: 'v3', auth: oauth2 }).about.get({ fields: 'user' });
      return oauth2;
    } catch { /* re-auth */ }
  }
  const authUrl = oauth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES, prompt: 'consent', redirect_uri: redirectUri });
  const code = await new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:' + port);
      const c = url.searchParams.get('code');
      if (c) { res.end('Done!'); srv.close(); resolve(c); }
      else { res.end('Waiting...'); }
    });
    srv.listen(port, () => { openBrowser(authUrl); });
  });
  const { tokens } = await oauth2.getToken({ code, redirect_uri: redirectUri });
  oauth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  return oauth2;
}

async function main() {
  console.log('Authenticating...');
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  let urlMap = {};
  if (fs.existsSync(URL_MAP_PATH)) {
    urlMap = JSON.parse(fs.readFileSync(URL_MAP_PATH, 'utf-8'));
  }

  const files = fs.readdirSync(PROFILES_DIR).filter(f => f.endsWith('.md')).sort();
  const remaining = files.filter(f => !urlMap[f.replace('.md', '')]);
  console.log(remaining.length + ' profiles to upload (' + Object.keys(urlMap).length + ' already done)...');

  for (const file of remaining) {
    const name = file.replace('.md', '');
    const content = fs.readFileSync(path.join(PROFILES_DIR, file), 'utf-8');
    try {
      const res = await drive.files.create({
        requestBody: { name, mimeType: 'application/vnd.google-apps.document', parents: [PROFILES_FOLDER_ID] },
        media: { mimeType: 'text/plain', body: Readable.from(content) },
        fields: 'id, name, webViewLink',
      });
      urlMap[name] = res.data.webViewLink;
      console.log('  OK ' + name + ' -> ' + res.data.webViewLink);
      fs.writeFileSync(URL_MAP_PATH, JSON.stringify(urlMap, null, 2));
      await sleep(DELAY_MS);
    } catch (e) {
      console.log('  Rate limited on ' + name + ', waiting 30s...');
      await sleep(30000);
      try {
        const res = await drive.files.create({
          requestBody: { name, mimeType: 'application/vnd.google-apps.document', parents: [PROFILES_FOLDER_ID] },
          media: { mimeType: 'text/plain', body: Readable.from(content) },
          fields: 'id, name, webViewLink',
        });
        urlMap[name] = res.data.webViewLink;
        console.log('  OK (retry) ' + name + ' -> ' + res.data.webViewLink);
        fs.writeFileSync(URL_MAP_PATH, JSON.stringify(urlMap, null, 2));
        await sleep(DELAY_MS);
      } catch (e2) {
        console.log('  FAILED: ' + name + ' - ' + e2.message);
      }
    }
  }

  console.log('Done! ' + Object.keys(urlMap).length + ' total profiles in GDrive.');
}

main().catch(console.error);
