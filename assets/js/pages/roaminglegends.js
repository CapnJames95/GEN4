// Roaming Legendaries (DPPt + HGSS) reference page.
// Sources:
//   Bulbapedia "Roaming Pokemon" (https://bulbapedia.bulbagarden.net/wiki/Roaming_Pok%C3%A9mon)
//   Bulbapedia per-species articles: Mesprit, Cresselia, Articuno, Zapdos, Moltres,
//     Entei, Raikou, Latios, Latias.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// This page covers BOTH Sinnoh (DPPt) and Johto (HGSS) roamers, so it does NOT
// scope itself with data-games.

(function(){
  // Sinnoh roamers (DPPt).
  var SINNOH = [
    {
      num:481, name:'Mesprit', types:['Psychic'], level:50,
      loc:'Sinnoh routes (random)',
      req:'First encounter at Lake Verity Cavern. Post-game in Diamond/Pearl, pre-Spear Pillar in Platinum. Mesprit flees on turn 1 and begins roaming.'
    },
    {
      num:488, name:'Cresselia', types:['Psychic'], level:50,
      loc:'Sinnoh routes (random)',
      req:'Post-Hall of Fame. Speak to Sailor Eldritch in Canalave City, agree to help his sick son, then pick up the Lunar Wing on Fullmoon Island. Cresselia flees on first contact and roams.'
    },
    {
      num:144, name:'Articuno', types:['Ice','Flying'], level:60,
      loc:'Sinnoh routes (Platinum only)',
      req:'Platinum exclusive. Receive the National Pokédex from Prof. Rowan in Sandgem after seeing all 210 Sinnoh Dex entries; the bird trio begin roaming Sinnoh.'
    },
    {
      num:145, name:'Zapdos', types:['Electric','Flying'], level:60,
      loc:'Sinnoh routes (Platinum only)',
      req:'Platinum exclusive. Released alongside Articuno and Moltres once the National Dex is obtained.'
    },
    {
      num:146, name:'Moltres', types:['Fire','Flying'], level:60,
      loc:'Sinnoh routes (Platinum only)',
      req:'Platinum exclusive. Released alongside Articuno and Zapdos once the National Dex is obtained.'
    }
  ];

  // Johto / Kanto roamers (HGSS).
  var JOHTO = [
    {
      num:243, name:'Raikou', types:['Electric'], level:40,
      loc:'Johto routes (random)',
      req:'Investigate the Burned Tower in Ecruteak. The three legendary beasts wake up and scatter; Raikou begins roaming Johto immediately.'
    },
    {
      num:244, name:'Entei', types:['Fire'], level:40,
      loc:'Johto routes (random)',
      req:'Same Burned Tower release event. Entei roams Johto with the player.'
    },
    {
      num:381, name:'Latios', types:['Dragon','Psychic'], level:40,
      loc:'Kanto routes (random) — HeartGold',
      req:'Receive the Enigma Stone via Mystery Gift event, then take it to the Pewter City Museum and show it to Steven Stone — he inserts it into the museum\'s meteorite, triggering the Latios encounter. After it flees, Latios roams Kanto at Lv 40. SoulSilver gets Latias instead — swap via trade or in-game lookup.'
    },
    {
      num:380, name:'Latias', types:['Dragon','Psychic'], level:40,
      loc:'Kanto routes (random) — SoulSilver',
      req:'SoulSilver counterpart to Latios. Same Enigma Stone / Pewter Museum event with Steven. Roams Kanto at Lv 40 after fleeing. Trade across versions to obtain the other.'
    }
  ];

  var TYPE_COLORS = {
    'Normal':'#A8A77A','Fire':'#EE8130','Water':'#6390F0','Electric':'#F7D02C',
    'Grass':'#7AC74C','Ice':'#96D9D6','Fighting':'#C22E28','Poison':'#A33EA1',
    'Ground':'#E2BF65','Flying':'#A98FF3','Psychic':'#F95587','Bug':'#A6B91A',
    'Rock':'#B6A136','Ghost':'#735797','Dragon':'#6F35FC','Dark':'#705746',
    'Steel':'#B7B7CE','Fairy':'#D685AD'
  };

  function buildRoamingLegendsPage() {
    var el = document.getElementById('roaminglegends-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function typeBadges(types) {
      return types.map(function(t){
        var c = TYPE_COLORS[t] || '#777';
        return '<span style="display:inline-block;padding:2px 8px;margin-right:4px;border-radius:10px;background:' + c + ';color:#fff;font-size:10px;font-weight:700;letter-spacing:0.3px">' + t.toUpperCase() + '</span>';
      }).join('');
    }

    function roamerRow(r) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + r.num + '.png';
      var safeName = r.name.replace(/'/g, "\\'");
      var nameClick = "_openDexSearch('" + safeName + "', " + r.num + ")";
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="' + nameClick + '" title="Open in Pokédex">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="40" height="40" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + r.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">#' + ('000' + r.num).slice(-3) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;text-align:center;color:' + gameColor + '">Lv ' + r.level + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);">' + typeBadges(r.types) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;font-weight:700">' + r.loc + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);line-height:1.5">' + r.req + '</td>'
        + '</tr>';
    }

    function tableHeader() {
      return '<thead><tr>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:56px"></th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">DEX</th>'
        + '<th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LV</th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">TYPES</th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">RANGE</th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">REQUIREMENT</th>'
        + '</tr></thead>';
    }

    var sinnohRows = SINNOH.map(roamerRow).join('');
    var johtoRows  = JOHTO.map(roamerRow).join('');

    // Helper-bound bullet snippets for the tactics card.
    var meanLook = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Mean Look\')">Mean Look</span>';
    var block    = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Block\')">Block</span>';
    var spore    = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Spore\')">Spore</span>';
    var hypnosis = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Hypnosis\')">Hypnosis</span>';
    var sleepPwd = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Sleep Powder\')">Sleep Powder</span>';
    var roar     = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Roar\')">Roar</span>';
    var whirl    = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="goToMoveInDex(\'Whirlwind\')">Whirlwind</span>';

    var quickBall  = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="openItemByName(\'Quick Ball\')">Quick Ball</span>';
    var masterBall = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="openItemByName(\'Master Ball\')">Master Ball</span>';
    var lunarWing  = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="openItemByName(\'Lunar Wing\')">Lunar Wing</span>';
    var enigmaStn  = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="openItemByName(\'Enigma Stone\')">Enigma Stone</span>';

    var smeargle = '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700" onclick="_openDexSearch(\'Smeargle\', 235)">Smeargle</span>';

    var html = ''
      // Intro card
      + '<div class="panel" style="padding:14px 16px;margin-bottom:18px;line-height:1.7;font-size:12px;color:var(--muted);">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';margin-bottom:10px;letter-spacing:0.5px;">ROAMING LEGENDARIES</div>'
      + 'Roamers don\'t sit on a fixed route — once released, they shuffle to a random Sinnoh or Johto/Kanto route every time you change maps. '
      + 'Step onto the right route and you trigger the encounter, but the legendary <strong>flees on turn 1</strong> unless something stops it. '
      + 'Lock it down with ' + meanLook + ' or ' + block + ' (trapping moves work even on Flying / Levitating roamers in Gen 4). '
      + 'A ' + masterBall + ' is the common safety play if you only have one shot. '
      + 'In Sinnoh, the <strong>Marking Map</strong> Pokétch app shows which route the roamer is on; in Johto, the <strong>Pokégear Map Card</strong> highlights the roamer\'s current route. '
      + 'The textbook approach is <strong>lead with a sleeper</strong> (' + sleepPwd + ' user) and throw a ' + quickBall + ' on turn 1 for the highest non-Master catch rate.'
      + '</div>'

      // Sinnoh table
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">SINNOH ROAMERS — DIAMOND / PEARL / PLATINUM</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">' + tableHeader()
      + '<tbody>' + sinnohRows + '</tbody></table>'
      + '<div style="padding:8px 14px;font-size:11px;color:var(--muted);border-top:1px solid var(--border);line-height:1.6">'
      + 'Mesprit and Cresselia roam in all three Sinnoh games. The Articuno/Zapdos/Moltres trio is <strong>Platinum exclusive</strong> and triggers off the National Dex from Prof. Oak in Eterna City after delivering Rowan\'s research. '
      + 'Picking up the ' + lunarWing + ' on Fullmoon Island starts the Cresselia roam.'
      + '</div>'
      + '</div>'

      // Johto table
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">JOHTO / KANTO ROAMERS — HEARTGOLD / SOULSILVER</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">' + tableHeader()
      + '<tbody>' + johtoRows + '</tbody></table>'
      + '<div style="padding:8px 14px;font-size:11px;color:var(--muted);border-top:1px solid var(--border);line-height:1.6">'
      + 'Raikou and Entei roam Johto from the moment Suicune crashes the Burned Tower. Suicune itself is <em>not</em> a roamer in HGSS — it has a scripted encounter. '
      + 'Latios is the HG roamer; Latias is the SS roamer. Both require the ' + enigmaStn + ' Mystery Gift event followed by the Steven cutscene in Pewter City.'
      + '</div>'
      + '</div>'

      // Tactics card
      + '<div class="panel" style="padding:14px 16px;margin-bottom:18px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';margin-bottom:10px;letter-spacing:0.5px;">CATCHING TACTICS</div>'
      + '<ul style="margin:0;padding-left:18px;font-size:12px;color:var(--text);line-height:1.8;">'
      + '<li>' + meanLook + ' + ' + spore + ' / ' + hypnosis + ' is the gold-standard combo. ' + smeargle + ' with both moves Sketched is the most common solution — one mon, both jobs.</li>'
      + '<li>A ' + quickBall + ' on <strong>turn 1</strong> has the highest catch rate of any non-Master ball (×4 modifier on the first turn).</li>'
      + '<li><strong>Don\'t faint the roamer</strong> — knocking it out makes it respawn at <strong>full HP</strong> next encounter. HP carries over between encounters otherwise, so chip damage is permanent until you catch or KO.</li>'
      + '<li><strong>Avoid critical hits.</strong> Crits ignore -ATK, -DEF and +EVASION drops, and at low roamer HP can knock the legendary out by accident. False Swipe users are unsafe at 1 HP because of this.</li>'
      + '<li><strong>Save before each encounter.</strong> If the roamer uses ' + roar + ' or ' + whirl + ' it breaks your trap and ends the battle — soft-reset and try again.</li>'
      + '<li>If you lead with a Pokémon that has the <strong>Arena Trap</strong> or <strong>Shadow Tag</strong> ability it will <em>not</em> hold a Flying / Levitate roamer — only ' + meanLook + ' / ' + block + ' work universally.</li>'
      + '</ul>'
      + '</div>'

      // Roam tracking notes
      + '<div class="panel" style="padding:14px 16px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';margin-bottom:10px;letter-spacing:0.5px;">TRACKING THE ROAMER</div>'
      + '<ul style="margin:0;padding-left:18px;font-size:12px;color:var(--text);line-height:1.8;">'
      + '<li><strong>Sinnoh (DPPt):</strong> The <strong>Marking Map</strong> Pokétch app pinpoints the roamer\'s current route with a small icon. You earn it in <strong>Pastoria City</strong> after defeating Crasher Wake.</li>'
      + '<li><strong>Johto (HGSS):</strong> Tune the <strong>PokéGear Radio</strong> to the right tower frequency to hear which route the beasts / eon dragons are stalking. The map card also flashes the roamer\'s route.</li>'
      + '<li>Roamers <strong>skip routes you have not visited yet</strong>. If the map shows nothing, walk through any unexplored route to push the roamer back into your travelled area.</li>'
      + '<li>Surfing routes and entering buildings both count as map transitions and re-roll the roamer\'s position.</li>'
      + '</ul>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildRoamingLegendsPage = buildRoamingLegendsPage;
})();
