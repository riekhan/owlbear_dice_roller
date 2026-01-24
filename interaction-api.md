# Interaction | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/interaction

---

  Interaction | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

[Skip to main content](#docusaurus_skipToContent_fallback)

[

![Owlbear Rodeo Logo](/img/logo.svg)

**Documentation**](/)[Guides](/docs/getting-started/)[Developers](/extensions/getting-started)

[

![Owlbear Rodeo Logo](/img/logo.svg)

**Documentation**](/)

*   [Guides](/docs/getting-started/)
*   [Developers](/extensions/getting-started)

← Back to main menu

*   [Getting Started](/extensions/getting-started)
*   [Tutorial - Hello World](/extensions/tutorial-hello-world/)
    
*   [Tutorial - Initiative Tracker](/extensions/tutorial-initiative-tracker/)
    
*   [Tutorial - Custom Tool](/extensions/tutorial-custom-tool/)
    
*   [Tutorial - Sharing your Extension](/extensions/tutorial-sharing-your-extension/)
    
*   [Examples](/extensions/examples/)
    
*   [APIs](/extensions/apis/)
    
    *   [Action](/extensions/apis/action)
    *   [Assets](/extensions/apis/assets)
    *   [Broadcast](/extensions/apis/broadcast)
    *   [Context Menu](/extensions/apis/context-menu)
    *   [Interaction](/extensions/apis/interaction)
    *   [Modal](/extensions/apis/modal)
    *   [Notification](/extensions/apis/notification)
    *   [Party](/extensions/apis/party)
    *   [Player](/extensions/apis/player)
    *   [Popover](/extensions/apis/popover)
    *   [Room](/extensions/apis/room)
    *   [Scene](/extensions/apis/scene/)
        
    *   [Theme](/extensions/apis/theme)
    *   [Tool](/extensions/apis/tool)
    *   [Viewport](/extensions/apis/viewport)
*   [Reference](/extensions/reference/)
    

*   [](/)
*   [APIs](/extensions/apis/)
*   Interaction

On this page

# Interaction

## `OBR.interaction`[​](#obrinteraction "Direct link to heading")

Manage interactions with Owlbear Rodeo.

An interaction allows you to provide high frequency updates to Owlbear Rodeo without needing to worry about networking.

Interactions in Owlbear Rodeo use an interpolated snapshot system where high frequency updates are applied in real-time locally but sampled at a lower frequency to be sent over the network to other players.

On the receiving end low frequency snapshots are buffered and interpolated to ensure smooth playback.

Not all item values are available when using an interaction. See [here](#interactive-values) for available values.

# Reference

## Methods[​](#methods "Direct link to heading")

### `startItemInteraction`[​](#startiteminteraction "Direct link to heading")

```
async startItemInteraction(items)
```

Start an interaction with an item or a list of items in a scene.

These items can be newly created or be references to already existing items in the scene.

Interaction Time Limit

To prevent accidental network usage interactions expire after 30 seconds.

When this happens the interaction will stop sending network traffic but new updates will still be applied locally.

**Parameters**

NAME

TYPE

DESCRIPTION

baseState

[Item](/extensions/reference/items/item) | [Item](/extensions/reference/items/item)\[\]

The item or items to interact with

Returns an [InteractionManager](#interactionmanager) that can be used to update and stop this interaction.

**Example**

```
/** * Create a pointer tool mode that starts an interaction on drag start, * updates that interaction on drag move and stops the interaction * on drag end/cancel. */let interaction = null;OBR.tool.createMode({  id: "com.example.pointer",  icons: [    {      icon: "/icon.svg",      label: "Custom Pointer",      filter: {        activeTools: ["rodeo.owlbear.tools/pointer"],      },    },  ],  async onToolDragStart(_, event) {    const pointer = buildPointer().position(event.pointerPosition).build();    interaction = await OBR.interaction.startItemInteraction(pointer);  },  onToolDragMove(_, event) {    if (interaction) {      const [update] = interaction;      update((pointer) => {        pointer.position = event.pointerPosition;      });    }  },  onToolDragEnd() {    if (interaction) {      const [_, stop] = interaction;      stop();    }    interaction = null;  },  onToolDragCancel() {    if (interaction) {      const [_, stop] = interaction;      stop();    }    interaction = null;  },});
```

* * *

## Type Definitions[​](#type-definitions "Direct link to heading")

### InteractionManager[​](#interactionmanager "Direct link to heading")

TYPE

array

**Properties**

INDEX

NAME

TYPE

DESCRIPTION

0

update

DispatchInteractionUpdate

A function to dispatch updates to this interaction

1

stop

function

A function to stop the interaction

* * *

### DispatchInteractionUpdate[​](#dispatchinteractionupdate "Direct link to heading")

Interaction's use [Immer](https://immerjs.github.io/immer/) to provide updates. This function represents an Immer producer that provides a recipe for making immutable updates.

TYPE

function

NAME

TYPE

DESCRIPTION

update

UpdateInteraction

A callback to apply an update to the previous state of this interaction

* * *

### UpdateInteraction[​](#updateinteraction "Direct link to heading")

An [Immer](https://immerjs.github.io/immer/) recipe for updating the current state of an interaction.

TYPE

function

NAME

TYPE

DESCRIPTION

draft

[Draft](https://immerjs.github.io/immer/)

An immer draft of the current state

* * *

## Interactive Values[​](#interactive-values "Direct link to heading")

When you update a value using an interaction a faster rendering path will be used. This fast path works by skipping the processing of any hierarchy data and updating values directly on the renderer. Because of this method not all parameters are available when changing values in an interaction.

Below is a list of items and the values that can be updated in an interaction:

### [Item](/extensions/reference/items/item)[​](#item "Direct link to heading")

NAME

TYPE

DESCRIPTION

position

[Vector2](/extensions/reference/vector2)

The position of this item

rotation

number

The rotation of this item in degrees

scale

[Vector2](/extensions/reference/vector2)

The scale of this item

### [Curve](/extensions/reference/items/curve)[​](#curve "Direct link to heading")

NAME

TYPE

DESCRIPTION

points

[Vector2](/extensions/reference/vector2)\[\]

The list of points to draw

### [Image](/extensions/reference/items/image)[​](#image "Direct link to heading")

NAME

TYPE

DESCRIPTION

image

[ImageContent](/extensions/reference/items/image#imagecontent)

Only the `width` and `height` of the image content

grid

[ImageGrid](/extensions/reference/items/image#imagegrid)

The grid scale of the image

### [Label](/extensions/reference/items/label)[​](#label "Direct link to heading")

NAME

TYPE

DESCRIPTION

text

[TextContent](/extensions/reference/text-content)

Only the `plainText` can be updated

### [Line](/extensions/reference/items/line)[​](#line "Direct link to heading")

NAME

TYPE

DESCRIPTION

startPosition

[Vector2](/extensions/reference/vector2)

The start position of the line

endPosition

[Vector2](/extensions/reference/vector2)

The end position of the line

### [Path](/extensions/reference/items/path)[​](#path "Direct link to heading")

NAME

TYPE

DESCRIPTION

commands

[PathCommand](#pathcommand)\[\]

The list of drawing commands

### [Ruler](/extensions/reference/items/ruler)[​](#ruler "Direct link to heading")

NAME

TYPE

DESCRIPTION

startPosition

[Vector2](/extensions/reference/vector2)

The start position of the ruler

endPosition

[Vector2](/extensions/reference/vector2)

The end position of the ruler

measurement

string

The value to display on the ruler

### [Shape](/extensions/reference/items/shape)[​](#shape "Direct link to heading")

NAME

TYPE

DESCRIPTION

width

number

The width of the shape

height

number

The height of the shape

\--

[

Previous

Context Menu

](/extensions/apis/context-menu)[

Next

Modal

](/extensions/apis/modal)

Docs

*   [Guides](/docs/getting-started)
*   [Developers](/extensions/getting-started)

Community

*   [Discord](https://discord.gg/u5RYMkV98s)
*   [Twitter](https://twitter.com/owlbearrodeo)
*   [Reddit](https://reddit.com/r/owlbearrodeo)
*   [YouTube](https://youtube.com/c/owlbearrodeo)

More

*   [Blog](https://blog.owlbear.rodeo)

Copyright © 2025 Owlbear Rodeo.

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c3151c39adb327e',t:'MTc2OTI3NjQ2Mg=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();