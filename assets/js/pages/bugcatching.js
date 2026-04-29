// Bug-Catching Contest (HGSS) reference page.
// Source: Bulbapedia "Bug-Catching Contest" article
// (https://bulbapedia.bulbagarden.net/wiki/Bug-Catching_Contest).
// HGSS-only — held at Johto's National Park (north of Goldenrod).
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.

(function(){
  // Bulbapedia HGSS Bug-Catching Contest encounter pool.
  // Levels and rarity per the HGSS-specific section of the article.
  var POOL = [
    {num:10,  name:'Caterpie',   levels:'7-18', tier:'common',     note:'Most common bug. Low score ceiling.'},
    {num:13,  name:'Weedle',     levels:'7-18', tier:'common',     note:'Common filler. Skip unless levels are unusually high.'},
    {num:46,  name:'Paras',      levels:'7-18', tier:'uncommon',   note:'Decent filler. Spore via evolution comes too late to help here.'},
    {num:48,  name:'Venonat',    levels:'7-18', tier:'uncommon',   note:'Slightly better mid-tier scoring than Caterpie/Weedle.'},
    {num:127, name:'Pinsir',     levels:'13-18',tier:'rare',       note:'Top-tier prize. High level + full HP = guaranteed gold.'},
    {num:123, name:'Scyther',    levels:'13-18',tier:'rare',       note:'Top-tier prize. False Swipe lead can self-catch it cleanly.'},
    {num:12,  name:'Butterfree', levels:'12-15',tier:'post-NatDex',note:'Only appears after obtaining the National Pokédex.'},
    {num:15,  name:'Beedrill',   levels:'12-15',tier:'post-NatDex',note:'Only appears after obtaining the National Pokédex.'}
  ];

  function buildBugCatchingPage() {
    var el = document.getElementById('bugcatching-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function tierBadge(tier) {
      var bg = 'rgba(255,255,255,0.06)', fg = 'var(--muted)';
      if (tier === 'common')      { bg = 'rgba(120,180,120,0.18)'; fg = '#9ed99e'; }
      else if (tier === 'uncommon'){ bg = 'rgba(180,180,120,0.18)'; fg = '#e1d77a'; }
      else if (tier === 'rare')   { bg = 'rgba(220,140,80,0.22)'; fg = '#ffb27a'; }
      else if (tier === 'post-NatDex') { bg = 'rgba(140,160,220,0.22)'; fg = '#aebbff'; }
      return '<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-family:\'Press Start 2P\',monospace;font-size:8px;background:' + bg + ';color:' + fg + ';letter-spacing:0.5px;">' + tier.toUpperCase() + '</span>';
    }

    function poolRow(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var safeName = p.name.replace(/'/g, "\\'");
      var nameClick = "_openDexSearch('" + safeName + "', " + p.num + ")";
      return '<tr style="cursor:pointer;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'\'" onclick="' + nameClick + '" title="Open in Pokédex">'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><img src="' + sprite + '" width="32" height="32" style="image-rendering:pixelated;vertical-align:middle"></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + p.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">Lv ' + p.levels + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);text-align:center">' + tierBadge(p.tier) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + p.note + '</td>'
        + '</tr>';
    }

    var poolHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:48px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">POKÉMON</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LEVELS</th>'
      + '<th style="text-align:center;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">RARITY</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>';
    POOL.forEach(function(p){ poolHtml += poolRow(p); });
    poolHtml += '</tbody></table>';

    // Scoring criteria
    var scoringHtml = '<ol style="margin:0;padding-left:20px;font-size:12px;color:var(--text);line-height:1.8;">'
      + '<li><strong>Species rarity</strong> — rarer bugs (Pinsir, Scyther) score higher than common ones (Caterpie, Weedle).</li>'
      + '<li><strong>Level of the caught Pokémon</strong> — higher level = bigger bonus.</li>'
      + '<li><strong>Remaining HP at the moment of capture</strong> — full HP = maximum bonus, near-fainted = almost none.</li>'
      + '</ol>'
      + '<div style="margin-top:12px;padding:10px 12px;background:rgba(255,215,0,0.08);border-left:3px solid #ffd977;border-radius:4px;font-size:11px;color:var(--muted);line-height:1.7;">'
      + 'All three sub-scores are summed; whoever finishes with the highest total takes 1st place. Aim for a <strong>high-level Pinsir or Scyther captured at full HP</strong> for a guaranteed gold finish.'
      + '</div>';

    // Prize ladder
    function itemLink(name) {
      var safe = name.replace(/'/g, "\\'");
      return '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700;text-decoration:underline;text-decoration-style:dotted;" onclick="openItemByName(\'' + safe + '\')" title="Open item details">' + name + '</span>';
    }
    function moveLink(name) {
      var safe = name.replace(/'/g, "\\'");
      return '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700;text-decoration:underline;text-decoration-style:dotted;" onclick="goToMoveInDex(\'' + safe + '\')" title="Open move details">' + name + '</span>';
    }
    function dexLink(name, num) {
      var safe = name.replace(/'/g, "\\'");
      return '<span style="cursor:pointer;color:' + gameColor + ';font-weight:700;text-decoration:underline;text-decoration-style:dotted;" onclick="_openDexSearch(\'' + safe + '\', ' + num + ')" title="Open in Pokédex">' + name + '</span>';
    }

    var prizeRows = [
      {place:'1st', color:'#ffd977', reward:itemLink('Sun Stone'),  detail:'Evolves Sunkern → Sunflora and Gloom → Bellossom.'},
      {place:'2nd', color:'#cfd8dc', reward:itemLink('Everstone'),  detail:'Held item that prevents evolution.'},
      {place:'3rd', color:'#cd7f32', reward:itemLink('Sitrus Berry'),detail:'Consolation berry (restores ¼ HP when held).'},
      {place:'—',   color:'var(--muted)', reward:'<span style="color:var(--muted)">Sport Ball reuse</span>', detail:'Any unused Sport Balls from your 20 are returned at the end of the contest.'}
    ];
    var prizeHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:64px;">PLACE</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">REWARD</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>';
    prizeRows.forEach(function(r){
      prizeHtml += '<tr>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + r.color + ';">' + r.place + '</td>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);">' + r.reward + '</td>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + r.detail + '</td>'
        + '</tr>';
    });
    prizeHtml += '</tbody></table>';

    // Strategy tips
    var tipsHtml = '<ul style="margin:0;padding-left:20px;font-size:12px;color:var(--text);line-height:1.8;">'
      + '<li>Lead with a fast Pokémon to outspeed the bug, then chip with ' + moveLink('False Swipe') + ' (a ' + dexLink('Scyther', 123) + ' lead is a classic pick).</li>'
      + '<li>Sleep status from ' + moveLink('Spore') + ' or ' + moveLink('Sleep Powder') + ' preserves the catch\'s HP — keeping the full-HP scoring bonus intact.</li>'
      + '<li>Sport Balls have a <strong>×1.5 catch rate on Bug-types only</strong>, which is exactly what you need against ' + dexLink('Scyther', 123) + ' and ' + dexLink('Pinsir', 127) + '.</li>'
      + '<li>Save before walking into the contest — a poor pool of Caterpie/Weedle wastes the whole 20-minute session, and you can\'t re-enter until the next contest day.</li>'
      + '</ul>';

    function panel(title, body, accent) {
      var color = accent || gameColor;
      return '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
        + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + color + ';letter-spacing:0.5px;">' + title + '</div>'
        + '<div style="padding:14px;">' + body + '</div>'
        + '</div>';
    }

    function panelTable(title, body, accent) {
      var color = accent || gameColor;
      return '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
        + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + color + ';letter-spacing:0.5px;">' + title + '</div>'
        + '<div style="padding:8px 0;">' + body + '</div>'
        + '</div>';
    }

    var introHtml = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'The <strong>Bug-Catching Contest</strong> is a recurring competition held in Johto\'s <strong>National Park</strong>, '
      + 'just north of <strong>Goldenrod City</strong>. It runs <strong>three days a week</strong> — Tuesday, Thursday, and Saturday — '
      + 'and each session lasts <strong>20 minutes</strong> of in-game time. On entry your normal Poké Balls are swapped for '
      + '<strong>20 Sport Balls</strong>, and only the single strongest Bug Pokémon you catch counts toward your score.'
      + '</div>';

    var scheduleBody = '<div style="font-size:12px;color:var(--text);line-height:1.8;">'
      + 'Held on <strong>Tuesday, Thursday, and Saturday</strong>, from <strong>9:00 AM</strong> to <strong>7:50 PM</strong> in-game. '
      + 'Outside that window the National Park <strong>gate is locked</strong> for contest entry — you can still pass through, but '
      + 'you cannot start a session, and the entry NPC will turn you away until the next valid day.'
      + '</div>';

    var html = ''
      + introHtml
      + panel('CONTEST SCHEDULE', scheduleBody)
      + panelTable('ENCOUNTER POOL', poolHtml)
      + panel('SCORING FORMULA', scoringHtml)
      + panelTable('PRIZE LADDER', prizeHtml, '#ffd977')
      + panel('STRATEGY TIPS', tipsHtml);

    el.innerHTML = html;
  }

  window.buildBugCatchingPage = buildBugCatchingPage;
})();
