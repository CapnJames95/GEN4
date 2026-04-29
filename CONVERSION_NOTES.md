# Gen 3 → Gen 4 Conversion — Status

The site has been migrated end-to-end from Gen 3 (FR/LG/R/S/E) to Gen 4 (D/P/Pt/HG/SS). All bulk data is sourced from authoritative datasets — no Bulbapedia HTML fabrication anywhere.

## Slot mapping (kept as opaque internal identifiers)

| Internal slot | Gen 4 game | Region |
|---|---|---|
| `FR` | Diamond    | Sinnoh |
| `LG` | Pearl      | Sinnoh |
| `R`  | Platinum   | Sinnoh |
| `S`  | HeartGold  | Johto  |
| `E`  | SoulSilver | Johto  |

The internal slot codes are intentionally **not renamed** to D/P/Pt/HG/SS at the JS level. False-positive risk: single-letter codes (`'R'`/`'S'`/`'E'`) collide with growth-rate codes (`'E'`=Erratic, `'F'`=Fast, `'S'`=Slow), pluralisation suffixes (`> 1 ? 'S' : ''`), and dozens of other ambiguous string literals. A blind swap would silently corrupt those.

The internal codes never reach the UI — every user-facing surface (badges, masthead, tracker tabs, dropdowns, e4ref/frontier/poffin/safari/distributions/rematches/learnsets/encounters labels) translates the slot to its Gen 4 name. So the rename would be cosmetic-only with high blast-radius. **Future maintainers: treat `FR/LG/R/S/E` as opaque slot IDs; map at the boundary.**

## Done

### Chrome / framing
- Header logo, masthead, badges (visible labels D/P/Pt/HG/SS), dropdown, hero copy, title, tracker save tabs, Features overlay, Bulba walkthrough picker
- Mascot legendaries: Pikachu, Dialga, Palkia, Giratina-Origin, Ho-Oh, Lugia
- Header sprite tray pools fully Gen 4 (Sinnoh + Johto Pokémon)
- All `Gen 3` → `Gen 4`, `386` → `493`, FR/LG/R/S/E names → D/P/Pt/HG/SS labels
- CSS variables: `--diamond` `--pearl` `--platinum` `--heartgold` `--soulsilver` (legacy `--fire`/etc. fully removed)
- `body.game-*` per-game `--accent`/`--accent-dim`/`--game-glow` updated for Gen 4 (dark + light themes)
- All hardcoded slot Gen 3 hex codes (`#FF5555`/`#5599FF`/`#44DD88`/etc.) swapped to Gen 4 vars across CSS + JS + HTML; semantic colours (positive green, type chart, contest categories) intentionally preserved
- `assets/favicon.svg` Poké-Ball

### Page rewrites with verified data
- `assets/js/pages/e4ref.js` — Sinnoh E4 (D/P + Pt) + Johto E4 (HG/SS) all teams/levels/items verified
- Battle Frontier (`buildFrontierPage`) — 5 facilities + 5 Brain names verified
- `assets/js/pages/pokeblock.js` — Poffin Optimizer (DPPt only; hidden in HGSS)
- `assets/js/pages/safarizone.js` — Great Marsh (DPPt) + Johto Safari (HGSS)
- `assets/js/pages/distributions.js` + `distributionchecklist.js` — ~18 Gen 4 events
- `assets/js/pages/rematches.js` — 14 Sinnoh VS Seeker + 15 Johto PokéGear rematches
- `assets/js/pages/tutors.js` + `TUTOR_NPC_DATA` — 39 verified tutor entries (0 unverified)
- Type chart audited 17×17 = 289 matchups against canonical Gen 4 (Bulbapedia Gen II–V); 1 bug fixed (ghost→fighting was 0×, should be 1×). Fairy correctly absent.
- Move Dex contest filter logic flipped (DPPt has Super Contests, HGSS doesn't; previous Gen-3 logic was inverted under slot mapping)

### Bulk data (authoritative structured sources)
- `assets/data/pokedata.js` — 493 entries, sourced from veekun + showdown gen5 (pre-Fairy types)
- `ALL_MOVES_DATA` + `MOVES_DATA` in app.js — 466 moves, 11 Gen-4 power/PP tweaks, 112 new moves
- `assets/js/pages/learnsets.js` — `window.LEARNSETS` for all 493 species, sourced from showdown gen-4 filtering. 305KB.
- `assets/js/pages/encounters.js` — 290 routes/areas, 3,528 entries from veekun. HGSS time-of-day preserved.
- `assets/js/app.js` ALL_ITEMS — 290 + 58 new Gen 4 items + 92 TMs (TM01–TM92) all named & described. **0 `unverified` location slots remaining.**
- `assets/data/bulba-data-{dp,pt,hgss}.js` — 91 walkthrough parts (31 D/P + 27 Pt + 33 HGSS), 24.5 MB scraped from Bulbapedia using documented trim pattern. Re-trimmed to strip modern bvTOC widget, content__header, Project Walkthroughs footer, printfooter, parser comments. ORB-fallback installed (broken thumb URLs auto-swap to full-resolution).

### Maps
- **DPPt Sinnoh Map** (Leaflet): cloned from `ICEREG1992/pkmnmap4`, locally hosted at `DPPtIronmonMap/`, embedded inline as `#page-dpptmapview`. **Tile pyramid mirrored locally** — 16,260 tiles / 85 MB across all 51 maps + zoom levels (no external host dependency). Theme-override matches Gen 4 dark theme (Diamond accent). Per-marker click-to-mark persistence with per-game (D/P/Pt) localStorage scope.
- **HGSS Johto Map** (React/MUI): cloned + patched + rebuilt from `kelseyyoung/HGSSIronmonMap`, locally hosted at `HGSSIronmonMap/`, embedded inline as `#page-hgssmapview`. Theme-override matches Gen 4 (HeartGold accent). `useEntityMark` hook patched to add localStorage persistence with per-game (HG/SS) scope via `?game=` URL parameter. `scripts/restore-hgss-theme.sh` re-injects `<link>` after future rebuilds (idempotent).
- Legacy `FRLGIronmonMap/` and `EmeraldIronmonMap/` directories deleted; `kantomapview` / `emeraldmapview` page bodies + JS wiring removed.

### Item Dex
- Items now grouped by category in render (all Pokéballs together, all TMs together, all Berries together, etc.) with per-section header rows showing item count.

## 2026-04-29 audit & expansion pass

### Bug fixes
- **Tutors page renderer rewritten** (`assets/js/pages/tutors.js`). Was iterating Gen-3 `FRLG_TUTOR_LIST` with hardcoded Gen-3 type dict — replaced with single source of truth `TUTOR_NPC_DATA` (39 entries) + `ALL_MOVES_DATA` for typing. Header now shows correct **D / P / Pt / HG/SS** columns; per-row NPC location subrow added. Move-name normaliser handles "Ancient Power" ↔ "AncientPower" mismatch.
- **Stale Gen-3 tutor globals removed** from `assets/data/app-static.js` (file is unreferenced — the conflicting globals were dead-code shadows of the Gen 4 versions in `app.js:6-12`).
- **Pokédex was filtering out 17 Pokémon** (Combee, Cherubi, Aipom, Heracross, Munchlax, Burmy, Drifloon, Skorupi, Rotom, Igglybuff, Wynaut, Phione, Castform, Shuppet, Exeggcute, Taillow, Shroomish, Feebas) because their `games` field was all `"nan"`. Populated each with accurate Gen-4 location data (Honey Trees / Headbutt / Pokéwalker / Pal Park / etc.). Dex now shows all 493 species.
- **Pokédex page game-tabs** still showed Gen-3 names (`🔥 FIRERED`, `🌿 LEAFGREEN`, `🔴 RUBY`, `🔷 SAPPHIRE`, `💚 EMERALD`) — replaced with Gen-4 (`💎 DIAMOND`, `🌸 PEARL`, `⚙ PLATINUM`, `💛 HEARTGOLD`, `🤍 SOULSILVER`).
- **Dex Dashboard gym badges** were Kanto (Boulder/Cascade/Thunder/...) and Hoenn (Stone/Knuckle/...). Replaced with Sinnoh (Coal/Forest/Cobble/Fen/Relic/Mine/Icicle/Beacon) for D/P/Pt and Johto+Kanto+Red (16+1) for HG/SS. Custom SVG icons added per badge.
- **Dex Dashboard counters** showed `0 / 386` (Hoenn dex). Fixed `var total = 386` in `animateDexDashMotion` and `/ 386 * 100` in caughtPct calc → 493.
- **Cosmetic Gen-3 location strings** on 12 "Not in Gen 4" items (Silph Scope, Tea, SecretKey, Tri-Pass, Rainbow Pass, Ruby/Sapphire Gem, Mystic/Aurora/Old Sea Map tickets, Go-Goggles, Basement Key, S.S. Ticket, Magma Emblem) replaced with neutral "Gen 3 (region) key item — not obtainable in Gen 4."
- **Event-only Pokémon details expanded** — Mew, Celebi, Jirachi, Deoxys, Phione, Manaphy, Darkrai, Shaymin, Arceus had thin "Event Only" blurbs; expanded with real Gen-4 distribution event names (Toys "R" Us 2010, GameStop 2010, Pokémon Ranger transfer, Member Card, Oak's Letter, Azure Flute) and forme/level details.

### New reference pages (16)

Each follows the `safarizone.js` / `pokeblock.js` pattern: data const + `buildXPage()` builder + IIFE + `window.buildXPage` export. Wired via `assets/js/core/page-registry.js` + index.html nav button (with `data-games` scoping) + page shell + `<script>` include. Pokémon-name links use `_openDexSearch(name, num)` (auto-expands the evolution dropdown); move links use `goToMoveInDex`; item links use `openItemByName`.

Encounter / sidequest pages (Phase 3, Bulba-sourced):
- `honeytrees.js` — DPPt, 21 trees + 4-tier preferred-tree mechanic (Munchlax, Heracross-boosted)
- `headbutttrees.js` — HGSS, route-by-route encounter pool
- `apricorns.js` — HGSS, 7 ball types + per-route apricorn map + Kurt conversion
- `laketrio.js` — DPPt, Uxie/Mesprit/Azelf + Sinnoh roaming summary
- `spiritomb.js` — DPPt, Hallowed Tower + 32-NPC quest steps
- `roaminglegends.js` — DPPt + HGSS, Mesprit/Cresselia/Articuno/Zapdos/Moltres/Entei/Raikou/Latios/Latias
- `mtsilver.js` — HGSS, Red battle full team (6 Pokémon, Lv 80-88) with held items, abilities, moves, strategy
- `sinjoh.js` — HGSS Arceus event for Dialga/Palkia/Giratina + Embedded Tower for Kyogre/Groudon/Rayquaza
- `unown.js` — HGSS, 28 forms + 4 chamber puzzles + ! / ? unlock
- `bugcatching.js` — HGSS, Tue/Thu/Sat schedule + encounter pool + scoring + prizes
- `distortionworld.js` — Pt-only, Giratina-Origin route + items + battle prep

Medium reference pages (Phase 4):
- `poketch.js` — DPPt, all 25 apps with unlock + use-case
- `underground.js` — DPPt, sphere types + fossil dig table + treasures + secret bases
- `pokeathlon.js` — HGSS, 10 events × 5 athletic stats + top performers per stat
- `pokewalker.js` — HGSS, 25-route table with watt cost + encounter pool
- `pokegear.js` — HGSS, ~43 phone-call trainer entries + gift callers + swarm callers + rematch tier mechanics

### Outstanding

- **Day/Night UI toggle** for HGSS encounter tables — time-of-day data preserved in `encounters.js` per the original conversion, but no UI affordance exposed yet. Deferred from this pass.
- **Per-Pokémon TUTOR_DATA** at `app.js:3` is still keyed on Gen-3 movesets (frlg/emerald arrays of Gen-3 tutor moves). Used by per-Pokémon "Tutor Moves" tab in the dex. Authoritative `TUTOR_NPC_DATA` is Gen 4, but the per-Pokémon learnability map is not. Lower priority — most Gen 4 tutor learnability follows similar lines but should ideally be regenerated from Showdown gen-4 data.
- **3 Bulba walkthrough images** (Monferno + Ponyta×2) ORB-blocked by Chrome at both thumb and full-resolution URLs. Bulbapedia-side issue, only fixable by image-proxying.

## Audit greps (should all be empty / expected)

```bash
# Slot Gen 3 hex codes
grep -rE '#FF5555|#5599FF|#44DD88|#FF6666|#66AAFF' assets/css/app.css
# → 0 (semantic uses preserved)

# Unverified item slots
grep -c '"unverified - confirm location"' assets/js/app.js
# → 0

# Legacy game name strings (excluding bulba-data walkthrough HTML + Gen-3-only item names)
grep -rn 'FireRed\|LeafGreen\|Sapphire' assets/ index.html | grep -v 'bulba-data-\|Sapphire (Gem)'
# → walkthrough HTML hits only

# Maps directories
ls assets/data/bulba-data-*.js && ls -d *IronmonMap
# → bulba-data-{dp,pt,hgss}.js + DPPtIronmonMap + HGSSIronmonMap

# Type chart
node -e 'const t = require("fs").readFileSync("assets/js/app.js","utf8"); console.log(t.match(/normal:1,fire:/g).length, "rows")'
# → 17 rows (no Fairy)

# Pokémon counts
node -e 'var w={};require("./assets/data/pokedata.js");console.log("POKE.length =", w.POKE && w.POKE.length)' 2>&1 | head -2
# (file uses window., needs eval — `head -c 200 assets/data/pokedata.js | grep -oE "num\":[0-9]+" | tail` shows last index)
```

## Build hooks

If you rebuild the HGSS React app from `/tmp/hgss_src` (or a cloned source elsewhere):

```bash
# 1. Rebuild
cd HGSSIronmonMap-source && PUBLIC_URL="./" CI=false npm run build

# 2. Replace project's HGSSIronmonMap/ with build/

# 3. Re-inject theme-override link (idempotent):
./scripts/restore-hgss-theme.sh
```

The persistence patch (`useEntityMark` localStorage support + `?game=` namespacing) is in the source repo at `src/IronmonMapUtils/hooks/useEntityMark.ts` and `src/IronmonMapUtils/components/{Trainer,Item}.tsx`. Preserve those changes across rebuilds, or re-apply by re-cloning + re-patching.
