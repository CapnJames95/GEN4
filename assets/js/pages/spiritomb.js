// Spiritomb / Hallowed Tower (DPPt) reference page.
// Sources: Bulbapedia "Spiritomb (Pokémon)" (https://bulbapedia.bulbagarden.net/wiki/Spiritomb_(Pok%C3%A9mon))
//          Bulbapedia "Hallowed Tower"          (https://bulbapedia.bulbagarden.net/wiki/Hallowed_Tower).
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// DPPt only — page hides itself when an HGSS slot is active.

(function(){
  // Step-by-step quest walkthrough.
  var STEPS = [
    {
      title:'Get the Explorer Kit',
      body:'Talk to the <strong>Underground Man</strong> in his house in <strong>Eterna City</strong>. He hands over the Explorer Kit, which is required to dig into and travel through the Sinnoh Underground.'
    },
    {
      title:'Obtain an Odd Keystone',
      body:'Fixed locations: <strong>Route 208</strong> (hidden), <strong>Route 209</strong> (hidden), and <strong>Hearthome City</strong> — left of the door of the Pokémon Mansion (hidden). Random hidden squares around Sinnoh can also drop one. The most reliable pickup is the <strong>Hearthome Mansion</strong> hidden item, found with the <strong>Dowsing Machine</strong>.'
    },
    {
      title:'Locate the Hallowed Tower',
      body:'On <strong>Route 209</strong>, find the small grey stone tower <strong>south-east of the Pokémon Mansion path</strong>. It is the only interactable stone structure on that route — easy to walk past on first visit.'
    },
    {
      title:'Insert the Odd Keystone',
      body:'Interact with the Hallowed Tower while carrying the keystone in your bag. A prompt appears asking whether to slot the Odd Keystone in. Confirm it. The tower visibly changes once the keystone is in place.'
    },
    {
      title:'Talk to 32 different people in the Underground',
      body:'Use the Sinnoh Underground <strong>wireless meet system</strong> to make contact with <strong>32 distinct real-world player profiles</strong>. Each unique person counts once toward the tally. <strong>You cannot complete this alone with one DS</strong> — it requires multiple physical DS systems with friends or a modern AR/relay setup. The cheese: meeting the same handful of friends repeatedly does <strong>NOT</strong> count, the game tracks 32 distinct character profiles.'
    },
    {
      title:'Return to the Hallowed Tower',
      body:'Once the 32-person counter is full, walk back to the tower and interact with it. Spiritomb appears as a <strong>level-25 wild encounter</strong>. There is exactly one shot per Odd Keystone — if it faints or you flee, you will need a fresh keystone and a fresh tower setup.'
    }
  ];

  // Catch tactics card bullets.
  var CATCH_TIPS = [
    'Spiritomb is <strong>Ghost / Dark</strong>. In Generation 4, that combination has <strong>zero weaknesses</strong> — Fairy did not exist yet, so nothing is super-effective against it.',
    'Use a <strong>Normal-type</strong> with <strong>False Swipe</strong> to chip it to 1 HP — but Ghost makes it <strong>immune to most Normal moves</strong>. Cast <strong>Foresight</strong> first (or run a Pokémon with Scrappy / a Foresight-using False Swiper) so False Swipe lands.',
    'Lock it down with <strong>sleep</strong> (Hypnosis, Sleep Powder, Yawn) before throwing balls. Spore is unavailable in Sinnoh proper.',
    '<strong>Dusk Balls</strong> are best — the encounter is indoors-equivalent against the tower, so the dusk multiplier applies regardless of in-game time on most setups. Otherwise Ultra Balls.',
    'Save <strong>before</strong> first interacting with the loaded tower. The encounter triggers immediately, so a hard reset is your only do-over if something goes wrong.'
  ];

  // FAQ entries.
  var FAQS = [
    {
      q:'Will Mira / Buck / Cheryl / Riley partner counters count toward the 32?',
      a:'<strong>No.</strong> Only true <strong>wireless connections</strong> with other player profiles in the Underground are tracked. NPC partners from the dungeon storyline do nothing for the Hallowed Tower counter.'
    },
    {
      q:'What if I do not have the trade infrastructure?',
      a:'Without local DS friends or a modern emulation / AR setup that can simulate distinct Underground partners, this quest is <strong>effectively gated</strong>. There is no single-player path to Spiritomb in DPPt.'
    },
    {
      q:'Does talking to the same friend 32 times work?',
      a:'<strong>No.</strong> The game stores 32 <strong>distinct</strong> character profiles. Re-meeting the same person bumps the meet log but does not advance the Spiritomb counter.'
    },
    {
      q:'Can I do this before the Elite Four?',
      a:'Yes — once you have the Explorer Kit (Eterna City) and an Odd Keystone, the entire quest is doable mid-game. Spiritomb appears at level 25, so trying it after Hearthome is reasonable.'
    }
  ];

  function buildSpiritombPage() {
    var el = document.getElementById('spiritomb-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/442.png';
    var nameClick = "_openDexSearch('Spiritomb', 442)";

    // Step list rows.
    var stepHtml = STEPS.map(function(s, i){
      var n = i + 1;
      return '<tr>'
        + '<td style="padding:9px 12px;border-bottom:1px solid var(--border);vertical-align:top;font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:48px">' + (n < 10 ? '0' + n : n) + '</td>'
        + '<td style="padding:9px 12px;border-bottom:1px solid var(--border);vertical-align:top;">'
        + '<div style="font-weight:700;margin-bottom:3px;">' + s.title + '</div>'
        + '<div style="font-size:11px;color:var(--muted);line-height:1.65;">' + s.body + '</div>'
        + '</td>'
        + '</tr>';
    }).join('');

    // Catch tip bullets.
    var tipsHtml = CATCH_TIPS.map(function(t){
      return '<li style="margin-bottom:8px;line-height:1.7;">' + t + '</li>';
    }).join('');

    // FAQ rows.
    var faqHtml = FAQS.map(function(f){
      return '<div style="padding:11px 14px;border-bottom:1px solid var(--border);">'
        + '<div style="font-weight:700;margin-bottom:5px;">Q: ' + f.q + '</div>'
        + '<div style="font-size:11px;color:var(--muted);line-height:1.7;">A: ' + f.a + '</div>'
        + '</div>';
    }).join('');

    var html = ''
      // Intro card with clickable Pokémon header.
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="display:flex;align-items:center;gap:14px;padding:12px 14px;cursor:pointer;border-bottom:1px solid var(--border);" onclick="' + nameClick + '">'
      + '<img src="' + sprite + '" width="64" height="64" style="image-rendering:pixelated;flex-shrink:0">'
      + '<div>'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:4px;">#442 &nbsp; SPIRITOMB</div>'
      + '<div style="font-size:11px;color:var(--muted);">Ghost / Dark &nbsp;·&nbsp; Forbidden Pokémon</div>'
      + '</div>'
      + '</div>'
      + '<div style="padding:12px 14px;font-size:12px;color:var(--muted);line-height:1.7;">'
      + 'Diamond, Pearl &amp; Platinum only. Spiritomb is the <strong>rarest non-legendary catch in DPPt</strong>. '
      + 'To make one appear you need an <strong>Odd Keystone</strong> (the Hallowed Tower item), then talk to '
      + '<strong>32 different people</strong> in the Sinnoh Underground via wireless before slotting the keystone '
      + 'into the Hallowed Tower on Route 209.'
      + '</div>'
      + '</div>'

      // Walkthrough.
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">QUEST WALKTHROUGH</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><tbody>' + stepHtml + '</tbody></table>'
      + '</div>'

      // Encounter / catch tips.
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(140,110,200,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#c8a8ff;letter-spacing:0.5px;">ENCOUNTER &amp; CATCH TIPS</div>'
      + '<ul style="margin:0;padding:14px 14px 14px 32px;font-size:12px;color:var(--text);">' + tipsHtml + '</ul>'
      + '</div>'

      // FAQ / pitfalls.
      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">FAQ &amp; COMMON PITFALLS</div>'
      + faqHtml
      + '</div>';

    el.innerHTML = html;
  }

  window.buildSpiritombPage = buildSpiritombPage;
})();
