import test from 'node:test';
import assert from 'node:assert/strict';
import {handleIdeas} from '../lib/ai.mjs';
const event={name:'Birthday',type:'Birthday',date:'2027-01-15',location:'Kochi',budget:25000,guests:30,preferences:''};
test('missing credentials are an explicit error, never fake AI',async()=>{assert.equal((await handleIdeas({event,mode:'ideas'})).status,503);});
test('rejects malformed input before making network requests',async()=>{const r=await handleIdeas({event:{...event,budget:-1},mode:'ideas'},{key:'test',fetcher:()=>{throw Error('must not call');}});assert.equal(r.status,400);});
test('validates response and keeps credential server-side',async()=>{let sent;const ideas=Array.from({length:3},(_,i)=>({title:'Idea '+i,description:'Description',category:'Theme'}));const r=await handleIdeas({event,mode:'ideas'},{key:'test-only',client:'a',fetcher:async(url,options)=>{sent=JSON.parse(options.body);return {ok:true,json:async()=>({output:[{content:[{type:'output_text',text:JSON.stringify({ideas})}]}]})};}});assert.equal(r.status,200);assert.equal(r.body.ideas.length,3);assert.equal(sent.store,false);assert.equal(sent.text.format.strict,true);assert.ok(!JSON.stringify(r).includes('test-only'));});
test('upstream errors do not expose secrets or upstream body',async()=>{const r=await handleIdeas({event,mode:'ideas'},{key:'test-secret',client:'b',fetcher:async()=>({ok:false})});assert.equal(r.status,502);assert.ok(!JSON.stringify(r).includes('test-secret'));});
test('malformed model output cannot become a successful answer',async()=>{const r=await handleIdeas({event,mode:'ideas'},{key:'test',client:'c',fetcher:async()=>({ok:true,json:async()=>({output:[{content:[{type:'output_text',text:'{"ideas":[]}'}]}]})})});assert.equal(r.status,502);});
