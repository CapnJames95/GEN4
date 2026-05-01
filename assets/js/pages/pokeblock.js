function buildPokeblockPage() {
  var el = document.getElementById('pokeblock-content');
  if (!el) return;

  // ──────────────────────────────────────────────────────────────────────
  // Gen 4 Poffin Optimizer (Diamond / Pearl / Platinum).
  // HGSS does not have Super Contests or Poffins — this page is filtered out
  // of the nav for HG/SS via SECTIONS games:['FR','LG','R'].
  //
  // Berries and their flavor values carry over from Gen 3 unchanged. Locations
  // listed below are intentionally generic ("Wild berry trees / Berry Master")
  // because per-berry Sinnoh route data has not yet been audited for accuracy.
  // ──────────────────────────────────────────────────────────────────────

  // Bulbapedia "Poffin" base flavor levels (Gen IV).
  // f = [spicy, dry, sweet, bitter, sour].
  var BERRIES = [
    {name:'Cheri',  id:1, f:[10, 0, 0, 0, 0], loc:'Common berry trees (Spicy)'},
    {name:'Chesto', id:2, f:[ 0,10, 0, 0, 0], loc:'Common berry trees (Dry)'},
    {name:'Pecha',  id:3, f:[ 0, 0,10, 0, 0], loc:'Common berry trees (Sweet)'},
    {name:'Rawst',  id:4, f:[ 0, 0, 0,10, 0], loc:'Common berry trees (Bitter)'},
    {name:'Aspear', id:5, f:[ 0, 0, 0, 0,10], loc:'Common berry trees (Sour)'},
    {name:'Leppa',  id:6, f:[10, 0, 0, 0, 0], loc:'Berry Master gift; common trees'},
    {name:'Oran',   id:7, f:[ 0,10, 0, 0, 0], loc:'Very common on Sinnoh routes'},
    {name:'Persim', id:8, f:[ 0, 0,10, 0, 0], loc:'Common berry trees'},
    {name:'Lum',    id:9, f:[ 0, 0, 0,10, 0], loc:'Berry Master gift; rare trees'},
    {name:'Sitrus', id:10,f:[ 0, 0, 0, 0,10], loc:'Berry Master; Pickup ability'},
    {name:'Razz',   id:16,f:[ 0,10, 0, 0, 0], loc:'Mid-game routes'},
    {name:'Bluk',   id:17,f:[ 0, 0,10, 0, 0], loc:'Mid-game routes'},
    {name:'Nanab',  id:18,f:[ 0, 0, 0,10, 0], loc:'Mid-game routes'},
    {name:'Wepear', id:19,f:[ 0, 0, 0, 0,10], loc:'Mid-game routes'},
    {name:'Pinap',  id:20,f:[10, 0, 0, 0, 0], loc:'Mid-game routes'},
    {name:'Pomeg',  id:21,f:[10, 0,10,10, 0], loc:'Berry Master (EV reducing)'},
    {name:'Kelpsy', id:22,f:[ 0,10, 0,10,10], loc:'Berry Master (EV reducing)'},
    {name:'Qualot', id:23,f:[10, 0,10, 0,10], loc:'Berry Master (EV reducing)'},
    {name:'Hondew', id:24,f:[10,10, 0,10, 0], loc:'Berry Master (EV reducing)'},
    {name:'Grepa',  id:25,f:[ 0,10,10, 0,10], loc:'Berry Master (EV reducing)'},
    {name:'Tamato', id:26,f:[20,10, 0, 0, 0], loc:'Berry Master (EV reducing)'},
    {name:'Cornn',  id:27,f:[ 0,20,10, 0, 0], loc:'Berry Master / late-game'},
    {name:'Magost', id:28,f:[ 0, 0,20,10, 0], loc:'Berry Master / late-game'},
    {name:'Rabuta', id:29,f:[ 0, 0, 0,20,10], loc:'Berry Master / late-game'},
    {name:'Nomel',  id:30,f:[10, 0, 0, 0,20], loc:'Berry Master / late-game'},
    {name:'Spelon', id:31,f:[30,10, 0, 0, 0], loc:'Berry Master events'},
    {name:'Pamtre', id:32,f:[ 0,30,10, 0, 0], loc:'Berry Master events'},
    {name:'Watmel', id:33,f:[ 0, 0,30,10, 0], loc:'Berry Master events'},
    {name:'Durin',  id:34,f:[ 0, 0, 0,30,10], loc:'Berry Master events'},
    {name:'Belue',  id:35,f:[10, 0, 0, 0,30], loc:'Berry Master events'},
  ];

  var CONDITIONS = [
    {name:'Cool',   key:0, color:'#FF6B35', desc:'Raises Cool contest stat — Spicy flavor'},
    {name:'Beauty', key:1, color:'#64b4ff', desc:'Raises Beauty contest stat — Dry flavor'},
    {name:'Cute',   key:2, color:'#FF88CC', desc:'Raises Cute contest stat — Sweet flavor'},
    {name:'Clever', key:3, color:'#4CAF50', desc:'Raises Clever contest stat — Bitter flavor'},
    {name:'Tough',  key:4, color:'#FFC107', desc:'Raises Tough contest stat — Sour flavor'},
  ];
  var FLAVOR_NAMES = ['Spicy','Dry','Sweet','Bitter','Sour'];
  var NATURE_PREFS = [
    {natures:['Lonely','Brave','Adamant','Naughty'],likes:0,dislikes:3},
    {natures:['Bold','Relaxed','Impish','Lax'],likes:1,dislikes:0},
    {natures:['Modest','Mild','Quiet','Rash'],likes:1,dislikes:0},
    {natures:['Calm','Gentle','Sassy','Careful'],likes:3,dislikes:0},
    {natures:['Timid','Hasty','Jolly','Naive'],likes:2,dislikes:3},
    {natures:['Hardy','Docile','Serious','Bashful','Quirky'],likes:-1,dislikes:-1},
  ];

  var selCond = 0;

  function berryLink(b) {
    return '<a href="https://bulbapedia.bulbagarden.net/wiki/'+b.name+'_Berry" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;border-bottom:1px dotted var(--muted);" title="Bulbapedia: '+b.name+' Berry">'+b.name+'</a>';
  }

  function renderBestBerries(condIdx) {
    var sorted = BERRIES.slice().sort(function(a,b){ return b.f[condIdx]-a.f[condIdx]; }).filter(function(b){ return b.f[condIdx]>0; });
    return '<div style="display:flex;flex-wrap:wrap;gap:8px;">'
      + sorted.map(function(b){
          var val = b.f[condIdx];
          var color = val>=50?'var(--gold)':val>=30?'var(--text)':'var(--muted)';
          return '<div style="display:flex;align-items:center;gap:6px;padding:7px 12px;background:var(--card);border:1px solid var(--border);border-radius:6px;">'
            +'<span style="font-size:12px;font-weight:700;color:'+color+'">'+berryLink(b)+'</span>'
            +'<span style="font-size:11px;font-weight:800;color:'+CONDITIONS[condIdx].color+'">+'+val+'</span>'
            +'</div>';
        }).join('')
      +'</div>';
  }

  function renderAllBerries() {
    return '<div style="overflow-x:auto;">'
      +'<table style="width:100%;border-collapse:collapse;font-size:12px;">'
      +'<thead><tr style="border-bottom:2px solid var(--border);">'
      +'<th style="text-align:left;padding:7px 10px;color:var(--muted);font-size:10px;font-weight:800;text-transform:uppercase;">Berry</th>'
      + CONDITIONS.map(function(c){ return '<th style="text-align:center;padding:7px 8px;color:'+c.color+';font-size:10px;font-weight:800;text-transform:uppercase;">'+c.name+'</th>'; }).join('')
      +'<th style="text-align:left;padding:7px 10px;color:var(--muted);font-size:10px;font-weight:800;text-transform:uppercase;">Location</th>'
      +'</tr></thead><tbody>'
      + BERRIES.map(function(b){
          return '<tr style="border-bottom:1px solid rgba(255,255,255,.04);">'
            +'<td style="padding:6px 10px;font-weight:700;">'+berryLink(b)+'</td>'
            + b.f.map(function(v,ci){
                return '<td style="text-align:center;padding:6px 8px;font-weight:'+(v>0?'700':'400')+';color:'+(v>=50?'var(--gold)':v>=30?'var(--text)':v>0?CONDITIONS[ci].color:'var(--border)')+';">'+(v>0?'+'+v:'—')+'</td>';
              }).join('')
            +'<td style="padding:6px 10px;font-size:10px;color:var(--muted);">'+b.loc+'</td>'
            +'</tr>';
        }).join('')
      +'</tbody></table></div>';
  }

  function render() {
    el.innerHTML = '<div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap;">'
      + CONDITIONS.map(function(c,i){
          var active=i===selCond;
          return '<button onclick="pbSetCond('+i+')" style="padding:7px 16px;font-size:11px;font-weight:700;background:'+(active?c.color:'var(--panel)')+';color:'+(active?'#000':'var(--text)')+';border:1px solid '+(active?c.color:'var(--border)')+';border-radius:5px;cursor:pointer;">'+c.name+'</button>';
        }).join('')
      +'</div>'
      +'<div class="panel" style="padding:14px 16px;margin-bottom:16px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:'+CONDITIONS[selCond].color+';margin-bottom:8px;">BEST BERRIES FOR '+CONDITIONS[selCond].name.toUpperCase()+' ('+FLAVOR_NAMES[selCond]+' flavor)</div>'
      +'<div style="font-size:11px;color:var(--muted);margin-bottom:12px;">'+CONDITIONS[selCond].desc+'</div>'
      + renderBestBerries(selCond)
      +'</div>'
      +'<div class="panel" style="padding:14px 16px;margin-bottom:16px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--game-color,var(--gold));margin-bottom:12px;">POFFIN MECHANICS (D / P / Pt)</div>'
      +'<div style="font-size:12px;color:var(--text);line-height:1.8;">'
      +'<strong style="color:var(--game-color,var(--gold));">Where:</strong> Hearthome City Poffin House. Cooking is free; you provide your own berries.<br>'
      +'<strong style="color:var(--game-color,var(--gold));">Cooking:</strong> Stir the pot with the stylus by drawing circles. Stir speed and direction-changes both matter — too fast or too slow burns the Poffin and lowers its level.<br>'
      +'<strong style="color:var(--game-color,var(--gold));">Level:</strong> Stir quality determines Poffin Level (10 → 80+). Higher Level Poffins raise contest stats more per feed.<br>'
      +'<strong style="color:var(--game-color,var(--gold));">Smoothness:</strong> Each berry contributes Smoothness — low smoothness means the Pokémon feels full slower, so you can feed more Poffins. Aim for low-smoothness berries (most flavor-60 berries are ideal).<br>'
      +'<strong style="color:var(--game-color,var(--gold));">Stat cap:</strong> Each contest condition maxes at 255. Sheen also fills as you feed — once Sheen is full, the Pokémon refuses further Poffins.<br>'
      +'<strong style="color:var(--game-color,var(--gold));">Co-op tip:</strong> 2–4 player wireless cooking massively increases Level. A solo perfect stir caps around L40; a 4-player perfect stir reaches L80+.'
      +'</div></div>'
      +'<div class="panel" style="padding:14px 16px;margin-bottom:16px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--game-color,var(--gold));margin-bottom:12px;">NATURE FLAVOR PREFERENCES</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:8px;font-size:11px;">'
      + NATURE_PREFS.map(function(np){
          var likes=np.likes>=0?CONDITIONS[np.likes].name:'None';
          var dislikes=np.dislikes>=0?CONDITIONS[np.dislikes].name:'None';
          var lcolor=np.likes>=0?CONDITIONS[np.likes].color:'var(--muted)';
          return '<div style="padding:7px 12px;background:var(--card);border:1px solid var(--border);border-radius:6px;min-width:160px;">'
            +'<div style="font-weight:700;margin-bottom:4px;">'+np.natures.join(', ')+'</div>'
            +'<div style="font-size:10px;color:'+lcolor+';">Likes: '+likes+(np.likes>=0?' ('+FLAVOR_NAMES[np.likes]+')':'')+'</div>'
            +'<div style="font-size:10px;color:var(--muted);">Dislikes: '+dislikes+'</div>'
            +'</div>';
        }).join('')
      +'</div></div>'
      +'<div class="panel" style="padding:14px 16px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--game-color,var(--gold));margin-bottom:12px;">ALL BERRY FLAVORS</div>'
      + renderAllBerries()
      +'</div>';
  }

  window.pbSetCond = function(i) { selCond=i; render(); };
  render();
}
