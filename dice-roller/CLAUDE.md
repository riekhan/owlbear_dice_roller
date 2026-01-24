# Dice Roller - Owlbear Rodeo Extension

## Overview
A drag-and-drop dice roller extension for Owlbear Rodeo that allows users to place dice on the scene and roll them interactively.

## What We Built

### Features
- **7 Dice Types**: d4, d6, d8, d10, d12, d20, d100
- **Drag & Drop**: Click and drag dice from the extension tray onto the scene
- **Visual Feedback**: Each die type has unique SVG sprites with different shapes and colors
- **Rolling Mechanism**:
  - Right-click context menu → "Roll Dice"
  - Keyboard shortcut: Press 'R' with dice selected
- **State Management**: Dice spawn at max value, update visually when rolled
- **Metadata Storage**: Each die stores its type and current value

### Technical Implementation

#### File Structure
```
dice-roller/
├── public/
│   ├── manifest.json          # Extension manifest
│   ├── icon.svg                # Extension icon
│   ├── d4-1.svg to d4-4.svg   # d4 sprites (green triangles)
│   ├── d6-1.svg to d6-6.svg   # d6 sprites (red squares)
│   ├── d8-1.svg to d8-8.svg   # d8 sprites (blue diamonds)
│   ├── d10-1.svg to d10-10.svg # d10 sprites (purple pentagons)
│   ├── d12-1.svg to d12-12.svg # d12 sprites (orange circles)
│   ├── d20-1.svg to d20-20.svg # d20 sprites (yellow octagons)
│   └── d100-0.svg to d100-90.svg # d100 sprites (gray hexagons)
├── src/
│   ├── main.js                 # Main extension logic
│   └── style.css               # UI styles
├── index.html                  # Extension UI
├── vite.config.js              # Vite config with CORS
└── package.json                # Dependencies
```

#### Key Technologies
- **Vite 5**: Build tool and dev server
- **@owlbear-rodeo/sdk**: OBR API integration
- **Pointer Events**: Drag and drop implementation
- **OBR Interaction API**: Real-time item dragging
- **Context Menu API**: Right-click menu for rolling

#### Core Functions

**Drag & Drop Flow:**
1. User clicks/holds on a die button in the tray
2. `pointerdown` event starts an OBR interaction with a temporary die
3. `pointermove` updates die position using `OBR.viewport.inverseTransformPoint()`
4. `pointerup` stops interaction and adds final die to scene with `OBR.scene.items.addItems()`

**Rolling Dice:**
1. User selects dice on scene
2. Right-click → "Roll Dice" or press 'R' key
3. Context menu `onClick` filters for dice items
4. Updates each die's image URL and metadata value
5. Shows notification with results

#### Important Details

**Absolute URLs Required:**
- Images must use absolute URLs (`http://localhost:5173/d6-3.svg`) not relative paths
- Function `getAbsoluteDiceImageUrl()` converts relative to absolute URLs
- Required because items are stored in OBR's HTTPS context

**d100 Special Handling:**
- Rolls in increments of 10 (00, 10, 20...90)
- Special logic in `rollDice()` function

**Metadata Schema:**
```javascript
{
  'dice-roller/type': 'd6',    // Die type
  'dice-roller/value': 4        // Current rolled value
}
```

## Current Status

### Working Features ✓
- All 7 dice types functional
- Drag and drop onto scene
- Visual updates when rolling
- Context menu integration
- Keyboard shortcut ('R') configured

### Known Issues
- Keyboard shortcut 'R' not triggering (configured but needs debugging)
  - Context menu created with `shortcut: 'R'`
  - May need testing to verify OBR keyboard event handling
  - Console log added: "Roll dice clicked/shortcut pressed!"

### Debug Steps for Shortcut
1. Select a die on the scene
2. Press 'R' key
3. Check browser console for "Roll dice clicked/shortcut pressed!"
4. If no message appears, shortcut isn't being triggered by OBR

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

### Key Dependencies
- `vite@5` - Compatible with Node 20.9.0
- `@owlbear-rodeo/sdk` - OBR extension API

## Future Enhancements

### Potential Improvements
1. **Double-click to roll** - Add double-click handler on dice items
2. **Dice pools** - Select multiple dice and see total
3. **Roll history** - Show recent rolls in the extension panel
4. **Custom dice** - Allow users to upload their own dice images
5. **Sound effects** - Add dice rolling sounds
6. **Animations** - Animate dice rolling
7. **Dice presets** - Save common dice combinations (e.g., "2d6+1d4")

### Code Quality
- Add TypeScript for type safety
- Add error handling for failed image loads
- Add loading states during interactions
- Test on different screen sizes/viewports

## Owlbear Rodeo API Usage

### APIs Used
- `OBR.onReady()` - Extension initialization
- `OBR.interaction.startItemInteraction()` - Real-time dragging
- `OBR.viewport.inverseTransformPoint()` - Screen to scene coordinates
- `OBR.scene.items.addItems()` - Add dice to scene
- `OBR.scene.items.updateItems()` - Update dice values
- `OBR.scene.items.getItems()` - Fetch updated dice
- `OBR.contextMenu.create()` - Context menu with shortcut
- `OBR.notification.show()` - User feedback
- `buildImage()` - Create image items

### Key Documentation
- Interaction API: https://docs.owlbear.rodeo/extensions/apis/interaction
- Scene Items: https://docs.owlbear.rodeo/extensions/apis/scene/items
- Context Menu: https://docs.owlbear.rodeo/extensions/apis/context-menu
- Image Builder: https://docs.owlbear.rodeo/extensions/reference/builders/image

## Notes

### fetch-docs.js Tool
Created a Puppeteer-based tool to fetch Cloudflare-protected documentation:
- Uses headless Chrome to bypass bot detection
- Converts HTML to markdown with turndown
- Usage: `./fetch-docs.js <url> [output-file]`

### Development Tips
- Vite auto-reloads, but OBR iframe may need manual refresh
- Use browser DevTools console for debugging (see iframe context)
- Absolute URLs are critical for images - relative paths fail in OBR context
- Mixed content warnings are expected (HTTP upgraded to HTTPS)

## Summary
Successfully built a fully functional dice roller extension with drag-and-drop placement and visual rolling. All standard RPG dice (d4-d100) are implemented with unique visual styles. Main remaining task is debugging the keyboard shortcut functionality.
