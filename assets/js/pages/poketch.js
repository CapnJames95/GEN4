// Pokétch (DPPt) reference page.
// Source: Bulbapedia "Pokétch" article (https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9tch).
// DPPt only — page hides itself when an HGSS slot is active.
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum.

(function(){
  // Pokétch apps. ptOnly=true means Platinum exclusive (not in DP).
  // Order follows Bulbapedia's "Pokétch" app numbering. Entries omitted when
  // the in-game unlock condition couldn't be confirmed against Bulbapedia.
  var APPS = [
    { id:1,  name:'Digital Watch',      unlock:'Default — included with the Pokétch.',                                              use:'Tells the in-game time digitally.' },
    { id:2,  name:'Calculator',         unlock:'Jubilife City — free from an NPC after receiving the Pokétch.',                     use:'Basic four-function calculator.' },
    { id:3,  name:'Memo Pad',           unlock:'Jubilife City — Trainers\' School area NPC.',                                       use:'Scribble notes on the touch screen.' },
    { id:4,  name:'Pedometer',          unlock:'Jubilife City — same NPC, after taking the Memo Pad.',                              use:'Counts steps. Resets at 99,999.' },
    { id:5,  name:'Pokémon List',       unlock:'Eterna City — given after clearing the Galactic Building.',                         use:'Shows your party\'s HP at a glance and lets you pet them.' },
    { id:6,  name:'Friendship Checker', unlock:'Eterna City Pokémon Center — Pokémon Fan Club president.',                          use:'Pet your team to gauge friendship; raises happiness over time.' },
    { id:7,  name:'Dowsing Machine',    unlock:'Sandgem Town — Lucas/Dawn\'s sister.',                                              use:'Locates hidden items in the overworld.' },
    { id:8,  name:'Berry Searcher',     unlock:'Hearthome City — NPC near the Contest Hall.',                                       use:'Pings ripe berry trees on the current map.' },
    { id:9,  name:'Day-Care Checker',   unlock:'Solaceon Town — Day Care Lady.',                                                    use:'Shows level/egg progress for Pokémon left at the Day Care.' },
    { id:10, name:'Pokémon History',    unlock:'Solaceon Town — NPC inside one of the houses.',                                     use:'Logs the most recent Pokémon you\'ve seen, caught, or obtained.' },
    { id:11, name:'Counter',            unlock:'Veilstone City — man inside the Game Corner.',                                      use:'Tally counter (tap to increment).' },
    { id:12, name:'Analog Watch',       unlock:'Veilstone Department Store — top-floor lottery prize.',                             use:'Tells the time on an analog face.' },
    { id:13, name:'Marking Map',        unlock:'Pastoria City — given after defeating Crasher Wake.',                               use:'Shows Sinnoh map with markers; tracks Sinnoh roamers (Mesprit / Cresselia and, in Platinum, Articuno / Zapdos / Moltres). Latios / Latias only roam in HGSS, not DPPt.' },
    { id:14, name:'Link Searcher',      unlock:'Canalave City — Pokémon Center.',                                                  use:'Scans for nearby wireless players.' },
    { id:15, name:'Coin Toss',          unlock:'Veilstone Game Corner — same man, after taking the Counter.',                       use:'Flip a coin on the touch screen.' },
    { id:16, name:'Move Tester',        unlock:'Canalave Library.',                                                                 use:'Calculates type effectiveness for a move against any defender type combo.' },
    { id:17, name:'Calendar',           unlock:'Snowpoint City — NPC.',                                                             use:'Monthly calendar with note markers per day.' },
    { id:18, name:'Dot Artist',         unlock:'Sunyshore City — NPC.',                                                             use:'Draw a small pixel-art picture.' },
    { id:19, name:'Roulette',           unlock:'Hearthome City — NPC.',                                                             use:'Spin a customizable roulette wheel.' },
    { id:20, name:'Trainer Counter',    unlock:'Survival Area (Pt only).',                                            ptOnly:true,  use:'Counts how many trainers you have battled in the area.' },
    { id:21, name:'Kitchen Timer',      unlock:'Pastoria City — NPC.',                                                              use:'Countdown timer with alarm.' },
    { id:22, name:'Color Changer',      unlock:'Jubilife City — Pokétch Co. lottery.',                                              use:'Recolors the Pokétch screen.' },
    { id:23, name:'Matchup Checker',    unlock:'Pt only — type matchup utility.',                                     ptOnly:true,  use:'Shows type effectiveness chart for your party against a chosen type.' },
    { id:24, name:'Stopwatch',          unlock:'Floaroma Meadow — NPC.',                                                            use:'Standard stopwatch with lap support.' },
    { id:25, name:'Alarm Clock',        unlock:'Veilstone Department Store lottery.',                                               use:'Sets an alarm that chimes at a chosen time.' }
  ];

  function buildPoketchPage() {
    var el = document.getElementById('poketch-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    var rows = APPS.map(function(a){
      var nameCell = a.name + (a.ptOnly ? ' <span style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:#ffd977;margin-left:4px;">PT ONLY</span>' : '');
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';white-space:nowrap;">#' + (a.id < 10 ? '0' + a.id : a.id) + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + nameCell + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + a.unlock + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + a.use + '</td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'The <strong>Pokétch</strong> (Pokémon Watch) is a wrist-watch device that lives on the bottom screen. '
      + 'You earn it from the <strong>Pokétch Co. president</strong> in <strong>Jubilife City</strong> after collecting '
      + '<strong>3 Coupons</strong> handed out by his three children scattered around Jubilife. '
      + 'Apps are added one at a time by various NPCs throughout Sinnoh — there are <strong>25 apps in Platinum</strong> '
      + '(24 in Diamond/Pearl). Cycle apps with the side button.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ MOST USEFUL APPS</div>'
      + '<div style="padding:12px 14px;font-size:12px;line-height:1.8;">'
      + '<ul style="margin:0;padding-left:18px;">'
      + '<li><strong>Marking Map</strong> — shows roaming legendaries\' current routes on the Sinnoh map.</li>'
      + '<li><strong>Friendship Checker</strong> — pet your team for steady friendship boosts.</li>'
      + '<li><strong>Dowsing Machine</strong> — finds hidden items buried in the overworld.</li>'
      + '<li><strong>Berry Searcher</strong> — pings ripe berries on the current map.</li>'
      + '<li><strong>Day-Care Checker</strong> — see egg/level progress without walking back to Solaceon.</li>'
      + '<li><strong>Pokémon History</strong> — quick log of your most recent encounters.</li>'
      + '</ul>'
      + '</div>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">ALL POKÉTCH APPS</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';width:48px">#</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">APP</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">UNLOCK</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">USE CASE</th>'
      + '</tr></thead><tbody>' + rows + '</tbody></table>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildPoketchPage = buildPoketchPage;
})();
