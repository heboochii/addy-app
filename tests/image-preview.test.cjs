const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('server/api.mjs','utf8').replace('export function createApi','function createApi');
async function test(html,url='https://visitabudhabi.ae/example',opts={}){let calls=[];const context={URL,Response,AbortController,TextDecoder,setTimeout,clearTimeout,Date,fetch:async(u,o)=>{calls.push(u);return opts.fetch?opts.fetch(u,o):new Response(html,{headers:{'content-type':'text/html'}})}};vm.createContext(context);vm.runInContext(source+';globalThis.testPreview=previewImage;',context);const out=await context.testPreview(url);return {out,calls,context};}
(async()=>{
assert.equal((await test('<meta property = "og:image" content="/photo.webp">')).out,'https://visitabudhabi.ae/photo.webp');
assert.equal((await test("<meta content='https://cdn.example.org/real.webp?a=1&amp;b=2' name='twitter:image'>")).out,'https://cdn.example.org/real.webp?a=1&b=2');
assert.equal((await test('<meta property=og:image content=https://images.example.org/a.webp>')).out,'https://images.example.org/a.webp');
for(const bad of ['https://127.0.0.1/a','https://[::1]/a','https://172.16.0.1/a','https://user:password@images.example.org/a','http://images.example.org/a','https://foo.internal/a','https://images.example.org:8080/a'])assert.equal((await test('<meta property="og:image" content="'+bad+'">')).out,'',bad);
assert.equal((await test('<meta property="og:image" content="https://images.example.org/a">','https://unapproved.example.org/')).calls.length,0);
const red=await test('',undefined,{fetch:(u)=>u.endsWith('/example')?new Response(null,{status:302,headers:{location:'https://www.visitabudhabi.ae/final'}}):new Response('<meta property="og:image" content="/final.webp">',{headers:{'content-type':'text/html'}})});assert.equal(red.out,'https://www.visitabudhabi.ae/final.webp');
const blocked=await test('',undefined,{fetch:()=>new Response(null,{status:302,headers:{location:'https://127.0.0.1/private'}})});assert.equal(blocked.calls.length,1);assert.equal(blocked.out,'');
const cached=await test('<meta property="og:image" content="/cached.webp">');await cached.context.testPreview('https://visitabudhabi.ae/example');assert.equal(cached.calls.length,1);
assert.equal((await test('',undefined,{fetch:()=>new Response('image',{headers:{'content-type':'image/png'}})})).out,'');
console.log('PASS: image metadata parsing, relative URLs, Twitter fallback, safe redirects, unsafe-host rejection, MIME and cache tests.');
})().catch(e=>{console.error(e);process.exit(1)});
