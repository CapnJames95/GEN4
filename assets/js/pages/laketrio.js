// Lake Trio (DPPt) reference page.
// Sources: Bulbapedia "Uxie", "Mesprit", and "Azelf" articles
//   https://bulbapedia.bulbagarden.net/wiki/Uxie_(Pok%C3%A9mon)
//   https://bulbapedia.bulbagarden.net/wiki/Mesprit_(Pok%C3%A9mon)
//   https://bulbapedia.bulbagarden.net/wiki/Azelf_(Pok%C3%A9mon)
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// DPPt-only page — HG/SS do not have the lake trio as catchable here.

(function(){
  var TRIO = [
    {
      num: 480,
      name: 'Uxie',
      title: 'The Knowledge Pokémon',
      types: ['Psychic'],
      level: 50,
      location: 'Acuity Cavern, inside Lake Acuity (north Sinnoh, near Snowpoint City).',
      access: 'In Diamond/Pearl: post-game only, after defeating the Elite Four. In Platinum: available during the main story after capturing Giratina in the Distortion World — the lake awakens and Uxie can be reached via Surf.',
      tactic: 'Stationary encounter at Lv 50. Lead with a false-swiper (Gallade, Smeargle, Gliscor) to chip to 1 HP, then put Uxie to sleep or paralyze it. Dusk Balls work great inside the cavern; Timer Balls become very strong after about 30 turns. Save before entering — if you knock it out, it will not respawn until you beat the Elite Four again.',
      roam: false,
      flavor: 'Said to have wiped the memory of those who first saw its eyes. Mono-Psychic, with a very high Defense stat.'
    },
    {
      num: 481,
      name: 'Mesprit',
      title: 'The Emotion Pokémon',
      types: ['Psychic'],
      level: 50,
      location: 'First seen at Verity Cavern, inside Lake Verity. After the player interacts with it once, Mesprit flees and becomes a roaming legendary across the Sinnoh region.',
      access: 'In Diamond/Pearl: trigger the cavern visit post-game. In Platinum: visit Lake Verity after the Distortion World event. Either way, the very first encounter ends in a flee — Mesprit cannot be caught at the cavern.',
      tactic: 'Because Mesprit roams, the most reliable plan is: take a Pokémon with Mean Look or Block (Crobat learns Mean Look; a Dusclops with Block is the classic choice), and a Pokémon that knows Hypnosis or Thunder Wave to status it on turn one before it Teleports away. False Swipe + status, then Quick/Dusk/Timer Balls. The Master Ball is a perfectly reasonable choice on Mesprit specifically because tracking and trapping the roam is so frustrating.',
      roam: true,
      flavor: 'Roams Sinnoh routes at Lv 50. Heals fully each time it flees, so the catch can take many encounters.'
    },
    {
      num: 482,
      name: 'Azelf',
      title: 'The Willpower Pokémon',
      types: ['Psychic'],
      level: 50,
      location: 'Valor Cavern, inside Lake Valor (south Sinnoh, east of Pastoria City).',
      access: 'In Diamond/Pearl: post-game only, after defeating the Elite Four — Lake Valor refills after the Galactic plot resolves. In Platinum: available during the main story after the Distortion World / Giratina event, by Surfing into Valor Cavern.',
      tactic: 'Stationary Lv 50. Same plan as Uxie: false-swipe to 1 HP, status it (Spore/Hypnosis/Thunder Wave/Stun Spore), then chuck Dusk Balls in the cave or Timer Balls after stalling. Watch for Explosion in Platinum — paralysis is the safer status because sleep can be slept-talked into a self-KO. Save before entering.',
      roam: false,
      flavor: 'Mono-Psychic glass cannon — very high Speed and Attack/Sp. Atk, fragile defenses.'
    }
  ];

  var ROAMERS = [
    { num:481, name:'Mesprit',  games:'Diamond / Pearl / Platinum', level:50, trigger:'After the first encounter at Lake Verity (post-game in DP, mid-story in Pt).', notes:'Roams Sinnoh routes. Mean Look / Block to lock; status before it flees.' },
    { num:488, name:'Cresselia', games:'Diamond / Pearl / Platinum', level:50, trigger:'Post-game. Talk to Sailor Eldritch in Canalave City after his son falls ill, then visit Fullmoon Island and interact with Cresselia.', notes:'Roams Sinnoh routes after the Fullmoon Island event. Same Mean Look / status plan as Mesprit.' },
    { num:144, name:'Articuno',  games:'Platinum only',              level:60, trigger:'After obtaining the National Dex from Prof. Rowan and seeing all 210 Sinnoh Dex Pokémon in Pt.', notes:'Released by Prof. Oak at the Pal Park gate. Roams all Sinnoh routes.' },
    { num:145, name:'Zapdos',    games:'Platinum only',              level:60, trigger:'Same Pt-only National-Dex unlock — released alongside the other birds.', notes:'Roams Sinnoh. High Speed; expect frequent Teleports.' },
    { num:146, name:'Moltres',   games:'Platinum only',              level:60, trigger:'Same Pt-only National-Dex unlock.', notes:'Roams Sinnoh. Fire-type roamer; do not burn it with the false-swiper.' }
  ];

  function buildLakeTrioPage() {
    var el = document.getElementById('laketrio-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function typeBadge(t) {
      return '<span style="display:inline-block;padding:2px 8px;margin-right:4px;border-radius:3px;background:rgba(168,144,240,0.25);border:1px solid rgba(168,144,240,0.6);font-family:\'Press Start 2P\',monospace;font-size:8px;letter-spacing:0.5px;color:#c8b8ff;">' + t.toUpperCase() + '</span>';
    }

    function trioCard(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var nameClick = "_openDexSearch('" + p.name.replace(/'/g, "\\'") + "', " + p.num + ")";
      var typesHtml = p.types.map(typeBadge).join('');
      var roamRow = '';
      if (p.roam) {
        roamRow = '<div style="padding:10px 14px;border-top:1px solid var(--border);font-size:11px;line-height:1.7;color:var(--muted);">'
          + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffb088;margin-bottom:6px;letter-spacing:0.5px;">ROAMING NOTES</div>'
          + 'Roaming legendaries in Gen 4 work the same as Latios/Latias in Gen 3: they pick a random Sinnoh route every time the player crosses a route boundary, and the encounter starts on whichever route they currently occupy. The Marking Map app on the Pokétch (Pt) shows their current route as a moving marker. '
          + '<strong>Use Mean Look or Block on turn one</strong> to prevent the flee, immediately follow with sleep or paralysis, then false-swipe to 1 HP before throwing Dusk/Timer/Quick Balls. If the roamer faints, it is gone for the rest of that save.'
          + '</div>';
      }
      return '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
        + '<div style="padding:12px 14px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border);cursor:pointer;background:var(--panel);" onclick="' + nameClick + '">'
        + '<img src="' + sprite + '" width="64" height="64" style="image-rendering:pixelated;flex-shrink:0;">'
        + '<div style="flex:1;min-width:0;">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:' + gameColor + ';letter-spacing:0.5px;">' + p.name.toUpperCase() + ' <span style="color:var(--muted);font-size:9px;">#' + p.num + '</span></div>'
        + '<div style="font-size:11px;color:var(--muted);margin:4px 0 6px 0;font-style:italic;">' + p.title + ' • Lv ' + p.level + '</div>'
        + '<div>' + typesHtml + '</div>'
        + '</div>'
        + '</div>'

        + '<div style="padding:10px 14px;border-bottom:1px solid var(--border);font-size:12px;line-height:1.7;">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';margin-bottom:6px;letter-spacing:0.5px;">LOCATION</div>'
        + '<div style="font-weight:700;margin-bottom:4px;">' + p.location + '</div>'
        + '<div style="font-size:11px;color:var(--muted);">' + p.access + '</div>'
        + '</div>'

        + '<div style="padding:10px 14px;font-size:12px;line-height:1.7;">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';margin-bottom:6px;letter-spacing:0.5px;">CATCH TACTIC</div>'
        + '<div style="font-size:11px;color:var(--muted);">' + p.tactic + '</div>'
        + '</div>'

        + roamRow

        + '<div style="padding:8px 14px;border-top:1px solid var(--border);font-size:10px;color:var(--muted);font-style:italic;">' + p.flavor + '</div>'
        + '</div>';
    }

    var trioHtml = TRIO.map(trioCard).join('');

    var roamerRows = ROAMERS.map(function(r){
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + r.num + '.png';
      var nameClick = "_openDexSearch('" + r.name.replace(/'/g, "\\'") + "', " + r.num + ")";
      return '<tr style="cursor:pointer" onclick="' + nameClick + '">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + r.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';text-align:center;">L' + r.level + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;">' + r.games + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)"><div style="margin-bottom:3px;"><strong>Trigger:</strong> ' + r.trigger + '</div><div>' + r.notes + '</div></td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div class="panel" style="padding:14px;margin-bottom:18px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:10px;">THE LAKE GUARDIANS</div>'
      + '<div style="font-size:12px;color:var(--muted);line-height:1.7;">'
      + 'Uxie, Mesprit, and Azelf are the three lake guardians of Sinnoh — pure-Psychic legendaries born from Arceus alongside the Creation Trio. '
      + 'In <strong>Diamond &amp; Pearl</strong>, all three caverns awaken only after defeating Cyrus at Spear Pillar <em>and</em> the Elite Four — the trio is strictly post-game. '
      + 'In <strong>Platinum</strong>, the trio becomes catchable mid-story after capturing Giratina in the Distortion World, well before the Elite Four. '
      + 'Uxie and Azelf are stationary in their caverns; <strong>Mesprit flees on first contact</strong> and joins the roaming-legendary pool for the rest of the save.'
      + '</div>'
      + '</div>'

      + trioHtml

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">SINNOH ROAMING LEGENDARIES</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'All Sinnoh roamers behave the same way: they hop to a random route every time you cross a route boundary, '
      + 'they Teleport out of battle on turn one, and they restore HP each time they flee. The standard plan is '
      + '<strong>Mean Look / Block + status (sleep or paralysis) + false-swipe + Dusk/Timer/Quick Balls</strong>. '
      + 'Knocking a roamer out removes it permanently from the save.'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
      + '<th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LV</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">GAMES</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">UNLOCK / NOTES</th>'
      + '</tr></thead><tbody>' + roamerRows + '</tbody></table>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildLakeTrioPage = buildLakeTrioPage;
})();
