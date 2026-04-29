// Move Tutors page — Gen 4 (D/P/Pt/HG/SS).
// Single source of truth: TUTOR_NPC_DATA in app.js (slot codes FR=D, LG=P, R=Pt, S=HG, E=SS).
// Move types are pulled from ALL_MOVES_DATA so the rendering stays in sync if a move's typing changes.

function buildTutorPage() {
  if (typeof TUTOR_NPC_DATA !== 'object' || !TUTOR_NPC_DATA) return;
  var tbody = document.getElementById('tutors-tbody');
  if (!tbody) return;

  // name -> type (lowercased) lookup from ALL_MOVES_DATA. Normalize by stripping
  // spaces, hyphens, and casing so "Ancient Power" matches "AncientPower" and
  // "Soft-Boiled" matches "Softboiled" across the various spellings used by
  // TUTOR_NPC_DATA, the move dex, and contest categories.
  function normMove(s) { return String(s || '').toLowerCase().replace(/[\s\-]+/g, ''); }
  var typeOf = {};
  if (typeof ALL_MOVES_DATA !== 'undefined' && ALL_MOVES_DATA && ALL_MOVES_DATA.length) {
    for (var i = 0; i < ALL_MOVES_DATA.length; i++) {
      var rec = ALL_MOVES_DATA[i];
      if (rec && rec[1] && rec[2]) typeOf[normMove(rec[1])] = String(rec[2]).toLowerCase();
    }
  }

  // Collect names sorted by (presence in HGSS, then in Pt, then alphabetical) so the
  // groupings the user expects (Pt-only at the top, HGSS-only at the bottom, shared in between)
  // read naturally without needing visible section headers.
  var names = Object.keys(TUTOR_NPC_DATA).sort(function(a, b) {
    return a.localeCompare(b);
  });

  function checkCell(on, label) {
    return '<td style="text-align:center;border-bottom:none;" aria-label="' + label + (on ? ' available' : ' not available') + '">'
      + (on ? '<span class="tutors-check">✓</span>' : '<span class="tutors-dash">—</span>')
      + '</td>';
  }

  var rows = '';
  for (var k = 0; k < names.length; k++) {
    var name = names[k];
    var td = TUTOR_NPC_DATA[name];
    if (!td || !td.games) continue;
    var games = td.games;
    var hasD  = games.indexOf('FR') !== -1;
    var hasP  = games.indexOf('LG') !== -1;
    var hasPt = games.indexOf('R')  !== -1;
    var hasHG = games.indexOf('S')  !== -1;
    var hasSS = games.indexOf('E')  !== -1;
    // S and E are always paired in TUTOR_NPC_DATA — collapse to a single HG/SS column.
    var hasHGSS = hasHG || hasSS;

    var t = typeOf[normMove(name)] || 'normal';
    var safeName = name.replace(/'/g, "\\'");
    var npcEsc = (td.npc || '').replace(/"/g, '&quot;');
    var noteHtml = td.note
      ? '<div style="font-size:10px;color:var(--muted);margin-top:3px;line-height:1.55">' + td.note + '</div>'
      : '';

    rows += '<tr style="border-bottom:none;">'
      + '<td style="font-weight:700;border-bottom:none;">'
      +   '<span style="cursor:pointer;transition:color 0.12s" '
      +     'onmouseover="this.style.color=\'var(--game-color,var(--gold))\'" '
      +     'onmouseout="this.style.color=\'\'" '
      +     'onclick="goToMoveInDex(\'' + safeName + '\')" '
      +     'title="' + npcEsc + '">' + name + '</span>'
      + '</td>'
      + '<td style="border-bottom:none;">' + (typeof typeSprite === 'function' ? typeSprite(t) : t) + '</td>'
      + checkCell(hasD,  'Diamond')
      + checkCell(hasP,  'Pearl')
      + checkCell(hasPt, 'Platinum')
      + checkCell(hasHGSS, 'HeartGold/SoulSilver')
      + '</tr>'
      + '<tr class="tutors-loc-row">'
      +   '<td colspan="6" style="padding:0 12px 10px 12px;">'
      +     '<div style="font-size:11px;color:var(--muted);line-height:1.6">' + (td.npc || '') + '</div>'
      +     noteHtml
      +   '</td>'
      + '</tr>';
  }
  tbody.innerHTML = rows;
  window._tutorsBuilt = true;
}
