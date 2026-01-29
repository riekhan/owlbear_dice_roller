# Dice Roller for Owlbear Rodeo

A dice roller extension for [Owlbear Rodeo](https://www.owlbear.rodeo) that lets you spawn and roll dice directly on your scene.

## Features

- **7 Dice Types**: d4, d6, d8, d10, d12, d20, d100
- **Dice Pool**: Build up a set of dice to roll together
  - **Left-click** a die button to add it to the pool
  - **Right-click** to remove one from the pool
  - Small badge shows count on each die button
- **Drag to Place**: Drag a die button to place an unrolled die precisely on the scene
- **Smart Positioning**: Dice spawn in a 4-column grid pattern
- **Player Colors**: Dice borders match your Owlbear Rodeo player color
- **Multiple Roll Options**: Right-click menu, "Roll Selected" button
- **Remove All**: Quick button to clear all dice from the scene

## Live Version

**Production**: https://owlbear-dice-roller.fly.dev/manifest.json

## Installation

### For Users
1. In Owlbear Rodeo, go to Extensions → Add Extension
2. Enter: `https://owlbear-dice-roller.fly.dev/manifest.json`

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

### Deployment
```bash
fly deploy
```

## Usage

### Building a Dice Pool
- **Left-click** die buttons to add dice to your pool (badge shows count)
- **Right-click** to remove dice from the pool
- Click **"Roll Selected"** to roll and spawn all dice in the pool

### Placing Individual Dice
- **Drag** a die button onto the scene to place an unrolled die

### Rolling Existing Dice
- **Right-click** on dice → "Roll Dice"
- **Select dice** and click the "Roll Selected" button

### Removing Dice
- Click **"Remove All"** to clear all dice from the scene

## How It Works

- Built with Vite and the Owlbear Rodeo SDK
- Dynamic SVG generation provides player-colored dice
- Each die shows a detailed 3D wireframe design

## Development

See [CLAUDE.md](./CLAUDE.md) for detailed technical documentation.

## License

MIT
