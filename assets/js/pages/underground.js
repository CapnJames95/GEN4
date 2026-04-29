// Sinnoh Underground (DPPt) reference page.
// Source: Bulbapedia "Sinnoh Underground" article (https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Underground).
// Static reference only — no minigame simulator. DPPt-only (FR/LG/R slots).
// Where exact in-game values differ between sources, ranges are marked "approximate".

(function(){
  // Sphere trade values. Bulbapedia gives a rough scale where small spheres are
  // worth ~1 stone, medium ~10, large ~50, with Prism roughly double the rest.
  // Exact NPC trade rates vary by item — these are approximate stone-equivalents.
  var SPHERES = [
    { name:'Red Sphere',    color:'#e35a5a', small:'≈1',  medium:'≈10', large:'≈50',  note:'Common. Trades for fire-themed traps and red décor.' },
    { name:'Blue Sphere',   color:'#5a8ee3', small:'≈1',  medium:'≈10', large:'≈50',  note:'Common. Trades for water-themed traps and blue décor.' },
    { name:'Green Sphere',  color:'#5ad07a', small:'≈1',  medium:'≈10', large:'≈50',  note:'Common. Trades for grass-themed traps and plant décor.' },
    { name:'Pale Sphere',   color:'#e8d9b8', small:'≈2',  medium:'≈15', large:'≈70',  note:'Uncommon. Often used in higher-tier décor trades.' },
    { name:'Prism Sphere',  color:'#c98ce0', small:'≈5',  medium:'≈30', large:'≈100', note:'Rarest sphere. Large Prism is the highest-value sphere in the Underground.' }
  ];

  // Fossils dug from the wall minigame. All revive at the Oreburgh Mining Museum.
  var FOSSILS = [
    { item:'Helix Fossil',  num:138, name:'Omanyte',     note:'Gen 1 fossil. Water/Rock.' },
    { item:'Dome Fossil',   num:140, name:'Kabuto',      note:'Gen 1 fossil. Water/Rock.' },
    { item:'Old Amber',     num:142, name:'Aerodactyl',  note:'Gen 1 fossil. Rock/Flying.' },
    { item:'Root Fossil',   num:345, name:'Lileep',      note:'Gen 3 fossil. Rock/Grass.' },
    { item:'Claw Fossil',   num:347, name:'Anorith',     note:'Gen 3 fossil. Rock/Bug.' },
    { item:'Skull Fossil',  num:408, name:'Cranidos',    note:'DPPt-introduced fossil. Pure Rock.' },
    { item:'Armor Fossil',  num:410, name:'Shieldon',    note:'DPPt-introduced fossil. Rock/Steel.' }
  ];

  // Treasure-square items. Heart Scale is by far the most common; evolution
  // stones are uncommon but reliable; Rare Bone and Star Piece are valuable
  // sell-fodder. Light Clay is Platinum-only on the dig table.
  var TREASURES = [
    { name:'Heart Scale',     note:'Most common rare item. Trade to the Move Reminder in Pastoria for relearned moves.' },
    { name:'Star Piece',      note:'Sells for 4900 ₽. Excellent money-grind reward.' },
    { name:'Stardust',        note:'Sells for 1200 ₽. Common compared to Star Piece.' },
    { name:'Light Clay',      note:'Platinum onward. Held item that extends Light Screen / Reflect duration.' },
    { name:'Hard Stone',      note:'Held item that boosts Rock-type moves by 20%.' },
    { name:'Iron Ball',       note:'Halves Speed and grounds Flying / Levitate users.' },
    { name:'Odd Keystone',    note:'Required for the Spiritomb sidequest at the Hallowed Tower (Route 209).' },
    { name:'Rare Bone',       note:'Sells for 5000 ₽. Pure cash item — comparable in value to Nuggets.' },
    { name:'Revive',          note:'Revives a fainted Pokémon to half HP.' },
    { name:'Max Revive',      note:'Revives a fainted Pokémon to full HP.' },
    { name:'Sun Stone',       note:'Evolves Gloom → Bellossom, Sunkern → Sunflora.' },
    { name:'Moon Stone',      note:'Evolves Nidorina/Nidorino, Clefairy, Jigglypuff, Skitty, Munna line (later gens).' },
    { name:'Water Stone',     note:'Evolves Poliwhirl → Poliwrath, Shellder → Cloyster, Staryu → Starmie, Eevee → Vaporeon, Lombre → Ludicolo.' },
    { name:'Leaf Stone',      note:'Evolves Gloom → Vileplume, Weepinbell → Victreebel, Exeggcute → Exeggutor, Nuzleaf → Shiftry.' },
    { name:'Fire Stone',      note:'Evolves Vulpix → Ninetales, Growlithe → Arcanine, Eevee → Flareon.' },
    { name:'Thunder Stone',   note:'Evolves Pikachu → Raichu, Eevee → Jolteon.' }
  ];

  function buildUndergroundPage() {
    var el = document.getElementById('underground-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function sectionHeader(title, accent) {
      return '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + (accent || gameColor) + ';letter-spacing:0.5px;">' + title + '</div>';
    }

    // ----- Sphere table -----
    var sphereRows = SPHERES.map(function(s){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:' + s.color + ';border:1px solid rgba(0,0,0,0.4);vertical-align:middle;box-shadow:inset -3px -3px 4px rgba(0,0,0,0.3),inset 3px 3px 4px rgba(255,255,255,0.4);"></span></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + s.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-weight:700;color:' + gameColor + '">' + s.small + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-weight:700;color:' + gameColor + '">' + s.medium + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-weight:700;color:' + gameColor + '">' + s.large + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + s.note + '</td>'
        + '</tr>';
    }).join('');

    var sphereHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:36px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">SPHERE</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">SMALL</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">MEDIUM</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LARGE</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + sphereRows + '</tbody></table>';

    // ----- Fossil table -----
    var fossilRows = FOSSILS.map(function(f){
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + f.num + '.png';
      var safeName = f.name.replace(/'/g, "\\'");
      var safeItem = f.item.replace(/'/g, "\\'");
      var nameClick = "_openDexSearch('" + safeName + "', " + f.num + ")";
      var itemClick = "openItemByName('" + safeItem + "')";
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700;cursor:pointer;color:' + gameColor + '" onclick="' + itemClick + '" title="Open item">' + f.item + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700;cursor:pointer;" onclick="' + nameClick + '" title="Open in Pokédex">#' + f.num + ' ' + f.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">Oreburgh Mining Museum</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + f.note + '</td>'
        + '</tr>';
    }).join('');

    var fossilHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">FOSSIL</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">REVIVES INTO</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">REVIVE AT</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + fossilRows + '</tbody></table>';

    // ----- Treasure list -----
    var treasureRows = TREASURES.map(function(t){
      var safeItem = t.name.replace(/'/g, "\\'");
      var click = "openItemByName('" + safeItem + "')";
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="' + click + '" title="Open item">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700;color:' + gameColor + ';white-space:nowrap">' + t.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + t.note + '</td>'
        + '</tr>';
    }).join('');

    var treasureHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ITEM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + treasureRows + '</tbody></table>';

    // ----- Static cards -----
    var baseBullets = ''
      + '<ul style="margin:0;padding:0 0 0 18px;line-height:1.8;font-size:12px;color:var(--text);">'
      + '<li>Pick a wall in the Underground tunnel and use a <strong>Digger Drill</strong> to carve out your secret base.</li>'
      + '<li>Decorate with statues, plants, dolls, and ornaments traded from the Underground NPCs in exchange for spheres.</li>'
      + '<li>Hide stake-flags around your base. Each flag a friend captures in the wireless Capture-the-Flag minigame nets you <strong>1 sphere</strong>.</li>'
      + '<li>Statues placed in your base are <strong>primarily cosmetic in DPPt</strong>. (The statue → Underground encounter-rate effect was added later in BDSP; the original DPPt Underground does not use that system.)</li>'
      + '<li>Bases can be reset by talking to the Underground Man if you want to start over.</li>'
      + '</ul>';

    var trapBullets = ''
      + '<ul style="margin:0;padding:0 0 0 18px;line-height:1.8;font-size:12px;color:var(--text);">'
      + '<li>Traps are bought/traded from Underground NPCs and placed on the tunnel floor in your map area.</li>'
      + '<li>They only trigger on <strong>other players</strong> in wireless multiplayer — they do nothing in single-player.</li>'
      + '<li>Varieties include <strong>Pitfall Trap</strong>, <strong>Smoke Trap</strong>, <strong>Foam Trap</strong>, <strong>Bubble Trap</strong>, <strong>Flower Trap</strong>, <strong>Rock Trap</strong>, plus elemental Fire/Ice/Water/Grass/Electric traps and the rarer "Ember/Spin/Hole" traps.</li>'
      + '<li>Effect is purely visual/comedic — a brief animation on the victim. No items lost, no damage.</li>'
      + '<li>Stepped-on traps are consumed; restock from the trap-trader Hexagon Brothers.</li>'
      + '</ul>';

    var tipBullets = ''
      + '<ul style="margin:0;padding:0 0 0 18px;line-height:1.8;font-size:12px;color:var(--text);">'
      + '<li><strong>Fossil farming:</strong> only one fossil revival per day at Oreburgh, but you can dig as many fossils as you can carry — bank them up before the post-game grind.</li>'
      + '<li><strong>Money grind:</strong> Star Piece (4900 ₽) and Rare Bone (5000 ₽) from treasure squares are the best per-dig payouts. A full bag clears 60-80k ₽ at the Mart.</li>'
      + '<li><strong>Sphere selling:</strong> spheres themselves cannot be sold to a Mart. Bury them in the ground for ~24 hours and they grow one size class — the "sphere garden" trick converts smalls to mediums and mediums to larges over time.</li>'
      + '<li><strong>Hexagon Brothers:</strong> seven NPCs scattered through the Underground tunnel system. Each trades different goods (traps, décor, Heart Scales, evolution stones) for spheres of specific colours. Cycle them all on each visit — their stock rotates.</li>'
      + '<li><strong>Heart Scale farming:</strong> the most common treasure-square item by a wide margin. Stockpile 20+ before relearning moves on competitive teams.</li>'
      + '<li><strong>Goggle hint:</strong> when the dig-screen vibrates as you walk into a wall, that wall has at least one item — back out and try a different tile if the first dig is empty.</li>'
      + '</ul>';

    // ----- Compose -----
    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'Diamond, Pearl &amp; Platinum only. Receive the <strong>Explorer Kit</strong> from the <strong>Underground Man</strong> '
      + 'in his house in Eterna City. Press the kit on the touch screen to dig down into the tunnel network beneath Sinnoh. '
      + 'The Underground hosts <strong>sphere collecting</strong> (the local currency), the <strong>fossil dig minigame</strong> on tunnel walls, '
      + '<strong>treasure squares</strong> with rare items, <strong>traps</strong> for pranking other players, and <strong>secret bases</strong> '
      + 'you carve into the walls.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + sectionHeader('SPHERES (UNDERGROUND CURRENCY)')
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Spheres come in five colours and three sizes. Larger sizes are worth dramatically more in NPC trades. '
      + 'Values below are <strong>approximate stone-equivalents</strong> based on Bulbapedia trade tables — exact rates depend on the item being traded.'
      + '</div>'
      + '<div style="padding:8px 0">' + sphereHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + sectionHeader('FOSSILS (DIG MINIGAME)')
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Hammer or pickaxe walls of dirt to uncover items. Among the rare drops are seven fossils — including <strong>Skull</strong> and <strong>Armor</strong>, '
      + 'introduced in DPPt. All revive at the <strong>Oreburgh Mining Museum</strong> (one per day).'
      + '</div>'
      + '<div style="padding:8px 0">' + fossilHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + sectionHeader('TREASURE SQUARES (RARE ITEM DROPS)')
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Sparkling tiles on the dig wall yield rare items rather than spheres. <strong>Heart Scale</strong> is the most common drop; evolution stones are '
      + 'uncommon but reliable, making the Underground the most accessible source for them in DPPt.'
      + '</div>'
      + '<div style="padding:8px 0">' + treasureHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + sectionHeader('SECRET BASES')
      + '<div style="padding:12px 16px">' + baseBullets + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + sectionHeader('TRAPS (WIRELESS PRANKS)')
      + '<div style="padding:12px 16px">' + trapBullets + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + sectionHeader('TIPS &amp; OPTIMAL PLAY', '#ffd977')
      + '<div style="padding:12px 16px">' + tipBullets + '</div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildUndergroundPage = buildUndergroundPage;
})();
