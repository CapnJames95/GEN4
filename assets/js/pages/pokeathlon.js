// Pokéathlon (HGSS) reference page.
// Sources: Bulbapedia "Pokéathlon" (https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon)
//          Bulbapedia "Aprijuice" (https://bulbapedia.bulbagarden.net/wiki/Aprijuice)
// HGSS only — page hides itself when a DPPt slot is active.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.

(function(){
  // The 5 Athletic stats. Derivations described directionally per Bulbapedia.
  var STATS = [
    { key:'speed',   name:'Speed',   tint:'#7ec8ff', from:'base Speed',
      role:'Fast events and dodging — rewards raw base Speed.' },
    { key:'power',   name:'Power',   tint:'#ff8a7a', from:'base Attack + Sp. Atk',
      role:'Strength and push events — rewards offensive bulk.' },
    { key:'skill',   name:'Skill',   tint:'#ffd977', from:'base Defense + Sp. Def',
      role:'Precision and aim events — rewards defensive stats.' },
    { key:'stamina', name:'Stamina', tint:'#9bf09b', from:'base HP',
      role:'Endurance events — rewards high HP.' },
    { key:'jump',    name:'Jump',    tint:'#d6a8ff', from:'base Speed (scaled by accuracy)',
      role:'Jumping events — favours nimble, light-feeling Pokémon.' }
  ];

  // The 10 Pokéathlon events, grouped Course / Field / Stadium.
  var EVENTS = [
    { group:'Course',  name:'Hurdle Dash',     stat:'Speed',   desc:'Sprint and time hurdle jumps. Pure footrace with timing windows.' },
    { group:'Course',  name:'Pennant Capture', stat:'Speed',   desc:'Grab pennants around the field; speed lets you reach more before the timer.' },
    { group:'Course',  name:'Relay Run',       stat:'Speed',   desc:'Three-Pokémon relay race with baton handoffs.' },
    { group:'Field',   name:'Block Smash',     stat:'Power',   desc:'Smash stacked blocks with strikes — more Power = more blocks per hit.' },
    { group:'Field',   name:'Lamp Jump',       stat:'Jump',    desc:'Time jumps to land on rising lamps without falling off.' },
    { group:'Field',   name:'Disc Catch',      stat:'Skill',   desc:'Catch flying discs by lining up under them — precision over speed.' },
    { group:'Stadium', name:'Goal Roll',       stat:'Power',   desc:'Push a giant ball into the opposing goal in a 3v3 melee.' },
    { group:'Stadium', name:'Snow Throw',      stat:'Skill',   desc:'Aim and pelt rivals across a divided arena with snowballs.' },
    { group:'Stadium', name:'Ring Drop',       stat:'Power',   desc:'Sumo-style — push opponents off a shrinking platform.' },
    { group:'Stadium', name:'Push Pull',       stat:'Stamina', desc:'Tug-of-war style block pushing; sustained effort beats burst power.' }
  ];

  // Hardcoded top performers per athletic stat (well-known Gen 4 picks).
  var TOPS = {
    speed:   [ {num:291, name:'Ninjask',   note:'Base Speed 160 — fastest in Gen 4.'},
               {num:101, name:'Electrode', note:'Base Speed 140.'},
               {num:169, name:'Crobat',    note:'Base Speed 130.'} ],
    power:   [ {num:289, name:'Slaking',   note:'Base Attack 160.'},
               {num:409, name:'Rampardos', note:'Base Attack 165 — highest physical Attack in Gen 4.'},
               {num:464, name:'Rhyperior', note:'Base Attack 140 + huge Sp. Atk pool via moves.'} ],
    skill:   [ {num:437, name:'Bronzong',  note:'Base 116/116 defenses.'},
               {num:227, name:'Skarmory',  note:'Base 140 Defense.'} ],
    stamina: [ {num:242, name:'Blissey',   note:'Base HP 255 — highest in the game.'},
               {num:143, name:'Snorlax',   note:'Base HP 160.'} ],
    jump:    [ {num:417, name:'Pachirisu', note:'Light, nimble — community favourite for Lamp Jump.'},
               {num:300, name:'Skitty',    note:'Tiny frame jumps cleanly between lamps.'} ]
  };

  // Apricorn flavour → stat mapping (Aprijuice).
  var APRIJUICE = [
    { color:'Red',    swatch:'#e85a5a', stat:'Power',   note:'Mash red apricorns at the Juice Shoppe in Cianwood for Power-boosting juice.' },
    { color:'Yellow', swatch:'#f4d35e', stat:'Speed',   note:'Yellow apricorns push Speed.' },
    { color:'Pink',   swatch:'#f5a6c7', stat:'Skill',   note:'Pink apricorns sharpen Skill.' },
    { color:'White',  swatch:'#f0f0f0', stat:'Stamina', note:'White apricorns boost Stamina.' },
    { color:'Green',  swatch:'#7fc97f', stat:'Jump',    note:'Green apricorns lift Jump.' }
  ];

  function buildPokeathlonPage() {
    var el = document.getElementById('pokeathlon-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    // Athletic stats table
    var statsRows = STATS.map(function(s){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;color:' + s.tint + '">' + s.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + s.from + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px">' + s.role + '</td>'
        + '</tr>';
    }).join('');

    var statsTable = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:96px">STAT</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:180px">DERIVED FROM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ROLE IN EVENTS</th>'
      + '</tr></thead><tbody>' + statsRows + '</tbody></table>';

    // Events table
    var groupColor = { 'Course':'#7ec8ff', 'Field':'#9bf09b', 'Stadium':'#ffd977' };
    var eventRows = EVENTS.map(function(e){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + (groupColor[e.group] || gameColor) + '">' + e.group.toUpperCase() + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + e.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;font-weight:700">' + e.stat + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + e.desc + '</td>'
        + '</tr>';
    }).join('');

    var eventsTable = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:80px">GROUP</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">EVENT</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:80px">STAT</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">DESCRIPTION</th>'
      + '</tr></thead><tbody>' + eventRows + '</tbody></table>';

    // Top performers — clickable Pokémon cards grouped by stat
    function pokeChip(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var safeName = p.name.replace(/'/g, "\\'");
      var click = "_openDexSearch('" + safeName + "', " + p.num + ")";
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border);border-radius:6px;cursor:pointer;background:rgba(255,255,255,0.02);transition:background 0.12s" '
        + 'onmouseover="this.style.background=\'rgba(255,255,255,0.06)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.02)\'" '
        + 'onclick="' + click + '" title="Open in Pokédex">'
        + '<img src="' + sprite + '" width="36" height="36" style="image-rendering:pixelated">'
        + '<div style="min-width:0">'
        + '<div style="font-weight:800;font-size:12px">' + p.name + '</div>'
        + '<div style="font-size:10px;color:var(--muted);line-height:1.4">' + p.note + '</div>'
        + '</div>'
        + '</div>';
    }

    var topsHtml = STATS.map(function(s){
      var list = TOPS[s.key] || [];
      var chips = list.map(pokeChip).join('');
      return '<div style="margin-bottom:14px">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + s.tint + ';letter-spacing:0.5px;margin-bottom:8px">' + s.name.toUpperCase() + '</div>'
        + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">' + chips + '</div>'
        + '</div>';
    }).join('');

    // Medal thresholds (approximate)
    var medalsHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">MEDAL</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">APPROX. WINS</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>'
      + '<tr><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;color:#cd7f32">Bronze</td><td style="padding:7px 12px;border-bottom:1px solid var(--border)">≤ 5 wins per event</td><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">Awarded for completing the event a handful of times.</td></tr>'
      + '<tr><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;color:#c0c0c0">Silver</td><td style="padding:7px 12px;border-bottom:1px solid var(--border)">6 – 10 wins</td><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">Steady winners get bumped up.</td></tr>'
      + '<tr><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;color:#ffd977">Gold</td><td style="padding:7px 12px;border-bottom:1px solid var(--border)">11+ wins</td><td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">Top-tier achievement per event.</td></tr>'
      + '</tbody></table>';

    // Aprijuice
    var juiceRows = APRIJUICE.map(function(a){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:' + a.swatch + ';border:1px solid var(--border);vertical-align:middle;margin-right:8px"></span><span style="font-weight:700">' + a.color + '</span></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800">' + a.stat + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + a.note + '</td>'
        + '</tr>';
    }).join('');

    var juiceTable = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:140px">APRICORN</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:100px">BOOSTS</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + juiceRows + '</tbody></table>';

    // Assemble final HTML
    var html = ''
      // Intro
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'HeartGold &amp; SoulSilver only. The <strong>Pokéathlon Dome</strong> sits at the <strong>National Park</strong> '
      + 'just north of <strong>Goldenrod City</strong>, and is open on <strong>specific days of the week</strong> '
      + '(the rotation of events changes daily). Bring a team of three Pokémon and compete in athletic events. '
      + 'Each Pokémon has five <strong>Athletic stats</strong> — Power, Speed, Skill, Stamina, and Jump — derived '
      + 'from its base stats. Boost them on the day with <strong>Aprijuice</strong>, made by mashing <strong>Apricorns</strong> '
      + 'at the <strong>Juice Shoppe in Cianwood City</strong>. Different apricorn colours boost different stats.'
      + '</div>'

      // Athletic stats
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">THE 5 ATHLETIC STATS</div>'
      + '<div style="padding:8px 0">' + statsTable + '</div>'
      + '</div>'

      // Events
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">THE 10 EVENTS (COURSE / FIELD / STADIUM)</div>'
      + '<div style="padding:8px 0">' + eventsTable + '</div>'
      + '</div>'

      // Top performers
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">TOP PERFORMERS PER STAT</div>'
      + '<div style="padding:14px;">'
      + '<div style="font-size:11px;color:var(--muted);margin-bottom:14px;line-height:1.6">Click any Pokémon to open it in the Pokédex. These are reference picks based on Gen 4 base stats.</div>'
      + topsHtml
      + '</div>'
      + '</div>'

      // Medals
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">MEDAL THRESHOLDS (APPROXIMATE)</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Pokéathlon medals are awarded per event for accumulating wins. The exact internal counters vary, but the rough tiers are:'
      + '</div>'
      + '<div style="padding:8px 0">' + medalsHtml + '</div>'
      + '</div>'

      // Aprijuice
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">APRICORN JUICE (APRIJUICE)</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Mash <strong>apricorns</strong> at the Juice Shoppe in <strong>Cianwood City</strong> to brew <strong>Aprijuice</strong>. '
      + 'Each colour boosts one Athletic stat for the day. See the <a href="#" onclick="if(window.showPage){showPage(\'apricorns\');}return false;" style="color:' + gameColor + ';text-decoration:underline">Apricorns page</a> for where to find each colour.'
      + '</div>'
      + '<div style="padding:8px 0">' + juiceTable + '</div>'
      + '</div>'

      // Strategy tips
      + '<div class="panel" style="padding:14px;overflow:hidden;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:10px">STRATEGY TIPS</div>'
      + '<ul style="margin:0;padding-left:20px;font-size:12px;line-height:1.8;color:var(--text)">'
      + '<li>You enter <strong>three Pokémon per event</strong> — team-building matters as much as individual stats. Cover multiple Athletic stats so one team can survive a varied lineup.</li>'
      + '<li>You can apply <strong>Aprijuice to up to 3 Athletic stats per Pokémon per day</strong>. Pick the stats the day&rsquo;s events actually need rather than spreading thin.</li>'
      + '<li>The Dome runs <strong>different event sets on different days</strong>. Check the schedule on entry — bring a team built for today&rsquo;s rotation, not a generic one.</li>'
      + '<li>Speed-heavy mons (Ninjask, Electrode, Crobat) carry the Course group; bulky HP/defense mons (Blissey, Bronzong) carry Stamina and Skill events.</li>'
      + '<li>Aprijuice quality scales with how well you mash — mini-game performance matters.</li>'
      + '</ul>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildPokeathlonPage = buildPokeathlonPage;
})();
