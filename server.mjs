import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateEvent} from './lib/planner.mjs';
import {handleIdeas} from './lib/ai.mjs';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Frame-Options','DENY');
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/ideas'){
  res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');
  if(req.method==='GET'){res.end(JSON.stringify({configured:Boolean(process.env.OPENAI_API_KEY)}));return;}
  if(req.method!=='POST'){res.writeHead(405);res.end(JSON.stringify({error:'Method not allowed.'}));return;}
  const origin=req.headers.origin;
  let allowedOrigin=true;try{allowedOrigin=!origin||new URL(origin).host===req.headers.host;}catch{allowedOrigin=false;}
  if(!allowedOrigin){res.writeHead(403);res.end(JSON.stringify({error:'Request origin not allowed.'}));return;}
  if(!req.headers['content-type']?.includes('application/json')){res.writeHead(415);res.end(JSON.stringify({error:'JSON required.'}));return;}
  let raw='';try{for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>12000){res.writeHead(413);res.end(JSON.stringify({error:'Request too large.'}));return;}}const body=JSON.parse(raw);validateEvent(body.event);const result=await handleIdeas(body,{key:process.env.OPENAI_API_KEY,model:process.env.OPENAI_MODEL||'gpt-4.1-mini',client:req.socket.remoteAddress});res.writeHead(result.status);res.end(JSON.stringify(result.body));}catch{res.writeHead(400);res.end(JSON.stringify({error:'Invalid request. Check your event details.'}));}return;
 }
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const files={'/':'index.html','/index.html':'index.html','/app.mjs':'app.mjs','/style.css':'style.css','/planner.mjs':'planner.mjs'};
 const file=files[url.pathname];if(!file){res.writeHead(404);res.end('Not found');return;}
 try{const content=await readFile(path.join(root,file));res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'");res.writeHead(200);res.end(req.method==='HEAD'?undefined:content);}catch{res.writeHead(500);res.end('Application unavailable');}
});
server.listen(Number(process.env.PORT)||4173,process.env.HOST||'127.0.0.1',()=>console.log('Gatherly running at http://'+(process.env.HOST||'127.0.0.1')+':'+server.address().port));
