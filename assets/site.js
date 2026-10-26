(function(){
  var root=document.body.getAttribute('data-root')||'./';
  var overlay=document.querySelector('#search-overlay');
  var searchInput=document.querySelector('#search-input');
  var results=document.querySelector('#search-results');
  var data=null;
  function closeSearch(){overlay.classList.remove('open');searchInput.value='';results.innerHTML='';}
  async function openSearch(){overlay.classList.add('open');searchInput.focus();if(!data){try{var r=await fetch(root+'assets/search-index.json');data=await r.json();}catch(e){data=[];}}render();}
  function render(){var q=searchInput.value.trim().toLowerCase();results.innerHTML='';if(!q){results.innerHTML='<div class="search-empty">Search pages, endpoint paths and integration topics.</div>';return;}var matches=(data||[]).filter(x=>(x.title+' '+x.desc+' '+x.keywords).toLowerCase().includes(q)).slice(0,10);if(!matches.length){results.innerHTML='<div class="search-empty">No matching documentation pages.</div>';return;}matches.forEach(x=>{var a=document.createElement('a');a.className='search-result';a.href=root+x.path;a.innerHTML='<strong></strong><small></small>';a.querySelector('strong').textContent=x.title;a.querySelector('small').textContent=x.desc;results.appendChild(a);});}
  document.querySelectorAll('[data-open-search]').forEach(b=>b.addEventListener('click',openSearch));
  document.querySelector('#search-close').addEventListener('click',closeSearch);
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch();});
  searchInput.addEventListener('input',render);
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}else if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!overlay.classList.contains('open')){e.preventDefault();openSearch();}else if(e.key==='Escape'){closeSearch();}});
  var bar=document.querySelector('#sidebar'),shade=document.querySelector('#sidebar-shade');
  document.querySelector('#menu-open').addEventListener('click',()=>{bar.classList.add('open');shade.classList.add('active');});
  shade.addEventListener('click',()=>{bar.classList.remove('open');shade.classList.remove('active');});
})();