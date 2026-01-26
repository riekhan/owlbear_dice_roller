import './style.css';
import OBR, { buildImage } from '@owlbear-rodeo/sdk';

// Dice configuration
const DICE_CONFIG = {
  d4: { sides: 4, maxValue: 4 },
  d6: { sides: 6, maxValue: 6 },
  d8: { sides: 8, maxValue: 8 },
  d10: { sides: 10, maxValue: 10 },
  d12: { sides: 12, maxValue: 12 },
  d20: { sides: 20, maxValue: 20 },
  d100: { sides: 100, maxValue: 100 }, // d100 rolls 1-100
};

// Helper function to get the image URL for a die value
function getDiceImageUrl(diceType, value, color = '#888888') {
  // Use dynamic server endpoint for all dice
  return `/dice/${diceType}?value=${value}&color=${encodeURIComponent(color)}`;
}

// Helper function to get absolute URL for a die value
function getAbsoluteDiceImageUrl(diceType, value, color = '#888888') {
  const imageUrl = getDiceImageUrl(diceType, value, color);
  return new URL(imageUrl, window.location.href).href;
}

// Helper function to roll a random value for a die
function rollDice(diceType) {
  const config = DICE_CONFIG[diceType];
  return Math.floor(Math.random() * config.sides) + 1;
}

// Initialize the extension
OBR.onReady(async () => {
  // Track click-spawn state for offsetting multiple dice
  let clickSpawnCount = 0;
  let lastSpawnTime = 0;
  let lastViewportCenter = null;
  const SPAWN_COOLDOWN = 3000; // 3 seconds - reset if no spawns within this time
  const SPAWN_OFFSET = 120; // Offset distance between dice

  const diceButtons = document.querySelectorAll('.dice-button');

  diceButtons.forEach((button) => {
    let interaction = null;
    let isDragging = false;
    let finalPosition = null;

    button.addEventListener('pointerdown', async (e) => {
      isDragging = false;
      finalPosition = null;
      const diceType = button.dataset.dice;
      const config = DICE_CONFIG[diceType];

      // For dragging, show max value (unrolled)
      const maxValue = config.maxValue;

      // Get player color for dynamic dice
      const playerColor = await OBR.player.getColor();

      // Get absolute URL with player color (using max value for drag preview)
      const absoluteUrl = getAbsoluteDiceImageUrl(diceType, maxValue, playerColor);

      try {
        // Create a temporary die item for dragging
        const tempDie = buildImage({
          url: absoluteUrl,
          mime: 'image/svg+xml',
          width: 100,
          height: 100,
        }, {
          dpi: 100,
          offset: { x: 0, y: 0 },
        })
          .position({ x: 0, y: 0 })
          .layer('PROP')
          .locked(false)
          .metadata({
            'dice-roller/type': diceType,
            'dice-roller/value': maxValue,
            'dice-roller/color': playerColor,
          })
          .build();

        // Start interaction
        interaction = await OBR.interaction.startItemInteraction(tempDie);
        const [update, stop] = interaction;

        const onPointerMove = async (moveEvent) => {
          isDragging = true;
          const position = await OBR.viewport.inverseTransformPoint({
            x: moveEvent.clientX,
            y: moveEvent.clientY,
          });

          // Adjust position to account for offset
          finalPosition = {
            x: position.x,
            y: position.y + 100,
          };

          update((item) => {
            item.position = finalPosition;
          });
        };

        const onPointerUp = async () => {
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);

          if (interaction) {
            stop();

            // If we dragged, add the die to the scene at drag position (unrolled, max value)
            if (isDragging && finalPosition) {
              const finalDie = buildImage({
                url: absoluteUrl,
                mime: 'image/svg+xml',
                width: 100,
                height: 100,
              }, {
                dpi: 100,
                offset: { x: 0, y: 0 },
              })
                .position(finalPosition)
                .layer('PROP')
                .locked(false)
                .metadata({
                  'dice-roller/type': diceType,
                  'dice-roller/value': maxValue,
                  'dice-roller/color': playerColor,
                })
                .build();

              await OBR.scene.items.addItems([finalDie]);
            } else if (!isDragging) {
              // If we clicked (not dragged), roll the die and spawn at viewport center
              const rolledValue = rollDice(diceType);
              const rolledUrl = getAbsoluteDiceImageUrl(diceType, rolledValue, playerColor);

              // Get the center of the player's current viewport
              const width = await OBR.viewport.getWidth();
              const height = await OBR.viewport.getHeight();
              const centerPosition = await OBR.viewport.inverseTransformPoint({
                x: width / 2,
                y: height / 2,
              });

              const now = Date.now();

              // Check if we should reset the spawn count
              const timeSinceLastSpawn = now - lastSpawnTime;
              const viewportMoved = lastViewportCenter &&
                (Math.abs(centerPosition.x - lastViewportCenter.x) > 50 ||
                 Math.abs(centerPosition.y - lastViewportCenter.y) > 50);

              if (timeSinceLastSpawn > SPAWN_COOLDOWN || viewportMoved) {
                clickSpawnCount = 0;
              }

              // Calculate offset in a circular pattern around center
              // Creates concentric rings: first die at center, then rings of 6 dice each
              let offsetX = 0;
              let offsetY = 0;
              if (clickSpawnCount > 0) {
                const ringIndex = Math.floor((clickSpawnCount - 1) / 6); // Which ring (0, 1, 2...)
                const positionInRing = (clickSpawnCount - 1) % 6; // Position within the ring (0-5)
                const radius = (ringIndex + 1) * SPAWN_OFFSET; // Radius increases with each ring
                const angle = positionInRing * (Math.PI / 3); // 60 degrees apart (6 positions per ring)
                offsetX = Math.cos(angle) * radius;
                offsetY = Math.sin(angle) * radius;
              }

              const spawnPosition = {
                x: centerPosition.x + offsetX,
                y: centerPosition.y + offsetY,
              };

              const finalDie = buildImage({
                url: rolledUrl,
                mime: 'image/svg+xml',
                width: 100,
                height: 100,
              }, {
                dpi: 100,
                offset: { x: 0, y: 0 },
              })
                .position(spawnPosition)
                .layer('PROP')
                .locked(false)
                .metadata({
                  'dice-roller/type': diceType,
                  'dice-roller/value': rolledValue,
                  'dice-roller/color': playerColor,
                })
                .build();

              await OBR.scene.items.addItems([finalDie]);

              // Update spawn tracking
              clickSpawnCount++;
              lastSpawnTime = now;
              lastViewportCenter = { x: centerPosition.x, y: centerPosition.y };
            }

            interaction = null;
          }
        };

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      } catch (error) {
        console.error('Error during interaction:', error);
      }
    });
  });

  // Set up context menu for rolling dice
  await OBR.contextMenu.create({
    id: 'dice-roller/roll',
    icons: [
      {
        icon: '/icon.svg',
        label: 'Roll Dice',
        filter: {
          every: [
            { key: 'metadata.dice-roller/type', value: undefined, operator: '!=' },
          ],
          permissions: ['UPDATE'],
        },
      },
    ],
    async onClick(context) {
      // Roll all selected dice
      const diceItems = context.items.filter(
        (item) => item.metadata['dice-roller/type']
      );

      if (diceItems.length === 0) return;

      await OBR.scene.items.updateItems(diceItems, (items) => {
        for (const die of items) {
          const diceType = die.metadata['dice-roller/type'];
          const newValue = rollDice(diceType);
          const diceColor = die.metadata['dice-roller/color'] || '#ff6b6b';

          // Update the die's image to show the new value
          die.image.url = getAbsoluteDiceImageUrl(diceType, newValue, diceColor);
          die.metadata['dice-roller/value'] = newValue;
        }
      });
    },
  });

  // Set up "Roll Selected Dice" button
  const rollButton = document.getElementById('roll-selected');
  rollButton.addEventListener('click', async () => {
    try {
      // Get all selected items
      const selection = await OBR.player.getSelection();
      if (!selection || selection.length === 0) {
        OBR.notification.show('No dice selected!', 'WARNING');
        return;
      }

      // Get the actual items
      const items = await OBR.scene.items.getItems(selection);

      // Filter for dice items
      const diceItems = items.filter(
        (item) => item.metadata && item.metadata['dice-roller/type']
      );

      if (diceItems.length === 0) {
        OBR.notification.show('No dice selected!', 'WARNING');
        return;
      }

      // Roll the dice
      await OBR.scene.items.updateItems(diceItems, (items) => {
        for (const die of items) {
          const diceType = die.metadata['dice-roller/type'];
          const newValue = rollDice(diceType);
          const diceColor = die.metadata['dice-roller/color'] || '#ff6b6b';

          // Update the die's image to show the new value
          die.image.url = getAbsoluteDiceImageUrl(diceType, newValue, diceColor);
          die.metadata['dice-roller/value'] = newValue;
        }
      });
    } catch (error) {
      OBR.notification.show('Error rolling dice', 'ERROR');
    }
  });
});
