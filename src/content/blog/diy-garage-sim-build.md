---
title: "DIY Garage Sim Build"
description: "How I built a fold-away garage golf simulator: a 10 ft impact screen, hoisted hitting platform, and padded bifold walls that all stow into 17 inches of garage depth. Full schematics, step-by-step plans, and a complete parts list with costs."
pubDate: 2026-07-22
heroImage: "/images/blog/diy-garage-sim/deployed-playing.jpg"
category: "Guides"
tags: ["diy", "garage-sim", "build-guide", "hardware"]
---

<style>
  .dgs-fig{margin:1.6rem 0;text-align:center}
  .dgs-fig svg{max-width:100%;height:auto;background:#fff;border:1px solid #ddd;border-radius:6px}
  .dgs-fig figcaption{font-size:.85rem;opacity:.75;margin-top:.4rem;font-style:italic}
  .dgs-note{border-left:4px solid #b3541e;background:rgba(179,84,30,.08);padding:.6rem 1rem;margin:1rem 0;font-size:.93rem}
  .dgs-warn{border-left:4px solid #b32020;background:rgba(179,32,32,.08);padding:.6rem 1rem;margin:1rem 0;font-size:.93rem}
  .dgs-fig .lbl{font-family:Arial,Helvetica,sans-serif;font-size:16px;fill:#222}
  .dgs-fig .lbl-sm{font-family:Arial,Helvetica,sans-serif;font-size:15px;fill:#333}
  .dgs-fig .dim{font-family:Arial,Helvetica,sans-serif;font-size:15px;fill:#b3541e}
  .dgs-fig .step-num{font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;fill:#fff}
  .dgs-fig .dir{font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:.5px;fill:#1d4a22}
  .dgs-photo{width:100%;border-radius:6px;margin:.4rem 0}
  .prose table{border-collapse:collapse;margin:1.2rem 0;font-size:.94rem;display:block;overflow-x:auto;max-width:100%}
  .prose th,.prose td{padding:.5rem .7rem;vertical-align:top;border-bottom:1px solid rgba(150,150,150,.28);line-height:1.45;word-break:keep-all;overflow-wrap:normal;hyphens:none;min-width:90px}
  .prose td:first-child,.prose th:first-child{min-width:140px}
  .prose th{font-weight:700;border-bottom:2px solid rgba(150,150,150,.5);text-align:left}
</style>

I couldn't take my simulator apart to document it, so this guide was rebuilt from photos, video, and a tape measure. Everything you need to replicate it is here: schematics with build steps, and a complete parts list with prices and links.

## 1. The concept

A full golf simulator — 7 ft 7 in × 10 ft impact screen, turf hitting platform, projector, launch monitor — that folds flat against the garage wall into a plywood cabinet just **17 in deep, 10 ft 6 in wide, and 8 ft tall** — the 17 in being the layer stack: screen frame, both platforms folded turf-to-turf and hoisted vertical, the closed doors, and some breathing room. The car still parks in the bay.

<img class="dgs-photo" src="/images/blog/diy-garage-sim/closed-front.jpg" alt="Simulator closed: a flat plywood cabinet against the garage wall" />

Deployment takes about two minutes:

1. Unlatch and swing open the two bifold door assemblies. They roll on locking casters and become the padded side walls of the hitting bay.
2. Run the wall-mounted electric hoist to lower the 10 ft × 7 ft large platform from vertical down to the floor.
3. Unfold the hinged 8 ft × 4 ft hitting platform off the top of the large platform.
4. Power on the projector and launch monitor. Play golf.

<img class="dgs-photo" src="/images/blog/diy-garage-sim/deployed-playing.jpg" alt="Simulator deployed and running" />

Stowing is the reverse: fold the hitting platform onto the large platform, hoist the stack vertical, close the doors, throw the slide-bolt latch.

### Key dimensions

| Item | Dimension |
| --- | --- |
| Garage bay (back wall to garage door) | 16 ft 8 in wide × 24 ft deep × 10 ft 10 in ceiling |
| Folded (stowed) unit | 10 ft 6 in W × 8 ft H × 17 in D |
| Impact screen (SIGPRO Premium, 4:3) | 7 ft 7 in × 10 ft |
| Screen standoff | Mounted 12 in off the back wall; 10 ft × 8 ft black net hung behind for impact absorption |
| Screen enclosure frame | ~10 ft 6 in W × ~8 ft H |
| Large platform | 10 ft W × 7 ft D — 2×4 frame + 23/32 plywood + turf |
| Base rail | 2×10 × 10 ft, flat on slab ~5 in off wall, 3× 4-in concrete anchors; the platform runs on six full-depth 2×4s (the two at the T-hinges carry the load), whose back ends overhang the plywood 1¾ in for fold clearance |
| Hitting platform | 8 ft W × 4 ft D, hinged to front edge of large platform |
| Electric hoist | On the back wall ~10 ft high, directly above the stowed unit |
| Projector (BenQ TK710STi, ceiling) | 9 ft 5 in from the screen (10 ft 5 in from back wall) |
| Garage door opener clearance | 13 ft from back wall (11 ft 7 in from closed unit) |
| Garage door tracks | 14 ft 6 in from closed unit |
| Launch monitor | 8 ft behind center of the hitting mat — 17 ft from screen (18 ft from back wall) |

<figure class="dgs-fig">
<svg viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side section of the deployed simulator">
  <line x1="40" y1="370" x2="920" y2="370" stroke="#333" stroke-width="3"/>
  <line x1="40" y1="370" x2="40" y2="30" stroke="#333" stroke-width="3"/>
  <line x1="40" y1="30" x2="920" y2="30" stroke="#333" stroke-width="2"/>
  <text x="48" y="22" class="dir">← BACK WALL</text>
  <text x="480" y="22" class="lbl-sm" text-anchor="middle">ceiling 10 ft 10 in</text>
  <text x="912" y="22" class="dir" text-anchor="end">GARAGE DOOR →</text>
  <rect x="44" y="82" width="12" height="288" fill="#c9a06b" stroke="#8a6a3f"/>
  <text x="30" y="230" class="lbl" transform="rotate(-90 30 230)">screen frame 8 ft tall</text>
  <rect x="58" y="97" width="6" height="273" fill="#eceff1" stroke="#888"/>
  <line x1="64" y1="160" x2="140" y2="160" stroke="#999" stroke-width="0.8"/>
  <text x="146" y="165" class="lbl-sm">impact screen 7 ft 7 in · 12 in off wall · net behind</text>
  <rect x="58" y="36" width="34" height="18" fill="#c0392b" stroke="#7c241a"/>
  <text x="100" y="50" class="lbl-sm">hoist ~10 ft high</text>
  <path d="M240,56 Q 400,86 560,58" fill="none" stroke="#444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="250" y="50" class="lbl-sm">ceiling baffle net</text>
  <line x1="423" y1="30" x2="423" y2="70" stroke="#555" stroke-width="3"/>
  <rect x="400" y="70" width="46" height="22" fill="#f4f4f4" stroke="#555"/>
  <text x="452" y="86" class="lbl-sm">BenQ TK710STi</text>
  <line x1="423" y1="92" x2="70" y2="115" stroke="#9db8d6" stroke-width="1" stroke-dasharray="5,4"/>
  <line x1="423" y1="92" x2="70" y2="360" stroke="#9db8d6" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="560" y="36" width="56" height="20" fill="#ddd" stroke="#777"/>
  <text x="622" y="50" class="lbl-sm">door opener (13 ft)</text>
  <line x1="75" y1="54" x2="190" y2="346" stroke="#999" stroke-width="1.4"/>
  <circle cx="190" cy="348" r="5" fill="none" stroke="#777" stroke-width="1.5"/>
  <line x1="190" y1="350" x2="70" y2="362" stroke="#999" stroke-width="1"/>
  <line x1="190" y1="350" x2="300" y2="358" stroke="#999" stroke-width="1"/>
  <line x1="138" y1="212" x2="230" y2="200" stroke="#999" stroke-width="0.8"/>
  <text x="236" y="204" class="lbl-sm">steel lift cable (slack when down)</text>
  <rect x="58" y="360" width="16" height="9" fill="#b98f57" stroke="#8a6a3f"/>
  <rect x="78" y="352" width="238" height="14" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="316" y="352" width="144" height="14" fill="#d9b57e" stroke="#8a6a3f"/>
  <circle cx="78" cy="366" r="4" fill="#b3541e"/>
  <circle cx="316" cy="362" r="4" fill="#b3541e"/>
  <circle cx="390" cy="290" r="9" fill="none" stroke="#555" stroke-width="2"/>
  <line x1="390" y1="299" x2="390" y2="336" stroke="#555" stroke-width="2"/>
  <line x1="390" y1="308" x2="372" y2="326" stroke="#555" stroke-width="2"/>
  <line x1="390" y1="308" x2="408" y2="326" stroke="#555" stroke-width="2"/>
  <line x1="390" y1="336" x2="378" y2="360" stroke="#555" stroke-width="2"/>
  <line x1="390" y1="336" x2="402" y2="360" stroke="#555" stroke-width="2"/>
  <rect x="690" y="344" width="26" height="22" fill="#333"/>
  <text x="655" y="336" class="lbl-sm">launch monitor</text>
  <text x="850" y="360" class="dim">24 ft total</text>
  <text x="100" y="392" class="lbl">large platform 7 ft</text>
  <text x="322" y="392" class="lbl">hitting platform 4 ft</text>
  <line x1="78" y1="370" x2="78" y2="404" stroke="#b3541e" stroke-width="0.8"/>
  <text x="44" y="418" class="dim">base: 2×10 rail + 2 T-hinges</text>
  <line x1="316" y1="370" x2="316" y2="404" stroke="#b3541e" stroke-width="0.8"/>
  <text x="290" y="418" class="dim">fold hinge</text>
  <line x1="40" y1="440" x2="415" y2="440" stroke="#b3541e" stroke-width="1"/>
  <line x1="40" y1="440" x2="40" y2="433" stroke="#b3541e"/><line x1="415" y1="440" x2="415" y2="433" stroke="#b3541e"/>
  <text x="110" y="458" class="dim">projector: 9 ft 5 in from screen</text>
  <line x1="440" y1="440" x2="703" y2="440" stroke="#b3541e" stroke-width="1"/>
  <line x1="703" y1="440" x2="703" y2="433" stroke="#b3541e"/>
  <text x="450" y="458" class="dim">launch monitor: 18 ft from back wall (17 ft from screen)</text>
</svg>
<figcaption>Fig. 1 — Side section, deployed. The hoist lives on the back wall about 10 ft up, directly above the stowed unit; its lift cables stay attached at all times and go slack when the platform is down.</figcaption>
</figure>

<div class="dgs-warn"><strong>Safety first.</strong> The raised platform is several hundred pounds hanging from a cable. Lag the hoist through solid blocking into the wall framing, keep the lift cables attached at all times, never stand under or in front of the platform while it moves, and add a mechanical catch (chain or barrel bolts to the wall frame) as a backup when stowed. Every rigging component — cable, clamps, thimbles, carabiners/quick links, turnbuckles, pulley, and the welded corner rings — must be rated well above the platform's weight; use load-rated hardware only — the package should state a working load limit (WLL); if it doesn't, don't use it, and target a WLL of at least twice the platform weight for every link. Never decorative pieces. Verify your wall framing can take the load before trusting it.</div>

## 2. Screen wall

The screen mounts to the enclosure itself — the 2×10 side frames, the top shelving/plate, and the bottom plate — so it floats ~12 in off the back wall on its bungee anchors and can give on impact. The bungee attachment points go in with the enclosure sides (Section 6), so the screen hangs right after that.

<figure class="dgs-fig">
<svg viewBox="0 0 760 345" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Front elevation of the open screen bay with numbered build steps">
  <line x1="20" y1="310" x2="740" y2="310" stroke="#333" stroke-width="3"/>
  <rect x="128" y="1" width="504" height="309" fill="#1c1c1c" stroke="#000"/>
  <rect x="140" y="9" width="480" height="293" fill="#eceff1" stroke="#999"/>
  <rect x="128" y="1" width="12" height="309" fill="#2b2b2b"/>
  <rect x="620" y="1" width="12" height="309" fill="#2b2b2b"/>
  <rect x="128" y="1" width="504" height="10" fill="#2b2b2b"/>
  <rect x="128" y="296" width="504" height="14" fill="#2e6b34"/>
  <text x="250" y="160" class="lbl">SIGPRO Premium — 7 ft 7 in × 10 ft (4:3)</text>
  <line x1="140" y1="332" x2="620" y2="332" stroke="#b3541e"/>
  <line x1="140" y1="332" x2="140" y2="325" stroke="#b3541e"/><line x1="620" y1="332" x2="620" y2="325" stroke="#b3541e"/>
  <text x="360" y="336" class="dim">10 ft</text>
  <line x1="650" y1="9" x2="650" y2="302" stroke="#b3541e"/>
  <text x="656" y="160" class="dim">7 ft 7 in</text>
</svg>
<figcaption>Fig. 2 — Open bay, front elevation: the 7 ft 7 in × 10 ft SIGPRO Premium screen floating in the enclosure, with the edges and top padded in foam and black vinyl.</figcaption>
</figure>

- **Set the screen 12 in off the back wall** — the bungee anchors hold the screen ~12 in from the wall so it floats and has room to give. Hang a 10 ft × 8 ft black golf net in that gap, behind the screen, to absorb impact energy from hard hits before it reaches the wall behind.
- **Pad the top and any exposed edges** — any foam works (pipe insulation, EVA gym tiles); wrap it in black vinyl for a cleaner look.
- **Lay EVA gym tiles** on the floor across the front — they pad the bottom rail and quiet ball drops.

<img class="dgs-photo" src="/images/blog/diy-garage-sim/deployed-screen.jpg" alt="Screen bay open with padded walls and turf" />

## 3. Large platform (10 ft × 7 ft)

The heart of the build: a framed deck that hinges at the wall and hoists vertical for storage.

### Base rail & pivot hinges

Before the platform comes the foundation it swings on: a **2×10 laid flat on the slab, 10 ft wide, about 5 in off the back wall**, locked down with **three 3/8-in × 4-in wedge anchors** (hammer drill + 3/8-in masonry bit: drill through the 2×10 into the slab, vacuum the hole, tap the anchor in, tighten the nut — at least 2 in of anchor in the concrete). It lives inside the 10-ft footprint, hidden by the side walls once they close. The entire large platform **rests and pivots on this rail through two large T-hinges** — this is the single joint the whole folding mechanism turns on, so it gets the beefiest hardware in the build.

The nuance that makes it strong *and* folds flat: the T-hinges don't grab a little rim board — they bolt to the back ends of **two 2×4s that run the platform's entire 7-ft depth**, with **three horizontal 2×4s** tying between them. Those continuous runners carry the fold load far better than a rim held on with brackets. And the plywood deck stops **1¾ in short of the runner ends**, so the runner ends overhang — that's the clearance that lets the platform sit flat against the 2×10.

<figure class="dgs-fig">
<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg">
  <text x="50" y="22" class="dir">← BACK WALL</text>
  <rect x="50" y="36" width="540" height="46" fill="#b98f57" stroke="#8a6a3f" stroke-width="2"/>
  <text x="258" y="70" class="lbl">2×10 base rail</text>
  <line x1="50" y1="86" x2="590" y2="86" stroke="#b3541e" stroke-width="1" stroke-dasharray="7,5"/>
  <text x="505" y="106" class="dim">pivot line</text>
  <rect x="190" y="86" width="14" height="210" fill="#a9762f" stroke="#6f4a1e"/>
  <rect x="430" y="86" width="14" height="210" fill="#a9762f" stroke="#6f4a1e"/>
  <g fill="#b98f57"><rect x="50" y="150" width="140" height="10"/><rect x="204" y="150" width="226" height="10"/><rect x="444" y="150" width="146" height="10"/></g>
  <rect x="50" y="122" width="540" height="174" fill="#f0e3c8" fill-opacity="0.55" stroke="none"/>
  <line x1="50" y1="122" x2="590" y2="122" stroke="#333" stroke-width="2" stroke-dasharray="9,5"/>
  <text x="240" y="140" class="lbl-sm">23/32 plywood deck starts here (held back 1¾ in)</text>
  <g fill="#9a9a9a" stroke="#555">
    <rect x="155" y="58" width="84" height="14"/><rect x="190" y="72" width="14" height="44"/>
    <rect x="395" y="58" width="84" height="14"/><rect x="430" y="72" width="14" height="44"/>
  </g>
  <circle cx="197" cy="86" r="5" fill="#e6e6e6" stroke="#333"/><circle cx="437" cy="86" r="5" fill="#e6e6e6" stroke="#333"/>
  <text x="250" y="26" class="lbl">large T-hinge → 2×10 base rail (×2)</text>
  <text x="250" y="230" class="lbl-sm">2×4 runner — full 7-ft depth, continuous</text>
  <line x1="606" y1="86" x2="606" y2="122" stroke="#b3541e" stroke-width="1"/>
  <line x1="602" y1="86" x2="610" y2="86" stroke="#b3541e"/><line x1="602" y1="122" x2="610" y2="122" stroke="#b3541e"/>
  <text x="612" y="110" class="dim">1¾ in</text>
  <text x="66" y="322" class="dim">continuous runners = continuous load path — far stronger than a bracketed rim</text>
</svg>
<figcaption>Fig. 3a — The hinge joint with the deck removed. Each large T-hinge bolts to the 2×10 base rail and to the back end of a 2×4 that runs the platform's full 7-ft depth — so the fold load travels down a continuous member, not a bracketed rim. The plywood is held back 1¾ in, leaving the runner ends overhanging for fold clearance against the 2×10. The photo below shows the joint.</figcaption>
</figure>

<figure class="dgs-fig">
<img class="dgs-photo" src="/images/blog/diy-garage-sim/base-hinge.jpg" alt="The two heavy-duty pivot hinges seated in the notched 2x10 base rail on the garage floor" />
<figcaption>The joint that matters most: the two pivot hinges seated in the notched 2×10 rail. You can see the hinge pins at floor level and the rail notched down so the platform folds flush.</figcaption>
</figure>

<figure class="dgs-fig">
<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="34" x2="600" y2="34" stroke="#b3541e" stroke-width="3" stroke-dasharray="8,5"/>
  <text x="52" y="28" class="dim">back / wall edge</text>
  <rect x="40" y="40" width="560" height="380" fill="#f0e3c8" stroke="#8a6a3f" stroke-width="2"/>
  <g fill="#b98f57">
    <rect x="48" y="146" width="60" height="9"/><rect x="206" y="146" width="68" height="9"/><rect x="366" y="146" width="68" height="9"/><rect x="526" y="146" width="66" height="9"/>
    <rect x="126" y="236" width="68" height="9"/><rect x="286" y="236" width="68" height="9"/><rect x="446" y="236" width="68" height="9"/>
    <rect x="48" y="326" width="60" height="9"/><rect x="206" y="326" width="68" height="9"/><rect x="366" y="326" width="68" height="9"/><rect x="526" y="326" width="66" height="9"/>
  </g>
  <g fill="#c8a165" stroke="#8a6a3f">
    <rect x="114" y="40" width="12" height="380"/>
    <rect x="274" y="40" width="12" height="380"/>
    <rect x="354" y="40" width="12" height="380"/>
    <rect x="514" y="40" width="12" height="380"/>
  </g>
  <rect x="194" y="40" width="12" height="380" fill="#a9762f" stroke="#6f4a1e"/>
  <rect x="434" y="40" width="12" height="380" fill="#a9762f" stroke="#6f4a1e"/>
  <rect x="40" y="40" width="560" height="380" fill="none" stroke="#8a6a3f" stroke-width="8"/>
  <g fill="#9a9a9a" stroke="#555">
    <rect x="174" y="20" width="52" height="13"/><rect x="194" y="33" width="12" height="44"/>
    <rect x="414" y="20" width="52" height="13"/><rect x="434" y="33" width="12" height="44"/>
  </g>
  <circle cx="200" cy="40" r="4" fill="#e6e6e6" stroke="#333"/><circle cx="440" cy="40" r="4" fill="#e6e6e6" stroke="#333"/>
  <text x="320" y="14" class="lbl-sm" text-anchor="middle">T-hinges bolt to the runner back ends → 2×10 (Fig. 3a)</text>
  <text x="188" y="300" class="lbl-sm" transform="rotate(-90 188 300)">2×4 T-hinge runner (full depth)</text>
  <text x="108" y="300" class="lbl-sm" transform="rotate(-90 108 300)">2×4 joist (full depth)</text>
  <text x="250" y="200" class="lbl-sm">2×4 blocking, staggered</text>
  <text x="150" y="410" class="lbl-sm">rim on edge · interior FLAT — deck ~1 in below rim</text>
  <line x1="40" y1="440" x2="600" y2="440" stroke="#b3541e" stroke-width="3" stroke-dasharray="8,5"/>
  <text x="200" y="456" class="dim">fold hinge line → hitting platform</text>
  <line x1="612" y1="40" x2="612" y2="420" stroke="#b3541e"/><line x1="608" y1="40" x2="616" y2="40" stroke="#b3541e"/><line x1="608" y1="420" x2="616" y2="420" stroke="#b3541e"/>
  <text x="626" y="235" class="dim" transform="rotate(-90 626 235)">7 ft deep</text>
  <text x="300" y="474" class="dim">10 ft wide</text>
  <g>
    <circle cx="72" cy="95" r="11" fill="#2e6b34"/><text x="68" y="99" class="step-num">1</text>
    <circle cx="330" cy="236" r="11" fill="#2e6b34"/><text x="326" y="240" class="step-num">2</text>
    <circle cx="470" cy="290" r="11" fill="#2e6b34"/><text x="466" y="294" class="step-num">3</text>
    <circle cx="386" cy="62" r="11" fill="#2e6b34"/><text x="382" y="66" class="step-num">4</text>
    <circle cx="560" cy="95" r="11" fill="#2e6b34"/><text x="556" y="99" class="step-num">5</text>
    <circle cx="150" cy="456" r="11" fill="#2e6b34"/><text x="146" y="460" class="step-num">6</text>
  </g>
</svg>
<figcaption>Fig. 3 — Large-platform framing (underside). Six evenly-spaced 2×4s run the full 7-ft depth; the two aligned with the T-hinges carry the fold load, the other four are joists. Short 2×4 blocking, staggered between them, stiffens the deck — there are no continuous interior cross members. Everything but the on-edge rim is laid flat, so the plywood and turf finish about an inch below the rim — a lip that helps keep balls on the deck.</figcaption>
</figure>

1. **Frame the deck** — build a 2×4 perimeter rim **on edge** (2½-in exterior construction screws for framing — not drywall screws, which snap; 1⅝-in screws for plywood), then run **six 2×4s the full 7-ft depth**: two lined up with the T-hinges (these carry the fold load), two more between them, and one against each side rail. Keep them and the blocking **flat** (1½ in) inside the on-edge rim so the plywood and turf finish sit roughly an inch below the rim (helps keep balls contained). Square it by matching diagonals: hook your tape corner-to-corner both ways and rack the frame until the two measurements match. *(a full day for phases 3–4)*
2. **Add staggered blocking** — short 2×4 blocks between the verticals, staggered row to row, to stiffen the deck. There are no full-length interior cross members — just blocking.
3. **Deck & surface it** — cover with 23/32 plywood + glued/stapled turf. Add thick turf, or 1/4–1/2 in gym tiles under the turf, to keep the ball from bouncing loudly. Hold the deck back **1¾ in** from the runners' back ends so they overhang for fold clearance.
4. **Bolt the T-hinges** — through-bolt a large T-hinge to the **back end of each full-depth runner** and across to the 2×10 base rail — 5/16-in bolts with washers and nylock nuts, not screws (screws work loose under repeated folding); loading into full-length 2×4s keeps the load path continuous and strong.
5. **Lift rings** — corner rings attached on the garage-door side of the platform (see Fig. 5 for placement).
6. **Hinge the front rail** to the hitting platform (next section).

<img class="dgs-photo" src="/images/blog/diy-garage-sim/platform-rigging.jpg" alt="Underside of large platform showing framing, blocking, hitting strip pocket, and cable rigging" />

## 4. Hitting platform (8 ft × 4 ft)

<figure class="dgs-fig">
<svg viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg">
  <text x="150" y="40" class="lbl">fold-hinge edge → large platform (2 hinges)</text>
  <g fill="#9a9a9a" stroke="#555"><rect x="180" y="62" width="26" height="8"/><rect x="354" y="62" width="26" height="8"/></g>
  <rect x="40" y="70" width="480" height="240" fill="#f0e3c8" stroke="#8a6a3f" stroke-width="2"/>
  <g stroke="#b98f57" stroke-width="6"><line x1="120" y1="74" x2="120" y2="306"/><line x1="200" y1="74" x2="200" y2="306"/><line x1="280" y1="74" x2="280" y2="306"/><line x1="360" y1="74" x2="360" y2="306"/><line x1="440" y1="74" x2="440" y2="306"/></g>
  <g stroke="#b98f57" stroke-width="5"><line x1="44" y1="190" x2="120" y2="190"/><line x1="200" y1="190" x2="280" y2="190"/><line x1="360" y1="190" x2="440" y2="190"/></g>
  <rect x="40" y="70" width="480" height="240" fill="none" stroke="#8a6a3f" stroke-width="8"/>
  <rect x="368" y="120" width="60" height="140" fill="#333" stroke="#000"/>
  <text x="210" y="146" class="lbl-sm">SIGPRO Softy pocket</text>
  <text x="210" y="164" class="lbl-sm">28 × 12 in, portrait</text>
  <text x="150" y="290" class="lbl-sm">2×4 rim laid FLAT (1½ in)</text>
  <line x1="24" y1="70" x2="24" y2="310" stroke="#b3541e"/><line x1="20" y1="70" x2="28" y2="70" stroke="#b3541e"/><line x1="20" y1="310" x2="28" y2="310" stroke="#b3541e"/>
  <text x="18" y="196" class="dim" transform="rotate(-90 18 196)">4 ft deep</text>
  <line x1="40" y1="330" x2="520" y2="330" stroke="#b3541e"/><line x1="40" y1="330" x2="40" y2="324" stroke="#b3541e"/><line x1="520" y1="330" x2="520" y2="324" stroke="#b3541e"/>
  <text x="255" y="344" class="dim">8 ft wide</text>
  <text x="110" y="368" class="dim">2×4 joists + blocking laid FLAT (1½ in)</text>
</svg>
<figcaption>Fig. 4 — Hitting-platform framing (underside), 8 ft wide × 4 ft deep. The SIGPRO Softy drops into a blocked 28 × 12 in pocket set on end (portrait) toward the right side, and the long back edge hinges to the large platform.</figcaption>
</figure>

1. **Frame & deck** — unlike the large platform, the rim on the hitting platform lays **flat** (1½ in tall, instead of the large platform's 3½-in on-edge rim). That keeps your club from catching the raised lip if the ball is set too far back in the mat. Then 4-ft joists at 16 in on center ("OC" — center of one joist to center of the next, so plywood edges land on wood), a blocking row, and one 23/32 plywood sheet.
2. **Frame the SIGPRO Softy pocket** — block out a 28 × 12 in opening at your stance line with a plywood sub-floor beneath, so the Softy sits flush with the surface.
3. **Surface it** with the two 5×4 mats, trimming the edges and the pocket so the Softy drops in flush.
4. **Hinge its long edge** to the large platform's front rail with **two through-bolted hinges** (into the notched middle 8 ft) so it folds turf-to-turf onto the large platform. When stowed, the whole hitting platform hangs off these two hinges three feet in the air — bolts with washers and nuts, not screws, and check them during the shakedown.
5. **Optional: counter-sink the fold hinges** so they sit flush with the turf. Otherwise, keep them out of the way of the hitting strip so you can putt toward the screen.

<figure class="dgs-fig">
<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="a4" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#999"/></marker></defs>
  <text x="350" y="26" class="lbl" text-anchor="middle">Garage-door side of the large platform (front edge)</text>
  <polygon points="50,126 110,126 110,131 590,131 590,126 650,126 650,144 50,144" fill="#c9a06b" stroke="#8a6a3f" stroke-width="1.5"/>
  <g fill="#9a9a9a" stroke="#555"><rect x="244" y="127" width="26" height="8"/><rect x="430" y="127" width="26" height="8"/></g>
  <line x1="257" y1="98" x2="257" y2="126" stroke="#999" stroke-width="0.9" marker-end="url(#a4)"/>
  <line x1="443" y1="98" x2="443" y2="126" stroke="#999" stroke-width="0.9" marker-end="url(#a4)"/>
  <text x="350" y="90" class="lbl-sm" text-anchor="middle">2 fold hinges → hitting platform</text>
  <line x1="86" y1="126" x2="86" y2="131" stroke="#b3541e"/><line x1="82" y1="126" x2="90" y2="126" stroke="#b3541e"/><line x1="82" y1="131" x2="90" y2="131" stroke="#b3541e"/>
  <line x1="86" y1="128" x2="140" y2="112" stroke="#999" stroke-width="0.8" marker-end="url(#a4)"/>
  <text x="146" y="112" class="dim">notched down 1 in</text>
  <line x1="50" y1="172" x2="650" y2="172" stroke="#b3541e"/><line x1="50" y1="166" x2="50" y2="178" stroke="#b3541e"/><line x1="650" y1="166" x2="650" y2="178" stroke="#b3541e"/>
  <text x="350" y="188" class="dim" text-anchor="middle">10 ft — full front rail (2×4 on edge)</text>
  <line x1="110" y1="202" x2="590" y2="202" stroke="#b3541e"/><line x1="110" y1="196" x2="110" y2="208" stroke="#b3541e"/><line x1="590" y1="196" x2="590" y2="208" stroke="#b3541e"/>
  <text x="350" y="218" class="dim" text-anchor="middle">middle 8 ft — notched section</text>
  <text x="350" y="242" class="lbl" text-anchor="middle">The notched middle 8 ft is where the hitting platform connects — decks meet flush for putting.</text>
</svg>
<figcaption>Fig. 4a — The garage-door (front) edge of the large platform. The 10-ft front rail is a 2×4 on edge (a thin, 3½-in-tall band across the whole 10 ft); its middle 8 ft is notched down 1 in. That notched section is where the hitting platform connects — with two fold hinges — so the two decks meet flush for putting.</figcaption>
</figure>

## 5. Hoist and rigging

The hoist mounts to the **back wall about 10 ft up, directly above the stowed unit** — not on the ceiling. A **single steel lifting cable** does the work: one end is **carabinered to an interior anchor** on the platform, the cable runs out through the **outer front-corner loop** on that side, straight across through the **opposite front-corner loop**, and back to a **second interior anchor** (also a carabiner). The two corner loops act as pulleys, so the pull equalizes across the platform. The hoist's own line **clips to the middle of that cross-span with a carabiner**. Reeling in lifts the front edge and rotates the platform up around its base T-hinges until it stands vertical against the screen wall.

<figure class="dgs-fig">
<svg viewBox="0 0 600 462" xmlns="http://www.w3.org/2000/svg">
  <rect x="80" y="86" width="440" height="300" fill="#f0e3c8" stroke="#8a6a3f" stroke-width="3"/>
  <line x1="80" y1="86" x2="520" y2="86" stroke="#b3541e" stroke-width="4" stroke-dasharray="8,5"/>
  <text x="150" y="76" class="dir">← BACK WALL · base-hinge edge</text>
  <rect x="274" y="30" width="52" height="20" fill="#c0392b" stroke="#7c241a"/>
  <text x="332" y="44" class="lbl-sm">880-lb hoist on wall (~10 ft up)</text>
  <line x1="300" y1="50" x2="300" y2="386" stroke="#777" stroke-width="2"/>
  <circle cx="80" cy="86" r="9" fill="none" stroke="#333" stroke-width="3"/>
  <circle cx="520" cy="86" r="9" fill="none" stroke="#333" stroke-width="3"/>
  <circle cx="80" cy="386" r="11" fill="none" stroke="#333" stroke-width="4"/>
  <circle cx="520" cy="386" r="11" fill="none" stroke="#333" stroke-width="4"/>
  <polyline points="185,250 80,386 520,386 415,250" fill="none" stroke="#333" stroke-width="3"/>
  <circle cx="185" cy="250" r="5" fill="none" stroke="#b3541e" stroke-width="2"/>
  <circle cx="415" cy="250" r="5" fill="none" stroke="#b3541e" stroke-width="2"/>
  <g stroke="#c0392b" stroke-width="2.5" fill="none">
    <ellipse cx="185" cy="250" rx="8" ry="12"/>
    <ellipse cx="415" cy="250" rx="8" ry="12"/>
    <ellipse cx="300" cy="386" rx="8" ry="12"/>
  </g>
  <text x="150" y="234" class="lbl-sm">interior anchors + carabiners (the two cable ends)</text>
  <text x="40" y="408" class="lbl-sm">cable threads through the outer front-corner loops (act as pulleys)</text>
  <text x="300" y="428" class="lbl-sm" text-anchor="middle">hoist clips the cable's middle with a carabiner</text>
  <text x="40" y="452" class="lbl-sm">● welded corner rings (4) · ○ interior anchors (2) · dark line = single lifting cable</text>
</svg>
<figcaption>Fig. 5 — Hoist cable connection view (looking down, back wall at top). One steel lifting cable is carabinered to an interior anchor on each side, threads out through the outer front-corner loop on the left, across through the front-corner loop on the right, and back — the corner loops act as pulleys that equalize the pull. The hoist line clips to the middle of that cross-span with a carabiner and lifts the front edge, tipping the platform up on its base T-hinges.</figcaption>
</figure>

1. **Mount the hoist** — screw a 2×10 block flat across two wall studs with four 3/8-in × 3½-in lag screws (heavy hex-head wood screws — predrill 1/4-in pilots, drive with a socket wrench), then bolt the hoist to that block ~10 ft up, centered above where the platform top lands when vertical. *(2–3 hours)*
2. **Bolt the corner ring loops** at each corner; the two **outer front-corner loops** are what the cable threads through. Cable sliding through a fixed ring under load wears both parts — inspect those loops and that stretch of cable every few stows; if you see fray or grooving, swap the rings for small rated pulley blocks.
3. **Set the two interior anchors** — a rated ring loop set into the deck a bit inboard on each side. These take the two cable ends.
4. **Run the single cable** — carabiner one end to the left interior anchor, thread it out through the left front-corner loop, across and through the right front-corner loop, then carabiner the other end to the right interior anchor. Terminate each end in a loop around a thimble (the teardrop insert that keeps cable from kinking), locked with at least two cable clamps — saddle on the load side, U-bolt over the dead tail — then adjust until the platform hangs level.
5. **Clip the hoist to the middle** — carabiner the hoist line to the center of the cable's cross-span, then raise slowly to confirm an even lift and a flat stow. One rating note: "880-lb" hoists are 880 lb only on the double line — the single line that clips here is rated 440 lb. The pivot geometry means the cable only carries roughly half the stack's weight, so there's margin — but run that math for your build before trusting it.
6. **Add a limit stop and a mechanical catch** — a limit switch (or disciplined remote use) so the hoist stops once the platform is fully vertical, plus a mechanical catch (chain or barrel bolts into the wall frame) so the stowed platform never depends on the cable alone. Wall-mounting a hoist also isn't its designed orientation — the fasteners get pulled outward, not just sideways — so through-bolt the blocking and load-test before trusting it.

<img class="dgs-photo" src="/images/blog/diy-garage-sim/platform-hoisting.jpg" alt="Platform mid-hoist, rotating up toward the wall" />

## 6. Enclosure sides (15.5-in-wide plywood skin)

Each fixed side edge is framed with a **2×10 that stands on the floor-anchored base 2×10 and runs up 8 ft**, connected to the shelving in my case. Those without preinstalled shelving will need a top plate (another 2×10) to frame out the enclosure — and screw that top frame back into the wall studs so an 8-ft wall of swinging doors can't pull the enclosure over. Outside the 2×10 framing, a **15.5-in-wide strip of the same 23/32 plywood** (a width, not a thickness — rip it from a full sheet) is used so it reads as one clean enclosure. A **slotted steel angle** ([Hillman 1½ × 1½](https://www.lowes.com/pd/Hillman-1-1-2-in-W-x-1-1-2-in-H-x-3-ft-L-Zinc-Plated-Steel-Perforated-Slotted-Angle/3059259)) on the 2×10's garage-door edge is the screen's ball-bungee attachment; the door hinge mounts on the outside of the side and connects to the door's interior. Acoustic foam on the inside face kills ball noise.

<figure class="dgs-fig">
<svg viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="s6" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#999"/></marker></defs>
  <rect x="182" y="24" width="14" height="384" fill="#e2c48f" stroke="#8a6a3f"/>
  <rect x="196" y="56" width="44" height="352" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="240" y="56" width="7" height="352" fill="#333"/>
  <rect x="184" y="406" width="58" height="16" fill="#9a9a9a" stroke="#666"/>
  <rect x="226" y="372" width="12" height="46" fill="#9a9a9a" stroke="#555"/>
  <rect x="226" y="406" width="44" height="12" fill="#9a9a9a" stroke="#555"/>
  <g fill="#ccc"><circle cx="232" cy="384" r="1.8"/><circle cx="232" cy="400" r="1.8"/></g>
  <line x1="318" y1="404" x2="272" y2="410" stroke="#111" stroke-width="2"/>
  <circle cx="300" cy="406" r="4" fill="#111"/>
  <rect x="318" y="398" width="356" height="12" fill="#eceff1" stroke="#999"/>
  <rect x="184" y="424" width="490" height="16" fill="#e2c48f" stroke="#8a6a3f"/>
  <line x1="150" y1="140" x2="182" y2="140" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="24" y="136" class="lbl-sm">plywood skin</text>
  <text x="24" y="152" class="lbl-sm">(outside)</text>
  <line x1="300" y1="110" x2="240" y2="120" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="306" y="108" class="lbl-sm">2×10 side frame (up from the floor 2×10)</text>
  <line x1="300" y1="182" x2="247" y2="182" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="306" y="186" class="lbl-sm">acoustic foam (inside face)</text>
  <line x1="122" y1="414" x2="184" y2="414" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="34" y="418" class="lbl-sm">door hinge</text>
  <line x1="300" y1="360" x2="266" y2="390" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="306" y="352" class="lbl-sm">slotted angle iron on the front edge —</text>
  <text x="306" y="370" class="lbl-sm">the screen's ball bungees clip here</text>
  <line x1="366" y1="434" x2="304" y2="410" stroke="#999" stroke-width="0.9" marker-end="url(#s6)"/>
  <text x="372" y="438" class="lbl-sm">ball bungee</text>
  <text x="560" y="388" class="lbl-sm">impact screen</text>
  <text x="470" y="466" class="lbl-sm">bifold door</text>
</svg>
<figcaption>Fig. 6 — Enclosure side, plan view of the front-left corner. The side is a 2×10 with the plywood skin on the outside and acoustic foam on the inside. The bifold door hinges off the side at the corner; a slotted steel angle iron on the 2×10's front edge anchors the impact screen's ball bungees, and the screen runs across the front just inboard of the door.</figcaption>
</figure>

<figure class="dgs-fig">
<img class="dgs-photo" src="/images/blog/diy-garage-sim/enclosure-side.jpg" alt="Barrel hinge joining the 15.5-in plywood enclosure side to the frame" />
<figcaption>The side edge in the flesh — a 2×10 framed edge skinned in plywood, with the slotted steel angle carrying the screen's ball bungees.</figcaption>
</figure>

1. **Frame the edge with a 2×10** — stand a 2×10 on the floor base 2×10 and run it up the full 8 ft; this is the structural edge of the enclosure.
2. **Skin it with plywood** — cover the 2×10 with 15.5-in plywood so it reads as one continuous panel.
3. **Mount the slotted angle** — fasten a slotted steel angle to the 2×10's garage-door-facing edge; this is the screen's ball-bungee attachment point.
4. **Hang the door off the outside** — mount the hinge on the outside face of the side, connecting to the interior of the door.
5. **Pad the inside** — glue black acoustic foam to the interior face.

### Hanging the screen

Now that the sides are framed, the screen has something to clip to. The slotted steel angle on each side takes the **left and right edges** — 4–5 ball bungees per side (not one per grommet). For the **top and bottom**, drive 4–5 [Everbilt 3/16 in × 2 in zinc screw eyes](https://www.homedepot.com/p/Everbilt-3-16-in-x-2-in-Zinc-Screw-Eye-3-Piece-824271/314745880) straight into the top shelving (the top of the enclosure) and the bottom plate, and clip the screen to those. Tension until the wrinkles pull out but the screen still gives on impact.

<figure class="dgs-fig">
<img class="dgs-photo" src="/images/blog/diy-garage-sim/screen-bungee.jpg" alt="Ball bungee clipping the screen grommet to the slotted steel angle on the side" />
<figcaption>How the screen clips on: a ball bungee through the screen grommet, hooked into the slotted steel angle on the 2×10 side edge.</figcaption>
</figure>

<figure class="dgs-fig">
<img class="dgs-photo" src="/images/blog/diy-garage-sim/screen-top-eyes.jpg" alt="Screen top edge: ball bungees through the grommets up to screw eyes in the top shelving" />
<figcaption>The top edge: screw eyes driven into the top shelving give the bungees an anchor, so the screen hangs taut across the full 10 ft.</figcaption>
</figure>

## 7. Bifold doors / side walls

Each side is a bifold pair: a **3-ft-wide outer door on the outside (hinged to the wall) plus a 2-ft-wide inner section that meets at the center latch** — 5 ft per side, 10 ft of doors across the front. Closed, they hide everything; open, they're the padded side walls of the bay.

<figure class="dgs-fig">
<svg viewBox="0 0 760 345" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Closed front elevation with numbered build steps">
  <line x1="20" y1="310" x2="740" y2="310" stroke="#333" stroke-width="3"/>
  <rect x="128" y="1" width="12" height="309" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="620" y="1" width="12" height="309" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="140" y="1" width="144" height="309" fill="#e2c48f" stroke="#8a6a3f" stroke-width="2"/>
  <rect x="284" y="1" width="96" height="309" fill="#d9b57e" stroke="#8a6a3f" stroke-width="2"/>
  <rect x="380" y="1" width="96" height="309" fill="#d9b57e" stroke="#8a6a3f" stroke-width="2"/>
  <rect x="476" y="1" width="144" height="309" fill="#e2c48f" stroke="#8a6a3f" stroke-width="2"/>
  <g fill="#aaa" stroke="#777">
    <rect x="264" y="18" width="40" height="9"/><rect x="264" y="282" width="40" height="9"/>
    <rect x="456" y="18" width="40" height="9"/><rect x="456" y="282" width="40" height="9"/>
  </g>
  <rect x="370" y="130" width="20" height="8" fill="#333"/>
  <rect x="356" y="150" width="8" height="22" fill="#333"/><rect x="396" y="150" width="8" height="22" fill="#333"/>
  <rect x="362" y="290" width="36" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <line x1="380" y1="290" x2="380" y2="310" stroke="#333" stroke-width="1"/>
  <line x1="398" y1="308" x2="470" y2="336" stroke="#999" stroke-width="0.8"/>
  <text x="476" y="341" class="lbl-sm">caster cutout where the doors meet</text>
  <line x1="140" y1="324" x2="380" y2="324" stroke="#b3541e"/>
  <line x1="140" y1="324" x2="140" y2="317" stroke="#b3541e"/><line x1="380" y1="324" x2="380" y2="317" stroke="#b3541e"/>
  <text x="146" y="341" class="dim">3 ft outer + 2 ft inner = 5 ft/side</text>
  <line x1="650" y1="1" x2="650" y2="310" stroke="#b3541e"/>
  <line x1="650" y1="1" x2="643" y2="1" stroke="#b3541e"/><line x1="650" y1="310" x2="643" y2="310" stroke="#b3541e"/>
  <text x="656" y="160" class="dim">8 ft</text>
  <text x="160" y="40" class="lbl-sm">3 ft outer door</text>
  <text x="305" y="40" class="lbl-sm">2 ft inner</text>
  <text x="392" y="40" class="lbl-sm">2 ft inner</text>
  <text x="500" y="40" class="lbl-sm">3 ft outer door</text>
  <g>
    <circle cx="300" cy="80" r="11" fill="#2e6b34"/><text x="296" y="84" class="step-num">1</text>
    <circle cx="236" cy="160" r="11" fill="#2e6b34"/><text x="232" y="164" class="step-num">2</text>
    <circle cx="134" cy="160" r="11" fill="#2e6b34"/><text x="130" y="164" class="step-num">3</text>
    <circle cx="330" cy="290" r="11" fill="#2e6b34"/><text x="326" y="294" class="step-num">4</text>
    <circle cx="450" cy="200" r="11" fill="#2e6b34"/><text x="446" y="204" class="step-num">5</text>
    <circle cx="380" cy="140" r="11" fill="#2e6b34"/><text x="376" y="144" class="step-num">6</text>
  </g>
</svg>
<figcaption>Fig. 7 — Closed front. The wide 3-ft outer doors sit on the outside and hinge off the wall frame; the 2-ft inner sections meet at the center slide-bolt latch, where a cutout at the floor lets the casters tuck in.</figcaption>
</figure>

1. **Build four panels** — 2×4 perimeter frames with horizontal mid-rails, skinned one side with 23/32 plywood, corner braces and mending plates at the joints. Two 3-ft outer doors, two 2-ft inner sections, all 8 ft tall. *(a full day)*
2. **Join each pair** — heavy strap hinges top and bottom connect each outer door to its inner section so the pair bifolds.
3. **Hang each pair** by its wide 3-ft outer door on the wall frame's doubled end studs — two 2×4s screwed face-to-face at each end so the hinge screws bite solid wood (three 4-in butt hinges per side; swap at least one screw per hinge leaf for a 2½-in screw that reaches the stud); the 2-ft inner section swings in to meet the center latch.
4. **Add locking casters (wheels)** at the bottom of each inner door's meeting stile (the vertical edge where the doors come together), recessed into a cutout. Pick the caster height so the wheel just touches the floor with the door hanging level — it should share the weight with the hinges, not lift the door off them.
5. **Pad the interior faces** with acoustic wedge foam (spray adhesive). When open, these faces are the sound- and ball-deadening side walls.
6. **Latch hardware** — slide bolt and two pull handles where the outer doors meet.

## 8. Projector, netting, and electronics

1. **Projector** — ceiling pipe mount lagged into a joist through a plywood plate at **9 ft 5 in from the screen** (10 ft 5 in from the back wall, since the screen sits 12 in off the wall), safety chain added. The TK710STi's short throw fills the 10-ft-wide 4:3 image from this distance.
2. **Ceiling baffle net** — hang golf netting from the ceiling between the top of the screen wall and past the projector. It catches skyed wedges before they find the opener (13 ft out) or the projector.
3. **Launch monitor** — 8 ft behind the center of the hitting mat, 17 ft from the screen (18 ft from the back wall). Tape its floor position so setup is repeatable.
4. **Power** — route projector, hoist, and launch monitor/Android TV power along the ceiling; velcro-wrap the slack.

## 9. Stowing, and the shakedown

<figure class="dgs-fig">
<svg viewBox="0 0 480 335" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Folded stack cross-section">
  <line x1="20" y1="300" x2="410" y2="300" stroke="#333" stroke-width="3"/>
  <line x1="60" y1="300" x2="60" y2="20" stroke="#333" stroke-width="3"/>
  <rect x="64" y="24" width="30" height="16" fill="#c0392b" stroke="#7c241a"/>
  <text x="100" y="36" class="lbl-sm">hoist (~10 ft high, above the stack)</text>
  <text x="118" y="293" class="dir">← BACK WALL</text>
  <text x="468" y="293" class="dir" text-anchor="end">GARAGE DOOR →</text>
  <rect x="62" y="44" width="14" height="251" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="78" y="76" width="10" height="128" fill="#e2c48f" stroke="#8a6a3f"/>
  <circle cx="83" cy="76" r="3" fill="#b3541e"/>
  <line x1="83" y1="204" x2="83" y2="295" stroke="#b3541e"/><line x1="79" y1="204" x2="87" y2="204" stroke="#b3541e"/><line x1="79" y1="295" x2="87" y2="295" stroke="#b3541e"/>
  <text x="22" y="258" class="dim">~3 ft</text>
  <rect x="90" y="76" width="12" height="219" fill="#d9b57e" stroke="#8a6a3f"/>
  <rect x="104" y="44" width="8" height="256" fill="#c9a06b" stroke="#8a6a3f"/>
  <rect x="62" y="295" width="42" height="5" fill="#b98f57" stroke="#8a6a3f"/>
  <line x1="62" y1="315" x2="112" y2="315" stroke="#b3541e"/>
  <line x1="62" y1="315" x2="62" y2="308" stroke="#b3541e"/><line x1="112" y1="315" x2="112" y2="308" stroke="#b3541e"/>
  <text x="120" y="319" class="dim">17 in</text>
  <text x="40" y="170" class="lbl" transform="rotate(-90 40 170)">8 ft tall</text>
  <text x="130" y="100" class="lbl-sm">layers, wall out:</text>
  <text x="130" y="117" class="lbl-sm">1. screen frame + screen (fixed)</text>
  <text x="130" y="134" class="lbl-sm">2. hitting platform — hangs ~3 ft off floor</text>
  <text x="130" y="151" class="lbl-sm">3. large platform, hoisted vertical</text>
  <text x="130" y="168" class="lbl-sm">4. bifold doors, closed &amp; latched</text>
  <text x="130" y="185" class="lbl-sm">5. base 2×10 — 1–3 sit on it, doors outside</text>
</svg>
<figcaption>Fig. 8 — The stowed stack: 17 in of garage depth, hoist parked above. The screen frame, hitting platform, and large platform all sit flush on top of the floor-anchored 2×10 base rail, while the bifold doors close just outside it. The 4-ft hitting platform hangs from the top of the vertical large platform, ~3 ft off the floor.</figcaption>
</figure>

**To stow:** fold the hitting platform turf-to-turf onto the large platform → hoist the stack vertical → pin the safety catch → swing the doors closed → throw the latch.

**Shakedown:** run the full stow/deploy cycle ten times watching for cable fray, door sag (shim hinges), and corner alignment. Then hit wedges, mid-irons, and driver at the screen center and corners — anything that sounds "hard" gets more padding.

## 10. Parts list & cost

<div class="dgs-note">Prices checked July 2026. Lumber and hardware vary by region and week — treat "~" as close estimates and verify at checkout. Where a link is a store search, grab the in-stock equivalent (Lowe's, Menards, and Home Depot are near-identical on these staples; Menards' 11% rebate often wins the lumber run).</div>

### Lumber & sheet goods

| Item | Use | Qty | Unit | Cost | Link |
| --- | --- | ---: | ---: | ---: | --- |
| 2×4 × 8 ft stud | Joists, frames, studs, side posts | 15–20 | $3.65 | ~$55–73 | [Home Depot](https://www.homedepot.com/p/2-in-x-4-in-x-96-in-2-Premium-Grade-KD-HT-Stud-058449/312528776) |
| 2×4 × 10 ft | Platform rims, wall plates | 2 | ~$5.98 | $11.96 | [Home Depot](https://www.homedepot.com/s/2x4x10) |
| 23/32 in 4×8 CDX plywood | Decks, door skins, sides, sheathing | 5 | $41.99 | $209.95 | [Home Depot](https://www.homedepot.com/p/23-32-in-x-4-ft-x-8-ft-RTD-Southern-Yellow-Pine-Wood-Sheathing-Plywood-129323/303564747) |
| 2×10 × 10 ft | Base rail + two side edge frames | 3 | ~$18.98 | $56.94 | [Home Depot](https://www.homedepot.com/s/2x10x10) |
| **Lumber subtotal** | | | | **~$345** | |

### Hardware & rigging — ballpark ~$800

Rather than itemize every fastener, budget roughly **$800** for the hardware bucket. The components: the platform's two large T-hinges plus the door and strap hinges; locking casters; a slide-bolt latch and pull handles; corner braces and mending plates; slotted steel angle and ball bungees to hang the screen; [screw eyes](https://www.homedepot.com/p/Everbilt-3-16-in-x-2-in-Zinc-Screw-Eye-3-Piece-824271/314745880) that anchor the screen top and bottom; foam pipe insulation and black vinyl for the screen border; the lift rigging (rated steel cable, thimbles, clamps, carabiners, welded corner rings, interior anchors, and a pulley); concrete anchors for the base rail; fasteners/plywood screws; construction adhesive and staples; industrial velcro; a projector mount; a safety chain; and golf barrier netting.

### Golf-specific components

| Item | Use | Qty | Unit | Cost | Link |
| --- | --- | ---: | ---: | ---: | --- |
| SIGPRO Premium Impact Screen, 4:3, 7 ft 7 in × 10 ft | Impact screen | 1 | $679.99 | $679.99 | [Shop Indoor Golf](https://shopindoorgolf.com/products/golf-simulator-screen-premium?variant=41026186051673) |
| SIGPRO Softy Hitting Strip (28 × 12 in) | Inset hitting surface | 1 | $249.99 | $249.99 | [Indoor Golf Outlet](https://indoorgolfoutlet.com/products/sigpro-softy-hitting-strip) |
| SUWUYUE 3 × 10 ft turf roll | Large platform surface | 2 | ~$45.99 | $91.98 | [Amazon](https://www.amazon.com/dp/B0G6CGD94T) |
| Shopsource 5 × 4 ft hitting mat | Hitting platform surface | 2 | ~$75.99 | $151.98 | [Amazon](https://www.amazon.com/dp/B0F36TNXN6) |
| VEVOR 880-lb electric hoist w/ remote | Platform lift | 1 | ~$119.99 | $119.99 | [Amazon](https://www.amazon.com/dp/B0C49C2M1J) · [HD](https://www.homedepot.com/p/VEVOR-Electric-Winch-880-lbs-Steel-Electric-Lift-110-Volt-with-Wireless-Remote-Control-for-Factory-Warehouse-DDHLWXYK880B00001V1/321594055) |
| BalanceFrom 1/2 in EVA tiles, 24 sq ft | Floor padding under unit | 2 | ~$21.99 | $43.98 | [Amazon](https://www.amazon.com/dp/B013A4ATCQ) |
| Acoustic wedge foam, 1×12×12 in, 52-pack | Door interior padding | 2 | ~$49.99 | $99.98 | [Amazon](https://www.amazon.com/dp/B08QQRWDWS) |
| **Golf components subtotal** | | | | **$1,437.89** | |

### Electronics (optional — reuse what you have)

| Item | Qty | Cost | Link |
| --- | ---: | ---: | --- |
| BenQ TK710STi 4K short-throw projector | 1 | $1,899.00 | [Amazon](https://www.amazon.com/BenQ-TK710STi-Projector-Response-Chromecast/dp/B0D486MJN9) |
| Launch monitor (yours — placement: 17 ft from screen, 18 ft from back wall) | — | — | — |
| **Electronics subtotal** | | **$1,899.00** | |

### Total cost

| Category | Subtotal |
| --- | ---: |
| Lumber & sheet goods | ~$345 |
| Hardware & rigging | ~$800 |
| Golf-specific components | $1,437.89 |
| **Core build (no electronics)** | **~$2,550** |
| Electronics (projector) | $1,899.00 |
| **Everything, as photographed (less launch monitor)** | **~$4,450** |

## 11. Notes & remaining assumptions

A few details in the drawings are still my best reconstruction from photos — sanity-check against your space before cutting: joist spacing (16 in OC with three blocking rows), hinge counts (2 base T-hinges / 2 fold / 3 per door side / 4 strap), the hitting-strip pocket location on the stance line, and the plywood count (5 sheets in my build — buy an extra if your cuts don't nest tightly). Turf coverage assumes two 3×10 rolls on the large platform plus two 5×4 mats on the hitting platform.
