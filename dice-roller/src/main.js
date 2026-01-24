import './style.css';
import OBR, { buildImage } from '@owlbear-rodeo/sdk';

// Dice configuration
const DICE_CONFIG = {
  d4: { sides: 4, maxValue: 4 },
  d6: { sides: 6, maxValue: 6 },
  d8: { sides: 8, maxValue: 8 },
};

// Helper function to get the image URL for a die value
function getDiceImageUrl(diceType, value) {
  return `/${diceType}-${value}.svg`;
}

// Helper function to roll a random value for a die
function rollDice(diceType) {
  const config = DICE_CONFIG[diceType];
  return Math.floor(Math.random() * config.sides) + 1;
}

// Helper function to add a die to the scene
async function addDieToScene(diceType, position) {
  const config = DICE_CONFIG[diceType];
  const maxValue = config.maxValue;
  const imageUrl = getDiceImageUrl(diceType, maxValue);

  // Get the absolute URL for the image
  const absoluteUrl = new URL(imageUrl, window.location.href).href;

  const dieItem = buildImage({
    url: absoluteUrl,
    mime: 'image/svg+xml',
    width: 100,
    height: 100,
  }, {
    dpi: 100,
    offset: { x: 50, y: 50 },
  })
    .position(position)
    .layer('PROP')
    .locked(false)
    .metadata({
      'dice-roller/type': diceType,
      'dice-roller/value': maxValue,
    })
    .build();

  await OBR.scene.items.addItems([dieItem]);
  console.log(`Added ${diceType} with value ${maxValue} to scene at`, position);
}

// Initialize the extension
OBR.onReady(async () => {
  console.log('Dice Roller Extension Ready!');
  console.log('OBR available:', OBR.isAvailable);

  const diceButtons = document.querySelectorAll('.dice-button');
  console.log('Found dice buttons:', diceButtons.length);

  diceButtons.forEach((button) => {
    let interaction = null;
    let isDragging = false;
    let finalPosition = null;

    button.addEventListener('pointerdown', async (e) => {
      console.log('Pointer down on', button.dataset.dice);
      isDragging = false;
      finalPosition = null;
      const diceType = button.dataset.dice;
      const config = DICE_CONFIG[diceType];
      const maxValue = config.maxValue;
      const imageUrl = getDiceImageUrl(diceType, maxValue);

      // Get absolute URL
      const absoluteUrl = new URL(imageUrl, window.location.href).href;
      console.log('Image URL:', absoluteUrl);

      try {
        // Create a temporary die item for dragging
        const tempDie = buildImage({
          url: absoluteUrl,
          mime: 'image/svg+xml',
          width: 100,
          height: 100,
        }, {
          dpi: 100,
          offset: { x: 50, y: 50 },
        })
          .position({ x: 0, y: 0 })
          .layer('PROP')
          .locked(false)
          .metadata({
            'dice-roller/type': diceType,
            'dice-roller/value': maxValue,
          })
          .build();

        console.log('Starting interaction...');
        // Start interaction
        interaction = await OBR.interaction.startItemInteraction(tempDie);
        const [update, stop] = interaction;
        console.log('Interaction started');

        const onPointerMove = async (moveEvent) => {
          if (!isDragging) {
            console.log('Started dragging');
          }
          isDragging = true;
          const position = await OBR.viewport.inverseTransformPoint({
            x: moveEvent.clientX,
            y: moveEvent.clientY,
          });

          finalPosition = position;

          update((item) => {
            item.position = position;
          });
        };

        const onPointerUp = async () => {
          console.log('Pointer up, isDragging:', isDragging);
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);

          if (interaction) {
            console.log('Stopping interaction');
            stop();

            // If we dragged, add the die to the scene
            if (isDragging && finalPosition) {
              console.log('Adding die to scene at position:', finalPosition);

              const finalDie = buildImage({
                url: absoluteUrl,
                mime: 'image/svg+xml',
                width: 100,
                height: 100,
              }, {
                dpi: 100,
                offset: { x: 50, y: 50 },
              })
                .position(finalPosition)
                .layer('PROP')
                .locked(false)
                .metadata({
                  'dice-roller/type': diceType,
                  'dice-roller/value': maxValue,
                })
                .build();

              await OBR.scene.items.addItems([finalDie]);
              console.log('Die added successfully');
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

          // Update the die's image to show the new value
          die.image.url = getDiceImageUrl(diceType, newValue);
          die.metadata['dice-roller/value'] = newValue;
        }
      });

      // Show notification with roll results
      if (diceItems.length === 1) {
        const die = diceItems[0];
        const diceType = die.metadata['dice-roller/type'];
        const value = rollDice(diceType);
        OBR.notification.show(`Rolled ${diceType.toUpperCase()}: ${value}`);
      } else {
        OBR.notification.show(`Rolled ${diceItems.length} dice!`);
      }
    },
  });

  console.log('Context menu created');
});
