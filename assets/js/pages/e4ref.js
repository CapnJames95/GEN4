function buildE4RefPage() {
  var el = document.getElementById('e4ref-content');
  if (!el) return;

  var TYPE_COLORS = {normal:'#9E9E9E',fire:'#E8501A',water:'#1B8FE8',grass:'#3DA83D',electric:'#D4A800',ice:'#60C8C8',fighting:'#B83020',poison:'#8B3099',ground:'#8B6840',flying:'#6850C0',psychic:'#D01868',bug:'#78A810',rock:'#807840',ghost:'#4030A0',dragon:'#5038E8',dark:'#403030',steel:'#9898A8'};

  function typePill(t) {
    return '<span style="display:inline-block;font-size:8px;font-weight:800;padding:1px 5px;border-radius:3px;text-transform:uppercase;background:'+(TYPE_COLORS[t]||'#666')+';color:#fff;margin:1px;">'+t+'</span>';
  }

  function pokeChip(p) {
    var types = (p.types||[]).map(typePill).join('');
    return '<div onclick="_openDexSearch(\''+p.name+'\','+p.num+')" style="display:inline-flex;flex-direction:column;align-items:center;padding:8px 10px;background:var(--card);border:1px solid var(--border);border-radius:8px;cursor:pointer;min-width:72px;text-align:center;transition:border-color .12s;" onmouseover="this.style.borderColor=\'var(--gold)\'" onmouseout="this.style.borderColor=\'var(--border)\'">'
      +'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+p.num+'.png" width="48" height="48" style="image-rendering:pixelated;">'
      +'<div style="font-size:10px;font-weight:800;color:var(--text);white-space:nowrap;">'+p.name+'</div>'
      +'<div style="font-size:9px;color:var(--gold);">Lv '+p.lv+'</div>'
      +(p.held?'<div style="font-size:8px;color:var(--muted);">@'+p.held+'</div>':'')
      +'<div style="margin-top:2px;">'+types+'</div>'
      +'</div>';
  }

  function trainerCard(t) {
    var badgeColor = {'Bug':'#78A810','Ground':'#8B6840','Fire':'#E8501A','Psychic':'#D01868','Mixed':'var(--gold)','Champion':'var(--gold)','Poison':'#8B3099','Fighting':'#B83020','Dark':'#403030','Dragon':'#5038E8'}[t.type] || 'var(--gold)';
    return '<div class="panel" style="padding:16px;margin-bottom:16px;border-left:4px solid '+badgeColor+';">'
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">'
      +'<div><div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:var(--text);">'+t.name+'</div>'
      +'<div style="font-size:11px;color:var(--muted);margin-top:3px;">'+t.class+' &nbsp;·&nbsp; Specialises in <span style="color:'+badgeColor+'">'+t.type+'</span></div>'
      +(t.note?'<div style="font-size:10px;color:var(--muted);margin-top:2px;font-style:italic;">'+t.note+'</div>':'')
      +'</div>'
      +'<div style="margin-left:auto;text-align:right;">'
      +'<div style="font-size:10px;color:var(--muted);">Weaknesses</div>'
      +'<div>'+t.weak.map(typePill).join('')+'</div>'
      +'</div></div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:8px;">'
      + t.team.map(pokeChip).join('')
      +'</div></div>';
  }

  // ─── Sinnoh Elite Four — Diamond / Pearl (first challenge) ───────────────────
  // Verified against Bulbapedia trainer pages 2025-04.
  var DPPt_DP = [
    {name:'Aaron',class:'Elite Four',type:'Bug',weak:['fire','flying','rock'],
     team:[
       {num:269,name:'Dustox',   lv:53,types:['bug','poison']},
       {num:267,name:'Beautifly',lv:53,types:['bug','flying']},
       {num:416,name:'Vespiquen',lv:54,types:['bug','flying']},
       {num:214,name:'Heracross',lv:54,types:['bug','fighting']},
       {num:452,name:'Drapion',  lv:57,types:['poison','dark'],held:'Sitrus Berry'}
     ]},
    {name:'Bertha',class:'Elite Four',type:'Ground',weak:['water','grass','ice'],
     team:[
       {num:195,name:'Quagsire', lv:55,types:['water','ground']},
       {num:185,name:'Sudowoodo',lv:56,types:['rock']},
       {num:76, name:'Golem',    lv:56,types:['rock','ground']},
       {num:340,name:'Whiscash', lv:55,types:['water','ground']},
       {num:450,name:'Hippowdon',lv:59,types:['ground'],held:'Sitrus Berry'}
     ]},
    {name:'Flint',class:'Elite Four',type:'Fire',weak:['water','ground','rock'],
     team:[
       {num:78, name:'Rapidash', lv:58,types:['fire']},
       {num:208,name:'Steelix',  lv:57,types:['steel','ground']},
       {num:426,name:'Drifblim', lv:58,types:['ghost','flying']},
       {num:428,name:'Lopunny',  lv:57,types:['normal']},
       {num:392,name:'Infernape',lv:61,types:['fire','fighting'],held:'Sitrus Berry'}
     ]},
    {name:'Lucian',class:'Elite Four',type:'Psychic',weak:['bug','ghost','dark'],
     team:[
       {num:122,name:'Mr. Mime', lv:59,types:['psychic']},
       {num:203,name:'Girafarig',lv:59,types:['normal','psychic']},
       {num:308,name:'Medicham', lv:60,types:['fighting','psychic']},
       {num:65, name:'Alakazam', lv:60,types:['psychic']},
       {num:437,name:'Bronzong', lv:63,types:['steel','psychic'],held:'Sitrus Berry'}
     ]},
    {name:'Cynthia',class:'Champion',type:'Mixed',weak:['varies'],
     note:'Sinnoh Champion — diverse coverage with no single shared weakness',
     team:[
       {num:442,name:'Spiritomb', lv:61,types:['ghost','dark']},
       {num:407,name:'Roserade',  lv:60,types:['grass','poison']},
       {num:423,name:'Gastrodon', lv:60,types:['water','ground']},
       {num:448,name:'Lucario',   lv:63,types:['fighting','steel']},
       {num:350,name:'Milotic',   lv:63,types:['water']},
       {num:445,name:'Garchomp',  lv:66,types:['dragon','ground'],held:'Sitrus Berry'}
     ]}
  ];

  // ─── Sinnoh Elite Four — Platinum (first challenge) ───────────────────────────
  // Verified against Bulbapedia trainer pages 2025-04. Lower levels than DP since
  // Cyrus is fought at the Distortion World, but teams are upgraded compositionally.
  var DPPt_Pt = [
    {name:'Aaron',class:'Elite Four',type:'Bug',weak:['fire','flying','rock'],
     team:[
       {num:469,name:'Yanmega', lv:49,types:['bug','flying']},
       {num:212,name:'Scizor',  lv:49,types:['bug','steel']},
       {num:416,name:'Vespiquen',lv:50,types:['bug','flying']},
       {num:214,name:'Heracross',lv:51,types:['bug','fighting']},
       {num:452,name:'Drapion', lv:53,types:['poison','dark'],held:'Sitrus Berry'}
     ]},
    {name:'Bertha',class:'Elite Four',type:'Ground',weak:['water','grass','ice'],
     team:[
       {num:340,name:'Whiscash', lv:50,types:['water','ground']},
       {num:472,name:'Gliscor',  lv:53,types:['ground','flying']},
       {num:450,name:'Hippowdon',lv:52,types:['ground']},
       {num:76, name:'Golem',    lv:52,types:['rock','ground']},
       {num:464,name:'Rhyperior',lv:55,types:['ground','rock'],held:'Sitrus Berry'}
     ]},
    {name:'Flint',class:'Elite Four',type:'Fire',weak:['water','ground','rock'],
     team:[
       {num:229,name:'Houndoom', lv:52,types:['dark','fire']},
       {num:136,name:'Flareon',  lv:55,types:['fire']},
       {num:78, name:'Rapidash', lv:53,types:['fire']},
       {num:392,name:'Infernape',lv:55,types:['fire','fighting']},
       {num:467,name:'Magmortar',lv:57,types:['fire'],held:'Sitrus Berry'}
     ]},
    {name:'Lucian',class:'Elite Four',type:'Psychic',weak:['bug','ghost','dark'],
     team:[
       {num:122,name:'Mr. Mime', lv:53,types:['psychic']},
       {num:196,name:'Espeon',   lv:55,types:['psychic']},
       {num:437,name:'Bronzong', lv:54,types:['steel','psychic']},
       {num:65, name:'Alakazam', lv:56,types:['psychic']},
       {num:475,name:'Gallade',  lv:59,types:['psychic','fighting'],held:'Sitrus Berry'}
     ]},
    {name:'Cynthia',class:'Champion',type:'Mixed',weak:['varies'],
     note:'Platinum — Togekiss replaces Roserade as her aerial threat; Garchomp drops to L62',
     team:[
       {num:442,name:'Spiritomb', lv:58,types:['ghost','dark']},
       {num:407,name:'Roserade',  lv:58,types:['grass','poison']},
       {num:468,name:'Togekiss',  lv:60,types:['normal','flying']},
       {num:448,name:'Lucario',   lv:60,types:['fighting','steel']},
       {num:350,name:'Milotic',   lv:58,types:['water']},
       {num:445,name:'Garchomp',  lv:62,types:['dragon','ground'],held:'Sitrus Berry'}
     ]}
  ];

  // ─── Johto Elite Four — HeartGold / SoulSilver (first challenge) ──────────────
  // Verified against Bulbapedia 2025-04. Round 2 (post-Red on Mt. Silver) levels are
  // significantly higher and not shown here.
  var HGSS = [
    {name:'Will',class:'Elite Four',type:'Psychic',weak:['bug','ghost','dark'],
     team:[
       {num:178,name:'Xatu',     lv:40,types:['psychic','flying']},
       {num:124,name:'Jynx',     lv:41,types:['ice','psychic']},
       {num:80, name:'Slowbro',  lv:41,types:['water','psychic']},
       {num:103,name:'Exeggutor',lv:41,types:['grass','psychic']},
       {num:178,name:'Xatu',     lv:42,types:['psychic','flying']}
     ]},
    {name:'Koga',class:'Elite Four',type:'Poison',weak:['psychic','ground'],
     team:[
       {num:168,name:'Ariados',   lv:40,types:['bug','poison']},
       {num:205,name:'Forretress',lv:43,types:['bug','steel']},
       {num:89, name:'Muk',       lv:42,types:['poison']},
       {num:49, name:'Venomoth',  lv:41,types:['bug','poison']},
       {num:169,name:'Crobat',    lv:44,types:['poison','flying']}
     ]},
    {name:'Bruno',class:'Elite Four',type:'Fighting',weak:['flying','psychic'],
     team:[
       {num:237,name:'Hitmontop', lv:42,types:['fighting']},
       {num:106,name:'Hitmonlee', lv:42,types:['fighting']},
       {num:107,name:'Hitmonchan',lv:42,types:['fighting']},
       {num:95, name:'Onix',      lv:43,types:['rock','ground']},
       {num:68, name:'Machamp',   lv:46,types:['fighting']}
     ]},
    {name:'Karen',class:'Elite Four',type:'Dark',weak:['fighting','bug'],
     team:[
       {num:197,name:'Umbreon',   lv:42,types:['dark']},
       {num:45, name:'Vileplume', lv:42,types:['grass','poison']},
       {num:198,name:'Murkrow',   lv:44,types:['dark','flying']},
       {num:94, name:'Gengar',    lv:45,types:['ghost','poison']},
       {num:229,name:'Houndoom',  lv:47,types:['dark','fire']}
     ]},
    {name:'Lance',class:'Champion',type:'Dragon',weak:['ice','dragon'],
     note:'Indigo Plateau Champion — three Dragonite threats, plus Charizard from his Kanto past',
     team:[
       {num:130,name:'Gyarados',  lv:46,types:['water','flying']},
       {num:149,name:'Dragonite', lv:49,types:['dragon','flying']},
       {num:149,name:'Dragonite', lv:49,types:['dragon','flying']},
       {num:142,name:'Aerodactyl',lv:48,types:['rock','flying']},
       {num:6,  name:'Charizard', lv:48,types:['fire','flying']},
       {num:149,name:'Dragonite', lv:50,types:['dragon','flying']}
     ]}
  ];

  var GAMES = {
    dp: { label:'💎 Diamond / 🌸 Pearl', color:'var(--diamond)', trainers: DPPt_DP },
    pt: { label:'⚙ Platinum',            color:'var(--platinum)', trainers: DPPt_Pt },
    hgss: { label:'💛 HeartGold / 🤍 SoulSilver', color:'var(--heartgold)', trainers: HGSS }
  };

  // Map global GAME slot → which E4 set to display.
  // Internal slots FR/LG/R/S/E now mean Diamond/Pearl/Platinum/HeartGold/SoulSilver.
  var _e4GameMap = {FR:'dp', LG:'dp', R:'pt', S:'hgss', E:'hgss'};
  var selGame = (typeof GAME !== 'undefined' && GAME !== 'all' && _e4GameMap[GAME]) ? _e4GameMap[GAME] : 'dp';

  function render() {
    var game = GAMES[selGame];
    el.innerHTML = '<div id="e4-game-btns" style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap;">'
      + Object.keys(GAMES).map(function(k){
          var g=GAMES[k]; var active=k===selGame;
          return '<button onclick="e4SetGame(\''+k+'\')" style="padding:7px 16px;font-size:11px;font-weight:700;background:'+(active?g.color:'var(--panel)')+';color:'+(active?'#000':'var(--text)')+';border:1px solid '+(active?g.color:'var(--border)')+';border-radius:5px;cursor:pointer;">'+g.label+'</button>';
        }).join('')
      +'</div>'
      +'<div style="background:color-mix(in srgb,var(--game-color,var(--gold)) 6%,transparent);border:1px solid color-mix(in srgb,var(--game-color,var(--gold)) 20%,transparent);border-radius:6px;padding:10px 14px;margin-bottom:16px;font-size:11px;color:var(--muted);line-height:1.7;">'
      +(selGame==='hgss'
        ? 'Levels shown are for the <strong style="color:var(--game-color,var(--gold));">first challenge</strong>. After defeating Red on Mt. Silver, the Elite Four levels jump significantly (Round 2). Click any Pokémon to jump to its Pokédex entry.'
        : 'Levels shown are for the <strong style="color:var(--game-color,var(--gold));">first challenge</strong>. Click any Pokémon to jump to its Pokédex entry. Platinum upgrades several teams compositionally — Aaron drops Dustox/Beautifly for Yanmega/Scizor, Lucian\'s ace becomes Gallade, Cynthia swaps Roserade for Togekiss.')
      +'</div>'
      + game.trainers.map(trainerCard).join('');
  }

  window.e4SetGame = function(k) { selGame=k; render(); };
  render();
}
