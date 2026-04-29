// Mt. Silver (HGSS) reference page.
// Source: Bulbapedia "Red (game)#HGSS" article (https://bulbapedia.bulbagarden.net/wiki/Red_(game)#HeartGold_and_SoulSilver).
// HGSS-only content — page hides itself when a non-HGSS slot is active.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.

(function(){
  // Red's HGSS team — average level 88, encountered at the summit of Mt. Silver.
  var RED_TEAM = [
    {
      num:25, name:'Pikachu', level:88,
      item:'Light Ball',
      ability:'Static',
      moves:['Volt Tackle','Iron Tail','Quick Attack','Thunderbolt'],
      note:'Light Ball doubles Pikachu\'s Sp. Atk and Atk. Volt Tackle is the single biggest threat on the team.'
    },
    {
      num:131, name:'Lapras', level:80,
      item:'Mystic Water',
      ability:'Water Absorb',
      moves:['Blizzard','Ice Beam','Surf','Body Slam'],
      note:'Water Absorb means Surf/Hydro Pump heals it. Lead with Electric or Fighting instead.'
    },
    {
      num:143, name:'Snorlax', level:82,
      item:'Chesto Berry',
      ability:'Immunity',
      moves:['Crunch','Body Slam','Rest','Earthquake'],
      note:'Chesto Berry wakes it up the turn it Rests. Don\'t bother with Sleep — burn or paralyze instead.'
    },
    {
      num:3, name:'Venusaur', level:84,
      item:'Black Sludge',
      ability:'Overgrow',
      moves:['Frenzy Plant','Synthesis','Sludge Bomb','Sleep Powder'],
      note:'Sleep Powder is the opener. Bring a Lum/Chesto holder or a Grass-type to no-sell it. Frenzy Plant has a recharge turn.'
    },
    {
      num:6, name:'Charizard', level:84,
      item:'Charcoal',
      ability:'Blaze',
      moves:['Blast Burn','Air Slash','Flamethrower','Dragon Pulse'],
      note:'No Stealth Rock pressure from the AI in HGSS, but Air Slash has a 30% flinch chance. Rock or Electric closes it fast.'
    },
    {
      num:9, name:'Blastoise', level:84,
      item:'Mystic Water',
      ability:'Torrent',
      moves:['Hydro Cannon','Avalanche','Flash Cannon','Aqua Jet'],
      note:'Hydro Cannon forces a recharge turn — switch in your hardest hitter or set up freely while it stalls.'
    }
  ];

  function buildMtSilverPage() {
    var el = document.getElementById('mtsilver-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function teamRow(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var safeName = p.name.replace(/'/g, "\\'");
      var safeItem = p.item.replace(/'/g, "\\'");
      var nameClick = "_openDexSearch('" + safeName + "', " + p.num + ")";
      var itemClick = "openItemByName('" + safeItem + "')";
      var movesHtml = p.moves.map(function(m){
        var safeMove = m.replace(/'/g, "\\'");
        return '<span onclick="goToMoveInDex(\'' + safeMove + '\')" style="display:inline-block;padding:2px 7px;margin:2px 3px 2px 0;border:1px solid var(--border);border-radius:4px;cursor:pointer;font-size:11px;background:rgba(255,255,255,0.02)" onmouseover="this.style.background=\'rgba(255,255,255,0.08)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.02)\'" title="Open move">' + m + '</span>';
      }).join('');
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);cursor:pointer" onclick="' + nameClick + '" title="Open in Pokédex"><img src="' + sprite + '" width="40" height="40" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700;cursor:pointer" onclick="' + nameClick + '" onmouseover="this.style.color=\'' + gameColor + '\'" onmouseout="this.style.color=\'\'" title="Open in Pokédex">' + p.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:center;font-weight:800;color:' + gameColor + '">Lv ' + p.level + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;cursor:pointer" onclick="' + itemClick + '" onmouseover="this.style.color=\'' + gameColor + '\'" onmouseout="this.style.color=\'\'" title="Open item">' + p.item + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + p.ability + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);">' + movesHtml + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + p.note + '</td>'
        + '</tr>';
    }

    var teamRows = RED_TEAM.map(teamRow).join('');

    var teamHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:56px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
      + '<th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LV</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ITEM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ABILITY</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">MOVES</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + teamRows + '</tbody></table>';

    var requirements = [
      'Beat all 8 Johto gyms, defeat Lance, and enter the Hall of Fame.',
      'Travel to Kanto via the S.S. Aqua and beat all 8 Kanto gyms.',
      'Defeat <strong>Blue</strong> at the Viridian City Gym — clearing him unlocks Mt. Silver entry.',
      'Visit <strong>Prof. Oak</strong> in Pallet Town to receive permission to climb the mountain.',
      'Bring HM <strong>Rock Climb</strong> taught to a party member — required to reach the summit.',
      'Stock up on Max Revives, Full Restores, and an anti-Pikachu plan (Ground type, Light Screen, etc.).'
    ];

    var requirementsHtml = '<ol style="margin:0;padding-left:22px;line-height:1.9;font-size:12px">'
      + requirements.map(function(r){ return '<li style="margin-bottom:4px">' + r + '</li>'; }).join('')
      + '</ol>';

    var strategyBullets = [
      '<strong>Pikachu</strong> hits hardest with Volt Tackle. Bring a Ground type — <span style="cursor:pointer;text-decoration:underline" onclick="_openDexSearch(\'Garchomp\', 445)">Garchomp</span>, <span style="cursor:pointer;text-decoration:underline" onclick="_openDexSearch(\'Hippowdon\', 450)">Hippowdon</span>, or <span style="cursor:pointer;text-decoration:underline" onclick="_openDexSearch(\'Donphan\', 232)">Donphan</span> all wall it.',
      '<strong>Lapras</strong> has Water Absorb — do NOT lead with Surf, Hydro Pump, or any Water move. Electric and Fighting work; Ice attacks are also resisted.',
      '<strong>Snorlax</strong> with Chesto Berry will wake up turn 1 if you put it to sleep, so don\'t waste a sleep move. Burn it instead and chip with super-effective Fighting attacks.',
      '<strong>Venusaur</strong> opens with <span style="cursor:pointer;text-decoration:underline" onclick="goToMoveInDex(\'Sleep Powder\')">Sleep Powder</span> — lead a Lum/Chesto holder or a Grass-type so the status fizzles. Frenzy Plant forces a recharge turn.',
      '<strong>Charizard</strong> doesn\'t set Stealth Rock here, but <span style="cursor:pointer;text-decoration:underline" onclick="goToMoveInDex(\'Air Slash\')">Air Slash</span> has a 30% flinch chance. Rock or Electric attackers close it in one shot.',
      '<strong>Blastoise</strong>\'s <span style="cursor:pointer;text-decoration:underline" onclick="goToMoveInDex(\'Hydro Cannon\')">Hydro Cannon</span> forces a recharge — exploit the free turn to switch in your sweeper or set up Swords Dance / Calm Mind.'
    ];

    var strategyHtml = '<ul style="margin:0;padding-left:22px;line-height:1.85;font-size:12px">'
      + strategyBullets.map(function(b){ return '<li style="margin-bottom:6px">' + b + '</li>'; }).join('')
      + '</ul>';

    var prepItems = [
      {name:'Max Revive', note:'Bring 5+. Red\'s damage output will drop several mons.'},
      {name:'Full Restore', note:'Bring 10+. Full HP and status cure in one turn.'},
      {name:'Max Ether', note:'Bring 5+. Long fight — your STAB PP will run dry.'},
      {name:'X Attack', note:'Stack 2-3 to muscle through Snorlax / Lapras bulk.'},
      {name:'X Speed', note:'Outspeed Pikachu and Charizard before they move.'},
      {name:'Lum Berry', note:'Held item that no-sells Sleep Powder once.'},
      {name:'Chesto Berry', note:'Backup wake-up if you take a Sleep Powder.'},
      {name:'Light Screen', note:'Halves Volt Tackle / Air Slash / Hydro Cannon damage.'}
    ];

    var prepRows = prepItems.map(function(it){
      var safeItem = it.name.replace(/'/g, "\\'");
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="openItemByName(\'' + safeItem + '\')" title="Open item">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + it.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + it.note + '</td>'
        + '</tr>';
    }).join('');

    var prepHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ITEM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">WHY</th>'
      + '</tr></thead><tbody>' + prepRows + '</tbody></table>';

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + '<strong>HeartGold &amp; SoulSilver only.</strong> Mt. Silver is the post-game peak straddling Johto and Kanto. '
      + 'After defeating all <strong>16 Gym Leaders</strong> (Johto + Kanto) and the Elite Four, you can climb to the summit '
      + 'and challenge <strong>Red</strong> — the strongest trainer in HGSS, and your former rival self from Gen 1. '
      + 'He says nothing, just tosses out his ace. Average team level: <strong>88</strong>.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ACCESS REQUIREMENTS</div>'
      + '<div style="padding:14px 18px">' + requirementsHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,80,80,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ff8a8a;letter-spacing:0.5px;">★ RED — MT. SILVER SUMMIT (AVG LV 88)</div>'
      + '<div style="padding:8px 0;overflow-x:auto">' + teamHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">BATTLE STRATEGY</div>'
      + '<div style="padding:14px 18px">' + strategyHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">PRE-BATTLE PREP CHECKLIST</div>'
      + '<div style="padding:8px 0">' + prepHtml + '</div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildMtSilverPage = buildMtSilverPage;
})();
