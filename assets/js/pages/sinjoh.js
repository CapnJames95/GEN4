// Sinjoh Ruins (HGSS) reference page.
// Sources:
//   Bulbapedia "Sinjoh Ruins" article (https://bulbapedia.bulbagarden.net/wiki/Sinjoh_Ruins)
//   Bulbapedia "Embedded Tower" article (https://bulbapedia.bulbagarden.net/wiki/Embedded_Tower)
// HGSS-only page (S = HeartGold, E = SoulSilver). Both events require a level-100
// event-distributed Arceus (Toys "R" Us 2010 distribution, etc.) — without one,
// neither event can be triggered on a clean cartridge.

(function(){
  var CREATION_TRIO = [
    {
      num: 483,
      name: 'Dialga',
      types: ['Steel','Dragon'],
      item: { name: 'Adamant Orb', note: 'Boosts Dialga\'s Steel- and Dragon-type moves by 20% when held.' },
      signature: 'Roar of Time',
      moves: ['Roar of Time','Dragon Breath','Metal Claw','Ancient Power'],
      blurb: 'Lord of time. Hatches at Lv 1 with the Adamant Orb available as its signature held item.'
    },
    {
      num: 484,
      name: 'Palkia',
      types: ['Water','Dragon'],
      item: { name: 'Lustrous Orb', note: 'Boosts Palkia\'s Water- and Dragon-type moves by 20% when held.' },
      signature: 'Spacial Rend',
      moves: ['Spacial Rend','Aqua Tail','Dragon Claw','Ancient Power'],
      blurb: 'Lord of space. Hatches at Lv 1 — pair with the Lustrous Orb to amplify its Special Attack output.'
    },
    {
      num: 487,
      name: 'Giratina',
      types: ['Ghost','Dragon'],
      item: { name: 'Griseous Orb', note: 'Hold to switch Giratina from Altered Forme to Origin Forme. Also boosts its Ghost- and Dragon-type moves by 20%.' },
      signature: 'Shadow Force',
      moves: ['Shadow Force','Dragon Claw','Ominous Wind','Ancient Power'],
      blurb: 'Renegade of the Distortion World. Hatches as Altered Forme — give it the Griseous Orb to assume Origin Forme.'
    }
  ];

  var EMBEDDED_TOWER = [
    {
      num: 382,
      name: 'Kyogre',
      types: ['Water'],
      plate: 'Splash Plate',
      blurb: 'Lv 70. Awakens when Arceus holds the Splash Plate.'
    },
    {
      num: 383,
      name: 'Groudon',
      types: ['Ground'],
      plate: 'Earth Plate',
      blurb: 'Lv 70. Awakens when Arceus holds the Earth Plate.'
    },
    {
      num: 384,
      name: 'Rayquaza',
      types: ['Dragon','Flying'],
      plate: 'Sky Plate',
      blurb: 'Lv 70. Awakens when Arceus holds the Sky Plate.'
    }
  ];

  var WALKTHROUGH = [
    'Have a Lv-100 Arceus in your party (event distribution — Toys "R" Us 2010, etc.).',
    'Have unlocked Tin Tower in Ecruteak (post-Lugia/Ho-Oh storyline).',
    'Travel to the Ruins of Alph and talk to the scientist near the entrance.',
    'Cynthia appears and takes you to Sinjoh Ruins via a cutscene.',
    'Choose Dialga, Palkia, or Giratina — receive a Lv-1 egg of that species.',
    'Hatch the egg — the Pokémon comes in its appropriate forme (Giratina is Altered Forme; evolves to Origin Forme via Griseous Orb).'
  ];

  var EMBEDDED_STEPS = [
    'With a Lv-100 event Arceus in your party, return to the Ruins of Alph at a different point in the post-game — the storyline eventually points you to the Embedded Tower.',
    'Inside the Embedded Tower, the Plate currently held by Arceus determines which Hoenn legendary awakens at Lv 70.',
    'You only get one of the three encounters — pick your Plate carefully and save before triggering. With no held plate, no encounter occurs.'
  ];

  function buildSinjohPage() {
    var el = document.getElementById('sinjoh-content');
    if (!el) return;
    var gameColor = 'var(--game-color, var(--gold))';

    function typeBadges(types) {
      return types.map(function(t){
        return '<span style="display:inline-block;padding:2px 8px;margin-right:4px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid var(--border);font-size:10px;font-weight:700;letter-spacing:0.5px;">' + t.toUpperCase() + '</span>';
      }).join('');
    }

    function safe(s) { return s.replace(/'/g, "\\'"); }

    function pokeCard(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var nameClick = "_openDexSearch('" + safe(p.name) + "', " + p.num + ")";
      var itemClick = "openItemByName('" + safe(p.item.name) + "')";
      var movesHtml = p.moves.map(function(m){
        var mc = "goToMoveInDex('" + safe(m) + "')";
        var isSig = (m === p.signature);
        return '<span onclick="' + mc + '" style="display:inline-block;padding:3px 9px;margin:2px 3px 2px 0;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid var(--border);font-size:11px;cursor:pointer;' + (isSig ? 'color:' + gameColor + ';font-weight:800;' : '') + '" onmouseover="this.style.background=\'rgba(255,255,255,0.10)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\'" title="Open move in Pokédex">' + m + (isSig ? ' ★' : '') + '</span>';
      }).join('');

      return '<div class="panel" style="padding:0;margin-bottom:14px;overflow:hidden;">'
        + '<div style="display:flex;align-items:center;gap:14px;padding:12px 14px;border-bottom:1px solid var(--border);background:var(--panel);">'
        + '<img src="' + sprite + '" width="64" height="64" style="image-rendering:pixelated;flex-shrink:0">'
        + '<div style="flex:1;min-width:0;">'
        + '<div onclick="' + nameClick + '" style="cursor:pointer;font-family:\'Press Start 2P\',monospace;font-size:11px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:6px;" title="Open in Pokédex">'
        + '#' + p.num + ' ' + p.name.toUpperCase()
        + '</div>'
        + '<div>' + typeBadges(p.types) + '<span style="margin-left:6px;font-size:11px;color:var(--muted)">Lv 1 (hatched)</span></div>'
        + '</div>'
        + '</div>'
        + '<div style="padding:12px 14px;font-size:12px;line-height:1.7;color:var(--muted);">' + p.blurb + '</div>'
        + '<div style="padding:10px 14px;border-top:1px solid var(--border);font-size:12px;">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:6px;">SIGNATURE ITEM</div>'
        + '<span onclick="' + itemClick + '" style="cursor:pointer;font-weight:800;color:' + gameColor + ';" title="Open item">' + p.item.name + '</span>'
        + '<div style="font-size:11px;color:var(--muted);margin-top:4px;line-height:1.6;">' + p.item.note + '</div>'
        + '</div>'
        + '<div style="padding:10px 14px;border-top:1px solid var(--border);">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:6px;">KEY MOVES</div>'
        + movesHtml
        + '</div>'
        + '</div>';
    }

    function towerCard(p) {
      var sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + p.num + '.png';
      var nameClick = "_openDexSearch('" + safe(p.name) + "', " + p.num + ")";
      var plateClick = "openItemByName('" + safe(p.plate) + "')";
      return '<div class="panel" style="padding:0;margin-bottom:12px;overflow:hidden;">'
        + '<div style="display:flex;align-items:center;gap:14px;padding:12px 14px;">'
        + '<img src="' + sprite + '" width="56" height="56" style="image-rendering:pixelated;flex-shrink:0">'
        + '<div style="flex:1;min-width:0;">'
        + '<div onclick="' + nameClick + '" style="cursor:pointer;font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:6px;" title="Open in Pokédex">'
        + '#' + p.num + ' ' + p.name.toUpperCase()
        + '</div>'
        + '<div style="margin-bottom:6px;">' + typeBadges(p.types) + '</div>'
        + '<div style="font-size:11px;color:var(--muted);line-height:1.6;">'
        + 'Plate required: <span onclick="' + plateClick + '" style="cursor:pointer;font-weight:800;color:' + gameColor + ';" title="Open item">' + p.plate + '</span>'
        + ' — ' + p.blurb
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    }

    var stepsHtml = '<ol style="margin:0;padding-left:22px;font-size:12px;line-height:1.8;color:var(--text);">'
      + WALKTHROUGH.map(function(s){ return '<li style="margin-bottom:4px;">' + s + '</li>'; }).join('')
      + '</ol>';

    var towerStepsHtml = '<ol style="margin:0 0 12px;padding-left:22px;font-size:12px;line-height:1.8;color:var(--text);">'
      + EMBEDDED_STEPS.map(function(s){ return '<li style="margin-bottom:4px;">' + s + '</li>'; }).join('')
      + '</ol>';

    var trioCardsHtml = CREATION_TRIO.map(pokeCard).join('');
    var towerCardsHtml = EMBEDDED_TOWER.map(towerCard).join('');

    var html = ''
      // Intro
      + '<div class="panel" style="padding:14px 16px;margin-bottom:18px;">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:' + gameColor + ';letter-spacing:0.5px;margin-bottom:10px;">SINJOH RUINS — HIDDEN HGSS EVENT</div>'
      + '<div style="font-size:12px;line-height:1.75;color:var(--muted);">'
      + 'Sinjoh Ruins is a hidden post-game event exclusive to <strong>HeartGold &amp; SoulSilver</strong>. With a '
      + '<strong>Lv-100 Arceus</strong> from a Nintendo distribution event (Toys "R" Us 2010 and similar), travel to '
      + 'the <strong>Ruins of Alph</strong> and a special event triggers — <strong>Cynthia</strong> escorts you to the '
      + 'Sinjoh Ruins where you may receive a <strong>Lv-1 Dialga, Palkia, or Giratina</strong> egg of your choice.'
      + '</div>'
      + '</div>'

      // Walkthrough
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">SINJOH RUINS WALKTHROUGH</div>'
      + '<div style="padding:14px 16px;">' + stepsHtml + '</div>'
      + '</div>'

      // Trio
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:' + gameColor + ';letter-spacing:0.5px;">CREATION TRIO — CHOOSE ONE</div>'
      + '<div style="padding:14px;">' + trioCardsHtml + '</div>'
      + '</div>'

      // Embedded Tower
      + '<div class="panel" style="padding:0;margin-bottom:18px;overflow:hidden;border-color:rgba(255,215,0,0.4);">'
      + '<div style="padding:10px 14px;background:var(--panel);border-bottom:1px solid var(--border);font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffd977;letter-spacing:0.5px;">EMBEDDED TOWER — HOENN LEGENDARIES</div>'
      + '<div style="padding:14px 16px 4px;font-size:12px;color:var(--muted);line-height:1.7;">'
      + 'A separate post-game event also tied to your Lv-100 event Arceus. Inside the Embedded Tower, the '
      + '<strong>Plate</strong> Arceus is holding decides which Hoenn legendary awakens at <strong>Lv 70</strong>.'
      + '</div>'
      + '<div style="padding:12px 16px 4px;">' + towerStepsHtml + '</div>'
      + '<div style="padding:0 14px 14px;">' + towerCardsHtml + '</div>'
      + '</div>'

      // Note
      + '<div class="panel" style="padding:14px 16px;border-color:rgba(255,120,120,0.35);">'
      + '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ff9c9c;letter-spacing:0.5px;margin-bottom:8px;">NOTE — EVENT GATE</div>'
      + '<div style="font-size:12px;line-height:1.75;color:var(--muted);">'
      + 'Both the Sinjoh Ruins and Embedded Tower events require an <strong>event-distributed Lv-100 Arceus</strong>. '
      + 'On a clean cartridge in 2026 — with all official distributions long expired — this content is inaccessible '
      + 'without trading in an event Arceus from another save or participating in modern fan-run distribution events. '
      + 'This guide does not recommend cheating; just acknowledging the gate so you know what you\'re looking at.'
      + '</div>'
      + '</div>';

    el.innerHTML = html;
  }

  window.buildSinjohPage = buildSinjohPage;
})();
