# Dice Roller - Owlbear Rodeo Extension

## Overview
A dice roller extension for Owlbear Rodeo with dynamic SVG generation, click/drag spawning, and automatic rolling features.

## Current Features

### Dice Types
- **7 Dice Types**: d4, d6, d8, d10, d12, d20, d100
- **d100 behavior**: Rolls 1-100 (not increments of 10)

### Spawn Behaviors
1. **Click Spawn** (Quick Roll):
   - Click a die button to spawn a rolled die at viewport center
   - Automatic roll on spawn
   - Multiple quick clicks create concentric ring pattern:
     - Die 1: Center
     - Dice 2-7: First ring (6 dice, 120px radius)
     - Dice 8-13: Second ring (6 dice, 240px radius)
     - Continues expanding with 6 dice per ring
   - Pattern resets after 3 seconds or if viewport moves >50px

2. **Drag Spawn** (Unrolled):
   - Drag die button to place on scene
   - Spawns showing max value (unrolled)
   - Must manually roll later using context menu or Roll Selected button

### Rolling Mechanisms
- **Context Menu**: Right-click dice → "Roll Dice"
- **Roll Selected Button**: Click button in tray to roll all selected dice
- **Note**: Keyboard shortcut 'R' is configured but may not work (OBR limitation)

### Visual Design
- **Black background** with colored rounded square border
- **Detailed wireframe** dice designs (3D geometric shapes)
- **Large white numbers** showing current value
- **Player-colored borders** - each player's dice use their OBR player color

## Technical Implementation

### File Structure
```
dice-roller/
├── public/
│   ├── manifest.json          # Extension manifest
│   └── icon.svg                # Extension icon
├── src/
│   ├── main.js                 # Main extension logic
│   └── style.css               # UI styles (80x520px vertical tray)
├── index.html                  # Extension UI (7 die buttons + Roll Selected button)
├── vite.config.js              # Vite config with dynamic SVG middleware
└── package.json                # Dependencies
```

### Dynamic SVG Generation (vite.config.js)
- **Custom Vite middleware plugin** (`dynamicDicePlugin`)
- Serves SVGs via `/dice/{diceType}?value={value}&color={color}` endpoints
- **Wireframes**: Complex path data embedded in config (from newsvgs folder, now deleted)
- **Scaling**: Wireframes scaled 1.1x (10% larger) for prominence
- **SVG Structure**:
  - Black rounded rectangle background (3268x3268, rx=1200, ry=1200)
  - Colored border (stroke-width=200, uses player color)
  - Wireframe paths (stroke=#888888 for most, #bbbbbb for d4/d20)
  - White text showing value (font-size=2000, centered at y=1954)
- **ViewBox**: 2481x3508 (preserves original wireframe coordinate system)

### Key Technologies
- **Vite 5**: Build tool and dev server with custom middleware
- **@owlbear-rodeo/sdk**: OBR API integration
- **Pointer Events**: Drag/click detection
- **OBR Interaction API**: Real-time item dragging
- **Context Menu API**: Right-click menu for rolling

### Core Logic

#### Dice Configuration (main.js)
```javascript
const DICE_CONFIG = {
  d4: { sides: 4, maxValue: 4 },
  d6: { sides: 6, maxValue: 6 },
  d8: { sides: 8, maxValue: 8 },
  d10: { sides: 10, maxValue: 10 },
  d12: { sides: 12, maxValue: 12 },
  d20: { sides: 20, maxValue: 20 },
  d100: { sides: 100, maxValue: 100 },
};
```

#### Spawn Flow
1. **pointerdown**: Start tracking, create temp die with max value
2. **pointermove**: If drag detected, update position using `OBR.viewport.inverseTransformPoint()`
3. **pointerup**:
   - **If dragged**: Spawn die at drag position with max value (unrolled)
   - **If not dragged**: Roll die, spawn at viewport center with offset pattern

#### Click-Spawn Offset Logic
```javascript
// Track spawn state
let clickSpawnCount = 0;
let lastSpawnTime = 0;
let lastViewportCenter = null;
const SPAWN_COOLDOWN = 3000; // Reset after 3 seconds
const SPAWN_OFFSET = 120; // Base radius

// Reset conditions
if (timeSinceLastSpawn > SPAWN_COOLDOWN || viewportMoved) {
  clickSpawnCount = 0;
}

// Calculate concentric ring position
const ringIndex = Math.floor((clickSpawnCount - 1) / 6); // Which ring
const positionInRing = (clickSpawnCount - 1) % 6; // Position in ring
const radius = (ringIndex + 1) * SPAWN_OFFSET;
const angle = positionInRing * (Math.PI / 3); // 60 degrees apart
```

#### Metadata Schema
```javascript
{
  'dice-roller/type': 'd6',           // Die type
  'dice-roller/value': 4,              // Current rolled value
  'dice-roller/color': '#ff6b6b',     // Player color
}
```

### OBR APIs Used
- `OBR.onReady()` - Extension initialization
- `OBR.interaction.startItemInteraction()` - Real-time dragging
- `OBR.viewport.inverseTransformPoint()` - Screen to scene coordinates
- `OBR.viewport.getWidth()` / `getHeight()` - Viewport dimensions for centering
- `OBR.scene.items.addItems()` - Add dice to scene
- `OBR.scene.items.updateItems()` - Update dice values when rolling
- `OBR.scene.items.getItems()` - Fetch selected items
- `OBR.player.getSelection()` - Get selected items for Roll Selected button
- `OBR.player.getColor()` - Get player's color for die borders
- `OBR.contextMenu.create()` - Context menu with shortcut
- `OBR.notification.show()` - User feedback
- `buildImage()` - Create image items

### Helper Functions
- `getDiceImageUrl(diceType, value, color)` - Builds relative URL for Vite endpoint
- `getAbsoluteDiceImageUrl(diceType, value, color)` - Converts to absolute URL (required for OBR)
- `rollDice(diceType)` - Generates random roll value based on die type

## Development Setup

### Install & Run
```bash
cd dice-roller
npm install
npm run dev
```

### Add to Owlbear Rodeo
1. Go to https://www.owlbear.rodeo
2. Extensions → Add Extension
3. Paste: `http://localhost:5173/manifest.json`

### Dependencies
- `vite@5` - Build tool
- `@owlbear-rodeo/sdk` - OBR extension API

## Design Decisions & History

### Evolution of Dice Rendering
1. **Initial**: Static SVG files for each die value (d6-1.svg through d6-6.svg)
2. **Dynamic Generation**: Vite plugin generates SVGs on-the-fly with query params
3. **Wireframe Redesign**: Replaced simple shapes with complex 3D wireframes from newsvgs folder
4. **Consolidated**: Removed all static SVG files, use only Vite plugin

### Why Dynamic SVG Generation?
- **Player colors**: Each player's dice use their OBR player color
- **No static files**: Reduces file count from ~100+ to just wireframe data in config
- **Flexibility**: Easy to adjust styling (border, text, colors) without regenerating files

### Click vs Drag Spawn Design
- **Click spawn = convenience**: Quick way to roll and spawn at center
- **Drag spawn = precision**: Place unrolled dice exactly where needed
- **Concentric rings**: Prevents stacking when rapidly clicking

## Current Status

### Working Features ✓
- All 7 dice types functional
- Click-spawn with automatic roll and offset pattern
- Drag-spawn with manual roll required
- Context menu rolling
- Roll Selected button
- Player-colored dice borders
- Dynamic SVG generation

### Known Limitations
- Keyboard shortcut 'R' may not work (OBR API limitation)
- No animations (instant value changes)
- No sound effects
- No roll history or totals

## Future Enhancements

### Potential Improvements
1. **Animations**: Dice rotation/spin when rolling
2. **Sound effects**: Dice rolling sounds
3. **Roll history**: Show recent rolls in panel
4. **Dice pools**: Show total of selected dice
5. **Custom colors**: Let users override die colors
6. **Dice presets**: Save common combinations (e.g., "2d6+1d4")
7. **Roll modifiers**: Add +/- values to rolls

## Development Tips
- Vite auto-reloads, but OBR iframe may need manual refresh
- Use browser DevTools console for debugging (check iframe context)
- Absolute URLs required for images in OBR's HTTPS context
- Test with multiple players to see different colored dice

## Code Cleanup Done
- Removed unused `counter.js` file (Vite template leftover)
- Removed unused `addDieToScene()` function from main.js
- Removed all static SVG files (d4-4.svg through d100-90.svg)
- Removed `newsvgs` folder (wireframes now in vite.config.js)
- No unused dependencies in package.json

## Summary
Fully functional dice roller with sophisticated spawn behaviors. Click for quick rolls at center (with smart offsetting), drag for precise placement. Dynamic SVG generation provides player-colored dice with detailed wireframe designs. Ready for use in Owlbear Rodeo games.
