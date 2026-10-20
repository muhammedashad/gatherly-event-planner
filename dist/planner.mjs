export const types = ['Wedding', 'Birthday', 'Community'];
export function validateEvent(value) {
  if (!value || typeof value !== 'object') throw new Error('Event details are required.');
  const { name, type, date, location, budget, guests, preferences = '' } = value;
  if (typeof name !== 'string' || !name.trim() || name.length > 100) throw new Error('Enter an event name (up to 100 characters).');
  if (!types.includes(type)) throw new Error('Choose a supported event type.');
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date) throw new Error('Choose a valid date.');
  if (typeof location !== 'string' || !location.trim() || location.length > 120) throw new Error('Enter a city or location (up to 120 characters).');
  if (!Number.isSafeInteger(budget) || budget < 1000 || budget > 100000000) throw new Error('Budget must be between ₹1,000 and ₹10 crore.');
  if (!Number.isSafeInteger(guests) || guests < 1 || guests > 100000) throw new Error('Guest count must be between 1 and 100,000.');
  if (typeof preferences !== 'string' || preferences.length > 1000) throw new Error('Keep preferences under 1,000 characters.');
  return {name:name.trim(), type, date, location:location.trim(), budget, guests, preferences:preferences.trim()};
}
export function allocateBudget(total, weights) {
  const sum = weights.reduce((a,b)=>a+b,0);
  if (!Number.isSafeInteger(total) || total < 0 || !weights.length || weights.some(w=>!Number.isFinite(w)||w<0) || sum<=0) throw new Error('Invalid budget allocation.');
  const exact = weights.map(w=>total*w/sum), result = exact.map(Math.floor);
  const order = exact.map((v,i)=>({i,f:v-result[i]})).sort((a,b)=>b.f-a.f);
  let remainder=total-result.reduce((a,b)=>a+b,0);
  for (let i=0;i<remainder;i++) result[order[i%order.length].i]++;
  return result;
}
export function dateOffset(date, days) {
  const d=new Date(date+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+days); return d.toISOString().slice(0,10);
}
export function buildPlan(input, today = new Date().toISOString().slice(0,10)) {
  const event=validateEvent(input);
  const weights=event.type==='Wedding'?[25,35,12,8,10,10]:event.type==='Birthday'?[20,30,20,10,10,10]:[20,30,10,10,20,10];
  const amounts=allocateBudget(event.budget,weights);
  const categories=['Venue','Food & drinks','Décor & setup','Photography','Activities & logistics','Contingency'];
  const schedule=[[-60,'Confirm venue and guest capacity','Venue'],[-45,'Request three itemized vendor quotes','Vendors'],[-30,'Send invitations and collect dietary needs','Guests'],[-21,'Confirm menu, accessibility and transport','Experience'],[-14,'Finalize décor and event schedule','Design'],[-7,'Reconfirm vendors, headcount and rain plan','Logistics'],[-1,'Check setup, contacts and emergency supplies','Logistics'],[0,'Welcome guests and enjoy your celebration','Event day']];
  return {event,budget:categories.map((name,i)=>({name,amount:amounts[i],spent:0})),tasks:schedule.map(([offset,title,category],i)=>{const target=dateOffset(event.date,offset);return {id:'task-'+i,title,category,date:target<today&&event.date>=today?today:target,done:false};}),vendors:categories.slice(0,5).map((category,i)=>({id:'vendor-'+i,category,name:'',status:'To shortlist',quote:0,notes:''})),ideas:[],createdAt:new Date().toISOString()};
}
