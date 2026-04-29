function buildRematchesPage() {
  var el = document.getElementById('rematches-content');
  if (!el) return;

  var GAMES_LIST = ['Sinnoh','Johto'];

  var REMATCHES = {
    'Sinnoh': [
      {loc:'Route 207', class:'Camper', name:'Anthony', note:'Geodude line — clean Atk EVs (1 per Geodude); accessible right after Oreburgh, chains well with VS Seeker', ev:'Atk', money:false},
      {loc:'Route 210 (south)', class:'Ace Trainer', name:'Cyndy', note:'Magnemite line on rematch — premier SpA EV farm in Sinnoh; Magneton yields 2 SpA per KO', ev:'SpA', money:false},
      {loc:'Route 212 (north)', class:'Beauty', name:'Olivia', note:'Roselia rematch — 1 SpA + 1 SpD EV; pairs well with Power items for SpA training', ev:'SpA+SpD', money:false},
      {loc:'Route 218', class:'Fisherman', name:'Andrew', note:'Magikarp/Gyarados rematch — Gyarados yields 2 Atk EVs; reliable late-game Atk farm', ev:'Atk', money:false},
      {loc:'Route 222', class:'Rich Boy', name:'Trey', note:'High prize money (Rich Boy/Lady class multiplier with Amulet Coin) — top money farmer in Sinnoh', ev:null, money:true},
      {loc:'Route 222', class:'Lady', name:'Melissa', note:'Same route as Rich Boy Trey — double-up Amulet Coin money chain on Route 222', ev:null, money:true},
      {loc:'Route 215', class:'Cooltrainer', name:'Riley(?)/various', note:'Mid-level mixed teams — solid EXP grind east of Veilstone before E4', ev:'mixed', money:false},
      {loc:'Route 210 (north, Pt)', class:'Ace Trainer', name:'Mira', note:'Platinum-only post-game rematch via VS Seeker; high-level Alakazam/Kadabra line — strong SpA EV + EXP', ev:'SpA', money:false},
      {loc:'Route 209', class:'Lass', name:'Molly', note:'Cherubi rematch — 1 HP EV per KO; one of few reliable HP EV trainers in Sinnoh', ev:'HP', money:false},
      {loc:'Route 213', class:'Tuber', name:'Jared', note:'Marill/Azumarill on rematch — 2 HP EVs from Azumarill; beach route accessible mid-game', ev:'HP', money:false},
      {loc:'Route 221', class:'Fisherman', name:'Alec', note:'Gyarados rematch — 2 Atk EVs; quick chain with Surf access west of Sandgem', ev:'Atk', money:false},
      {loc:'Valley Windworks', class:'Worker', name:'various', note:'Geodude/Machop teams — Atk EVs; short chain near Floaroma', ev:'Atk', money:false},
      {loc:'Route 206 (Cycling Road)', class:'Cyclist', name:'various', note:'Pre-evolved Electric/Normal teams — modest Spd EVs; useful early VS Seeker chain south of Eterna', ev:'Spd', money:false},
      {loc:'Route 211 (east)', class:'Bird Keeper', name:'various', note:'Staravia/Noctowl rematches — Spd EVs; chain entrance to Mt. Coronet east side', ev:'Spd', money:false},
    ],
    'Johto': [
      {loc:'Route 38', class:'Schoolboy', name:'Alan', note:'PokéGear: registers your number after first battle on Route 36; calls for rematch — Voltorb/Magnemite line yields Spd/SpA EVs', ev:'SpA', money:false},
      {loc:'Route 35', class:'Bug Catcher', name:'Arnie', note:'Calls when his Yanma evolves to Yanmega (HGSS-only evolution storyline) — notable rematch with stronger team', ev:'Spd', money:false},
      {loc:'Route 26', class:'Cooltrainer', name:'Don', note:'PokéGear rematch — high-level mixed team; among the strongest Johto callers, solid late-game EXP', ev:'mixed', money:false},
      {loc:'Route 27', class:'PokéFan', name:'Derek', note:'PokéFan class = high prize money with Amulet Coin; calls for rematch — top money caller in Johto', ev:null, money:true},
      {loc:'Route 32', class:'Picnicker', name:'Liz', note:'Calls Mon/Wed/Sat afternoons (day-of-week tied) — reliable early rematch source', ev:'mixed', money:false},
      {loc:'Route 38', class:'Bird Keeper', name:'Vance', note:'Rematch features Pidgeot/Farfetch\'d — solid Spd EV farm via PokéGear call', ev:'Spd', money:false},
      {loc:'Route 39', class:'Pokémaniac', name:'Ben', note:'Pokémaniac class = high prize money; rematches via phone — money farm tier', ev:null, money:true},
      {loc:'Route 36', class:'Schoolboy', name:'Chad', note:'Registers number after Route 36 battle; trivia caller plus rematch — early-game phone contact', ev:'mixed', money:false},
      {loc:'Route 37', class:'Psychic', name:'Gilbert', note:'Calls for rematch — Kadabra/Abra line gives clean SpA EVs', ev:'SpA', money:false},
      {loc:'Route 34', class:'Youngster', name:'Joey', note:'Famous "top percentage Rattata" — registers number, calls often; Raticate rematch yields Atk EVs', ev:'Atk', money:false},
      {loc:'Route 42', class:'PokéManiac', name:'Brent', note:'High prize-money class; rematches via PokéGear — money chain on Mt. Mortar approach', ev:null, money:true},
      {loc:'Route 43', class:'Pokéfan', name:'Beverly', note:'Pokéfan class money bonus; phone rematch — strong with Amulet Coin', ev:null, money:true},
      {loc:'Route 45', class:'Hiker', name:'Parry', note:'Geodude/Graveler rematch via call — Atk EVs and high-level grind near Blackthorn', ev:'Atk', money:false},
      {loc:'Route 29', class:'Youngster', name:'Mikey(?)/early callers', note:'Earliest PokéGear contacts post-Cherrygrove — modest payoff but quickest registration in HGSS', ev:'mixed', money:false},
      {loc:'National Park', class:'Bug Catcher', name:'Wade', note:'Calls with berry gifts and rematches; rematch team includes Pinsir/Beedrill — useful Atk EV side-source', ev:'Atk', money:false},
    ]
  };

  var EV_COLORS = {Spd:'#FFD700',Atk:'#FF6B35',SpA:'#64b4ff','SpA+SpD':'#81C784','Atk+Spd':'#FFA040','Atk+SpD':'#FFB74D',mixed:'var(--muted)',HP:'#ef5350',Def:'#9E9E9E',SpD:'#4CAF50'};

  var _rmGameMap = {FR:'Sinnoh', LG:'Sinnoh', R:'Sinnoh', S:'Johto', E:'Johto'};
  var selGame = (typeof GAME !== 'undefined' && GAME !== 'all' && _rmGameMap[GAME]) ? _rmGameMap[GAME] : 'Sinnoh';
  var searchQ = '';

  var _rmPokeNames = POKE.map(function(p){ return p.name; }).sort(function(a,b){ return b.length-a.length; });
  function _rmLinkPoke(text) {
    _rmPokeNames.forEach(function(name) {
      var re = new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '\\b', 'g');
      text = text.replace(re, '<span class="guide-poke-link" onclick="guideDex(\''+name.replace(/'/g,"\\'")+'\')">'+name+'</span>');
    });
    return text;
  }

  function renderTable() {
    var rows = REMATCHES[selGame].filter(function(r){
      if (!searchQ) return true;
      var q = searchQ.toLowerCase();
      return r.loc.toLowerCase().indexOf(q)!==-1 || r.class.toLowerCase().indexOf(q)!==-1 || r.name.toLowerCase().indexOf(q)!==-1 || (r.note||'').toLowerCase().indexOf(q)!==-1;
    });
    if (!rows.length) return '<div style="color:var(--muted);font-size:12px;padding:24px;text-align:center;">No results.</div>';
    return '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:12px;">'
      +'<thead><tr style="border-bottom:2px solid var(--border);">'
      +'<th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:800;text-transform:uppercase;color:var(--game-color,var(--gold));">Location</th>'
      +'<th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:800;text-transform:uppercase;color:var(--game-color,var(--gold));">Trainer</th>'
      +'<th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:800;text-transform:uppercase;color:var(--game-color,var(--gold));">EV Yield</th>'
      +'<th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:800;text-transform:uppercase;color:var(--game-color,var(--gold));">Notes</th>'
      +'</tr></thead><tbody>'
      + rows.map(function(r){
          var evColor = r.ev ? (EV_COLORS[r.ev]||'var(--text)') : 'var(--gold)';
          var evLabel = r.money ? '💰 Money' : (r.ev||'—');
          return '<tr style="border-bottom:1px solid rgba(255,255,255,.04);" onmouseover="this.style.background=\'rgba(255,255,255,.03)\'" onmouseout="this.style.background=\'\'">'
            +'<td style="padding:8px 10px;color:var(--muted);white-space:nowrap;">'+r.loc+'</td>'
            +'<td style="padding:8px 10px;"><div style="font-weight:700;">'+r.name+'</div><div style="font-size:10px;color:var(--muted);">'+r.class+'</div></td>'
            +'<td style="padding:8px 10px;"><span style="font-size:10px;font-weight:800;padding:2px 8px;border-radius:3px;background:rgba(255,255,255,.05);color:'+evColor+';">'+evLabel+'</span></td>'
            +'<td style="padding:8px 10px;color:var(--muted);font-size:11px;">'+_rmLinkPoke(r.note)+'</td>'
            +'</tr>';
        }).join('')
      +'</tbody></table></div>';
  }

  function render() {
    el.innerHTML = '<div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;align-items:center;">'
      +'<div id="rm-game-btns" style="display:contents;">'
      + GAMES_LIST.map(function(g){
          var active=g===selGame;
          var color = g==='Sinnoh'?'var(--diamond,#4D90E0)':'var(--heartgold,#E5B928)';
          return '<button onclick="rmSetGame(\''+g+'\')" style="padding:6px 14px;font-size:11px;font-weight:700;background:'+(active?color:'var(--panel)')+';color:'+(active?'#000':'var(--text)')+';border:1px solid '+(active?color:'var(--border)')+';border-radius:5px;cursor:pointer;">'+g+'</button>';
        }).join('')
      +'</div>'
      +'<input id="rm-search" type="text" placeholder="Search location, trainer…" oninput="rmSearch(this.value)"'
      +' style="flex:1;min-width:160px;max-width:280px;padding:6px 10px;background:var(--card);border:1px solid var(--border);border-radius:5px;color:var(--text);font-size:12px;font-family:\'Nunito\',sans-serif;"'
      +' value="'+searchQ.replace(/"/g,'&quot;')+'">'
      +'</div>'
      +'<div style="font-size:11px;color:var(--muted);margin-bottom:12px;line-height:1.7;">'
      +(selGame==='Sinnoh'?'<strong style="color:var(--game-color,var(--gold));">VS Seeker</strong> — obtained in Eterna City; rebuy from Veilstone Department Store. Re-challenges trainers in your sight range after ~50 steps of charging. Trainer levels scale with Badge count. Premier EV farms: Geodude line (Atk), Magnemite line (SpA), Cherubi (HP), Roselia (SpA+SpD).'
        :'<strong style="color:var(--game-color,var(--gold));">PokéGear Phone Calls</strong> — HGSS uses no VS Seeker. Trainers register YOUR number after the first battle (you must accept). They then call YOU when they want a rematch — many calls are tied to specific days of the week or times of day. Use the PokéGear card list to track who has registered. Some callers (Wade/berry, Beverly/items) also gift items.')
      +'</div>'
      + renderTable();
  }

  window.rmSetGame = function(g) { selGame=g; searchQ=''; render(); };
  window.rmSearch  = function(q) { searchQ=q; render(); };
  render();
}
