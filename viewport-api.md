# Viewport | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/viewport

---

  Viewport | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   Viewport

On this page

# Viewport

## `OBR.viewport`[​](#obrviewport "Direct link to heading")

Control the viewport of the current scene.

The viewport represents this players view of the current scene.

# Reference

## Methods[​](#methods "Direct link to heading")

### `reset`[​](#reset "Direct link to heading")

```
async reset()
```

Reset the viewport to the initial view.

If no map exists in the scene this will be the origin. If a map exists the viewport will fit to this map.

Returns a [ViewportTransform](#viewporttransform) with the transform it was reset to.

* * *

### `animateTo`[​](#animateto "Direct link to heading")

```
async animateTo(transform)
```

Animate the viewport to the given transform.

**Parameters**

NAME

TYPE

DESCRIPTION

transform

[ViewportTransform](#viewporttransform)

The new transform to animate to

* * *

### `animateToBounds`[​](#animatetobounds "Direct link to heading")

```
async animateTo(bounds)
```

Animate the viewport to the given bounding box.

**Parameters**

NAME

TYPE

DESCRIPTION

bounds

[BoundingBox](/extensions/reference/bounding-box)

The bounding box to animate to

**Example**

Zoom on to the selected items when clicking a context menu item

```
OBR.contextMenu.create({  id: "rodeo.owlbear.example",  icons: [    {      icon: "icon.svg",      label: "Example",    },  ],  async onClick(context) {    OBR.viewport.animateToBounds(context.selectionBounds);  },});
```

* * *

### `getPosition`[​](#getposition "Direct link to heading")

```
async getPosition()
```

Get the current position of the viewport.

Returns a [Vector2](/extensions/reference/vector2).

* * *

### `setPosition`[​](#setposition "Direct link to heading")

```
async setPosition(position)
```

Set the position of the viewport.

**Parameters**

NAME

TYPE

DESCRIPTION

position

[Vector2](/extensions/reference/vector2)

The new position of the viewport

* * *

### `getScale`[​](#getscale "Direct link to heading")

```
async getScale()
```

Get the current scale of the viewport.

A scale of 1 represents a 1:1 scale.

Returns a number.

* * *

### `setScale`[​](#setscale "Direct link to heading")

```
async setScale(scale)
```

Set the scale of the viewport.

**Parameters**

NAME

TYPE

DESCRIPTION

scale

number

The new scale of the viewport

* * *

### `getWidth`[​](#getwidth "Direct link to heading")

```
async getWidth()
```

Get the width of the viewport.

Returns a number.

* * *

### `getHeight`[​](#getheight "Direct link to heading")

```
async getHeight()
```

Get the height of the viewport.

Returns a number.

* * *

### `transformPoint`[​](#transformpoint "Direct link to heading")

```
async transformPoint(point)
```

Transform a point from the viewport coordinate space into the screens coordinate space.

**Parameters**

NAME

TYPE

DESCRIPTION

point

[Vector2](/extensions/reference/vector2)

The point to transform

Returns a [Vector2](/extensions/reference/vector2).

* * *

### `inverseTransformPoint`[​](#inversetransformpoint "Direct link to heading")

```
async inverseTransformPoint(point)
```

Transform a point from the screens coordinate space into the viewport coordinate space.

**Parameters**

NAME

TYPE

DESCRIPTION

point

[Vector2](/extensions/reference/vector2)

The point to transform

Returns a [Vector2](/extensions/reference/vector2).

* * *

## Type Definitions[​](#type-definitions "Direct link to heading")

### ViewportTransform[​](#viewporttransform "Direct link to heading")

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

position

[Vector2](/extensions/reference/vector2)

The position of the viewport

scale

number

The scale of the viewport

[

Previous

Tool

](/extensions/apis/tool)[

Next

Reference

](/extensions/reference/)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c3160d78af567c7',t:'MTc2OTI3NzA4MA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();