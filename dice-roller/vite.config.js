import { defineConfig } from "vite";

// Plugin to serve dynamic dice SVGs
function dynamicDicePlugin() {
  const wireframes = {
    d4: `<path d="M50 20 L80 75 L20 75 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="50" y1="20" x2="50" y2="75" stroke="#888888" stroke-width="2.5"/>
  <line x1="50" y1="20" x2="35" y2="62" stroke="#888888" stroke-width="2.5"/>
  <line x1="50" y1="20" x2="65" y2="62" stroke="#888888" stroke-width="2.5"/>`,

    d6: `<path d="M35 45 L50 35 L65 45 L65 60 L50 70 L35 60 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M50 35 L50 70 M35 45 L35 60 M65 45 L65 60" fill="none" stroke="#888888" stroke-width="2.5"/>
  <path d="M35 45 L50 35 M50 35 L65 45 M35 60 L50 70 M50 70 L65 60" fill="none" stroke="#888888" stroke-width="2.5"/>`,

    d8: `<path d="M50 15 L80 50 L50 85 L20 50 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M20 50 L50 40 L80 50 M50 15 V85" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>`,

    d10: `<path d="M50 15 L75 35 L70 65 L50 80 L30 65 L25 35 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M25 35 L50 45 L75 35 M30 65 L50 55 L70 65 M50 15 V80" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>`,

    d12: `<path d="M50 20 L78 35 L78 65 L50 80 L22 65 L22 35 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M50 35 L68 48 L61 70 L39 70 L32 48 Z" fill="none" stroke="#888888" stroke-width="2" stroke-linejoin="round"/>
  <path d="M50 20 V35 M78 35 L68 48 M78 65 L61 70 M50 80 V70 M22 65 L39 70 M22 35 L32 48" fill="none" stroke="#888888" stroke-width="2"/>`,

    d20: `<path d="M50 15 L85 35 V65 L50 85 L15 65 V35 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M50 35 L75 60 L25 60 Z" fill="none" stroke="#888888" stroke-width="2" stroke-linejoin="round"/>
  <path d="M50 15 L50 35 M85 35 L75 60 M85 65 L75 60 M50 85 L75 60 M50 85 L25 60 M15 65 L25 60 M15 35 L25 60 M50 15 L75 60 M50 15 L25 60" fill="none" stroke="#888888" stroke-width="1.8" stroke-opacity="0.7"/>`,

    d100: `<path d="M50 15 L75 35 L70 65 L50 80 L30 65 L25 35 Z" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M25 35 L50 45 L75 35 M30 65 L50 55 L70 65 M50 15 V80" fill="none" stroke="#888888" stroke-width="2.5" stroke-linejoin="round"/>`
  };

  return {
    name: 'dynamic-dice',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/dice\/(d\d+)\?/);
        if (match) {
          const diceType = match[1];
          const url = new URL(req.url, 'http://localhost');
          const value = url.searchParams.get('value') || '1';
          const color = url.searchParams.get('color') || '#888888';

          const wireframe = wireframes[diceType];
          if (!wireframe) {
            next();
            return;
          }

          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect x="5" y="5" width="90" height="90" rx="35" fill="#1a1a1a" stroke="${color}" stroke-width="4"/>
  ${wireframe}
  <!-- <text x="50" y="68" font-size="42" font-weight="bold" text-anchor="middle" fill="white">${value}</text> -->
</svg>`;

          res.setHeader('Content-Type', 'image/svg+xml');
          res.setHeader('Access-Control-Allow-Origin', 'https://www.owlbear.rodeo');
          res.end(svg);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [dynamicDicePlugin()],
  server: {
    cors: {
      origin: "https://www.owlbear.rodeo",
    },
  },
});
