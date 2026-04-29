// Apricorns & Kurt's Custom Poké Balls (HGSS) reference page.
// Source: Bulbapedia "Apricorn" article (https://bulbapedia.bulbagarden.net/wiki/Apricorn).
// Data confirmed against the HeartGold/SoulSilver apricorn-tree map and Kurt's ball list.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// HGSS-only — page hides itself when a DPPt slot is active.

(function(){
  // The 7 apricorn colours and the custom Poké Balls Kurt makes from them.
  var BALLS = [
    {
      color:'Red',     swatch:'#d23f3f', ball:'Level Ball',
      effect:'Catch-rate multiplier scales with the level gap between your lead and the target: ×1 if equal or lower, ×2 if your lead is higher, ×4 if more than double, ×8 if more than four times the target\'s level.'
    },
    {
      color:'Blue',    swatch:'#3f7fd2', ball:'Lure Ball',
      effect:'×3 catch rate on Pokémon hooked with the Old Rod, Good Rod, or Super Rod. No bonus for Surf encounters.'
    },
    {
      color:'Yellow',  swatch:'#e8c93b', ball:'Moon Ball',
      effect:'×4 catch rate on species that evolve via Moon Stone. In Gen 4 this list is: Nidoran♀/Nidorina, Nidoran♂/Nidorino, Cleffa/Clefairy, Igglybuff/Jigglypuff, and Skitty. (Munna is Gen 5 — not eligible here.)'
    },
    {
      color:'Green',   swatch:'#3fae5a', ball:'Friend Ball',
      effect:'Pokémon caught in a Friend Ball start with a base friendship of 200 instead of the species default — handy for Golbat, Chansey, Riolu, etc.'
    },
    {
      color:'Pink',    swatch:'#e58fb6', ball:'Love Ball',
      effect:'×8 catch rate when the wild Pokémon is the same species as your lead but the opposite gender. Genderless or same-gender targets get no bonus.'
    },
    {
      color:'White',   swatch:'#f1f1f1', ball:'Fast Ball',
      effect:'×4 catch rate on Pokémon whose base Speed is 100 or higher (e.g. Electrode, Crobat, Aerodactyl, Jolteon).'
    },
    {
      color:'Black',   swatch:'#2b2b2b', ball:'Heavy Ball',
      effect:'Adds a flat modifier to catch rate based on target weight: +0 under 102.4 kg, +20 from 102.4–204.8 kg, +30 from 204.8–307.2 kg, +40 at 307.2 kg and above. Lighter targets actually get a small penalty.'
    }
  ];

  // Bulbapedia HGSS apricorn-tree map. One tree per route; colour is fixed.
  var TREES = [
    { id:1,  loc:'Route 26',                  color:'Red',    swatch:'#d23f3f', note:'East of Indigo Plateau, just north of Tohjo Falls.' },
    { id:2,  loc:'Route 28',                  color:'Red',    swatch:'#d23f3f', note:'On the Mt. Silver approach, north of Route 26.' },
    { id:3,  loc:'Route 42',                  color:'Blue',   swatch:'#3f7fd2', note:'Between Ecruteak and Mahogany, near Mt. Mortar.' },
    { id:4,  loc:'Route 44',                  color:'Blue',   swatch:'#3f7fd2', note:'East of Mahogany, on the way to Ice Path.' },
    { id:5,  loc:'Route 37',                  color:'Yellow', swatch:'#e8c93b', note:'North of Ecruteak City, before Route 38.' },
    { id:6,  loc:'Route 42',                  color:'Yellow', swatch:'#e8c93b', note:'Second tree on Route 42, near the Mt. Mortar entrance.' },
    { id:7,  loc:'Azalea Town',               color:'Green',  swatch:'#3fae5a', note:'Right outside Kurt\'s house — the closest tree to him.' },
    { id:8,  loc:'Route 38',                  color:'Green',  swatch:'#3fae5a', note:'On the path past the Moomoo Farm.' },
    { id:9,  loc:'Route 39',                  color:'Pink',   swatch:'#e58fb6', note:'Near Moomoo Farm, between Routes 38 and Olivine.' },
    { id:10, loc:'Route 46',                  color:'Pink',   swatch:'#e58fb6', note:'North of Cherrygrove, beneath Dark Cave\'s south entrance.' },
    { id:11, loc:'Route 25',                  color:'White',  swatch:'#f1f1f1', note:'Cerulean → Bill\'s house path (Kanto).' },
    { id:12, loc:'Route 36',                  color:'White',  swatch:'#f1f1f1', note:'Between Violet City and the Ruins of Alph turnoff.' },
    { id:13, loc:'Route 43',                  color:'Black',  swatch:'#2b2b2b', note:'North of Mahogany Town, on the way to Lake of Rage.' },
    { id:14, loc:'Route 45',                  color:'Black',  swatch:'#2b2b2b', note:'Long mountain path south of Blackthorn City.' }
  ];

  function buildApricornsPage() {
    var el = document.getElementById('apricorns-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    // Ball table rows.
    var ballRows = BALLS.map(function(b){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);width:32px"><span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:' + b.swatch + ';border:2px solid var(--border);vertical-align:middle"></span></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + b.color + ' Apricorn</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:800;color:' + gameColor + '">' + b.ball + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);line-height:1.6">' + b.effect + '</td>'
        + '</tr>';
    }).join('');

    var ballHtml = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);width:32px"></th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">APRICORN</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">BALL</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">EFFECT</th>'
      + '</tr></thead><tbody>' + ballRows + '</tbody></table>';

    // Tree-location rows.
    var treeRows = TREES.map(function(t){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">#' + (t.id < 10 ? '0' + t.id : t.id) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + t.loc + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:' + t.swatch + ';border:2px solid var(--border);vertical-align:middle;margin-right:6px"></span><span style="font-weight:700">' + t.color + '</span></td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + t.note + '</td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'HeartGold &amp; SoulSilver only. <strong>Apricorn trees</strong> regrow daily on specific Johto and Kanto routes — '
      + 'shake one and it drops up to a few apricorns of a fixed colour for that tree. Bring them to <strong>Kurt</strong> '
      + 'in <strong>Azalea Town</strong> (the elderly Pokéball-maker next to the Slowpoke Well) and he will turn them into '
      + 'custom Poké Balls. Kurt only works <strong>once per day</strong> and each batch takes a full <strong>24 in-game '
      + 'hours</strong> to finish.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">7 APRICORNS &rarr; 7 CUSTOM BALLS</div>'
      + '<div style="padding:8px 0">' + ballHtml + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">APRICORN TREE LOCATIONS</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:48px">#</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LOCATION</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">APRICORN</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + treeRows + '</tbody></table>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ KURT\'S CONVERSION RULES</div>'
      + '<div style="padding:12px 14px;font-size:12px;color:var(--muted);line-height:1.75;">'
      + '<ul style="margin:0;padding-left:18px;">'
      + '<li><strong>1 apricorn = 1 ball.</strong> Hand Kurt N apricorns of one colour, get N balls back — there is no bulk discount and no waste.</li>'
      + '<li><strong>One batch every 24 hours.</strong> Kurt only finishes one queued batch per real-time day; the next batch will not start until you collect the previous one.</li>'
      + '<li><strong>Ball type is decided by colour alone.</strong> The level/Pokémon you give him does not matter — only the apricorn colour determines the resulting ball.</li>'
      + '<li><strong>Tip — queue a max stack.</strong> Drop off a full stack of one apricorn colour before going on a long playthrough; Kurt will steadily produce one ball per day until the stack is exhausted, no daily check-ins required beyond picking them up.</li>'
      + '<li><strong>Mixing colours.</strong> You can only give Kurt one colour at a time per batch. Want a variety? Plan your trips: drop off, wait 24 in-game hours, pick up, drop off the next colour.</li>'
      + '</ul>'
      + '</div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildApricornsPage = buildApricornsPage;
})();
