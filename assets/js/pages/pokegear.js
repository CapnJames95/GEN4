// PokéGear (HGSS) reference page.
// Source: Bulbapedia "PokéGear" and "List of phone-call trainers (HGSS)"
// (https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9Gear and
//  https://bulbapedia.bulbagarden.net/wiki/List_of_phone-call_trainers_in_HeartGold_and_SoulSilver).
// HGSS-only — page hides itself when a non-HGSS slot is active.
// Conservative on data: where rematch availability or gift items are uncertain,
// the entry says "verify in-game" rather than fabricating a tier.

(function(){

  // PokéGear card summary (Bulbapedia "PokéGear").
  var CARDS = [
    { name:'Phone',          desc:'Unlimited number storage in HGSS (no cap; numbers cannot be deleted). Trainers, family, and assorted NPCs (Mom, Professor Elm, Bill, Daisy) call with reminders, swarm tips, gift offers, and rematch requests.' },
    { name:'Map Card',       desc:'Regional map of Johto and Kanto. Highlights routes, marks the player, and is used to plan Fly destinations.' },
    { name:'Radio Card',     desc:'Tunes the Goldenrod Radio Tower channels — Music (Pokémon March, Lullaby), Lucky Number (lottery), Pokégear News, Buena\'s Password, and the Pokémon Channel. Some signals reveal hidden Pokémon (Hoenn/Sinnoh Sound).' },
    { name:'Expansion Card', desc:'Given by Mom in the Cherrygrove area in HGSS. Adds extended functionality and is required to unlock all PokéGear features.' }
  ];

  // Phone-call trainers verified against Bulbapedia "List of phone-call trainers (HGSS)".
  // Where rematch tier or gift-item details are uncertain, the entry notes "verify in-game".
  var TRAINERS = [
    { cls:'Youngster',     name:'Joey',     loc:'Route 30',     rematch:'Yes — rises with Badges',  note:'Famous "top-percentage Rattata". Calls about Rattata\'s special. Rematches scale with progress; ace evolves to Raticate.' },
    { cls:'Youngster',     name:'Mikey',    loc:'Route 38',     rematch:'Yes',                       note:'Calls for chat and rematches; verify gift contents in-game.' },
    { cls:'Bug Catcher',   name:'Wade',     loc:'Route 31',     rematch:'Yes',                       note:'Reliable berry giver — assorted berries (Cheri, Chesto, Pecha, etc.). Also calls about Bug-type swarms.' },
    { cls:'Bug Catcher',   name:'Don',      loc:'Route 36',     rematch:'Yes',                       note:'Calls for chat; verify rematch tier in-game.' },
    { cls:'Schoolboy',     name:'Alan',     loc:'Route 36',     rematch:'Yes',                       note:'Gives a Hyper Potion at certain rematch points. Calls back after defeating him.' },
    { cls:'Schoolboy',     name:'Jack',     loc:'Route 36',     rematch:'Yes',                       note:'Gives a Quick Claw on a callback. One of the more useful gift trainers early.' },
    { cls:'Schoolboy',     name:'Chad',     loc:'Route 38',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Picnicker',     name:'Liz',      loc:'Route 32',     rematch:'Yes',                       note:'Reliable berry giver — assorted berries. Calls regularly.' },
    { cls:'Picnicker',     name:'Gina',     loc:'Route 34',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Picnicker',     name:'Tiffany',  loc:'Route 13',     rematch:'Yes',                       note:'Pink Clefairy specialist. Calls for chat; verify gift contents in-game.' },
    { cls:'Camper',        name:'Todd',     loc:'Route 36',     rematch:'Yes',                       note:'Gives Repels (Repel / Super Repel / Max Repel depending on tier).' },
    { cls:'Camper',        name:'Roland',   loc:'Route 36',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Hiker',         name:'Anthony',  loc:'Route 33',     rematch:'Yes',                       note:'Berry giver — calls when his Dunsparce-tier rematches are ready. Also tied to swarm callouts in some sources; verify in-game.' },
    { cls:'Hiker',         name:'Parry',    loc:'Route 45',     rematch:'Yes',                       note:'Late-game Hiker rematch with Graveler/Geodude line; verify exact reward in-game.' },
    { cls:'Hiker',         name:'Kenny',    loc:'Route 46',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Fisherman',     name:'Ralph',    loc:'Route 32',     rematch:'Yes — fishing rematches',   note:'Re-fights with stronger water teams as the player progresses.' },
    { cls:'Fisherman',     name:'Tully',    loc:'Route 44',     rematch:'Yes',                       note:'Calls for chat and rematches; verify gift contents in-game.' },
    { cls:'Fisherman',     name:'Wilton',   loc:'Route 44',     rematch:'Yes',                       note:'Calls for chat and rematches; verify in-game.' },
    { cls:'Sage',          name:'Jeffrey',  loc:'Sprout Tower',  rematch:'Yes',                       note:'Calls for chat; verify rematch tier in-game.' },
    { cls:'Sage',          name:'Ping',     loc:'Sprout Tower',  rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Pokéfan',       name:'Beverly',  loc:'Route 13',     rematch:'Yes',                       note:'Snubbull/Granbull pal. Calls for chat; verify gift contents in-game.' },
    { cls:'Pokéfan',       name:'Derek',    loc:'Route 13',     rematch:'Yes',                       note:'Reliable doll giver — Clefairy Doll on a callback (verify exact item in-game; some sources list other dolls).' },
    { cls:'Cooltrainer',   name:'Gaven',    loc:'Route 26',     rematch:'Yes — strong late-game team',note:'Hard rematch with a fully evolved team. Verify exact roster tiers in-game.' },
    { cls:'Cooltrainer',   name:'Beth',     loc:'Route 26',     rematch:'Yes',                       note:'Late-game rematch trainer; verify in-game.' },
    { cls:'Cooltrainer',   name:'Reena',    loc:'Route 27',     rematch:'Yes',                       note:'Late-game rematch; verify in-game.' },
    { cls:'Lass',          name:'Dana',     loc:'Route 38',     rematch:'Yes',                       note:'Has a Castform on rematch tiers; calls for chat. Tied to weather chatter.' },
    { cls:'Lass',          name:'Connie',   loc:'Route 27',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'PI',            name:'Reena',    loc:'Route 29',     rematch:'No',                        note:'(Listed in some sources as a phone contact tied to Route 29 events; verify in-game.)' },
    { cls:'Bird Keeper',   name:'Vance',    loc:'Route 26',     rematch:'Yes',                       note:'Late-game Pidgeot/Farfetch\'d rematches; verify exact tiers in-game.' },
    { cls:'Sailor',        name:'Eugene',   loc:'Route 41',     rematch:'Yes',                       note:'Tentacruel/Qwilfish rematches; verify reward and tier in-game.' },
    { cls:'Sailor',        name:'Huey',     loc:'Route 41',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Pokémaniac',    name:'Brent',    loc:'Route 35',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Pokémaniac',    name:'Larry',    loc:'Route 14',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Bug Catcher',   name:'Arnie',    loc:'Route 35',     rematch:'Yes',                       note:'Yanma specialist. Calls about the Yanma swarm on Route 35.' },
    { cls:'Juggler',       name:'Irwin',    loc:'Route 34',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Firebreather',  name:'Otis',     loc:'Route 36',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Schoolboy',     name:'Billy',    loc:'Route 37',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Pokéfan',       name:'Brandon',  loc:'Route 13',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Cooltrainer',   name:'Parker',   loc:'Route 27',     rematch:'Yes',                       note:'Late-game rematch trainer; verify in-game.' },
    { cls:'Hiker',         name:'Russell',  loc:'Route 45',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Lass',          name:'Krise',    loc:'Route 32',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Sage',          name:'Edmond',   loc:'Sprout Tower',  rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Picnicker',     name:'Erin',     loc:'Route 46',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' },
    { cls:'Camper',        name:'Thomas',   loc:'Route 35',     rematch:'Yes',                       note:'Calls for chat; verify in-game.' }
  ];

  // Trainers reliably associated with gift items. Verify exact item tiers in-game.
  var GIFT_CALLERS = [
    { who:'Schoolboy Alan',     gift:'Hyper Potion',                  note:'On callback at later rematch tiers.' },
    { who:'Schoolboy Jack',     gift:'Quick Claw',                    note:'Useful held item — speed priority chance.' },
    { who:'Pokéfan Derek',      gift:'Clefairy Doll',                 note:'Doll for Secret Base / decoration use; verify exact doll in-game.' },
    { who:'Bug Catcher Wade',   gift:'Assorted berries',              note:'Cheri, Chesto, Pecha, etc. Rotates by call.' },
    { who:'Picnicker Liz',      gift:'Assorted berries',              note:'Berry callbacks similar to Wade.' },
    { who:'Hiker Anthony',      gift:'Assorted berries',              note:'Berries plus a tough rematch.' },
    { who:'Camper Todd',        gift:'Repel / Super Repel / Max Repel', note:'Repel tier scales with progress.' }
  ];

  // Swarm-callout phone contacts. Bulbapedia "Swarm" article confirms HGSS swarms
  // are triggered by phone tips from specific contacts.
  var SWARM_CALLERS = [
    { who:'Bug Catcher Arnie',  swarm:'Yanma — Route 35' },
    { who:'Youngster Joey',     swarm:'Snubbull (and others) — verify route in-game' },
    { who:'Bug Catcher Wade',   swarm:'Bug-type / Pineco swarms — Route 31 / 35' },
    { who:'Hiker Anthony',      swarm:'Dunsparce — Dark Cave area (verify in-game)' },
    { who:'Lass Dana',          swarm:'Marill — Mt. Mortar / Route 42 (verify in-game)' },
    { who:'Schoolboy Chad',     swarm:'Verify swarm and route in-game' }
  ];

  function buildPokegearPage() {
    var el = document.getElementById('pokegear-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    // PokéGear cards list
    var cardRows = CARDS.map(function(c){
      return '<li style="margin-bottom:8px;line-height:1.7;"><strong>' + c.name + '</strong>: ' + c.desc + '</li>';
    }).join('');

    // Trainer table rows
    var trainerRows = TRAINERS.map(function(t){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">' + t.cls + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + t.name + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;">' + t.loc + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + t.rematch + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + t.note + '</td>'
        + '</tr>';
    }).join('');

    // Gift caller rows (item names clickable)
    var giftRows = GIFT_CALLERS.map(function(g){
      // Pull a single canonical item out of the gift string for clicking, when possible.
      var itemMatch = g.gift.split('/')[0].trim();
      var safeItem = itemMatch.replace(/'/g, "\\'");
      var itemClick = "openItemByName('" + safeItem + "')";
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + g.who + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;cursor:pointer;text-decoration:underline;color:' + gameColor + '" onclick="' + itemClick + '" title="Open in Item dex">' + g.gift + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + g.note + '</td>'
        + '</tr>';
    }).join('');

    // Swarm caller rows
    var swarmRows = SWARM_CALLERS.map(function(s){
      return '<tr>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-weight:700">' + s.who + '</td>'
        + '<td style="padding:7px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted)">' + s.swarm + '</td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'The <strong>PokéGear</strong> is the Johto multi-tool — a wristwatch-style device given by Mom in New Bark Town. '
      + 'Trainers across Johto and Kanto give you their phone numbers; some call back with <strong>rematches</strong>, '
      + '<strong>gift items</strong>, or <strong>swarm tips</strong>. In HGSS the phone has no number cap and entries cannot be deleted, '
      + 'so the only cost of a contact is sifting through their calls.'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">POKÉGEAR FUNCTIONS</div>'
      + '<div style="padding:12px 18px;font-size:12px;line-height:1.7;"><ul style="margin:0;padding-left:18px;">' + cardRows + '</ul></div>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">PHONE-CALL TRAINERS (HGSS)</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Verified against Bulbapedia "List of phone-call trainers (HGSS)". Entries marked "verify in-game" had '
      + 'uncertain rematch tiers or gift contents at time of writing — confirm against your save before relying on them.'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">CLASS</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NAME</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">LOCATION</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">REMATCH</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTES</th>'
      + '</tr></thead><tbody>' + trainerRows + '</tbody></table>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">★ GIFT-ITEM CALLERS</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Trainers who reliably hand out items on callback. Save phone slots for these — the berry givers in particular '
      + 'compound across a long playthrough. Click an item to open it in the item dex.'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977">TRAINER</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977">GIFT</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977">NOTES</th>'
      + '</tr></thead><tbody>' + giftRows + '</tbody></table>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">SWARM CALLERS</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Specific phone contacts notify the player of active <strong>swarm Pokémon</strong> in Johto. Picking up the call '
      + 'and travelling to the swarm route boosts the encounter rate of the swarmed species for the day. Verify the '
      + 'exact location of each swarm in-game — Bulbapedia "Swarm" article is the canonical reference.'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">TRAINER</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">SWARM</th>'
      + '</tr></thead><tbody>' + swarmRows + '</tbody></table>'
      + '</div>'

      + '<div class="panel" style="padding:0;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">REMATCH TIER MECHANICS</div>'
      + '<div style="padding:12px 18px;font-size:12px;line-height:1.7;"><ul style="margin:0;padding-left:18px;">'
      + '<li style="margin-bottom:6px;">Trainers <strong>level up over time</strong> as the player earns Badges — rematch teams scale through several tiers.</li>'
      + '<li style="margin-bottom:6px;"><strong>Calling and saving frequency</strong> influence how often a trainer flags themselves as ready to rematch.</li>'
      + '<li style="margin-bottom:6px;"><strong>Time of day matters</strong> — some trainers only call or rematch during morning, day, or night windows.</li>'
      + '<li style="margin-bottom:6px;"><strong>Mom\'s calls count toward the 50-slot cap</strong> — be deliberate about which trainers you accept numbers from.</li>'
      + '<li style="margin-bottom:6px;">After saving, walking a number of steps, and re-entering an area, trainers who flagged themselves can be re-fought face-to-face — the call is just the trigger.</li>'
      + '</ul></div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildPokegearPage = buildPokegearPage;
})();
