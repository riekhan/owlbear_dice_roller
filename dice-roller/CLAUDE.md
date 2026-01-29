# Dice Roller - Owlbear Rodeo Extension

## Overview
A dice roller extension for Owlbear Rodeo with dynamic SVG generation, dice pool building, and drag-to-place spawning.

## Deployment

- **Production URL**: https://owlbear-dice-roller.fly.dev
- **Manifest**: https://owlbear-dice-roller.fly.dev/manifest.json
- **Deploy command**: `fly deploy`

## Current Features

### Dice Types
- **7 Dice Types**: d4, d6, d8, d10, d12, d20, d100
- **d100 behavior**: Rolls 1-100 (not increments of 10)

### Dice Pool System
- **Left-click** a die button to increment that die's count in the pool
- **Right-click** a die button to decrement (minimum 0)
- **Badge display**: Small red badge in top-left corner shows count when > 0
- **Roll button**: When pool has dice, "Roll Selected" spawns and rolls all pool dice, then resets pool
- **Fallback**: When pool is empty, "Roll Selected" rolls selected dice on the scene (original behavior)

### Spawn Behaviors
1. **Pool Spawn** (via Roll Selected button):
   - Builds dice from pool counts
   - Spawns in a 4-column grid pattern centered on viewport
   - All dice are rolled automatically
   - Pool resets to zero after spawning

2. **Drag Spawn** (Unrolled):
   - Drag die button to place on scene
   - Spawns showing max value (unrolled)
   - Must manually roll later using context menu or Roll Selected button

### Spawn Grid Pattern
Dice spawn in a 4-column grid, centered horizontally:
```
[1] [2] [3] [4]
[5] [6] [7] [8]
[9] ...
```
- `SPAWN_OFFSET = 120` pixels between dice
- `GRID_COLUMNS = 4` columns per row
- Grid is horizontally centered on viewport

### Rolling Mechanisms
- **Context Menu**: Right-click dice → "Roll Dice"
- **Roll Selected Button**:
  - If pool has dice: spawns pool dice
  - If pool empty: rolls selected dice on scene

### Remove All Dice
- **Remove All Button**: Deletes all dice items from the scene
- Shows notification with count of removed dice

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
│   └── icon.svg               # Extension icon
├── src/
│   ├── main.js                # Main extension logic
│   └── style.css              # UI styles
├── index.html                 # Extension UI (7 die buttons + badges + buttons)
├── vite.config.js             # Vite config with dynamic SVG middleware
├── Dockerfile                 # Production container
├── fly.toml                   # Fly.io deployment config
└── package.json               # Dependencies
```

### Dynamic SVG Generation (vite.config.js)
- **Custom Vite middleware plugin** (`dynamicDicePlugin`)
- Serves SVGs via `/dice/{diceType}?value={value}&color={color}` endpoints
- **Wireframes**: Complex path data embedded in config
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
- **Fly.io**: Production hosting

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

#### Dice Pool State
```javascript
const dicePool = {
  d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0,
};
```

#### Spawn Grid Offset Calculation
```javascript
const SPAWN_OFFSET = 120;
const GRID_COLUMNS = 4;

function calculateSpawnOffset(spawnIndex) {
  const column = spawnIndex % GRID_COLUMNS;
  const row = Math.floor(spawnIndex / GRID_COLUMNS);
  const gridWidth = (GRID_COLUMNS - 1) * SPAWN_OFFSET;
  const xOffset = column * SPAWN_OFFSET - gridWidth / 2;
  const yOffset = row * SPAWN_OFFSET;
  return { x: xOffset, y: yOffset };
}
```

#### Click/Drag Detection
- Uses `DRAG_THRESHOLD = 5` pixels to distinguish click from drag
- `pointerdown` → `pointermove` → `pointerup` event flow
- If movement < threshold: treat as click (update pool)
- If movement >= threshold: treat as drag (place die)

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
- `OBR.scene.items.getItems()` - Fetch items
- `OBR.scene.items.deleteItems()` - Remove dice from scene
- `OBR.player.getSelection()` - Get selected items for Roll Selected button
- `OBR.player.getColor()` - Get player's color for die borders
- `OBR.contextMenu.create()` - Context menu for rolling
- `OBR.notification.show()` - User feedback
- `buildImage()` - Create image items

### Helper Functions
- `getDiceImageUrl(diceType, value, color)` - Builds relative URL for Vite endpoint
- `getAbsoluteDiceImageUrl(diceType, value, color)` - Converts to absolute URL (required for OBR)
- `rollDice(diceType)` - Generates random roll value based on die type
- `updateDiceCountDisplay(diceType)` - Updates badge visibility and text
- `hasPoolDice()` - Returns true if any dice in pool
- `getTotalPoolCount()` - Returns sum of all pool counts
- `resetDicePool()` - Sets all pool counts to zero
- `calculateSpawnOffset(spawnIndex)` - Returns {x, y} offset for grid position

## Development Setup

### Install & Run
```bash
cd dice-roller
npm install
npm run dev
```

### Add to Owlbear Rodeo (Dev)
1. Go to https://www.owlbear.rodeo
2. Extensions → Add Extension
3. Paste: `http://localhost:5173/manifest.json`

### Deployment
```bash
fly deploy
```

### Dependencies
- `vite@5` - Build tool
- `@owlbear-rodeo/sdk` - OBR extension API

## Design Decisions & History

### Evolution of Dice Rendering
1. **Initial**: Static SVG files for each die value
2. **Dynamic Generation**: Vite plugin generates SVGs on-the-fly with query params
3. **Wireframe Redesign**: Replaced simple shapes with complex 3D wireframes
4. **Consolidated**: Removed all static SVG files, use only Vite plugin

### Why Dynamic SVG Generation?
- **Player colors**: Each player's dice use their OBR player color
- **No static files**: Reduces file count from ~100+ to just wireframe data in config
- **Flexibility**: Easy to adjust styling without regenerating files

### Dice Pool Design
- **Build then roll**: Users wanted to build sets like "3d6 + 1d20" before rolling
- **Left/right click**: Intuitive increment/decrement without extra UI
- **Badges**: Visual feedback showing pool state at a glance

### Grid vs Ring Pattern
- Originally used concentric rings (60° apart)
- Changed to 4-column grid for better readability with many dice
- Grid is easier to scan and count

## Current Status

### Working Features
- All 7 dice types functional
- Dice pool with increment/decrement
- Badge display for pool counts
- Grid spawn pattern (4 columns)
- Drag-spawn for precise placement
- Context menu rolling
- Roll Selected button (pool or selected dice)
- Remove All button
- Player-colored dice borders
- Dynamic SVG generation

### Known Limitations
- No animations (instant value changes)
- No sound effects
- No roll history or totals
- No dice presets/saving

## Future Enhancements

### Potential Improvements
1. **Animations**: Dice rotation/spin when rolling
2. **Sound effects**: Dice rolling sounds
3. **Roll history**: Show recent rolls in panel
4. **Dice totals**: Show sum of selected/rolled dice
5. **Custom colors**: Let users override die colors
6. **Dice presets**: Save common combinations (e.g., "2d6+1d4")
7. **Roll modifiers**: Add +/- values to rolls

## Development Tips
- Vite auto-reloads, but OBR iframe may need manual refresh
- Use browser DevTools console for debugging (check iframe context)
- Absolute URLs required for images in OBR's HTTPS context
- Test with multiple players to see different colored dice
- Check "Disable cache" in DevTools Network tab when testing image changes
- buildImage `width`/`height` should match SVG dimensions; `dpi` controls display size

## Summary
Fully functional dice roller with dice pool building. Left-click to add dice to pool, right-click to remove, then roll them all at once in a grid pattern. Drag for precise unrolled placement. Dynamic SVG generation provides player-colored dice with detailed wireframe designs. Deployed on Fly.io.
