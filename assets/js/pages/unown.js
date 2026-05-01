// Unown / Ruins of Alph (HGSS) reference page.
// Sources: Bulbapedia "Unown" (https://bulbapedia.bulbagarden.net/wiki/Unown)
//          Bulbapedia "Ruins of Alph" (https://bulbapedia.bulbagarden.net/wiki/Ruins_of_Alph)
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// HGSS-only — page hides itself when a DPPt slot is active.

(function(){
  var UNOWN_DEX = 201;

  // Four basement chambers in the Ruins of Alph. Bulbapedia confirms each
  // chamber holds a different sliding/jigsaw puzzle of an ancient Pokémon and
  // that solving each puzzle unlocks a different subset of Unown letters in
  // the Inner Chambers below. The exact letter-to-chamber mapping varies by
  // generation; rather than misquote it, we describe each puzzle and note
  // that solving it unlocks "a subset of letters". ! and ? are post-game.
  var CHAMBERS = [
    {
      name: 'Tanoby / Kabuto Chamber',
      puzzle: 'Sliding-tile puzzle of a Kabuto.',
      unlock: 'Solving opens the inner chamber and unlocks a subset of letter forms (early alphabet).'
    },
    {
      name: 'Aerodactyl Chamber',
      puzzle: 'Jigsaw puzzle of Aerodactyl.',
      unlock: 'Solving unlocks an additional subset of letters in the inner chambers.'
    },
    {
      name: 'Omanyte Chamber',
      puzzle: 'Jigsaw puzzle of Omanyte.',
      unlock: 'Solving unlocks a further subset of letter forms.'
    },
    {
      name: 'Ho-Oh Chamber',
      puzzle: 'Jigsaw puzzle of Ho-Oh.',
      unlock: 'Solving unlocks the final subset of letters (later alphabet).'
    }
  ];

  // All 28 forms. "base" = appears in basement chambers from initial puzzles.
  // "puzzle" = locked behind solving every chamber puzzle (! and ?).
  var FORMS = [
    {f:'A', where:'Inner chambers (after first puzzle solved)', status:'base'},
    {f:'B', where:'Inner chambers',                              status:'base'},
    {f:'C', where:'Inner chambers',                              status:'base'},
    {f:'D', where:'Inner chambers',                              status:'base'},
    {f:'E', where:'Inner chambers',                              status:'base'},
    {f:'F', where:'Inner chambers',                              status:'base'},
    {f:'G', where:'Inner chambers',                              status:'base'},
    {f:'H', where:'Inner chambers',                              status:'base'},
    {f:'I', where:'Inner chambers',                              status:'base'},
    {f:'J', where:'Inner chambers',                              status:'base'},
    {f:'K', where:'Inner chambers',                              status:'base'},
    {f:'L', where:'Inner chambers',                              status:'base'},
    {f:'M', where:'Inner chambers',                              status:'base'},
    {f:'N', where:'Inner chambers',                              status:'base'},
    {f:'O', where:'Inner chambers',                              status:'base'},
    {f:'P', where:'Inner chambers',                              status:'base'},
    {f:'Q', where:'Inner chambers',                              status:'base'},
    {f:'R', where:'Inner chambers',                              status:'base'},
    {f:'S', where:'Inner chambers',                              status:'base'},
    {f:'T', where:'Inner chambers',                              status:'base'},
    {f:'U', where:'Inner chambers',                              status:'base'},
    {f:'V', where:'Inner chambers',                              status:'base'},
    {f:'W', where:'Inner chambers',                              status:'base'},
    {f:'X', where:'Inner chambers',                              status:'base'},
    {f:'Y', where:'Inner chambers',                              status:'base'},
    {f:'Z', where:'Inner chambers',                              status:'base'},
    {f:'!', where:'Appears only after finding all 26 letter forms and solving every chamber puzzle.', status:'puzzle'},
    {f:'?', where:'Appears only after finding all 26 letter forms and solving every chamber puzzle.', status:'puzzle'}
  ];

  function buildUnownPage() {
    var el = document.getElementById('unown-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + UNOWN_DEX + '.png';

    // Intro card
    var introHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">UNOWN — THE SYMBOL POKÉMON</div>'
      + '<div style="display:flex;gap:14px;align-items:center;padding:14px;">'
      +   '<img src="' + sprite + '" width="64" height="64" style="image-rendering:pixelated;cursor:pointer;flex-shrink:0;" onclick="_openDexSearch(\'Unown\', ' + UNOWN_DEX + ')" title="Open Unown in Pokédex">'
      +   '<div style="font-size:12px;color:var(--muted);line-height:1.7;">'
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="_openDexSearch(\'Unown\', ' + UNOWN_DEX + ')">Unown</strong> (#201) is found exclusively in the <strong>Ruins of Alph</strong> in Johto, '
      +     'just west of Violet City. There are <strong>28 distinct forms</strong> in total — the 26 letters '
      +     '<strong>A through Z</strong>, plus <strong>!</strong> and <strong>?</strong>. The letter forms appear randomly in the four basement '
      +     '"Inner Chambers" only after the corresponding entrance puzzle has been solved. ! and ? are post-game forms '
      +     'that require completing every puzzle and catching most of the alphabet first.'
      +   '</div>'
      + '</div>'
      + '</div>';

    // Chambers
    var chamberRows = CHAMBERS.map(function(c, i){
      return '<tr>'
        + '<td style="padding:9px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:32px">' + (i+1) + '</td>'
        + '<td style="padding:9px 12px;border-bottom:1px solid var(--border);font-weight:700">' + c.name + '</td>'
        + '<td style="padding:9px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + c.puzzle + '<br><span style="color:var(--text);">' + c.unlock + '</span></td>'
        + '</tr>';
    }).join('');

    var chambersHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">THE FOUR BASEMENT CHAMBERS</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      +   'Each ground-level chamber contains a stone tablet puzzle. Solving the puzzle drops you into an Inner Chamber '
      +   'below where Unown letter forms can be encountered. Each chamber unlocks a different subset of the alphabet — '
      +   'work through all four to make every letter form available. (Letter-to-chamber mapping is approximate; consult '
      +   'Bulbapedia\'s "Ruins of Alph" article for the exact spread per game.)'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:32px">#</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">CHAMBER</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">PUZZLE / UNLOCKS</th>'
      + '</tr></thead><tbody>' + chamberRows + '</tbody></table>'
      + '</div>';

    // ! and ?
    var bangHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ UNLOCKING ! AND ?</div>'
      + '<div style="padding:12px 14px;font-size:12px;color:var(--muted);line-height:1.7;">'
      +   'The <strong>!</strong> and <strong>?</strong> forms are the last two and the most restrictive. They will only begin to appear '
      +   'in the Inner Chambers once <strong>both</strong> of the following are true:'
      +   '<ul style="margin:8px 0 8px 18px;padding:0;">'
      +     '<li>You have found all <strong>26 letter forms</strong>.</li>'
      +     '<li>You have solved <strong>every</strong> chamber puzzle in the Ruins of Alph.</li>'
      +   '</ul>'
      +   'Once both conditions are met, ! and ? begin spawning in the Inner Chambers (or via the special-chamber / radio mechanic, '
      +   'depending on game version). Each one is a single rare encounter rather than a guaranteed appearance, so be patient.'
      + '</div>'
      + '</div>';

    // 28 forms reference table
    var formRows = FORMS.map(function(u){
      var badge = u.status === 'base'
        ? '<span style="display:inline-block;padding:2px 8px;border-radius:8px;background:rgba(120,200,120,0.15);color:#a8e6a8;font-size:10px;font-weight:700;">base spawn</span>'
        : '<span style="display:inline-block;padding:2px 8px;border-radius:8px;background:rgba(255,180,80,0.15);color:#ffc97a;font-size:10px;font-weight:700;">puzzle-locked</span>';
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:11px;color:' + gameColor + ';text-align:center;width:48px">' + u.f + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + u.where + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:right;">' + badge + '</td>'
        + '</tr>';
    }).join('');

    var formsHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ALL 28 FORMS</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:48px">FORM</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">WHERE IT APPEARS</th>'
      + '<th style="text-align:right;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">STATUS</th>'
      + '</tr></thead><tbody>' + formRows + '</tbody></table>'
      + '</div>';

    // Why bother
    var whyHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">WHY CATCH THEM ALL?</div>'
      + '<div style="padding:12px 14px;font-size:12px;color:var(--muted);line-height:1.8;">'
      +   '<ul style="margin:0 0 0 18px;padding:0;">'
      +     '<li><strong>Pokédex completion:</strong> all 28 forms share dex slot <strong>#201</strong>, but the dex shows the captured form-letter — '
      +     'collectors typically aim for the full alphabet plus ! and ?. (No, each letter is <em>not</em> a separate dex entry — common misconception.)</li>'
      +     '<li><strong>Hidden Power:</strong> Unown\'s Hidden Power type is calculated from its <strong>IVs</strong>, exactly like every other Pokémon. '
      +     'The form letter does <strong>not</strong> influence Hidden Power\'s type or power — that\'s a long-running myth.</li>'
      +     '<li><strong>Moveset of one:</strong> Unown can learn exactly one move, ever — '
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="goToMoveInDex(\'Hidden Power\')">Hidden Power</strong>. '
      +     'No TMs, no tutors, no level-up additions. That\'s the entire moveset.</li>'
      +     '<li><strong>HGSS bonus:</strong> catching <strong>26 Unown</strong> (the full alphabet) unlocks the radio\'s <em>"Pokémon Music"</em> channel — '
      +     'speak to the radio host at the Lavender Town tower in Kanto post-game to claim it.</li>'
      +   '</ul>'
      + '</div>'
      + '</div>';

    // Strategy
    var strategyHtml = ''
      + '<div class="panel" style="padding:0;margin-bottom:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">CATCH STRATEGY</div>'
      + '<div style="padding:12px 14px;font-size:12px;color:var(--muted);line-height:1.8;">'
      +   'Wild Unown sit at very low levels with frail HP and Defense, so the danger is over-killing them with strong moves. Two reliable approaches:'
      +   '<ul style="margin:8px 0 0 18px;padding:0;">'
      +     '<li><strong>Weakest-attack chip:</strong> bring a low-level partner with a weak physical move (Tackle, Pound) and tap HP down a sliver at a time, then throw any Poké Ball.</li>'
      +     '<li><strong>False Swipe + status ball:</strong> use '
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="goToMoveInDex(\'False Swipe\')">False Swipe</strong> '
      +     'to leave Unown at 1 HP, then catch with a '
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="openItemByName(\'Quick Ball\')">Quick Ball</strong> '
      +     '(first turn) or a '
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="openItemByName(\'Heavy Ball\')">Heavy Ball</strong> '
      +     '(Unown is 11 lb / 5 kg — Heavy Ball is actually a poor pick here; '
      +     '<strong style="color:var(--text);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;" onclick="openItemByName(\'Ultra Ball\')">Ultra Balls</strong> '
      +     'work fine as a fallback).</li>'
      +     '<li>Sleep or Paralysis from a tutor/TM helps if you keep failing capture rolls.</li>'
      +   '</ul>'
      + '</div>'
      + '</div>';

    el.innerHTML = introHtml + chambersHtml + bangHtml + formsHtml + whyHtml + strategyHtml;
  }

  window.buildUnownPage = buildUnownPage;
})();
