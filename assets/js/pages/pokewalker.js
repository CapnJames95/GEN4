// Pokéwalker (HGSS) reference page.
// Sources: Bulbapedia "Pokéwalker" (https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9walker)
// and "List of Pokéwalker courses" (https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9walker_courses).
// Slot codes: FR=Diamond, LG=Pearl, R=Platinum, S=HeartGold, E=SoulSilver.
// HGSS-only — page hides itself when a non-HGSS slot is active.

(function(){
  // Pokéwalker routes (a.k.a. courses). Watt cost is the cumulative watts the
  // player must have walked (lifetime) to unlock the course. Special-event
  // courses were distributed via Mystery Gift / event Wi-Fi and have no
  // standard watt unlock. Encounter pools are abbreviated to the most
  // memorable / iconic species per route — full pools live on Bulbapedia.
  var ROUTES = [
    { name:'Refreshing Field',  cost:'Free',           type:'standard',
      pool:[{num:16,name:'Pidgey'},{num:19,name:'Rattata'},{num:10,name:'Caterpie'},{num:161,name:'Sentret'},{num:172,name:'Pichu'}],
      items:'Berries, Potion, Antidote' },
    { name:'Noisy Forest',      cost:'Free',           type:'standard',
      pool:[{num:10,name:'Caterpie'},{num:13,name:'Weedle'},{num:265,name:'Wurmple'},{num:165,name:'Ledyba'},{num:167,name:'Spinarak'}],
      items:'Berries, Repel, Antidote' },
    { name:'Rugged Road',       cost:'4,500 W',        type:'standard',
      pool:[{num:23,name:'Ekans'},{num:27,name:'Sandshrew'},{num:74,name:'Geodude'},{num:50,name:'Diglett'},{num:246,name:'Larvitar'}],
      items:'Hard Stone, Star Piece, Heat Rock' },
    { name:'Beautiful Beach',   cost:'5,000 W',        type:'standard',
      pool:[{num:98,name:'Krabby'},{num:116,name:'Horsea'},{num:120,name:'Staryu'},{num:72,name:'Tentacool'},{num:7,name:'Squirtle'}],
      items:'Pearl, Big Pearl, Heart Scale' },
    { name:'Suburban Area',     cost:'7,000 W',        type:'standard',
      pool:[{num:52,name:'Meowth'},{num:21,name:'Spearow'},{num:37,name:'Vulpix'},{num:300,name:'Skitty'},{num:133,name:'Eevee'}],
      items:'Potion, Super Potion, Repel' },
    { name:'Dim Cave',          cost:'5,000 W',        type:'standard',
      pool:[{num:41,name:'Zubat'},{num:27,name:'Sandshrew'},{num:95,name:'Onix'},{num:74,name:'Geodude'},{num:304,name:'Aron'}],
      items:'Iron, Star Piece, Hard Stone' },
    { name:'Blue Lake',         cost:'7,000 W',        type:'standard',
      pool:[{num:183,name:'Marill'},{num:194,name:'Wooper'},{num:118,name:'Goldeen'},{num:129,name:'Magikarp'},{num:131,name:'Lapras'}],
      items:'Water Stone, Pearl, Heart Scale' },
    { name:'Treehouse',         cost:'7,000 W',        type:'standard',
      pool:[{num:161,name:'Sentret'},{num:163,name:'Hoothoot'},{num:69,name:'Bellsprout'},{num:190,name:'Aipom'},{num:214,name:'Heracross'}],
      items:'Berries, Honey, Leaf Stone' },
    { name:'Town Outskirts',    cost:'7,000 W',        type:'standard',
      pool:[{num:16,name:'Pidgey'},{num:84,name:'Doduo'},{num:179,name:'Mareep'},{num:183,name:'Marill'},{num:427,name:'Buneary'}],
      items:'Potion, Antidote, Repel' },
    { name:'Scary Cave',        cost:'10,000 W',       type:'standard',
      pool:[{num:228,name:'Houndour'},{num:434,name:'Stunky'},{num:200,name:'Misdreavus'},{num:92,name:'Gastly'},{num:198,name:'Murkrow'}],
      items:'Dusk Stone, Spell Tag, Black Sludge' },
    { name:'Volcano Path',      cost:'10,000 W',       type:'standard',
      pool:[{num:74,name:'Geodude'},{num:322,name:'Numel'},{num:218,name:'Slugma'},{num:126,name:'Magmar'},{num:240,name:'Magby'}],
      items:'Fire Stone, Charcoal, Heat Rock' },
    { name:'Icy Mountain Rd.',  cost:'10,000 W',       type:'standard',
      pool:[{num:459,name:'Snover'},{num:361,name:'Snorunt'},{num:238,name:'Smoochum'},{num:215,name:'Sneasel'}],
      items:'NeverMeltIce, Icy Rock, Star Piece' },
    { name:'White Lake',        cost:'10,000 W',       type:'standard',
      pool:[{num:363,name:'Spheal'},{num:278,name:'Wingull'},{num:131,name:'Lapras'},{num:238,name:'Smoochum'},{num:245,name:'Suicune'}],
      items:'Pearl, Big Pearl, NeverMeltIce' },
    { name:'Stormy Beach',      cost:'10,000 W',       type:'standard',
      pool:[{num:98,name:'Krabby'},{num:278,name:'Wingull'},{num:72,name:'Tentacool'},{num:279,name:'Pelipper'}],
      items:'Damp Rock, Pearl, Mystic Water' },
    { name:'Resort',            cost:'15,000 W',       type:'standard',
      pool:[{num:133,name:'Eevee'},{num:173,name:'Cleffa'},{num:174,name:'Igglybuff'},{num:238,name:'Smoochum'},{num:240,name:'Magby'}],
      items:'Heart Scale, Soothe Bell, Lava Cookie' },
    { name:'Sightseeing',       cost:'15,000 W',       type:'standard',
      pool:[{num:16,name:'Pidgey'},{num:351,name:'Castform'},{num:425,name:'Drifloon'}],
      items:'Smooth Rock, Damp Rock, Heat Rock' },
    { name:'Big Forest',        cost:'15,000 W',       type:'standard',
      pool:[{num:16,name:'Pidgey'},{num:10,name:'Caterpie'},{num:265,name:'Wurmple'},{num:190,name:'Aipom'},{num:214,name:'Heracross'}],
      items:'Honey, Leaf Stone, Berries' },
    { name:'Quiet Cave',        cost:'20,000 W',       type:'standard',
      pool:[{num:41,name:'Zubat'},{num:27,name:'Sandshrew'},{num:74,name:'Geodude'},{num:360,name:'Wynaut'},{num:246,name:'Larvitar'}],
      items:'Star Piece, Stardust, Hard Stone' },
    { name:'Yellow Forest',     cost:'Event (Mystery Gift)', type:'event',
      pool:[{num:25,name:'Pikachu'},{num:172,name:'Pichu'}],
      items:'Yellow Flute, Berries — exclusive Surf & Fly Pikachu distribution.' },
    { name:"Winner's Path",     cost:'Event',          type:'event',
      pool:[{num:133,name:'Eevee'}],
      items:'Heart Scale, Rare Candy, ribbon-style commemorative items.' },
    { name:'Amity Meadow',      cost:'Event',          type:'event',
      pool:[{num:172,name:'Pichu'}],
      items:'Notch-Eared Pichu distribution route — required for Spiky-Eared Pichu event.' },
    { name:'Hoenn Field',       cost:'Event',          type:'event',
      pool:[{num:263,name:'Zigzagoon'},{num:261,name:'Poochyena'},{num:273,name:'Seedot'},{num:300,name:'Skitty'}],
      items:'Hoenn-flavored route distributed via Wi-Fi.' },
    { name:'Sinnoh Field',      cost:'Event',          type:'event',
      pool:[{num:399,name:'Bidoof'},{num:401,name:'Kricketot'},{num:403,name:'Shinx'},{num:427,name:'Buneary'}],
      items:'Sinnoh-flavored route distributed via Wi-Fi.' },
    { name:'Rally',             cost:'Event',          type:'event',
      pool:[{num:25,name:'Pikachu'}],
      items:'Surf-Pikachu distribution variant.' },
    { name:"Night Sky's Edge",  cost:'Event',          type:'event',
      pool:[{num:488,name:'Cresselia'}],
      items:'Cresselia distribution route. Lunar Wing flavor items.' }
  ];

  function buildPokewalkerPage() {
    var el = document.getElementById('pokewalker-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function pokeChip(p) {
      var num = p.realNum || p.num;
      var nm  = p.realName || p.name;
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + num + '.png';
      var safeName = nm.replace(/'/g, "\\'");
      var click = "_openDexSearch('" + safeName + "', " + num + ")";
      return '<span onclick="' + click + '" style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px 3px 3px;margin:2px 4px 2px 0;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:14px;cursor:pointer;font-size:11px;font-weight:700;transition:background 0.12s" onmouseover="this.style.background=\'rgba(255,255,255,0.10)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\'" title="Open ' + nm + ' in Pokédex">'
        + '<img src="' + sprite + '" width="22" height="22" style="image-rendering:pixelated;vertical-align:middle">'
        + nm + '</span>';
    }

    var routeRows = ROUTES.map(function(r){
      var pool = (r.pool || []).map(pokeChip).join('');
      var costColor = r.type === 'event' ? '#ffd977' : gameColor;
      return '<tr>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);font-weight:700;vertical-align:top;white-space:nowrap">' + r.name + '</td>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top;font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + costColor + ';white-space:nowrap">' + r.cost + '</td>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top">' + pool + '</td>'
        + '<td style="padding:8px 12px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);vertical-align:top">' + (r.items || '') + '</td>'
        + '</tr>';
    }).join('');

    var html = ''
      + '<div style="font-size:12px;color:var(--muted);margin-bottom:14px;line-height:1.7;">'
      + 'The <strong>Pokéwalker</strong> is the IR-linked pedometer that shipped with every copy of HeartGold and SoulSilver. '
      + 'Send a single Pokémon over to the device, then walk in real life: every step earns <strong>watts</strong> '
      + '(roughly <strong>1 watt per 20 steps</strong>) and gives the held Pokémon <strong>~1 EXP per step</strong>. '
      + 'Spend watts to catch wild Pokémon on the active route, dowse for items, and unlock new routes by hitting cumulative watt thresholds.'
      + '</div>'

      + '<div class="panel" style="padding:14px 16px;margin-bottom:18px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:10px">HOW IT WORKS</div>'
      + '<ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.8;color:var(--muted)">'
      + '<li>Only <strong>one</strong> Pokémon can be sent to the Pokéwalker at a time.</li>'
      + '<li>Each step earns <strong>0.5 – 1 watt</strong> at a slightly variable rate.</li>'
      + '<li>Catching a wild encounter requires beating the on-device mini-game (a guess-which-bush flow that costs watts to run).</li>'
      + '<li>Items found in <strong>Dowsing</strong> mode are stored on the watch and transfer back to HGSS on IR sync.</li>'
      + '<li>The walked Pokémon banks ~1 EXP per step — great for hatching low-level event Pokémon without battle.</li>'
      + '</ul>'
      + '</div>'

      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">POKÉWALKER ROUTES</div>'
      + '<div style="padding:10px 14px;font-size:11px;color:var(--muted);line-height:1.7;border-bottom:1px solid var(--border);">'
      + 'Standard routes unlock once your <strong>lifetime watt total</strong> crosses each threshold (you do not have to spend watts to unlock — only to earn them by walking). '
      + 'Event routes were distributed via Mystery Gift / Wi-Fi during 2010-2011 and cannot be unlocked legitimately today without a saved Mystery Gift.'
      + '</div>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ROUTE</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">UNLOCK</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">ENCOUNTERS</th>'
      + '<th style="text-align:left;padding:8px 12px;border-bottom:2px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + '">NOTABLE ITEMS</th>'
      + '</tr></thead><tbody>' + routeRows + '</tbody></table>'
      + '</div>'

      + '<div class="panel" style="padding:14px 16px;margin-bottom:18px;border-color:rgba(255,215,0,0.4);">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;margin-bottom:10px">★ SPECIAL EVENT ROUTES</div>'
      + '<ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.8;color:var(--muted)">'
      + '<li><strong>Yellow Forest</strong> — exclusive distribution route featuring Pikachu that knows <strong>Surf</strong> or <strong>Fly</strong>, plus Pichu line variants.</li>'
      + '<li><strong>Amity Meadow</strong> — the route required to obtain the <strong>Notch-Eared (Spiky-Eared) Pichu</strong>, which feeds into the Sinjoh Ruins event when paired with the right Celebi.</li>'
      + '<li><strong>Night Sky\'s Edge</strong> — distributes <strong>Cresselia</strong> with Lunar Wing flavor items.</li>'
      + '<li><strong>Hoenn Field / Sinnoh Field</strong> — flavor routes letting you walk Hoenn- or Sinnoh-native species in HGSS.</li>'
      + '</ul>'
      + '</div>'

      + '<div class="panel" style="padding:14px 16px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:10px">TIPS</div>'
      + '<ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.8;color:var(--muted)">'
      + '<li>Clip the Pokéwalker on during a real workout — a 30-min walk reliably banks 1,000+ watts toward the next route unlock.</li>'
      + '<li>Set the watch to <strong>Dowsing mode</strong> when you mostly want items; held items and evolution stones turn up far more often.</li>'
      + '<li>Switch to <strong>Catching mode</strong> when route encounters are the goal — wild spawns are prioritized over item dowses.</li>'
      + '<li>Send a low-level <strong>event/egg Pokémon</strong> to the watch to grind painless EXP without exposing it to wild battles.</li>'
      + '</ul>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildPokewalkerPage = buildPokewalkerPage;
})();
