function buildSafariZonePage() {
  var el = document.getElementById('safari-content');
  if (!el) return;

  // Encounter rows are sourced from Bulbapedia (Great Marsh + Johto Safari Zone).
  // Catch rates (cr) are the species' standard Gen-4 capture rate.
  // Flee rates are not officially documented per-area for Gen 4 Safari Zones the
  // way Gen 3 was, so a conservative default of 60 is used and the UI flags this.
  // Rate strings are omitted where Bulbapedia does not give an exact %.

  var DEFAULT_FLEE = 60;

  var SAFARI_GAMES = {
    marsh: {
      label: '🟦 D / 🟪 P / ⬜ Pt — Great Marsh (Pastoria City)',
      color: 'var(--diamond)',
      steps: 500,
      balls: 30,
      blurb: 'Great Marsh — Pastoria City, Sinnoh. 500 step limit, 30 Safari Balls, ₽500 entry. ' +
             'Six areas connected by a tram. Two Pokémon are placed on a daily-rotation slot ' +
             '(check the observation deck binoculars to see today\'s pair). Bait/Mud Slap mechanics replace Gen 3 rocks/bait.',
      areas: [
        { name:'Areas 1 & 2 (Grass)', pokemon:[
          {num:54, name:'Psyduck',   cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:114,name:'Tangela',   cr:45,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:163,name:'Hoothoot',  cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:164,name:'Noctowl',   cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:193,name:'Yanma',     cr:75,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:195,name:'Quagsire',  cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:298,name:'Azurill',   cr:150, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:357,name:'Tropius',   cr:200, flee:DEFAULT_FLEE, rate:'rare'},
          {num:396,name:'Starly',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:399,name:'Bidoof',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:400,name:'Bibarel',   cr:127, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:406,name:'Budew',     cr:255, flee:DEFAULT_FLEE, rate:'uncommon'}
        ]},
        { name:'Areas 3 & 4 (Grass)', pokemon:[
          {num:54, name:'Psyduck',   cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:114,name:'Tangela',   cr:45,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:163,name:'Hoothoot',  cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:164,name:'Noctowl',   cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:193,name:'Yanma',     cr:75,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:195,name:'Quagsire',  cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:298,name:'Azurill',   cr:150, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:396,name:'Starly',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:399,name:'Bidoof',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:400,name:'Bibarel',   cr:127, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:406,name:'Budew',     cr:255, flee:DEFAULT_FLEE, rate:'uncommon'}
        ]},
        { name:'Area 5 (Grass)', pokemon:[
          {num:114,name:'Tangela',   cr:45,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:163,name:'Hoothoot',  cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:193,name:'Yanma',     cr:75,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:195,name:'Quagsire',  cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:298,name:'Azurill',   cr:150, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:396,name:'Starly',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:399,name:'Bidoof',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:400,name:'Bibarel',   cr:127, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:406,name:'Budew',     cr:255, flee:DEFAULT_FLEE, rate:'uncommon'}
        ]},
        { name:'Area 6 (Grass)', pokemon:[
          {num:54, name:'Psyduck',   cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:114,name:'Tangela',   cr:45,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:163,name:'Hoothoot',  cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'common'},
          {num:193,name:'Yanma',     cr:75,  flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:195,name:'Quagsire',  cr:90,  flee:DEFAULT_FLEE, rate:'rare'},
          {num:298,name:'Azurill',   cr:150, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:396,name:'Starly',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:399,name:'Bidoof',    cr:255, flee:DEFAULT_FLEE, rate:'common'},
          {num:400,name:'Bibarel',   cr:127, flee:DEFAULT_FLEE, rate:'uncommon'},
          {num:406,name:'Budew',     cr:255, flee:DEFAULT_FLEE, rate:'uncommon'}
        ]},
        { name:'All Areas — Surf', pokemon:[
          {num:54, name:'Psyduck',  cr:190, flee:DEFAULT_FLEE, rate:'surf'},
          {num:183,name:'Marill',   cr:190, flee:DEFAULT_FLEE, rate:'surf'},
          {num:194,name:'Wooper',   cr:255, flee:DEFAULT_FLEE, rate:'surf'},
          {num:195,name:'Quagsire', cr:90,  flee:DEFAULT_FLEE, rate:'surf'}
        ]},
        { name:'All Areas — Fishing', pokemon:[
          {num:129,name:'Magikarp',  cr:255, flee:DEFAULT_FLEE, rate:'old/good rod'},
          {num:130,name:'Gyarados',  cr:45,  flee:DEFAULT_FLEE, rate:'super rod'},
          {num:339,name:'Barboach',  cr:190, flee:DEFAULT_FLEE, rate:'good/super rod'},
          {num:318,name:'Carvanha',  cr:225, flee:DEFAULT_FLEE, rate:'super rod'},
          {num:340,name:'Whiscash',  cr:75,  flee:DEFAULT_FLEE, rate:'super rod'}
        ]},
        { name:'Daily Rotation (binoculars)', pokemon:[
          {num:46, name:'Paras',     cr:190, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:102,name:'Exeggcute', cr:90,  flee:DEFAULT_FLEE, rate:'rotation'},
          {num:115,name:'Kangaskhan',cr:45,  flee:DEFAULT_FLEE, rate:'rotation'},
          {num:285,name:'Shroomish', cr:190, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:298,name:'Azurill',   cr:150, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:315,name:'Roselia',   cr:150, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:316,name:'Gulpin',    cr:225, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:318,name:'Carvanha',  cr:225, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:339,name:'Barboach',  cr:190, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:340,name:'Whiscash',  cr:75,  flee:DEFAULT_FLEE, rate:'rotation'},
          {num:352,name:'Kecleon',   cr:200, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:451,name:'Skorupi',   cr:120, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:452,name:'Drapion',   cr:45,  flee:DEFAULT_FLEE, rate:'rotation'},
          {num:453,name:'Croagunk',  cr:140, flee:DEFAULT_FLEE, rate:'rotation'},
          {num:454,name:'Toxicroak', cr:75,  flee:DEFAULT_FLEE, rate:'rotation'},
          {num:455,name:'Carnivine', cr:200, flee:DEFAULT_FLEE, rate:'rotation'}
        ]}
      ]
    },
    johto: {
      label: '💛 HG / 🩶 SS — Johto Safari Zone (NW of Cianwood)',
      color: 'var(--heartgold)',
      steps: 0, // no step limit
      balls: 30,
      blurb: 'Johto Safari Zone — Route 48, northwest of Cianwood. 30 Safari Balls, ₽500 entry, NO step limit. ' +
             'Six default zones (Peak / Desert / Plains / Meadow / Forest / Swamp); six more unlock later (Mountain, Rocky Beach, Marshland, Wasteland, Savannah, Wetland). ' +
             'Customise areas by placing up to 30 blocks (Plains / Forest / Peak / Water / Decoration). Block counts and days-active alter spawns — e.g. Fearow will not appear in Peak unless 5 Forest objects are placed there. Effectiveness multiplier scales up to 7× after 250 days.',
      areas: [
        { name:'Peak (Grass)', pokemon:[
          {num:74, name:'Geodude',   cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:75, name:'Graveler',  cr:120, flee:DEFAULT_FLEE, rate:'default'},
          {num:81, name:'Magnemite', cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:82, name:'Magneton',  cr:60,  flee:DEFAULT_FLEE, rate:'default'},
          {num:126,name:'Magmar',    cr:75,  flee:DEFAULT_FLEE, rate:'default'},
          {num:202,name:'Wobbuffet', cr:45,  flee:DEFAULT_FLEE, rate:'default'}
        ]},
        { name:'Desert (Grass)', pokemon:[
          {num:22, name:'Fearow',    cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:27, name:'Sandshrew', cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:28, name:'Sandslash', cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:104,name:'Cubone',    cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:105,name:'Marowak',   cr:75,  flee:DEFAULT_FLEE, rate:'default'}
        ]},
        { name:'Plains (Grass)', pokemon:[
          {num:19, name:'Rattata',   cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:20, name:'Raticate',  cr:127, flee:DEFAULT_FLEE, rate:'default'},
          {num:63, name:'Abra',      cr:200, flee:DEFAULT_FLEE, rate:'default'},
          {num:203,name:'Girafarig', cr:60,  flee:DEFAULT_FLEE, rate:'default'},
          {num:234,name:'Stantler',  cr:45,  flee:DEFAULT_FLEE, rate:'default'},
          {num:235,name:'Smeargle',  cr:45,  flee:DEFAULT_FLEE, rate:'default'}
        ]},
        { name:'Meadow (Grass)', pokemon:[
          {num:35, name:'Clefairy',  cr:150, flee:DEFAULT_FLEE, rate:'default'},
          {num:39, name:'Jigglypuff',cr:170, flee:DEFAULT_FLEE, rate:'default'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:187,name:'Hoppip',    cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:188,name:'Skiploom',  cr:120, flee:DEFAULT_FLEE, rate:'default'},
          {num:191,name:'Sunkern',   cr:235, flee:DEFAULT_FLEE, rate:'default'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'default'}
        ]},
        { name:'Meadow — Surf', pokemon:[
          {num:129,name:'Magikarp',  cr:255, flee:DEFAULT_FLEE, rate:'surf'},
          {num:183,name:'Marill',    cr:190, flee:DEFAULT_FLEE, rate:'surf'},
          {num:194,name:'Wooper',    cr:255, flee:DEFAULT_FLEE, rate:'surf'}
        ]},
        { name:'Meadow — Fishing', pokemon:[
          {num:60, name:'Poliwag',   cr:255, flee:DEFAULT_FLEE, rate:'old/good rod'},
          {num:61, name:'Poliwhirl', cr:120, flee:DEFAULT_FLEE, rate:'super rod'},
          {num:129,name:'Magikarp',  cr:255, flee:DEFAULT_FLEE, rate:'old rod'}
        ]},
        { name:'Forest (Grass)', pokemon:[
          {num:16, name:'Pidgey',    cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:43, name:'Oddish',    cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:44, name:'Gloom',     cr:120, flee:DEFAULT_FLEE, rate:'default'},
          {num:46, name:'Paras',     cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:47, name:'Parasect',  cr:75,  flee:DEFAULT_FLEE, rate:'default'},
          {num:66, name:'Machop',    cr:180, flee:DEFAULT_FLEE, rate:'default'},
          {num:67, name:'Machoke',   cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:69, name:'Bellsprout',cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:92, name:'Gastly',    cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:93, name:'Haunter',   cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:96, name:'Drowzee',   cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:97, name:'Hypno',     cr:75,  flee:DEFAULT_FLEE, rate:'default'}
        ]},
        { name:'Swamp (Grass)', pokemon:[
          {num:23, name:'Ekans',     cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:24, name:'Arbok',     cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:41, name:'Zubat',     cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:42, name:'Golbat',    cr:90,  flee:DEFAULT_FLEE, rate:'default'},
          {num:50, name:'Diglett',   cr:255, flee:DEFAULT_FLEE, rate:'default'},
          {num:79, name:'Slowpoke',  cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:80, name:'Slowbro',   cr:75,  flee:DEFAULT_FLEE, rate:'default'},
          {num:88, name:'Grimer',    cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:89, name:'Muk',       cr:75,  flee:DEFAULT_FLEE, rate:'default'},
          {num:108,name:'Lickitung', cr:45,  flee:DEFAULT_FLEE, rate:'default'},
          {num:109,name:'Koffing',   cr:190, flee:DEFAULT_FLEE, rate:'default'},
          {num:110,name:'Weezing',   cr:60,  flee:DEFAULT_FLEE, rate:'default'}
        ]}
      ]
    }
  };

  // FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver
  // FR/LG/R → Great Marsh; S/E → Johto Safari; default Marsh.
  var _szGameMap = {FR:'marsh', LG:'marsh', R:'marsh', S:'johto', E:'johto'};
  var curGame = (typeof GAME !== 'undefined' && GAME !== 'all' && _szGameMap[GAME]) ? _szGameMap[GAME] : 'marsh';
  var steps = SAFARI_GAMES[curGame].steps;
  var balls = SAFARI_GAMES[curGame].balls;
  var selectedPoke = null;

  function safariCatchProb(cr, mult) {
    var a = Math.min(255, Math.floor((cr * 1.5 * mult)));
    a = Math.max(1, a);
    var b = Math.floor(65536 / Math.pow(255 / a, 0.1875));
    return Math.min(100, Math.pow(b / 65536, 4) * 100);
  }

  function pctStr(p) { return p >= 99.9 ? '100%' : p.toFixed(1) + '%'; }

  function bar(pct, color) {
    return '<div style="display:flex;align-items:center;gap:8px;">'
      +'<div style="flex:1;height:10px;background:rgba(255,255,255,.08);border-radius:5px;overflow:hidden;">'
      +'<div style="width:'+Math.round(Math.min(100,pct))+'%;height:100%;background:'+color+';border-radius:5px;"></div></div>'
      +'<span style="font-size:11px;font-weight:700;color:'+color+';width:42px;text-align:right;">'+pctStr(pct)+'</span>'
      +'</div>';
  }

  function renderCalc() {
    if (!selectedPoke) return '<div style="color:var(--muted);font-size:12px;">Select a Pokémon from the area list below.</div>';
    var p = selectedPoke;
    var baseP  = safariCatchProb(p.cr, 1);
    var modP   = safariCatchProb(p.cr, 2);
    var baitP  = safariCatchProb(p.cr, 0.5);
    var baseF  = (p.flee / 255 * 100);
    var modF   = Math.min(100, p.flee * 2 / 255 * 100);
    var baitF  = (p.flee * 0.5 / 255 * 100);
    var isMarsh = curGame === 'marsh';
    var modLabel = isMarsh ? 'Mud → Ball' : 'Rock → Ball';
    var modNote  = isMarsh
      ? 'Mud Slap doubles catch rate but doubles flee chance this turn (Great Marsh)'
      : 'Rock doubles catch rate but doubles flee chance this turn';
    var strategies = [
      {label:'Throw Ball (no modifier)', catchP:baseP, fleeP:baseF, color:'#64b4ff'},
      {label:modLabel,                   catchP:modP,  fleeP:modF,  color:'#FF6B35', note:modNote},
      {label:'Throw Bait → Ball',        catchP:baitP, fleeP:baitF, color:'#4CAF50', note:'Bait halves flee chance next turn, but also halves catch rate'},
    ];
    return '<div class="panel" style="padding:14px 16px;margin-bottom:14px;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      +'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+p.num+'.png" width="40" height="40" style="image-rendering:pixelated;">'
      +'<div><div style="font-size:13px;font-weight:800;">'+p.name+'</div>'
      +'<div style="font-size:10px;color:var(--muted);">Catch Rate: '+p.cr+' &nbsp;|&nbsp; Base Flee (est): '+pctStr(baseF)+'</div></div></div>'
      + strategies.map(function(s){
          return '<div style="margin-bottom:10px;">'
            +'<div style="font-size:11px;font-weight:700;color:var(--text);margin-bottom:3px;">'+s.label+'</div>'
            +(s.note?'<div style="font-size:9px;color:var(--muted);margin-bottom:4px;">'+s.note+'</div>':'')
            +'<div style="display:grid;grid-template-columns:80px 1fr;gap:4px;align-items:center;">'
            +'<span style="font-size:10px;color:var(--muted);">Catch:</span>'+bar(s.catchP, s.color)
            +'<span style="font-size:10px;color:var(--muted);">Flee:</span>'+bar(s.fleeP, '#9E9E9E')
            +'</div></div>';
        }).join('')
      +'<div style="font-size:10px;color:var(--muted);margin-top:8px;line-height:1.6;">Formula assumes full HP (no damage in Safari Zone). Safari Ball has a 1.5× catch modifier built in. Per-Pokémon flee rates are not officially documented for Gen 4 Safari Zones — a default is used.</div>'
      +'</div>';
  }

  function renderAreas() {
    var game = SAFARI_GAMES[curGame];
    return game.areas.map(function(area){
      return '<div style="margin-bottom:16px;">'
        +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--game-color,var(--gold));letter-spacing:0.5px;margin-bottom:8px;">'+area.name+'</div>'
        +'<div style="display:flex;flex-wrap:wrap;gap:6px;">'
        + area.pokemon.map(function(p){
            var isSelected = selectedPoke && selectedPoke.num === p.num && selectedPoke.name === p.name;
            return '<div onclick="szSelectPoke('+p.num+',\''+p.name.replace(/'/g,"\\'")
              +'\','+p.cr+','+p.flee+')" style="display:flex;align-items:center;gap:6px;'
              +'padding:5px 10px;background:var(--card);border:1px solid '+(isSelected?'var(--game-color,var(--gold))':'var(--border)')
              +';border-radius:6px;cursor:pointer;transition:border-color .12s;">'
              +'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+p.num+'.png"'
              +' width="28" height="28" style="image-rendering:pixelated;">'
              +'<div><div style="font-size:11px;font-weight:800;color:'+(isSelected?'var(--game-color,var(--gold))':'var(--text)')+'">'+p.name+'</div>'
              +'<div style="font-size:9px;color:var(--muted);">CR '+p.cr+' &nbsp; '+p.rate+'</div></div></div>';
          }).join('')
        +'</div></div>';
    }).join('');
  }

  function renderTracker() {
    var game = SAFARI_GAMES[curGame];
    var hasSteps = game.steps > 0;
    var stepPct = hasSteps ? (steps / game.steps * 100) : 0;
    var ballPct = balls / game.balls * 100;
    return '<div class="panel" style="padding:14px 16px;margin-bottom:14px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--game-color,var(--gold));letter-spacing:0.5px;margin-bottom:12px;">SESSION TRACKER</div>'
      +'<div style="font-size:11px;color:var(--muted);margin-bottom:10px;line-height:1.55;">'+game.blurb+'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">'
      + (hasSteps
          ? '<div><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">STEPS REMAINING</div>'
            +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">'
            +'<span style="font-size:20px;font-weight:800;color:'+(steps<100?'#F44336':steps<200?'#FFC107':'var(--text)')+'">'+steps+'</span>'
            +'<span style="font-size:11px;color:var(--muted);">/ '+game.steps+'</span></div>'
            +'<div style="height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;"><div style="width:'+stepPct+'%;height:100%;background:'+(steps<100?'#F44336':'#4CAF50')+';border-radius:4px;transition:width .2s;"></div></div>'
            +'<div style="display:flex;gap:6px;margin-top:8px;">'
            +'<button onclick="szAdjStep(-50)" style="padding:4px 8px;font-size:11px;background:var(--panel);border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer;">−50</button>'
            +'<button onclick="szAdjStep(-10)" style="padding:4px 8px;font-size:11px;background:var(--panel);border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer;">−10</button>'
            +'<button onclick="szReset()" style="padding:4px 8px;font-size:11px;background:var(--panel);border:1px solid var(--border);border-radius:4px;color:var(--muted);cursor:pointer;">Reset</button>'
            +'</div></div>'
          : '<div><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">STEPS</div>'
            +'<div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px;">No step limit</div>'
            +'<div style="font-size:10px;color:var(--muted);line-height:1.5;">Johto Safari Zone has no time/step cap — only ball count limits the session.</div></div>')
      +'<div><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">SAFARI BALLS</div>'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">'
      +'<span style="font-size:20px;font-weight:800;color:'+(balls<=5?'#F44336':balls<=10?'#FFC107':'var(--text)')+'">'+balls+'</span>'
      +'<span style="font-size:11px;color:var(--muted);">/ '+game.balls+'</span></div>'
      +'<div style="height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;"><div style="width:'+ballPct+'%;height:100%;background:'+(balls<=5?'#F44336':'var(--heartgold)')+';border-radius:4px;transition:width .2s;"></div></div>'
      +'<div style="display:flex;gap:6px;margin-top:8px;">'
      +'<button onclick="szAdjBall(-1)" style="padding:4px 8px;font-size:11px;background:var(--panel);border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer;">−1 Ball</button>'
      +'<button onclick="szAdjBall(-3)" style="padding:4px 8px;font-size:11px;background:var(--panel);border:1px solid var(--border);border-radius:4px;color:var(--text);cursor:pointer;">−3 Balls</button>'
      +'</div></div>'
      +'</div></div>';
  }

  function render() {
    el.innerHTML = ''
      +'<div id="sz-game-btns" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">'
      +Object.keys(SAFARI_GAMES).map(function(k){
        var g=SAFARI_GAMES[k];
        var active=k===curGame;
        return '<button onclick="szSetGame(\''+k+'\')" style="padding:6px 14px;font-size:11px;font-weight:700;'
          +'background:'+(active?g.color:'var(--panel)')+';color:'+(active?'#000':'var(--text)')+';'
          +'border:1px solid '+(active?g.color:'var(--border)')+';border-radius:5px;cursor:pointer;">'+g.label+'</button>';
      }).join('')+'</div>'
      + renderTracker()
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--muted);letter-spacing:0.5px;margin:16px 0 10px;">CATCH PROBABILITY</div>'
      + renderCalc()
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:var(--muted);letter-spacing:0.5px;margin:16px 0 10px;">POKÉMON BY AREA — click to select</div>'
      + renderAreas();
  }

  window.szSetGame = function(k) { curGame=k; steps=SAFARI_GAMES[k].steps; balls=SAFARI_GAMES[k].balls; selectedPoke=null; render(); };
  window.szSelectPoke = function(num,name,cr,flee) { selectedPoke={num:num,name:name,cr:cr,flee:flee}; render(); };
  window.szAdjStep = function(n) { steps=Math.max(0,steps+n); render(); };
  window.szAdjBall = function(n) { balls=Math.max(0,balls+n); render(); };
  window.szReset   = function()  { var g=SAFARI_GAMES[curGame]; steps=g.steps; balls=g.balls; render(); };

  render();
}
