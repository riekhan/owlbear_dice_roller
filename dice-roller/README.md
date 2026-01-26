# Dice Roller for Owlbear Rodeo

A dice roller extension for [Owlbear Rodeo](https://www.owlbear.rodeo) that lets you spawn and roll dice directly on your scene.

## Features

- **7 Dice Types**: d4, d6, d8, d10, d12, d20, d100
- **Two Spawn Methods**:
  - **Click**: Instantly spawn a rolled die at the center of your view
  - **Drag**: Place an unrolled die precisely where you want it
- **Smart Positioning**: Multiple quick clicks create a neat circular pattern
- **Player Colors**: Dice borders match your Owlbear Rodeo player color
- **Multiple Roll Options**: Right-click menu, "Roll Selected" button

## Installation

### For Development
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. In Owlbear Rodeo, go to Extensions → Add Extension
5. Enter: `http://localhost:5173/manifest.json`

### For Production
TODO: Add production build instructions

## Usage

### Spawning Dice
- **Click a die button**: Spawns a rolled die at the center of your viewport
- **Drag a die button**: Place an unrolled die anywhere on the scene

### Rolling Dice
- **Right-click** on dice → "Roll Dice"
- **Select dice** and click the "Roll Selected" button in the extension panel

### Quick Rolling Multiple Dice
Click die buttons rapidly to spawn multiple rolled dice in a neat circular pattern around the center. The pattern resets if you wait 3+ seconds or move your view.

## How It Works

- Built with Vite and the Owlbear Rodeo SDK
- Dynamic SVG generation provides player-colored dice
- Each die shows a detailed 3D wireframe design

## Development

See [CLAUDE.md](./CLAUDE.md) for detailed technical documentation.

## License

MIT
