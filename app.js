const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const palette = ['#6578ff','#22b68a','#f0aa58','#9b7be8','#ed7b8a','#54a9c8','#a4b4cb'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const products = [
 {name:'Canon imageCLASS 2200',category:'Technology',sales:61599,profit:25199,rating:'4.8'},
 {name:'Fellowes PB500 Binding',category:'Office Supplies',sales:27499,profit:7750,rating:'4.6'},
 {name:'Cisco TelePresence',category:'Technology',sales:22638,profit:4512,rating:'4.7'},
 {name:'HON 5400 Series',category:'Furniture',sales:21870,profit:3200,rating:'4.4'},
 {name:'GBC DocuBind TL300',category:'Office Supplies',sales:19823,profit:6920,rating:'4.5'},
 {name:'Hewlett Packard LaserJet',category:'Technology',sales:18450,profit:5100,rating:'4.6'},
 {name:'Global Troy Executive',category:'Furniture',sales:17320,profit:2810,rating:'4.3'},
 {name:'Sharp AL-1530CS',category:'Technology',sales:16200,profit:4200,rating:'4.4'},
 {name:'Office Star Chair',category:'Furniture',sales:15120,profit:1900,rating:'4.2'},
 {name:'Cubify CubeX',category:'Technology',sales:12900,profit:-8879,rating:'3.8'}
];
const countries = [
 ['United States','$620,450','$132,100','2,410'],['Germany','$245,800','$51,600','980'],['United Kingdom','$198,300','$42,700','840'],['France','$164,200','$36,900','720'],['Japan','$142,600','$31,200','610'],['Australia','$118,900','$26,100','520']
];
const customers = [
 ['Olivia Martinez','United States','42','$24,580'],['Liam Johnson','United States','38','$21,430'],['Emma Williams','United Kingdom','31','$18,920'],['Noah Brown','Germany','29','$17,650'],['Ava Davis','France','27','$16,210'],['Ethan Wilson','Canada','25','$14,890'],['Sophia Miller','Australia','22','$13,540'],['Lucas Garcia','Spain','21','$12,870']
];
const markets = [['North America','$980K','$205K','+14.8%'],['Europe','$710K','$151K','+11.2%'],['Asia','$420K','$76K','+30.0%'],['South America','$125K','$12K','+6.4%'],['Africa','$65K','$6K','+4.1%']];
const money = n => '$' + n.toLocaleString('en-US');
function productRows(items){return items.map((p,i)=>`<tr><td><div class="product-cell"><span class="product-thumb">${['▣','▤','⌘','▱'][i%4]}</span>${p.name}</div></td><td>${p.category}</td><td>${money(p.sales)}</td><td style="color:${p.profit<0?'#df6872':'#46536a'}">${money(p.profit)}</td><td>★ ${p.rating}</td></tr>`).join('')}
function fillTables(){
 $('#topProductsBody').innerHTML=products.slice(0,5).map((p,i)=>`<tr><td><div class="product-cell"><span class="product-thumb">${i+1}</span>${p.name}</div></td><td>${p.category}</td><td>${money(p.sales)}</td><td>${money(p.profit)}</td><td class="growth">↑ ${(12-i*1.7).toFixed(1)}%</td></tr>`).join('');
 $('#productsBody').innerHTML=productRows(products);
 $('#countrySalesBody').innerHTML=countries.map(r=>`<tr>${r.map((v,i)=>`<td>${i===0?`<strong>${v}</strong>`:v}</td>`).join('')}</tr>`).join('');
 $('#marketBody').innerHTML=markets.map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td class="growth">${r[3]}</td></tr>`).join('');
 renderCustomers(customers);
}
function renderCustomers(rows){$('#customersBody').innerHTML=rows.length?rows.map(r=>`<tr><td><div class="product-cell"><span class="avatar">${r[0].split(' ').map(x=>x[0]).join('')}</span>${r[0]}</div></td><td>${r[1]}</td><td>${r[2]}</td><td><strong>${r[3]}</strong></td></tr>`).join(''):'<tr><td colspan="4" class="empty-state">No customers found</td></tr>'}
const chartInstances={};
function makeChart(id,config){if(chartInstances[id])chartInstances[id].destroy();const el=document.getElementById(id);if(el)chartInstances[id]=new Chart(el,config)}
const gridColor='#edf0f5';
const commonOptions={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#17243b',padding:11,cornerRadius:7,titleFont:{family:'DM Sans'},bodyFont:{family:'DM Sans'}}},scales:{x:{grid:{display:false},ticks:{color:'#9aa3b2',font:{size:9}}},y:{grid:{color:gridColor},border:{display:false},ticks:{color:'#9aa3b2',font:{size:9},callback:v=>'$'+v/1000+'k'}}}};
function drawCharts(){
 makeChart('salesTrendCanvas',{type:'line',data:{labels:months,datasets:[{label:'Sales',data:[125,142,138,165,158,181,174,192,186,205,218,230],borderColor:'#6478ff',backgroundColor:'rgba(100,120,255,.10)',fill:true,tension:.38,pointRadius:0,pointHoverRadius:5,borderWidth:2.5}]},options:{...commonOptions}});
 makeChart('salesProfitCanvas',{type:'bar',data:{labels:months,datasets:[{label:'Sales',data:[125,142,138,165,158,181,174,192,186,205,218,230],backgroundColor:'#7182ff',borderRadius:4},{label:'Profit',data:[25,31,28,36,34,42,39,45,41,49,52,58],backgroundColor:'#36bd98',borderRadius:4}]},options:{...commonOptions,plugins:{...commonOptions.plugins,legend:{display:true,position:'bottom',labels:{usePointStyle:true,boxWidth:6,color:'#8792a4',font:{size:9}}}}}});
 makeChart('monthlySalesCanvas',{type:'bar',data:{labels:months,datasets:[{data:[125,142,138,165,158,181,174,192,186,205,218,230],backgroundColor:months.map((_,i)=>i===11?'#6478ff':'#cbd2ff'),borderRadius:5,barPercentage:.58}]},options:commonOptions});
 makeChart('topProductsCanvas',{type:'bar',data:{labels:products.slice(0,10).map(p=>p.name.length>19?p.name.slice(0,18)+'…':p.name),datasets:[{data:products.map(p=>p.sales),backgroundColor:palette[0],borderRadius:4,barThickness:12}]},options:{...commonOptions,indexAxis:'y',scales:{x:{grid:{color:gridColor},ticks:{color:'#9aa3b2',font:{size:9},callback:v=>'$'+v/1000+'k'}},y:{grid:{display:false},ticks:{color:'#7d889a',font:{size:9}}}}}});
 makeChart('profitCanvas',{type:'doughnut',data:{labels:['Technology','Furniture','Office Supplies'],datasets:[{data:[54,26,20],backgroundColor:['#6478ff','#25b68b','#f0aa58'],borderWidth:0,hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:7,padding:16,color:'#7e899c',font:{size:9}}}}}});
 makeChart('segmentCanvas',{type:'doughnut',data:{labels:['Consumer','Corporate','Home Office'],datasets:[{data:[52,31,17],backgroundColor:['#6478ff','#24b68b','#f0aa58'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:7,color:'#7e899c',font:{size:9}}}}}});
 makeChart('shippingCanvas',{type:'bar',data:{labels:['Standard','Express','Same Day'],datasets:[{label:'Orders',data:[5900,2700,1200],backgroundColor:['#6478ff','#24b68b','#f0aa58'],borderRadius:5,barThickness:25}]},options:{...commonOptions,indexAxis:'y',scales:{x:{grid:{color:gridColor},ticks:{color:'#9aa3b2',font:{size:9}}},y:{grid:{display:false},ticks:{color:'#7d889a',font:{size:9}}}}}});
}
function drawMaps(){
 const mapData=[{type:'choropleth',locationmode:'country names',locations:['United States','Canada','United Kingdom','Germany','France','Japan','Australia','India','Brazil','South Africa'],z:[620,190,198,245,164,142,118,105,75,42],text:['United States','Canada','United Kingdom','Germany','France','Japan','Australia','India','Brazil','South Africa'],colorscale:[[0,'#e9edff'],[.35,'#aab6ff'],[.7,'#7184ff'],[1,'#455ce0']],marker:{line:{color:'#fff',width:.6}},colorbar:{title:{text:'Sales ($K)',font:{size:10,color:'#8290a4'}},tickfont:{size:9,color:'#8290a4'},thickness:8,len:.65}}];
 const layout={margin:{l:0,r:0,t:0,b:0},paper_bgcolor:'rgba(0,0,0,0)',geo:{bgcolor:'rgba(0,0,0,0)',showframe:false,showcoastlines:false,showland:true,landcolor:'#f0f3f8',showocean:true,oceancolor:'#fbfcfe',projection:{type:'natural earth'}},font:{family:'DM Sans'},};
 const config={responsive:true,displayModeBar:false};
 Plotly.newPlot('mapChart',mapData,layout,config);Plotly.newPlot('worldMap',mapData,layout,config);
}
function showPage(name){$$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.page===name));const labels={overview:'Overview',sales:'Sales Analysis',products:'Products',markets:'Markets',customers:'Customers & Reports'};$('#breadcrumbTitle').textContent=labels[name];window.scrollTo({top:0,behavior:'smooth'});}
$$('.nav-link').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
$$('[data-goto]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showPage(a.dataset.goto)}));
function enterDashboard(){ $('#loginPage').classList.add('hidden');$('#appShell').classList.remove('hidden');showPage('overview');setTimeout(()=>{Object.values(chartInstances).forEach(c=>c.resize());if(window.Plotly){Plotly.Plots.resize('mapChart');Plotly.Plots.resize('worldMap')}},100);}
$('#demoBtn').addEventListener('click',enterDashboard);$('#loginBtn').addEventListener('click',enterDashboard);
$('#productCategory').addEventListener('change',e=>{const val=e.target.value;$('#productsBody').innerHTML=productRows(val==='All Categories'?products:products.filter(p=>p.category===val));});
$('#customerSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderCustomers(customers.filter(r=>r.join(' ').toLowerCase().includes(q)))});
function downloadFile(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
$('#exportCsv').addEventListener('click',()=>{const rows=[['Customer','Country','Orders','Total Purchase'],...customers];downloadFile('global-insight-customers.csv',rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n'),'text/csv;charset=utf-8;')});
function exportReport(){const content=`GLOBAL INSIGHT - SALES REPORT\nGenerated: ${new Date().toLocaleDateString()}\n\nTotal Sales: $2.3M\nTotal Profit: $450K\nTotal Orders: 9,800\nProfit Margin: 19.5%\n\nTop Products\n${products.slice(0,5).map(p=>`${p.name} | ${p.category} | ${money(p.sales)} | ${money(p.profit)}`).join('\n')}\n\nMarkets\n${markets.map(r=>r.join(' | ')).join('\n')}`;downloadFile('global-insight-report.txt',content,'text/plain')}
$('#exportPdf').addEventListener('click',()=>{const w=window.open('','_blank');if(!w){alert('Please allow pop-ups to print the report.');return;}w.document.write(`<html><head><title>Global Insight Report</title><style>body{font:14px Arial;padding:35px;color:#172033}h1{color:#536dfe}table{border-collapse:collapse;width:100%;margin:20px 0}td,th{border:1px solid #ddd;padding:9px;text-align:left}small{color:#777}</style></head><body><h1>Global Insight</h1><h2>Sales Performance Report</h2><small>Generated ${new Date().toLocaleDateString()}</small><h3>Key Performance Indicators</h3><p>Total Sales: $2.3M · Total Profit: $450K · Orders: 9,800 · Profit Margin: 19.5%</p><h3>Top Products</h3><table><tr><th>Product</th><th>Category</th><th>Sales</th><th>Profit</th></tr>${products.slice(0,5).map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td>${money(p.sales)}</td><td>${money(p.profit)}</td></tr>`).join('')}</table><h3>Market Comparison</h3><table><tr><th>Market</th><th>Sales</th><th>Profit</th><th>Growth</th></tr>${markets.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</table><script>window.onload=()=>window.print()<\/script></body></html>`);w.document.close();});
$('#overviewExport').addEventListener('click',exportReport);$$('.export-btn').forEach(b=>b.addEventListener('click',exportReport));
fillTables();drawCharts();drawMaps();
window.addEventListener('resize',()=>{Object.values(chartInstances).forEach(c=>c.resize())});
