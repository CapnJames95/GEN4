window.getDistributionEntries = window.getDistributionEntries || function() {
  // ──────────────────────────────────────────────────────────────────────────
  // Gen 4 (D/P/Pt/HG/SS) event-Pokémon distributions.
  // Internal slot codes FR/LG/R/S/E map to Diamond/Pearl/Platinum/HeartGold/SoulSilver.
  // Targets use the Gen-4 game names so the slot matcher (below) routes correctly.
  // Sourced from Bulbapedia's "List of Generation IV event Pokémon distributions"
  // (https://bulbapedia.bulbagarden.net/wiki/List_of_Generation_IV_event_Pok%C3%A9mon_distributions).
  // Where a level / OT / exact window is not verifiable, the field is omitted and
  // a "unverified" marker is added to the notes per task spec.
  // ──────────────────────────────────────────────────────────────────────────

  var SINNOH = ['Diamond', 'Pearl', 'Platinum'];
  var JOHTO  = ['HeartGold', 'SoulSilver'];
  var ALL_G4 = SINNOH.concat(JOHTO);

  // Region availability is captured in `region` and surfaced through `details`/`notes`
  // since the renderer doesn't have a dedicated region field.

  var keyEvents = [
    {
      title: 'Manaphy (Pokémon Ranger Egg)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Egg Distribution',
      obtains: ['Manaphy Egg'],
      targets: SINNOH,
      region: 'Worldwide',
      details: 'Complete the "Pokémon Ranger" mission "The Manaphy Egg" (or its sequel-game equivalents) and transfer the Manaphy Egg to a Diamond/Pearl/Platinum save via the in-game link.',
      notes: 'OT is the player\'s Ranger character; egg hatches into a Lv.1 Manaphy. Phione can be bred from Manaphy + Ditto.'
    },
    {
      title: 'Darkrai (Member Card)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Event Item + Pokémon',
      obtains: ['Member Card', 'Darkrai (Lv.40 / Lv.50)'],
      targets: SINNOH,
      region: 'JP / NA / EU / KR (Wi-Fi & local Mystery Gift, 2008–2010)',
      details: 'Receive the Member Card via Mystery Gift, show it at the Canalave City inn, then catch Darkrai on New Moon Island. In Diamond/Pearl Darkrai is Lv.40; in Platinum it is Lv.50.',
      notes: 'Member Card distribution windows differed by region (JP 2008, NA May 2009, EU/AU 2009, KR 2009). OT/ID vary because Darkrai is caught on the player\'s save.'
    },
    {
      title: 'Shaymin (Oak\'s Letter)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Event Item + Pokémon',
      obtains: ['Oak\'s Letter', 'Shaymin (Lv.30, Land Forme)'],
      targets: SINNOH,
      region: 'JP / NA / EU / KR (Wi-Fi & local Mystery Gift, 2008–2010)',
      details: 'Receive Oak\'s Letter via Mystery Gift, show it to Prof. Oak on Route 224, then walk to Flower Paradise to catch Shaymin at Lv.30.',
      notes: 'Sky Forme requires the Gracidea, given by a girl in Floaroma Town in Platinum (Diamond/Pearl cannot transform Shaymin). OT is the player.'
    },
    {
      title: 'Arceus (Azure Flute)',
      source: 'Key Event',
      language: 'Japanese only (official)',
      kind: 'Event Item + Pokémon',
      obtains: ['Azure Flute', 'Arceus (Lv.80)'],
      targets: SINNOH,
      region: 'Japan only — never officially released in other regions',
      details: 'Use the Azure Flute at the Spear Pillar to open the staircase to the Hall of Origin and battle Arceus at Lv.80. The item exists in all localizations but the distribution event was Japan-only.',
      notes: 'Western players never received the Azure Flute through official channels. OT is the player.'
    },
    {
      title: 'Celebi (Distribution → GS Ball event)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Celebi'],
      targets: JOHTO,
      region: 'JP 2010 (Movie 13 / theatres), NA Feb 2011 (GameStop), EU Mar 2011 (retailers)',
      details: 'Wonder-Card Celebi distributed for HeartGold/SoulSilver. Bringing it to Ilex Forest triggers the GS Ball event: the player witnesses a flashback and battles Giovanni.',
      notes: 'Bulbapedia lists Lv.50 with OT "WIN2011" for the Western releases. Movie 13 Japanese Celebi used different OT/dates; details unverified for the Japanese variant.'
    },
    {
      title: 'Pikachu-Coloured Pichu (Movie 12)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Shiny Pichu (Pikachu-Coloured)'],
      targets: SINNOH,
      region: 'JP Jul 2009 (Movie 12), NA Feb 2010 (GameStop), EU/AU 2010',
      details: 'Distributed Shiny Pichu. Trading it to HeartGold/SoulSilver and visiting the Ilex Shrine triggers the Spiky-eared Pichu / Notched-ear Pichu event in Ilex Forest.',
      notes: 'Bulbapedia lists Lv.30, OT "Mitsuru" (JP) / "Movie09" or "PokéMov" depending on region — exact OT varies by territory; treat OT as unverified per region without source check.'
    },
    {
      title: 'Spiky-eared Pichu (Notched-ear)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Spiky-eared Pichu (Lv.30)'],
      targets: JOHTO,
      region: 'Worldwide (in-game, gated by the Movie-12 Pichu above)',
      details: 'Take the Pikachu-Coloured Pichu to the Ilex Forest shrine in HG/SS to receive Spiky-eared Pichu. Cannot be traded out of HG/SS and cannot evolve.',
      notes: 'Female-locked, Lv.30, OT is the player. Hard-coded form unique to HGSS.'
    }
  ];

  var legendaryDistributions = [
    {
      title: 'Crown Beasts — Raikou',
      source: 'Wi-Fi Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Raikou (Shiny, Lv.30)'],
      targets: JOHTO,
      region: 'JP Feb 2010, NA Jun 2010 (Wi-Fi/GameStop), EU/AU 2010',
      details: 'Crown Beast Wi-Fi distribution. Receiving Raikou and travelling to Route 25 in HGSS triggers an event with a researcher. In Black/White it later unlocks the Zorua at Castelia City.',
      notes: 'Bulbapedia lists Shiny-locked-on (always shiny), Lv.30, OT "MICHINA" (JP) / "GAMESTP" or similar for the West — exact Western OT unverified here.'
    },
    {
      title: 'Crown Beasts — Entei',
      source: 'Wi-Fi Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Entei (Shiny, Lv.30)'],
      targets: JOHTO,
      region: 'JP Feb 2010, NA Jun 2010, EU/AU 2010',
      details: 'Crown Beast Wi-Fi distribution counterpart to Crown Raikou. Always Shiny, Lv.30. Same Route 25 event hook in HGSS, same Zorua hook in B/W.',
      notes: 'OT/ID details by region — unverified.'
    },
    {
      title: 'Crown Beasts — Suicune',
      source: 'Wi-Fi Event',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Suicune (Shiny, Lv.30)'],
      targets: JOHTO,
      region: 'JP Feb 2010, NA Jun 2010, EU/AU 2010',
      details: 'Crown Beast Wi-Fi distribution. Always Shiny, Lv.30. With Crown Raikou + Entei + Suicune all transferred to B/W, Zoroark becomes catchable in Lostlorn Forest.',
      notes: 'OT/ID details by region — unverified.'
    },
    {
      title: 'TRU Shiny Legendary Beasts',
      source: 'Retail Event',
      language: 'English',
      kind: 'Single Pokémon',
      obtains: ['Shiny Raikou', 'Shiny Entei', 'Shiny Suicune'],
      targets: SINNOH,
      region: 'NA — Toys "R" Us, Feb 2010 (one beast per week)',
      details: 'Toys "R" Us Mystery Gift distribution of the three Shiny legendary beasts ahead of HGSS launch. Lv.30 each, OT "TRU".',
      notes: 'Distinct from the Wi-Fi Crown Beasts. Available for D/P/Pt only.'
    },
    {
      title: 'GameStop Shiny Legendary Dogs',
      source: 'Retail Event',
      language: 'English',
      kind: 'Single Pokémon',
      obtains: ['Shiny Raikou', 'Shiny Entei', 'Shiny Suicune'],
      targets: SINNOH,
      region: 'NA — GameStop, Feb 2011 (one beast per week)',
      details: 'GameStop reissue of the Shiny beast trio for D/P/Pt. OT "GAMESTP", Lv.30.',
      notes: 'Re-distribution timed alongside the WIN2011 Celebi promo.'
    }
  ];

  var mythicalDistributions = [
    {
      title: 'TRU Shaymin',
      source: 'Retail Event',
      language: 'English',
      kind: 'Single Pokémon',
      obtains: ['Shaymin (Lv.50)'],
      targets: SINNOH,
      region: 'NA — Toys "R" Us, May 2010',
      details: 'Toys "R" Us Mystery Gift Shaymin for Diamond/Pearl/Platinum. Holds a Micle Berry per Bulbapedia.',
      notes: 'OT "TRU"; Sky Forme transformation only available in Platinum.'
    },
    {
      title: 'GameStop Jirachi (Pokémon Center)',
      source: 'Retail Event',
      language: 'English',
      kind: 'Single Pokémon',
      obtains: ['Jirachi (Lv.5)'],
      targets: SINNOH,
      region: 'NA — GameStop, Jun–Jul 2010 (HGSS launch tie-in)',
      details: 'Wonder-Card Jirachi distributed for the Pokémon Center Pokémon HG/SS launch. Holds Liechi Berry, knows Draco Meteor / Dream Eater / Wish / Confusion.',
      notes: 'OT "SMR2010". Transferable into HGSS via Pal Park-style transfer? No — HGSS uses the Time Capsule rules differently; this Jirachi is held on a D/P/Pt save.'
    },
    {
      title: 'Mew (Wi-Fi, Fall 2010)',
      source: 'Wi-Fi Mystery Gift',
      language: 'English / French / German',
      kind: 'Single Pokémon',
      obtains: ['Mew (Lv.5)'],
      targets: SINNOH,
      region: 'NA / EU — Wi-Fi distribution, Oct 2010',
      details: 'Mystery Gift Mew for Diamond/Pearl/Platinum, distributed over Nintendo Wi-Fi (not via Toys "R" Us as is sometimes misremembered — TRU\'s Mew distributions were earlier, in 1999–2000). Holds Premier Ribbon.',
      notes: 'OT "MYSTRY". Known by Pound only at distribution; level/OT verified per Bulbapedia.'
    },
    {
      title: 'Movie 11 Regigigas',
      source: 'Movie Event',
      language: 'Japanese',
      kind: 'Single Pokémon',
      obtains: ['Regigigas (Lv.100)'],
      targets: SINNOH,
      region: 'JP — "Giratina and the Sky Warrior" theatres, Jul 2008',
      details: 'Movie 11 distribution. Carrying Regigigas to the Snowpoint Temple in Platinum unlocks the Regirock/Regice/Registeel encounter trio at the temple basement.',
      notes: 'Lv.100, OT "movie" (JP). Required for in-game Regis access in Platinum specifically.'
    },
    {
      title: 'Movie 12 Arceus',
      source: 'Movie Event',
      language: 'Japanese',
      kind: 'Single Pokémon',
      obtains: ['Arceus (Lv.100)'],
      targets: SINNOH,
      region: 'JP — "Arceus and the Jewel of Life" theatres, Jul 2009',
      details: 'Movie 12 Arceus distribution. Taking it to the ruins in HGSS triggers the Sinjoh Ruins event with Cynthia, granting a Lv.1 Dialga / Palkia / Giratina egg of the player\'s choice.',
      notes: 'Lv.100, OT "Movie" (JP). The Sinjoh Ruins event is HGSS-only; this Arceus was the only worldwide-legitimate way for many players, until later Western promos.'
    },
    {
      title: 'Movie 13 Celebi (Zoroark unlock chain)',
      source: 'Movie Event',
      language: 'Japanese',
      kind: 'Single Pokémon',
      obtains: ['Celebi (Lv.50)'],
      targets: JOHTO,
      region: 'JP — "Zoroark: Master of Illusions" theatres, 2010',
      details: 'Movie 13 Celebi for HGSS. In Black/White, transferring it triggers the Shiny Suicune/Raikou/Entei or related Zoroark-line interactions per the movie\'s tie-in.',
      notes: 'OT "Tokyo" or theatre-specific (JP) — exact OT/ID unverified for non-JP variants.'
    },
    {
      title: 'Mew (JP — Saikyou / Wi-Fi)',
      source: 'Wi-Fi Event',
      language: 'Japanese',
      kind: 'Single Pokémon',
      obtains: ['Mew'],
      targets: ALL_G4,
      region: 'JP — multiple Wi-Fi distributions, 2010–2011',
      details: 'Several Japanese Wi-Fi Mew distributions ran during the Gen 4 era (e.g. Saikyou Mew, Pokémon Center Mew). Specific level/OT/window varies per distribution.',
      notes: 'unverified — multiple variants exist; use Bulbapedia per-distribution page for individual OT/level.'
    },
    {
      title: 'Enigma Stone (Soul Dew → Latios/Latias)',
      source: 'Key Event',
      language: 'Multi-language',
      kind: 'Event Item + Pokémon',
      obtains: ['Enigma Stone', 'Latios or Latias (Lv.40)'],
      targets: ['HeartGold', 'SoulSilver'],
      region: 'JP 2010, EU/AU 2010 (Wi-Fi); never released in NA',
      details: 'Receive the Enigma Stone via Mystery Gift, take it to Pewter Museum where Steven inserts it into the meteorite. Travel to Pewter, then access the Embedded Tower / Hoenn Sound event to encounter Latios (HG) or Latias (SS) at Lv.40.',
      notes: 'North America never received the Enigma Stone officially. OT is the player.'
    },
    {
      title: 'Deoxys (HG/SS Embedded Tower)',
      source: 'In-game (event-gated)',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Deoxys (Lv.30)'],
      targets: JOHTO,
      region: 'Worldwide (requires HGSS) — Forme change at Veilstone meteorites in DPPt',
      details: 'A scientist in Pewter awards Deoxys at Lv.30 once a Mystery-Gift trigger is set. Deoxys can change Formes (Normal / Attack / Defense / Speed) at the meteorites in Veilstone City when transferred to D/P/Pt.',
      notes: 'Forme cycling location is DPPt-only. Trigger flag varies by region; details unverified for some Wi-Fi variants.'
    }
  ];

  var miscEvents = [
    {
      title: 'Hayley\'s Mew (My Pokémon Ranch)',
      source: 'In-Game Trade',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Mew (Lv.50)'],
      targets: SINNOH,
      region: 'Worldwide — My Pokémon Ranch (WiiWare), 2008+',
      details: 'In My Pokémon Ranch (Wii), once 999 Pokémon have been sent to the Ranch (Ranch level 25), Hayley offers an in-game trade of her Mew for any Pokémon Egg. The Mew is then sent back to a Diamond/Pearl/Platinum cart via the Wii ↔ DS link.',
      notes: 'OT "Hayley", ID 01000, Lv.50, Pokéball, Hatched Ribbon. No expiration — still legitimately obtainable on saved Wii data.'
    },
    {
      title: 'Pokémon Ranger: Shadows of Almia — Riolu',
      source: 'Spin-off Transfer',
      language: 'Multi-language',
      kind: 'Single Pokémon',
      obtains: ['Riolu (knows Aura Sphere)'],
      targets: SINNOH,
      region: 'JP / NA / EU — via Ranger Net special mission, 2008+',
      details: 'Complete the Ranger Net "Hia Valley" / Riolu-with-Aura-Sphere special mission in Pokémon Ranger: Shadows of Almia, then transfer Riolu to Diamond/Pearl/Platinum via the link cable. Knows Aura Sphere, otherwise impossible to learn at low level.',
      notes: 'Ranger Net was discontinued with the Nintendo Wi-Fi Connection shutdown in May 2014; mission can no longer be downloaded officially.'
    },
    {
      title: 'Pokémon Ranger: Shadows of Almia — Manaphy Egg & Darkrai',
      source: 'Spin-off Transfer',
      language: 'Multi-language',
      kind: 'Multi-species',
      obtains: ['Manaphy Egg', 'Darkrai (knows Dark Void)'],
      targets: SINNOH,
      region: 'JP / NA / EU — via Ranger Net special missions, 2008+',
      details: 'Two additional Shadows of Almia Ranger Net missions distributed a Manaphy Egg (the SoA re-issue of the original Ranger Manaphy event) and a Darkrai already knowing its signature Dark Void. Both transferable to Diamond/Pearl/Platinum.',
      notes: 'Ranger Net offline since 2014. Distinct from the Member Card Darkrai (different OT and origin).'
    },
    {
      title: 'Pokémon Ranger: Guardian Signs — Mythicals',
      source: 'Spin-off Transfer',
      language: 'Multi-language',
      kind: 'Multi-species',
      obtains: ['Manaphy Egg', 'Deoxys', 'Shaymin', 'Heatran (knows Eruption)'],
      targets: ALL_G4,
      region: 'JP / NA / EU — via Ranger Net special missions, 2010+',
      details: 'Pokémon Ranger: Guardian Signs offered four downloadable Ranger Net missions whose rewards transfer to any Generation IV game (D/P/Pt/HG/SS): a Manaphy Egg, a Deoxys (forme depends on capture speed), a fateful-encounter Shaymin, and a Heatran already knowing Eruption.',
      notes: 'Ranger Net offline since May 2014. Each mission can only be redeemed once per cart, except Deoxys which had multiple variants.'
    },
    {
      title: 'Pokéwalker — Yellow Forest (Surfing Pikachu)',
      source: 'Pokéwalker Course',
      language: 'Multi-language',
      kind: 'Course Distribution',
      obtains: ['Pikachu (Surf)', 'Pikachu (Fly)'],
      targets: JOHTO,
      region: 'JP Mar 2010, NA/EU 2010 (Mystery Gift Pokéwalker route)',
      details: 'Mystery-Gift Pokéwalker route for HGSS. Lets the player transfer Pikachu pre-loaded with Surf or Fly, plus other normally-unavailable species depending on time of day.',
      notes: 'OT is the player. Course-only — not a held-Pokémon distribution per se.'
    },
    {
      title: 'Pokéwalker — Rally',
      source: 'Pokéwalker Course',
      language: 'Multi-language',
      kind: 'Course Distribution',
      obtains: ['Mystery-Gift Pokéwalker route'],
      targets: JOHTO,
      region: 'JP / NA / EU 2010 — Mystery Gift Pokéwalker route',
      details: 'Mystery-Gift Pokéwalker route for HGSS. Themed around running / racing scenery; offers a unique encounter pool not available on the standard built-in routes.',
      notes: 'OT is the player. Mystery Gift distribution; pool details vary per source.'
    },
    {
      title: 'Pokéwalker — Sightseeing',
      source: 'Pokéwalker Course',
      language: 'Multi-language',
      kind: 'Course Distribution',
      obtains: ['Mystery-Gift Pokéwalker route'],
      targets: JOHTO,
      region: 'JP / NA / EU 2010 — Mystery Gift Pokéwalker route',
      details: 'Mystery-Gift Pokéwalker route for HGSS with a tourist / city-themed encounter pool.',
      notes: 'OT is the player. Mystery Gift distribution.'
    },
    {
      title: 'Pokéwalker — Winner\'s Path',
      source: 'Pokéwalker Course',
      language: 'Multi-language',
      kind: 'Course Distribution',
      obtains: ['Mystery-Gift Pokéwalker route'],
      targets: JOHTO,
      region: 'JP / NA / EU 2010 — Mystery Gift Pokéwalker route',
      details: 'Mystery-Gift Pokéwalker route for HGSS featuring battle-themed encounters; tied to TCG promotional tie-ins in some regions.',
      notes: 'OT is the player. Mystery Gift distribution.'
    },
    {
      title: 'Pokéwalker — Amity Meadow',
      source: 'Pokéwalker Course',
      language: 'Multi-language',
      kind: 'Course Distribution',
      obtains: ['Mystery-Gift Pokéwalker route'],
      targets: JOHTO,
      region: 'JP / NA / EU 2010–2011 — Mystery Gift Pokéwalker route',
      details: 'Mystery-Gift Pokéwalker route for HGSS — pastoral / friendly Pokémon themed (echoes the Sinnoh Amity Square concept).',
      notes: 'OT is the player. Mystery Gift distribution.'
    }
  ];

  return keyEvents.concat(legendaryDistributions, mythicalDistributions, miscEvents);
};


function buildDistributionsPage() {
  var root = document.getElementById('distributions-content');
  if (!root) return;

  // ── helpers ──────────────────────────────────────────────────────────────
  function escHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(value) {
    return escHtml(value).replace(/'/g, '&#39;');
  }

  function norm(s) { return String(s || '').toLowerCase(); }

  // ── checklist storage ────────────────────────────────────────────────────
  var STORAGE_KEY = 'g3-distribution-checklist-v2';
  var allEntries = window.getDistributionEntries();
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch (e) { saved = {}; }

  function currentGameKey() {
    return (typeof GAME !== 'undefined' && GAME) ? GAME : 'all';
  }

  function currentGameLabel() {
    return ({ all: 'All Games', FR: 'Diamond', LG: 'Pearl', R: 'Platinum', S: 'HeartGold', E: 'SoulSilver' }[currentGameKey()]) || currentGameKey();
  }

  function entryKey(entry) {
    return entry.source + '::' + entry.language + '::' + entry.title;
  }

  function rewardList(entry) {
    return (entry.obtains || []).map(function(obtain, idx) {
      return { id: entryKey(entry) + '::' + idx, label: obtain };
    });
  }

  function rewardChecked(entry, rewardId) {
    var byGame = saved[currentGameKey()] || {};
    var entryState = byGame[entryKey(entry)] || {};
    return !!entryState[rewardId];
  }

  function setRewardChecked(entry, rewardId, checked) {
    var game = currentGameKey();
    saved[game] = saved[game] || {};
    saved[game][entryKey(entry)] = saved[game][entryKey(entry)] || {};
    if (checked) {
      saved[game][entryKey(entry)][rewardId] = true;
    } else {
      delete saved[game][entryKey(entry)][rewardId];
      if (!Object.keys(saved[game][entryKey(entry)]).length) delete saved[game][entryKey(entry)];
      if (!Object.keys(saved[game]).length) delete saved[game];
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (e) {}
  }

  function allRewardsChecked(entry) {
    var rewards = rewardList(entry);
    return rewards.length > 0 && rewards.every(function(r) { return rewardChecked(entry, r.id); });
  }

  function anyRewardChecked(entry) {
    return rewardList(entry).some(function(r) { return rewardChecked(entry, r.id); });
  }

  // ── page-level state ─────────────────────────────────────────────────────
  var state = window._distributionsPageState || { source: 'all', language: 'all', query: '', onlyUnchecked: false };
  window._distributionsPageState = state;

  // ── filter helpers ───────────────────────────────────────────────────────
  function gameMatches(entry) {
    var g = currentGameKey();
    if (!g || g === 'all') return true;
    return (entry.targets || []).some(function(target) {
      var t = norm(target);
      if (g === 'FR') return t.indexOf('diamond') !== -1 || t === 'd';
      if (g === 'LG') return t.indexOf('pearl') !== -1 || t === 'p';
      if (g === 'R')  return t.indexOf('platinum') !== -1 || t === 'pt';
      if (g === 'S')  return t.indexOf('heartgold') !== -1 || t === 'hg';
      if (g === 'E')  return t.indexOf('soulsilver') !== -1 || t === 'ss';
      return true;
    });
  }

  function matches(entry) {
    if (!gameMatches(entry)) return false;
    if (state.source !== 'all' && norm(entry.source) !== state.source) return false;
    if (state.language !== 'all') {
      var lang = norm(entry.language);
      if (lang !== state.language && lang !== 'multi-language') return false;
    }
    if (state.onlyUnchecked && allRewardsChecked(entry)) return false;
    if (!state.query) return true;
    var hay = [
      entry.title, entry.language, entry.kind, entry.source,
      (entry.obtains || []).join(' '),
      (entry.targets || []).join(' '),
      entry.details, entry.notes, entry.region,
      (entry.mechanics || []).join(' ')
    ].join(' ').toLowerCase();
    return hay.indexOf(norm(state.query)) !== -1;
  }

  // ── shiny text helper ────────────────────────────────────────────────────
  function shinyText(entry) {
    var note = norm(entry.notes || '');
    var details = norm(entry.details || '');
    var combined = note + ' ' + details + ' ' + (entry.obtains || []).join(' ').toLowerCase();
    if (combined.indexOf('shiny') !== -1 && combined.indexOf('shiny-locked') === -1) {
      return ' · <span style="color:#7fe39c;">✶ Shiny</span>';
    }
    return '';
  }

  // ── filter button style (matches game-selector buttons) ──────────────────
  function filterBtnCss(active) {
    return 'font-family:\'Press Start 2P\',monospace;font-size:7px;padding:5px 10px;border-radius:4px;'
      + 'border:2px solid ' + (active ? 'var(--game-color,var(--gold))' : 'var(--border)') + ';'
      + 'background:transparent;cursor:pointer;'
      + 'color:' + (active ? 'var(--game-color,var(--gold))' : 'var(--muted)') + ';';
  }

  // ── main render ──────────────────────────────────────────────────────────
  function render() {
    var filtered = allEntries.filter(matches);
    var allForGame = allEntries.filter(gameMatches);
    var gameRewards = allForGame.reduce(function(n, e) { return n + rewardList(e).length; }, 0);
    var gameChecked = allForGame.reduce(function(n, e) {
      return n + rewardList(e).filter(function(r) { return rewardChecked(e, r.id); }).length;
    }, 0);

    var activeEl = document.activeElement;
    var searchFocused = activeEl && activeEl.id === 'dist-search';
    var selStart = searchFocused ? activeEl.selectionStart : null;
    var selEnd   = searchFocused ? activeEl.selectionEnd   : null;

    // Build distinct source filter list from data
    var sources = {};
    allEntries.forEach(function(e) { sources[e.source] = true; });
    var sourceOpts = [{ key: 'all', label: 'All Sources' }].concat(Object.keys(sources).map(function(s) {
      return { key: s.toLowerCase(), label: s };
    }));

    root.innerHTML = ''
      + '<div style="position:relative;display:flex;align-items:center;margin-bottom:12px;">'
      + '<input id="dist-search" type="text" placeholder="Search Gen 4 distributions..." style="flex:1;padding:8px 12px;padding-right:28px;background:var(--card);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:12px;outline:none;">'
      + '<button id="dist-search-clear" class="search-bar-clear" title="Clear" style="display:' + (state.query ? 'flex' : 'none') + ';" type="button">&#x2715;</button>'
      + '</div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;" id="dist-source-btns"></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;" id="dist-lang-btns"></div>'
      + '<div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">'
      + '<div style="font-size:11px;color:var(--muted);">Showing <strong style="color:var(--text)">' + filtered.length + '</strong> of <strong style="color:var(--text)">' + allEntries.length + '</strong> &mdash; <strong style="color:var(--text)">' + currentGameLabel() + '</strong>: <strong style="color:var(--text)">' + gameChecked + '</strong> / <strong style="color:var(--text)">' + gameRewards + '</strong> checked</div>'
      + '<div style="font-size:11px;color:var(--muted);"><a href="https://bulbapedia.bulbagarden.net/wiki/List_of_Generation_IV_event_Pok%C3%A9mon_distributions" target="_blank" rel="noopener" style="color:var(--game-color,var(--gold));text-decoration:none;">Bulbapedia: Gen IV event distributions</a></div>'
      + '</div>'
      + '<div id="dist-list"></div>';

    var search = document.getElementById('dist-search');
    var clearBtn = document.getElementById('dist-search-clear');
    if (search) {
      search.value = state.query;
      search.oninput = function() { state.query = this.value || ''; render(); };
      if (clearBtn) clearBtn.onclick = function() { state.query = ''; render(); };
      if (searchFocused) {
        search.focus();
        if (selStart !== null) try { search.setSelectionRange(selStart, selEnd); } catch (e) {}
      }
    }

    var srcBtns = document.getElementById('dist-source-btns');
    sourceOpts.forEach(function(opt) {
      var btn = document.createElement('button');
      btn.style.cssText = filterBtnCss(state.source === opt.key);
      btn.textContent = opt.label;
      btn.onclick = function() { state.source = opt.key; render(); };
      srcBtns.appendChild(btn);
    });

    var langBtns = document.getElementById('dist-lang-btns');
    [
      { key: 'all',      label: 'All Languages' },
      { key: 'english',  label: 'English' },
      { key: 'japanese', label: 'Japanese' }
    ].forEach(function(opt) {
      var btn = document.createElement('button');
      btn.style.cssText = filterBtnCss(state.language === opt.key);
      btn.textContent = opt.label;
      btn.onclick = function() { state.language = opt.key; render(); };
      langBtns.appendChild(btn);
    });
    var unchBtn = document.createElement('button');
    unchBtn.style.cssText = filterBtnCss(state.onlyUnchecked);
    unchBtn.textContent = 'Unchecked Only';
    unchBtn.onclick = function() { state.onlyUnchecked = !state.onlyUnchecked; render(); };
    langBtns.appendChild(unchBtn);

    var list = document.getElementById('dist-list');
    if (!filtered.length) {
      list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted);font-size:12px;">No distribution entries match the current filters.</div>';
      return;
    }

    list.innerHTML = filtered.map(function(entry) {
      var rewards = rewardList(entry);
      var checkedCount = rewards.filter(function(r) { return rewardChecked(entry, r.id); }).length;
      var fullyChecked = rewards.length > 0 && checkedCount === rewards.length;
      var partiallyChecked = !fullyChecked && checkedCount > 0;
      var borderColor = fullyChecked ? 'rgba(127,227,156,0.35)' : partiallyChecked ? 'rgba(255,209,102,0.35)' : 'var(--border)';
      var sourceLabel = entry.source;

      var checkboxesHtml = rewards.map(function(reward) {
        var checked = rewardChecked(entry, reward.id);
        return '<label style="display:flex;align-items:center;gap:8px;padding:4px 0;cursor:pointer;">'
          + '<input data-dist-entry="' + escAttr(entryKey(entry)) + '" data-dist-reward="' + escAttr(reward.id) + '" type="checkbox" ' + (checked ? 'checked' : '') + ' style="width:14px;height:14px;accent-color:var(--game-color,var(--gold));flex:0 0 auto;">'
          + '<span style="font-size:12px;color:' + (checked ? 'var(--muted)' : 'var(--text)') + ';text-decoration:' + (checked ? 'line-through' : 'none') + ';">' + escHtml(reward.label) + '</span>'
          + '</label>';
      }).join('');

      var mechanicsHtml = (entry.mechanics && entry.mechanics.length)
        ? '<div style="margin-top:8px;font-size:10px;color:var(--muted);line-height:1.8;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);">'
          + '<span style="font-family:\'Press Start 2P\',monospace;font-size:6px;color:var(--game-color,var(--gold));margin-right:6px;letter-spacing:0.5px;">DETAILS</span>'
          + entry.mechanics.map(escHtml).join(' &middot; ')
          + '</div>'
        : '';

      var regionHtml = entry.region
        ? '<div style="margin-top:8px;font-size:11px;color:var(--muted);line-height:1.7;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);"><span style="font-family:\'Press Start 2P\',monospace;font-size:6px;color:var(--game-color,var(--gold));margin-right:6px;">REGION</span>' + escHtml(entry.region) + '</div>'
        : '';

      var notesHtml = entry.notes
        ? '<div style="margin-top:8px;font-size:11px;color:var(--muted);line-height:1.7;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);">' + escHtml(entry.notes) + '</div>'
        : '';

      return '<div style="background:var(--card);border:1px solid ' + borderColor + ';border-radius:8px;margin-bottom:10px;overflow:hidden;">'
        + '<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;padding:10px 14px;border-bottom:1px solid var(--border);background:var(--panel);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
        + '<span style="color:' + (fullyChecked ? 'var(--muted)' : 'var(--text)') + ';">' + escHtml(entry.title.toUpperCase()) + '</span>'
        + '<span style="font-size:6px;color:var(--muted);">' + checkedCount + ' / ' + rewards.length + '</span>'
        + '</div>'
        + '<div style="padding:10px 14px;">'
        + '<div style="font-size:10px;color:var(--muted);margin-bottom:6px;">' + escHtml(sourceLabel) + ' &middot; ' + escHtml(entry.kind) + ' &middot; ' + escHtml(entry.language) + shinyText(entry) + '</div>'
        + '<div style="font-size:11px;color:var(--muted);line-height:1.7;margin-bottom:8px;">' + escHtml(entry.details || '') + '</div>'
        + '<div style="font-size:11px;color:var(--muted);margin-bottom:' + (rewards.length ? '8' : '0') + 'px;"><span style="font-family:\'Press Start 2P\',monospace;font-size:6px;color:var(--game-color,var(--gold));margin-right:6px;">TARGETS</span>' + escHtml((entry.targets || []).join(', ')) + '</div>'
        + checkboxesHtml
        + mechanicsHtml
        + regionHtml
        + notesHtml
        + '</div>'
        + '</div>';
    }).join('');

    Array.prototype.forEach.call(root.querySelectorAll('input[data-dist-reward]'), function(box) {
      box.onchange = function() {
        var entryId  = this.getAttribute('data-dist-entry');
        var rewardId = this.getAttribute('data-dist-reward');
        var entry = allEntries.filter(function(e) { return entryKey(e) === entryId; })[0];
        if (!entry) return;
        setRewardChecked(entry, rewardId, this.checked);
        render();
      };
    });
  }

  render();
}

// Legacy stub — the checklist is now fully integrated into buildDistributionsPage.
function buildDistributionChecklistPage() {}
