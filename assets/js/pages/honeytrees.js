// Honey Trees (DPPt) reference page.
// Source: Bulbapedia "Honey tree" article (https://bulbapedia.bulbagarden.net/wiki/Honey_Tree).
// Data confirmed against the Sinnoh route honey-tree map.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// HG/SS do not have honey trees — page hides itself when an HGSS slot is active.

(function(){
  // Standard encounter pool (DPPt) — applies to every tree.
  // Rates from Bulbapedia: Combee 40, Cherubi 20, Aipom 15, Wurmple 10,
  // Silcoon 5, Cascoon 5, Burmy line 5 (totals 100). Preferred trees swap a
  // 1% slot for Munchlax and bump Heracross from 5% to ~19%.
  var STANDARD_POOL = [
    {num:415, name:'Combee',     pct:40, note:'Daily honey-tree staple. Females (≈12.5%) evolve into Vespiquen.'},
    {num:420, name:'Cherubi',    pct:20, note:'Evolves to Cherrim at level 25.'},
    {num:190, name:'Aipom',      pct:15, note:'Evolves to Ambipom via level-up holding Double Hit.'},
    {num:265, name:'Wurmple',    pct:10, note:'Branches into Beautifly or Dustox via personality value.'},
    {num:266, name:'Silcoon',    pct:5,  note:'Wurmple → Beautifly mid-evolution.'},
    {num:268, name:'Cascoon',    pct:5,  note:'Wurmple → Dustox mid-evolution.'},
    {num:412, name:'Burmy',      pct:5,  note:'Cloak forme depends on the tree environment when caught.'}
  ];

  var REGULAR_RARE = { num:214, name:'Heracross', pct:5,  note:'Rare on every honey tree. Pre-evolves Tyrogue/Hitmons but Heracross itself does not evolve.' };
  var PREFERRED_RARE = { num:214, name:'Heracross', pct:19, note:'Boosted on the four preferred trees.' };
  var PREFERRED_MUNCHLAX = { num:446, name:'Munchlax', pct:1, note:'Only appears on the four preferred trees the game has secretly chosen for your save. Same trees forever — there is no way to re-roll them. Evolves into Snorlax at high friendship.' };

  // Bulbapedia honey-tree map (21 trees in DPPt).
  var TREES = [
    { id:1,  loc:'Route 205 (north, near Floaroma Town)',     access:'Walk south from Floaroma Town. First clearing on the right.' },
    { id:2,  loc:'Route 205 (south, near Eterna entrance)',   access:'Halfway along Route 205 south, west side of the path.' },
    { id:3,  loc:'Route 206 (Cycling Road, lower path)',      access:'Bottom of Cycling Road, accessed via Wayward Cave detour or by walking under the bridge.' },
    { id:4,  loc:'Route 207',                                 access:'On the path east of Oreburgh Gate, before the Mt. Coronet entrance.' },
    { id:5,  loc:'Route 208',                                 access:'Between Eterna and Hearthome, near the small berry patch.' },
    { id:6,  loc:'Route 209',                                 access:'South of Hearthome, near the Lost Tower path.' },
    { id:7,  loc:'Route 210 (south)',                         access:'South Solaceon side, before the cycling fork.' },
    { id:8,  loc:'Route 210 (north)',                         access:'North side past the Café Cabin, after clearing Psyduck with the Secret Potion.' },
    { id:9,  loc:'Route 211 (east)',                          access:'Eastern half, en route to Celestic Town.' },
    { id:10, loc:'Route 212 (north)',                         access:'Above Hearthome, tucked north of the Trainers School path.' },
    { id:11, loc:'Route 212 (south, Pastoria side)',          access:'Below the muddy slope, before reaching Pastoria.' },
    { id:12, loc:'Route 213',                                 access:'East of Pastoria, near Valor Lakefront resort.' },
    { id:13, loc:'Route 214',                                 access:'Between Veilstone and Lake Valor.' },
    { id:14, loc:'Route 215',                                 access:'Just west of Veilstone City.' },
    { id:15, loc:'Route 218',                                 access:'West of Canalave, after clearing the city gate.' },
    { id:16, loc:'Route 221',                                 access:'West of Pal Park (post-game).' },
    { id:17, loc:'Route 222',                                 access:'Path between Sunyshore and Pokémon League.' },
    { id:18, loc:'Eterna Forest',                             access:'Inside the forest itself, off the main south-to-north path.' },
    { id:19, loc:'Fuego Ironworks',                           access:'Outside the Ironworks gate. Reachable via Surf along Route 205.' },
    { id:20, loc:'Valley Windworks',                          access:'Just outside the Windworks, on the route 205 north approach.' },
    { id:21, loc:'Floaroma Meadow',                           access:'Inside the meadow itself, north of Floaroma Town.' }
  ];

  function buildHoneyTreesPage() {
    var el = document.getElementById('honeytrees-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function poolRow(p, source) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var safeName = p.name.replace(/'/g, "\\'");
      var nameClick = "_openDexSearch('" + safeName + "', " + p.num + ")";
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="' + nameClick + '" title="Open in Pokédex">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + p.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-weight:800;color:' + gameColor + '">' + p.pct + '%</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + (p.note || '') + '</td>'
        + '</tr>';
    }

    var poolHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">%</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>';
    STANDARD_POOL.forEach(function(p){ poolHtml += poolRow(p); });
    poolHtml += poolRow(REGULAR_RARE);
    poolHtml += '</tbody></table>';

    var preferredHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">%</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>';
    preferredHtml += poolRow(PREFERRED_MUNCHLAX);
    preferredHtml += poolRow(PREFERRED_RARE);
    STANDARD_POOL.forEach(function(p){ preferredHtml += poolRow(p); });
    preferredHtml += '</tbody></table>';

    var treeRows = TREES.map(function(t){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">#' + (t.id < 10 ? '0' + t.id : t.id) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + t.loc + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + t.access + '</td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'Diamond, Pearl &amp; Platinum only. Buy <strong>Honey</strong> from the man in <strong>Floaroma Meadow</strong> '
      + '(100 ₽ each), slather it on any of the 21 yellow honey trees scattered around Sinnoh, then come back '
      + '<strong>6 hours later</strong> to find a wild Pokémon shaking the tree. Trees do not refresh on their own; '
      + 'shake or wait 24 hours and they go cold.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">REGULAR TREES (17 of 21)</div>'
      + '<div style="padding:8px 0">' + poolHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ PREFERRED TREES (4 of 21)</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'When a save file is started, the game silently picks <strong>4 of the 21 honey trees</strong> to be Munchlax-preferred. '
      + 'Those four trees have a 1% Munchlax slot and a much higher Heracross rate. The choice is locked for the life of the save '
      + 'and there is no way to re-roll without restarting. To find yours: slather every tree, then check which four ever produce '
      + 'Munchlax over many cycles.'
      + '</div>'
      + '<div style="padding:8px 0">' + preferredHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ALL 21 TREES</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:48px">#</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LOCATION</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ACCESS</th>'
      + '</tr></thead><tbody>' + treeRows + '</tbody></table>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildHoneyTreesPage = buildHoneyTreesPage;
})();
