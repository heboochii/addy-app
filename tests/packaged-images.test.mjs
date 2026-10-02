import worker from '../dist/server/index.js';
import fs from 'node:fs';
for(const name of fs.readdirSync('web/assets').filter(n=>n.endsWith('.webp'))){const response=await worker.fetch(new Request('https://addy.test/assets/'+name),{});const bytes=new Uint8Array(await response.arrayBuffer());if(response.status!==200||!response.headers.get('content-type')?.includes('image/webp')||String.fromCharCode(...bytes.slice(0,4))!=='RIFF'||String.fromCharCode(...bytes.slice(8,12))!=='WEBP')throw new Error('Invalid bundled image '+name);}
console.log('PASS: every bundled WebP is served as an image with valid bytes.');
