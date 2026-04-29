// Headbutt Trees (HGSS) reference page.
// Source: Bulbapedia "Headbutt (move)" article — HGSS encounter tables
// (https://bulbapedia.bulbagarden.net/wiki/Headbutt_(move)).
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// HGSS-only — page hides itself when a DPPt slot is active.

(function(){
  // Frequency tier buckets — simplified from Bulbapedia's per-slot weights.
  // HGSS headbutt trees roll two slots with different probabilities; this
  // page collapses those into Common / Uncommon / Rare for readability.
  var TIER = {
    C: { label:'Common',   pct:'~50%' },
    U: { label:'Uncommon', pct:'~35%' },
    R: { label:'Rare',     pct:'~15%' }
  };

  // Headbutt-exclusive species in HGSS. Trading and the Bug-Catching Contest
  // aside, these can ONLY be obtained from headbutt trees in normal play.
  var EXCLUSIVES = [
    {num:167, name:'Spinarak',  note:'SoulSilver only. Headbutt is the only wild source in HGSS.'},
    {num:165, name:'Ledyba',    note:'HeartGold only. Headbutt is the only wild source in HGSS.'},
    {num:204, name:'Pineco',    note:'Both games. Only available from headbutt trees.'},
    {num:190, name:'Aipom',     note:'Both games. Only available from headbutt trees.'},
    {num:214, name:'Heracross', note:'Both games. Only available from a small set of headbutt trees (notably the Azalea / Route 33 area).'}
  ];

  // Per-area pools. Only routes with high-confidence Bulbapedia data are
  // listed — this is intentionally short rather than padded with guesses.
  // Each entry: { area, region, pool: [ {num,name,tier,game?,note?} ] }
  var AREAS = [
    { area:'Ilex Forest', region:'Johto', pool:[
      {num:10,  name:'Caterpie',  tier:'C'},
      {num:13,  name:'Weedle',    tier:'C'},
      {num:46,  name:'Paras',     tier:'U'},
      {num:190, name:'Aipom',     tier:'R'},
      {num:204, name:'Pineco',    tier:'R'}
    ]},
    { area:'Route 30', region:'Johto', pool:[
      {num:10,  name:'Caterpie',  tier:'C'},
      {num:13,  name:'Weedle',    tier:'C'},
      {num:165, name:'Ledyba',    tier:'U', game:'HeartGold'},
      {num:167, name:'Spinarak',  tier:'U', game:'SoulSilver'},
      {num:204, name:'Pineco',    tier:'R'}
    ]},
    { area:'Route 31', region:'Johto', pool:[
      {num:10,  name:'Caterpie',  tier:'C'},
      {num:13,  name:'Weedle',    tier:'C'},
      {num:165, name:'Ledyba',    tier:'U', game:'HeartGold'},
      {num:167, name:'Spinarak',  tier:'U', game:'SoulSilver'},
      {num:204, name:'Pineco',    tier:'R'}
    ]},
    { area:'Azalea Town / Route 33 area', region:'Johto', pool:[
      {num:46,  name:'Paras',     tier:'C'},
      {num:190, name:'Aipom',     tier:'U'},
      {num:214, name:'Heracross', tier:'R', note:'One of the few areas with a Heracross slot — the standard farming spot.'}
    ]},
    { area:'National Park', region:'Johto', pool:[
      {num:10,  name:'Caterpie',  tier:'C'},
      {num:13,  name:'Weedle',    tier:'C'},
      {num:46,  name:'Paras',     tier:'U'},
      {num:204, name:'Pineco',    tier:'R'}
    ]}
  ];

  function buildHeadbuttTreesPage() {
    var el = document.getElementById('headbutttrees-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function pokeRow(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var nameClick = "_openDexSearch('" + p.name.replace(/'/g, "\\'") + "', " + p.num + ")";
      var t = TIER[p.tier] || { label:'', pct:'' };
      var notes = '';
      if (p.game) notes += '<span style="color:' + gameColor + ';font-weight:700">' + p.game + ' only.</span> ';
      if (p.note) notes += p.note;
      return '<tr style="cursor:pointer" onclick="' + nameClick + '">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + p.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-weight:800;color:' + gameColor + ';font-size:11px">' + t.label + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;font-size:11px;color:var(--muted)">' + t.pct + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + notes + '</td>'
        + '</tr>';
    }

    function exclusiveRow(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var nameClick = "_openDexSearch('" + p.name.replace(/'/g, "\\'") + "', " + p.num + ")";
      return '<tr style="cursor:pointer" onclick="' + nameClick + '">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + p.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + (p.note || '') + '</td>'
        + '</tr>';
    }

    function areaCard(a) {
      var rows = a.pool.map(pokeRow).join('');
      var table = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
        + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">TIER</th>'
        + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">RATE</th>'
        + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
        + '</tr></thead><tbody>' + rows + '</tbody></table>';

      return '<div class="panel" style="padding:0;margin-bottom:14px;overflow:hidden;">'
        + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;display:flex;justify-content:space-between;align-items:center;">'
        + '<span>' + a.area.toUpperCase() + '</span>'
        + '<span style="color:var(--muted);font-size:8px">' + a.region.toUpperCase() + '</span>'
        + '</div>'
        + '<div style="padding:8px 0">' + table + '</div>'
        + '</div>';
    }

    var areaCards = AREAS.map(areaCard).join('');

    var exclusiveTable = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977">POKÉMON</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977">NOTES</th>'
      + '</tr></thead><tbody>' + EXCLUSIVES.map(exclusiveRow).join('') + '</tbody></table>';

    var html = ''
      // Intro
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'HeartGold &amp; SoulSilver only. After <strong>Bill</strong> teaches you the <strong>Headbutt</strong> '
      + 'move at the <strong>Goldenrod Pokémon Center</strong> (give him a Pokémon that can learn it), you can '
      + 'headbutt the small leafy trees scattered along most Johto and a handful of Kanto routes for wild '
      + 'encounters. Several species — including <strong>Heracross</strong>, <strong>Pineco</strong>, '
      + '<strong>Aipom</strong>, <strong>Spinarak</strong> and <strong>Ledyba</strong> — are obtainable '
      + '<strong>only</strong> via headbutt. Each tree rolls from a per-route pool; the day\'s headbutt slots '
      + 'reset at <strong>00:00</strong> game time.'
      + '</div>'

      // Exclusives
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ HEADBUTT-EXCLUSIVE SPECIES</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'These Pokémon cannot be caught any other way in HGSS without trading. If you want a complete Johto '
      + 'dex — or a Heracross / Pineco for your team — you have to grind headbutt trees.'
      + '</div>'
      + '<div style="padding:8px 0">' + exclusiveTable + '</div>'
      + '</div>'

      // Areas
      + '<div style="margin-bottom:8px;font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';letter-spacing:0.5px;">ROUTES &amp; AREAS</div>'
      + areaCards

      // Footer note
      + '<div style="margin-top:14px;font-size:11px;color:var(--muted);line-height:1.7;font-style:italic;">'
      + 'Only routes with well-documented Bulbapedia headbutt pools are listed here — many other Johto and '
      + 'Kanto routes also have headbutt trees, but the per-tree species splits vary and aren\'t covered '
      + 'in this short reference. Tier (Common / Uncommon / Rare) is a simplified bucket of the in-game '
      + 'slot weights; treat the percentages as rough guidance, not strict drop rates.'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildHeadbuttTreesPage = buildHeadbuttTreesPage;
})();
