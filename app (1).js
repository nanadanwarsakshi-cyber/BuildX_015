const STORAGE_KEY='smartresq_demo_v2';
const defaultData={
 incidents:[
  {id:'INC-1042',type:'Flood',priority:'High',location:'Sakkardara, Nagpur',details:'Water entering low-lying homes',status:'New',time:'2 min ago'},
  {id:'INC-1038',type:'Road Block',priority:'High',location:'Wardha Road',details:'Road flooded near junction',status:'Verified',time:'11 min ago'},
  {id:'INC-1033',type:'Medical',priority:'Medium',location:'Pratap Nagar',details:'Resident needs assistance',status:'Assigned',time:'18 min ago'},
  {id:'INC-1029',type:'Building Damage',priority:'Low',location:'Sonegaon',details:'Minor structural damage reported',status:'New',time:'31 min ago'}
 ],
 roads:[
  {road:'Wardha Road',area:'Khapri Junction',issue:'Waterlogging',severity:'High',status:'Blocked',updated:'8 min ago',lat:21.115,lon:79.085},
  {road:'Kamptee Road',area:'Kalmana',issue:'Flood debris',severity:'High',status:'Blocked',updated:'14 min ago',lat:21.188,lon:79.115},
  {road:'Katol Road',area:'Manish Nagar',issue:'Reduced visibility',severity:'Medium',status:'Caution',updated:'21 min ago',lat:21.125,lon:79.05},
  {road:'Amravati Road',area:'Wadi',issue:'No obstruction',severity:'Low',status:'Clear',updated:'33 min ago',lat:21.17,lon:78.99},
  {road:'Ring Road',area:'Pratap Nagar',issue:'Waterlogging',severity:'Medium',status:'Caution',updated:'39 min ago',lat:21.128,lon:79.085}
 ],
 shelters:[
  {name:'Municipal School No. 4',area:'Sakkardara',distance:'1.2 km',capacity:150,occupied:87,status:'OPEN',lat:21.124,lon:79.105},
  {name:'Community Hall',area:'Pratap Nagar',distance:'2.4 km',capacity:200,occupied:45,status:'OPEN',lat:21.128,lon:79.075},
  {name:'Ward Office Shelter',area:'Manish Nagar',distance:'3.1 km',capacity:100,occupied:91,status:'LIMITED',lat:21.118,lon:79.075}
 ],
 teams:[
  {name:'Rescue Team 01',area:'Sakkardara',members:6,status:'Available'},
  {name:'Rescue Team 02',area:'Wardha Road',members:5,status:'Dispatched'},
  {name:'Medical Team 01',area:'Pratap Nagar',members:4,status:'Available'},
  {name:'Fire Unit 03',area:'Sonegaon',members:7,status:'Standby'}
 ],
 resources:[
  {name:'Rescue Vehicles',available:7,total:10,unit:'vehicles',priority:'High'},
  {name:'Medical Kits',available:34,total:50,unit:'kits',priority:'High'},
  {name:'Drinking Water',available:420,total:600,unit:'litres',priority:'Medium'},
  {name:'Food Packets',available:280,total:400,unit:'packets',priority:'Medium'},
  {name:'Portable Pumps',available:8,total:12,unit:'pumps',priority:'High'},
  {name:'Emergency Lights',available:21,total:30,unit:'units',priority:'Low'}
 ],
 damage:[
  {id:'DM-301',area:'Sakkardara',type:'Flooded homes',severity:'High',status:'Assessed',note:'Water entering ground-floor homes'},
  {id:'DM-297',area:'Sonegaon',type:'Building damage',severity:'Medium',status:'Pending',note:'Structural inspection requested'},
  {id:'DM-292',area:'Kamptee Road',type:'Road obstruction',severity:'High',status:'Assessed',note:'Debris and waterlogging'}
 ],
 missing:[
  {id:'MP-203',name:'Demo Case: A. Sharma',age:'17',lastSeen:'Pratap Nagar Bus Stop',status:'Searching',contact:'9XXXXXXXXX'},
  {id:'MP-201',name:'Demo Case: R. Patil',age:'42',lastSeen:'Kamptee Road Market',status:'Found',contact:'9XXXXXXXXX'}
 ],
 alerts:[
  {title:'Heavy rain warning',area:'Nagpur City',level:'HIGH',message:'Rainfall threshold crossed in the prototype feed.',time:'Now'},
  {title:'Flood risk',area:'Sakkardara',level:'HIGH',message:'Low-lying colonies require preparedness and evacuation planning.',time:'5 min ago'},
  {title:'Road closure',area:'Wardha Road',level:'ACTIVE',message:'Reported waterlogging is blocking a corridor.',time:'8 min ago'}
 ],
 agencies:[
  {name:'Municipal Response',status:'Coordinating',focus:'Shelters, roads, drainage'},
  {name:'Fire & Rescue',status:'Available',focus:'Flood rescue and fire response'},
  {name:'Medical Response',status:'Available',focus:'First aid and patient transfer'},
  {name:'Police / Traffic',status:'Coordinating',focus:'Traffic diversion and public safety'},
  {name:'Disaster Response',status:'Standby',focus:'Resource and incident coordination'}
 ],
 coordFeed:[
  {time:'09:38',agency:'Municipal Response',message:'Shelter capacity reviewed for Sakkardara.'},
  {time:'09:31',agency:'Fire & Rescue',message:'Rescue Team 02 dispatched toward Wardha Road.'},
  {time:'09:24',agency:'Police / Traffic',message:'Traffic caution requested near flooded junction.'}
 ]
};
let data=loadData();
let mapInstances={};
let mapLayers={};
const NAGPUR=[21.1458,79.0882];
const areaViews={city:{center:NAGPUR,zoom:11},sakkardara:{center:[21.124,79.105],zoom:14},pratap:{center:[21.128,79.075],zoom:14},wardha:{center:[21.115,79.085],zoom:14},sonegaon:{center:[21.13,79.07],zoom:14},manish:{center:[21.118,79.075],zoom:14},kamptee:{center:[21.188,79.115],zoom:14}};
function clone(x){return JSON.parse(JSON.stringify(x))}
function loadData(){try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):clone(defaultData)}catch(e){return clone(defaultData)}}
function saveData(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2800)}
function showView(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById('view-'+view)?.classList.add('active');document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));const titles={dashboard:'Command Dashboard',map:'Complete Nagpur City Live Map',alerts:'Flood & Heavy-Rain Alerts',emergency:'SOS & Emergency Reporting',evacuation:'Area Evacuation Planner',shelters:'Safe Shelters',roads:'Blocked Road Information',resources:'Emergency Resource Allocation',damage:'Damage Assessment',missing:'Missing Person Alerts',responder:'Responder Center',coordination:'Agency Coordination',admin:'Admin Control Room'};document.getElementById('pageTitle').textContent=titles[view]||'SmartResQ';if(view==='map')initMap('mainMap');if(view==='dashboard')initMap('dashboardMap');if(window.innerWidth<1050)document.getElementById('sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
document.addEventListener('click',e=>{const nav=e.target.closest('[data-view]');if(nav){e.preventDefault();showView(nav.dataset.view)}});
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('refreshBtn').addEventListener('click',()=>{renderAll();toast('Operational data refreshed.')});
document.getElementById('profileBtn').addEventListener('click',()=>toast('Citizen prototype profile active.'));
document.getElementById('emergencyForm').addEventListener('submit',e=>{e.preventDefault();const contact=document.getElementById('emContact').value.trim();const name=document.getElementById('emName').value.trim();const location=document.getElementById('emLocation').value.trim();if(!name||!/^[0-9]{10}$/.test(contact)||!location){toast('Please complete name, 10-digit contact and location.');return}const incident={id:'INC-'+Math.floor(1000+Math.random()*8999),type:document.getElementById('emType').value,priority:document.getElementById('emPriority').value,location,details:document.getElementById('emDetails').value.trim()||'Citizen emergency report',status:'New',time:'just now'};data.incidents.unshift(incident);saveData();e.target.reset();document.getElementById('alertBanner').classList.remove('hidden');document.getElementById('alertBanner').textContent=`🚨 ${incident.id} submitted. Priority: ${incident.priority}.`;renderAll();toast('Emergency report submitted.');showView('dashboard')});
document.getElementById('quickSos').addEventListener('click',()=>{document.getElementById('emPriority').value='High';document.getElementById('emType').value='Other';showView('emergency');toast('SOS form opened with High priority.')});
document.getElementById('locateBtn').addEventListener('click',()=>{document.getElementById('emLocation').value='Sakkardara, Nagpur';toast('Demo location added.')});
document.getElementById('findShelterBtn').addEventListener('click',()=>{const s=data.shelters.find(x=>x.status==='OPEN')||data.shelters[0];toast(`${s.name} · ${s.distance} · ${s.capacity-s.occupied} spaces available.`);showView('map');setTimeout(()=>focusMap(s.lat,s.lon,15),120)});
document.getElementById('addRoadBtn').addEventListener('click',()=>{const road=prompt('Enter road name for demo report:');if(!road)return;data.roads.unshift({road,area:'Nagpur',issue:'Citizen reported blockage',severity:'Medium',status:'Blocked',updated:'just now',lat:NAGPUR[0],lon:NAGPUR[1]});saveData();renderAll();toast('Road issue added and mapped.')});
document.getElementById('roadSearch').addEventListener('input',renderRoads);document.getElementById('roadFilter').addEventListener('change',renderRoads);
document.getElementById('missingBtn').addEventListener('click',()=>{const name=prompt('Enter missing person name for demo case:');if(!name)return;data.missing.unshift({id:'MP-'+Math.floor(200+Math.random()*700),name,age:'Not provided',lastSeen:'Demo location',status:'Searching',contact:'Not provided'});saveData();renderAll();toast('Missing-person case created.')});
document.getElementById('routeBtn').addEventListener('click',()=>{document.getElementById('routeCard').classList.add('route-highlight');toast('Route updated: blocked corridors excluded from the prototype route.')});
document.getElementById('routeMapBtn').addEventListener('click',()=>{showView('map');setTimeout(()=>focusMap(21.124,79.105,14),120)});
document.getElementById('fitNagpur').addEventListener('click',()=>fitNagpur());
document.getElementById('mapArea').addEventListener('change',e=>{const v=areaViews[e.target.value];if(v)focusMap(v.center[0],v.center[1],v.zoom)});
document.getElementById('planEvacBtn').addEventListener('click',()=>{const free=data.shelters.reduce((sum,s)=>sum+Math.max(0,s.capacity-s.occupied),0);document.getElementById('evacCapacity').textContent=free+' spaces';document.getElementById('evacOutput').innerHTML='<h3>Generated evacuation plan</h3><div class="plan-grid"><div><b>Risk zone</b><span>Sakkardara low-lying area</span></div><div><b>Primary shelter</b><span>Municipal School No. 4</span></div><div><b>Secondary shelter</b><span>Community Hall, Pratap Nagar</span></div><div><b>Road rule</b><span>Avoid all roads marked Blocked</span></div></div><div class="demo-callout">Plan generated from prototype incident, road and shelter data.</div>';toast('Evacuation plan generated.')});
document.getElementById('allocateBtn').addEventListener('click',()=>{const r=data.resources.find(x=>x.available>0);if(!r){toast('No demo resources available.');return}r.available=Math.max(0,r.available-1);saveData();renderAll();toast(`${r.name}: 1 ${r.unit} allocated.`)});
document.getElementById('damageBtn').addEventListener('click',()=>{const area=prompt('Enter affected area:');if(!area)return;data.damage.unshift({id:'DM-'+Math.floor(300+Math.random()*600),area,type:'New field assessment',severity:'Medium',status:'Pending',note:'Awaiting field verification'});saveData();renderAll();toast('Damage assessment created.')});
document.getElementById('newAlertBtn').addEventListener('click',()=>{data.alerts.unshift({title:'New heavy-rain alert',area:'Nagpur City',level:'HIGH',message:'Demo alert created by control room.',time:'just now'});saveData();renderAll();toast('Demo alert published.')});
document.getElementById('broadcastBtn').addEventListener('click',()=>{data.coordFeed.unshift({time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),agency:'Control Room',message:'Operational update broadcast to response agencies.'});saveData();renderAll();toast('Coordination update broadcast.')});
document.getElementById('clearDemo').addEventListener('click',()=>{if(confirm('Reset all SmartResQ prototype data?')){data=clone(defaultData);saveData();renderAll();toast('Prototype data reset.')}});
document.addEventListener('click',e=>{const btn=e.target.closest('[data-action]');if(!btn)return;const id=btn.dataset.id,action=btn.dataset.action;const item=data.incidents.find(x=>x.id===id);if(!item)return;if(action==='verify')item.status='Verified';if(action==='assign')item.status='Assigned';if(action==='resolve')item.status='Resolved';saveData();renderAll();toast(`${id} marked ${item.status}.`)});
function renderStats(){const stats=[['🚨','Active incidents',data.incidents.filter(x=>x.status!=='Resolved').length,'Incident queue'],['🚧','Blocked roads',data.roads.filter(x=>x.status==='Blocked').length,'Need verification'],['🏠','Open shelters',data.shelters.filter(x=>x.status!=='CLOSED').length,'Capacity monitored'],['🚑','Response teams',data.teams.length,'Teams tracked']];const html=stats.map(s=>`<div class="stat-card"><div class="stat-icon">${s[0]}</div><span>${s[1]}</span><b>${s[2]}</b><small>${s[3]}</small></div>`).join('');document.getElementById('statsGrid').innerHTML=html;document.getElementById('adminStats').innerHTML=html}
function renderIncidents(){document.getElementById('incidentList').innerHTML=data.incidents.slice(0,5).map(i=>`<div class="incident"><div class="incident-top"><b>${esc(i.type)} · ${esc(i.id)}</b><span class="priority ${esc(i.priority)}">${esc(i.priority)}</span></div><small>📍 ${esc(i.location)}</small><small>${esc(i.details)} · ${esc(i.time)}</small></div>`).join('')||'<p class="muted">No incidents.</p>';document.getElementById('adminIncidents').innerHTML=data.incidents.map(i=>`<div class="admin-incident"><div class="row"><b>${esc(i.id)} · ${esc(i.type)}</b><span class="priority ${esc(i.priority)}">${esc(i.priority)}</span></div><small>📍 ${esc(i.location)} · ${esc(i.status)}</small><small>${esc(i.details)}</small><div class="admin-actions">${i.status==='New'?`<button class="primary" data-action="verify" data-id="${esc(i.id)}">Verify</button>`:''}${i.status==='Verified'?`<button class="primary" data-action="assign" data-id="${esc(i.id)}">Assign team</button>`:''}${i.status==='Assigned'?`<button class="primary" data-action="resolve" data-id="${esc(i.id)}">Mark resolved</button>`:''}<button data-view="responder">Open responder</button></div></div>`).join('')}
function renderMini(){document.getElementById('alertList').innerHTML=data.alerts.slice(0,4).map(a=>`<div class="alert-row"><span>🌧️ ${esc(a.title)} · ${esc(a.area)}</span><b class="priority ${a.level==='HIGH'?'High':'Medium'}">${esc(a.level)}</b></div>`).join('');document.getElementById('shelterMini').innerHTML=data.shelters.map(s=>`<div class="mini-row"><span>🏠 ${esc(s.name)}</span><b>${Math.max(0,s.capacity-s.occupied)} free</b></div>`).join('');document.getElementById('teamMini').innerHTML=data.teams.slice(0,3).map(t=>`<div class="mini-row"><span>🚑 ${esc(t.name)}</span><b>${esc(t.status)}</b></div>`).join('')}
function renderAlerts(){document.getElementById('alertCards').innerHTML=data.alerts.map(a=>`<div class="alert-card"><span class="badge ${a.level==='HIGH'?'danger':'info'}">${esc(a.level)}</span><h3>🌧️ ${esc(a.title)}</h3><p><b>Area:</b> ${esc(a.area)}</p><p>${esc(a.message)}</p><small>${esc(a.time)}</small></div>`).join('')}
function renderShelters(){document.getElementById('shelterCards').innerHTML=data.shelters.map(s=>{const pct=Math.min(100,Math.round(s.occupied/s.capacity*100));return `<div class="shelter-card"><span class="badge ${pct>85?'danger':'success'}">${esc(s.status)}</span><h3>🏠 ${esc(s.name)}</h3><p>📍 ${esc(s.area)} · ${esc(s.distance)}</p><div class="capacity"><i style="width:${pct}%"></i></div><div class="shelter-meta"><span>${s.occupied} occupied</span><b>${s.capacity-s.occupied} free</b></div><button class="btn btn-light full-btn shelter-nav" data-lat="${s.lat}" data-lon="${s.lon}">Show on map</button></div>`}).join('')}
document.addEventListener('click',e=>{const b=e.target.closest('.shelter-nav');if(!b)return;showView('map');setTimeout(()=>focusMap(+b.dataset.lat,+b.dataset.lon,15),120)});
function renderRoads(){const q=(document.getElementById('roadSearch').value||'').toLowerCase();const f=document.getElementById('roadFilter').value;const rows=data.roads.filter(r=>(f==='all'||r.status===f)&&(`${r.road} ${r.area} ${r.issue}`.toLowerCase().includes(q)));document.getElementById('roadTable').innerHTML=rows.map(r=>`<tr><td><b>${esc(r.road)}</b></td><td>${esc(r.area)}</td><td>${esc(r.issue)}</td><td>${esc(r.severity)}</td><td><span class="status ${esc(r.status)}">${esc(r.status)}</span></td><td>${esc(r.updated)}</td></tr>`).join('')||'<tr><td colspan="6">No matching road reports.</td></tr>'}
function renderResources(){document.getElementById('resourceCards').innerHTML=data.resources.map(r=>{const pct=Math.round(r.available/r.total*100);return `<div class="resource-card"><span class="badge ${r.priority==='High'?'danger':r.priority==='Medium'?'info':'success'}">${esc(r.priority)} priority</span><h3>▣ ${esc(r.name)}</h3><div class="resource-number">${r.available} <small>/ ${r.total} ${esc(r.unit)}</small></div><div class="capacity"><i style="width:${pct}%"></i></div><p>${pct}% currently available</p><button class="btn btn-light full-btn resource-action">Allocate 1</button></div>`}).join('')}
document.addEventListener('click',e=>{if(!e.target.closest('.resource-action'))return;const card=e.target.closest('.resource-card');const title=card.querySelector('h3').textContent.replace('▣ ','').trim();const r=data.resources.find(x=>x.name===title);if(r&&r.available>0){r.available--;saveData();renderAll();toast(`${r.name}: 1 ${r.unit} allocated.`)}});
function renderDamage(){document.getElementById('damageCards').innerHTML=data.damage.map(d=>`<div class="damage-card"><span class="badge ${d.severity==='High'?'danger':d.severity==='Medium'?'info':'success'}">${esc(d.severity)}</span><h3>▥ ${esc(d.type)}</h3><p><b>Case:</b> ${esc(d.id)}</p><p><b>Area:</b> ${esc(d.area)}</p><p><b>Status:</b> ${esc(d.status)}</p><p>${esc(d.note)}</p></div>`).join('')}
function renderMissing(){document.getElementById('missingCards').innerHTML=data.missing.map(m=>`<div class="missing-card"><span class="badge ${m.status==='Found'?'success':'danger'}">${esc(m.status)}</span><h3>👤 ${esc(m.name)}</h3><p><b>Case:</b> ${esc(m.id)}</p><p><b>Age:</b> ${esc(m.age)}</p><p><b>Last seen:</b> ${esc(m.lastSeen)}</p><p><b>Contact:</b> ${esc(m.contact)}</p></div>`).join('')}
function renderTeams(){document.getElementById('teamTable').innerHTML=`<div class="team-list">${data.teams.map(t=>`<div class="team-card"><div><span class="team-icon">🚑</span><div><b>${esc(t.name)}</b><small>${esc(t.area)} · ${t.members} members</small></div></div><span class="badge ${t.status==='Available'?'success':t.status==='Dispatched'?'info':''}">${esc(t.status)}</span></div>`).join('')}</div>`}
function renderAgencies(){document.getElementById('agencyCards').innerHTML=data.agencies.map(a=>`<div class="agency-card"><span class="badge ${a.status==='Available'?'success':a.status==='Standby'?'info':'danger'}">${esc(a.status)}</span><h3>◎ ${esc(a.name)}</h3><p>${esc(a.focus)}</p></div>`).join('');document.getElementById('coordFeed').innerHTML=data.coordFeed.map(x=>`<div class="feed-row"><time>${esc(x.time)}</time><div><b>${esc(x.agency)}</b><p>${esc(x.message)}</p></div></div>`).join('')}
function iconMarker(color,label){return L.divIcon({className:'custom-map-marker',html:`<div class="marker-dot" style="--marker:${color}"></div>`,iconSize:[20,20],iconAnchor:[10,10],popupAnchor:[0,-8]})}
function initMap(elId){if(typeof L==='undefined')return null;if(mapInstances[elId]){setTimeout(()=>mapInstances[elId].invalidateSize(),80);return mapInstances[elId]}const map=L.map(elId,{zoomControl:true,preferCanvas:true}).setView(NAGPUR,11);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',referrerPolicy:'strict-origin-when-cross-origin'}).addTo(map);mapInstances[elId]=map;mapLayers[elId]=L.layerGroup().addTo(map);setTimeout(()=>{map.invalidateSize();renderMapLayers(elId)},100);return map}
function renderMapLayers(elId){const map=mapInstances[elId];if(!map)return;mapLayers[elId].clearLayers();const layer=mapLayers[elId];data.roads.forEach(r=>{if(!r.lat)return;const c=r.status==='Blocked'?'#e5484d':r.status==='Caution'?'#f59e0b':'#16a36a';L.circleMarker([r.lat,r.lon],{radius:7,color:'#fff',weight:2,fillColor:c,fillOpacity:.95}).bindPopup(`<b>🚧 ${esc(r.road)}</b><br>${esc(r.issue)}<br>Status: ${esc(r.status)}`).addTo(layer)});data.shelters.forEach(s=>{L.marker([s.lat,s.lon],{icon:iconMarker('#16a36a','Shelter')}).bindPopup(`<b>🏠 ${esc(s.name)}</b><br>${esc(s.area)}<br>${s.capacity-s.occupied} spaces available`).addTo(layer)});data.incidents.forEach((i,idx)=>{const coords=incidentCoords(i,idx);const c=i.priority==='High'?'#e5484d':i.priority==='Medium'?'#f59e0b':'#6b5ce7';L.marker(coords,{icon:iconMarker(c,'Incident')}).bindPopup(`<b>🚨 ${esc(i.id)} · ${esc(i.type)}</b><br>${esc(i.location)}<br>Status: ${esc(i.status)}`).addTo(layer)});L.circle([21.132,79.08],{radius:1800,color:'#e5484d',fillColor:'#e5484d',fillOpacity:.08,weight:1}).bindPopup('<b>Demo high-risk zone</b><br>Sakkardara low-lying area').addTo(layer)}
function incidentCoords(i,idx){const known={'Sakkardara, Nagpur':[21.132,79.08],'Wardha Road':[21.115,79.085],'Pratap Nagar':[21.128,79.075],'Sonegaon':[21.13,79.07]};if(known[i.location])return known[i.location];const offsets=[[.01,.01],[-.012,.014],[.014,-.012],[-.008,-.018]];return [NAGPUR[0]+offsets[idx%offsets.length][0],NAGPUR[1]+offsets[idx%offsets.length][1]]}
function focusMap(lat,lon,zoom=14){const map=mapInstances.mainMap||initMap('mainMap');map.setView([lat,lon],zoom);map.invalidateSize()}
function fitNagpur(){const map=mapInstances.mainMap||initMap('mainMap');map.fitBounds([[21.02,78.90],[21.27,79.25]],{padding:[20,20]})}
function renderAll(){renderStats();renderIncidents();renderMini();renderAlerts();renderShelters();renderRoads();renderResources();renderDamage();renderMissing();renderTeams();renderAgencies();Object.keys(mapInstances).forEach(id=>renderMapLayers(id));if(mapInstances.dashboardMap)setTimeout(()=>mapInstances.dashboardMap.invalidateSize(),80)}
renderAll();
