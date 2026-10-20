import test from 'node:test';
import assert from 'node:assert/strict';
import {allocateBudget,buildPlan,validateEvent,dateOffset} from '../lib/planner.mjs';
const event={name:'Garden wedding',type:'Wedding',date:'2027-01-15',location:'Kochi',budget:500003,guests:150,preferences:'Vegetarian'};
test('allocations preserve every rupee, including rounding and small amounts',()=>{for(const n of [0,1,1001,500003,100000000]){const a=allocateBudget(n,[25,35,12,8,10,10]);assert.equal(a.reduce((a,b)=>a+b,0),n);assert.ok(a.every(x=>x>=0&&Number.isInteger(x)));}});
test('each event type produces complete plan with contingency',()=>{for(const type of ['Wedding','Birthday','Community']){const p=buildPlan({...event,type},'2026-10-20');assert.equal(p.budget.reduce((a,b)=>a+b.amount,0),event.budget);assert.equal(p.tasks.length,8);assert.equal(p.vendors.length,5);assert.equal(p.budget[5].name,'Contingency');}});
test('rejects impossible dates, dangerous numbers and unsupported values',()=>{for(const patch of [{date:'2027-02-30'},{budget:NaN},{budget:-1},{guests:0},{guests:1.5},{type:'Other'},{name:''},{preferences:'a'.repeat(1001)}])assert.throws(()=>validateEvent({...event,...patch}));});
test('last-minute tasks start today without altering event date',()=>{const p=buildPlan({...event,date:'2026-10-23'},'2026-10-20');assert.ok(p.tasks.every(t=>t.date>='2026-10-20'&&t.date<='2026-10-23'));assert.equal(p.tasks.at(-1).date,'2026-10-23');});
test('date arithmetic handles leap years and month boundaries',()=>{assert.equal(dateOffset('2028-03-01',-1),'2028-02-29');assert.equal(dateOffset('2027-01-01',-1),'2026-12-31');});
