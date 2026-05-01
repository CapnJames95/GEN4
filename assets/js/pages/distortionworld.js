// Distortion World (Platinum) reference page.
// Source: Bulbapedia "Distortion World" article (https://bulbapedia.bulbagarden.net/wiki/Distortion_World).
// Platinum-only — page is wired to data-games="R" (R = Platinum slot).
// Diamond and Pearl do not feature this area; Giratina is encountered at Turnback Cave instead in those games.

(function(){
  // Items recoverable inside the Distortion World, in roughly the order they appear
  // along the linear puzzle path. Sprites pulled from PokeAPI item sprites.
  var ITEMS = [
    { key:'spell-tag',     name:'Spell Tag',         sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/spell-tag.png', loc:'Early section, on a small floating chunk near the entrance.', note:'Held item that boosts Ghost-type moves by 20%.' },
    { key:'reaper-cloth',  name:'Reaper Cloth',      sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/reaper-cloth.png', loc:'Main path, mid-section.', note:'Used to evolve Dusclops → Dusknoir via trade while holding it.' },
    { key:'razor-fang',    name:'Razor Fang',        sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/razor-fang.png', loc:'Mid-area floating chunk after a gravity flip.', note:'Evolves Gligar → Gliscor when held and leveled up at night.' },
    { key:'dawn-stone',    name:'Dawn Stone',        sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dawn-stone.png', loc:'Late puzzle area, near the chamber descent.', note:'Evolves male Kirlia → Gallade and female Snorunt → Froslass.' },
    { key:'rare-candy-1',  name:'Rare Candy ×2',     sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png', loc:'Two scattered along side detours of the main path.', note:'Each raises a Pokémon by one level. Save them for capture-team prep.' },
    { key:'griseous-orb',  name:'Griseous Orb',      sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/griseous-orb.png', loc:'Dropped into your bag automatically after capturing Giratina.', note:'Giratina does NOT hold this in the wild encounter — it is given to you post-capture. Hold it on Giratina to switch to Origin Forme.' }
  ];

  // Giratina encounter data (Platinum). Bulbapedia confirms Lv 47, Ghost/Dragon,
  // Altered Forme during the wild battle. Held item: none (Griseous Orb is awarded
  // separately to your bag after capture, not held by the wild Pokémon).
  var GIRATINA = {
    num: 487,
    name: 'Giratina',
    level: 47,
    type: 'Ghost / Dragon',
    held: 'None (Griseous Orb is given to your bag after capture)',
    moves: ['Shadow Force','AncientPower','Dragon Claw','Ominous Wind'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png'
  };

  function buildDistortionWorldPage() {
    var el = document.getElementById('distortionworld-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function pkmnClick(name, num) {
      var safe = name.replace(/'/g, "\\'");
      return "_openDexSearch('" + safe + "', " + num + ")";
    }
    function moveClick(name) {
      var safe = name.replace(/'/g, "\\'");
      return "goToMoveInDex('" + safe + "')";
    }
    function itemClick(name) {
      var safe = name.replace(/'/g, "\\'");
      return "openItemByName('" + safe + "')";
    }

    function pkmnLink(name, num) {
      return '<span style="cursor:pointer;font-weight:700;color:' + gameColor + ';text-decoration:underline;text-decoration-style:dotted" onclick="' + pkmnClick(name, num) + '" title="Open in Pokédex">' + name + '</span>';
    }
    function moveLink(name) {
      return '<span style="cursor:pointer;font-weight:700;color:' + gameColor + ';text-decoration:underline;text-decoration-style:dotted" onclick="' + moveClick(name) + '" title="Open move">' + name + '</span>';
    }
    function itemLink(name) {
      return '<span style="cursor:pointer;font-weight:700;color:' + gameColor + ';text-decoration:underline;text-decoration-style:dotted" onclick="' + itemClick(name) + '" title="Open item">' + name + '</span>';
    }

    // ---- Items table ----
    var itemRows = ITEMS.map(function(it){
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="' + itemClick(it.name.replace(/\s*×\d+$/,'')) + '" title="Open item">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);width:48px"><img src="' + it.sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle" onerror="this.style.visibility=\'hidden\'"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + it.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px">' + it.loc + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + it.note + '</td>'
        + '</tr>';
    }).join('');

    var itemsHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ITEM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LOCATION</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + itemRows + '</tbody></table>';

    // ---- Giratina battle card ----
    var movesHtml = GIRATINA.moves.map(function(m){ return moveLink(m); }).join(' &middot; ');

    var giratinaHtml = ''
      + '<div style="display:flex;gap:14px;align-items:center;padding:14px;border-bottom:1px solid var(--border);">'
      + '<img src="' + GIRATINA.sprite + '" width="80" height="80" style="image-rendering:pixelated;cursor:pointer" onclick="' + pkmnClick(GIRATINA.name, GIRATINA.num) + '" title="Open in Pokédex">'
      + '<div style="flex:1;min-width:0">'
      +   '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:' + gameColor + ';margin-bottom:6px;cursor:pointer" onclick="' + pkmnClick(GIRATINA.name, GIRATINA.num) + '">' + GIRATINA.name.toUpperCase() + ' &nbsp;Lv ' + GIRATINA.level + '</div>'
      +   '<div style="font-size:11px;color:var(--muted);line-height:1.7"><strong>Type:</strong> ' + GIRATINA.type + ' &middot; <strong>Forme:</strong> Altered &middot; <strong>Held:</strong> ' + GIRATINA.held + '</div>'
      +   '<div style="font-size:11px;line-height:1.7;margin-top:4px"><strong>Moves:</strong> ' + movesHtml + '</div>'
      + '</div>'
      + '</div>'
      + '<div style="padding:12px 14px;font-size:11px;line-height:1.8;color:var(--muted);">'
      +   '<div><strong style="color:var(--text)">Recommended capture flow:</strong></div>'
      +   '<ol style="margin:6px 0 0 18px;padding:0">'
      +     '<li>Throw a <strong>Quick Ball</strong> on turn 1 — best one-shot odds available.</li>'
      +     '<li>If it breaks free, use <strong>' + moveLink('False Swipe') + '</strong> to chip HP to 1, then status with <strong>sleep</strong> (Hypnosis/Sing/Spore) or paralysis.</li>'
      +     '<li>Switch to <strong>Dusk Balls</strong> (the Distortion World counts as a cave/dark area) or Ultra Balls for the long haul.</li>'
      +     '<li>Watch out for <strong>' + moveLink('Shadow Force') + '</strong> — it skips a turn invulnerable, then hits hard.</li>'
      +   '</ol>'
      + '</div>'
      + '<div style="padding:12px 14px;background:rgba(255,80,80,0.08);border-top:1px solid var(--border);font-size:11px;line-height:1.7;">'
      +   '<strong style="color:#ffb3b3">SAVE BEFORE THE ENCOUNTER.</strong> Giratina is a one-time main-story battle. If it faints, it does <strong>not</strong> respawn until you have entered the Hall of Fame.'
      + '</div>';

    // ---- Page assembly ----
    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + '<strong>Platinum-exclusive late-game area.</strong> After Cyrus summons ' + pkmnLink('Giratina', 487) + ' at the <strong>Spear Pillar</strong>, you fall into Giratina\'s home dimension. Gravity flips, water flows upward, and the geometry doesn\'t follow physics. The goal is simple: navigate the puzzle down to the bottom level and catch Giratina.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      +   '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ACCESS</div>'
      +   '<div style="padding:12px 14px;font-size:12px;line-height:1.8;">'
      +     'Reached automatically after defeating <strong>Cyrus</strong> at the Distortion World tower entrance — there is no separate route in. '
      +     '<strong>No HMs are needed inside</strong> (no Surf, Strength, Rock Climb, etc.). '
      +     'You navigate via <strong>gravity-flipping platforms</strong> triggered by interacting with floating Pokéball-shaped chunks.'
      +   '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      +   '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ITEMS INSIDE</div>'
      +   '<div style="padding:8px 0">' + itemsHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(180,80,200,0.4);">'
      +   '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#d8a3e8;letter-spacing:0.5px;">★ GIRATINA — BOSS ENCOUNTER</div>'
      +   giratinaHtml
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      +   '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">PUZZLE NAVIGATION TIPS</div>'
      +   '<ul style="margin:0;padding:14px 14px 14px 32px;font-size:12px;line-height:1.85;">'
      +     '<li>Trees and rocks become <strong>walkable surfaces</strong> when gravity flips — what was a wall is now a floor.</li>'
      +     '<li>Look for <strong>floating Pokéball-shaped chunks</strong>. Interacting with one inverts the gravity of the section.</li>'
      +     '<li>The path is <strong>linear</strong>: each section has exactly one correct chunk to interact with. No backtracking puzzles.</li>'
      +     '<li>The camera angle <strong>shifts dramatically</strong> when you reach Giratina\'s chamber — that\'s the cue you\'ve arrived at the boss room.</li>'
      +     '<li>Wild Pokémon do not appear in the Distortion World — you can heal-walk freely without random encounters.</li>'
      +   '</ul>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      +   '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">AFTER CATCHING GIRATINA</div>'
      +   '<div style="padding:12px 14px;font-size:12px;line-height:1.85;">'
      +     'Giratina is in <strong>Altered Forme</strong> by default (Ghost/Dragon, defensively-statted). '
      +     'The ' + itemLink('Griseous Orb') + ' is added to your bag <strong>after</strong> capture — have ' + pkmnLink('Giratina', 487) + ' hold it to switch to <strong>Origin Forme</strong>, '
      +     'which swaps its stat spread toward offense and changes its silhouette. Removing the Orb reverts it to Altered Forme. '
      +     'The Griseous Orb has <strong>no effect on any other Pokémon</strong> — it is a Giratina-exclusive held item.'
      +   '</div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildDistortionWorldPage = buildDistortionWorldPage;
})();
