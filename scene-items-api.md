# Items | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/scene/items

---

  Items | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
        
        *   [Fog](/extensions/apis/scene/fog)
        *   [Grid](/extensions/apis/scene/grid)
        *   [History](/extensions/apis/scene/history)
        *   [Items](/extensions/apis/scene/items)
        *   [Local](/extensions/apis/scene/local)
    *   [Theme](/extensions/apis/theme)
    *   [Tool](/extensions/apis/tool)
    *   [Viewport](/extensions/apis/viewport)
*   [Reference](/extensions/reference/)
    

*   [](/)
*   [APIs](/extensions/apis/)
*   [Scene](/extensions/apis/scene/)
*   Items

On this page

# Items

## `OBR.scene.items`[​](#obrsceneitems "Direct link to heading")

An [Item](/extensions/reference/items/item) is the basic building block of everything shown in a Scene.

For all available items see [here](/extensions/reference/items/).

# Reference

## Methods[​](#methods "Direct link to heading")

### `getItems`[​](#getitems "Direct link to heading")

```
async getItems(filter)
```

Get then current items in the scene.

**Parameters**

NAME

TYPE

DESCRIPTION

filter

[ItemFilter](#itemfilter)

An optional filter to run on the scenes items

**Example**

Get items with the given ids.

```
const uuid = "55c04fba-9fa3-483b-8cf8-287737cbea9b";const items = await OBR.scene.items.getItems([uuid]);
```

Get all images.

```
import { isImage } from "@owlbear-rodeo/sdk";const images = await OBR.scene.items.getItems(isImage);
```

Get all images on the Character layer

```
import { isImage } from "@owlbear-rodeo/sdk";const characters = await OBR.scene.items.getItems(  (item) => item.layer === "CHARACTER" && isImage(item));
```

Get all images on the Character layer using Typescript

```
import { Image, isImage } from "@owlbear-rodeo/sdk";const characters = await OBR.scene.items.getItems(  (item): item is Image => item.layer === "CHARACTER" && isImage(item));
```

* * *

### `updateItems`[​](#updateitems "Direct link to heading")

```
async updateItems(filterOrItems, update)
```

Update existing items in the scene.

To track changes and ensure immutability the update function uses an [Immer](https://immerjs.github.io/immer/) `WritableDraft`.

**Parameters**

NAME

TYPE

DESCRIPTION

filterOrItems

[ItemFilter](#itemfilter) | [Item](/extensions/reference/items/item)\[\]

Either a filter or a list of items to update

update

(draft: WritableDraft<[Item](/extensions/reference/items/item)\[\]>) => void

An update function that allows you to update an [Immer](https://immerjs.github.io/immer/) `WritableDraft` of the input items

**Example**

Lock all images

```
import { isImage } from "@owlbear-rodeo/sdk";await OBR.scene.items.updateItems(isImage, (images) => {  for (let image of images) {    image.locked = true;  }});
```

Turn all shapes pink

```
import { isShape } from "@owlbear-rodeo/sdk";await OBR.scene.items.updateItems(isShape, (shapes) => {  for (let shape of shapes) {    shape.style.fillColor = "pink";  }});
```

Hide all attachments

```
OBR.scene.items.updateItems(  (item) => item.layer === "ATTACHMENT",  (items) => {    for (let item of items) {      item.visible = false;    }  });
```

Hide selected items when clicking a context menu item

```
OBR.contextMenu.create({  id: "rodeo.owlbear.example",  icons: [    {      icon: "icon.svg",      label: "Example",    },  ],  onClick(context) {    OBR.scene.items.updateItems(context.items, (items) => {      for (let item of items) {        item.visible = false;      }    });  },});
```

* * *

### `addItems`[​](#additems "Direct link to heading")

```
async addItems(items)
```

Add new items to the scene.

To create new items you can use the item [Builders](/extensions/reference/builders/).

**Parameters**

NAME

TYPE

DESCRIPTION

items

[Item](/extensions/reference/items/item)\[\]

A list of items to add

**Example**

Add a circle shape to the scene

```
import OBR, { buildShape } from "@owlbear-rodeo/sdk";const item = buildShape().width(10).height(10).shapeType("CIRCLE").build();OBR.scene.items.addItems([item]);
```

* * *

### `deleteItems`[​](#deleteitems "Direct link to heading")

```
async deleteItems(ids)
```

Delete existing items by their IDs.

**Parameters**

NAME

TYPE

DESCRIPTION

ids

string\[\]

A list of items to delete by their IDs

**Example**

Delete selected items when clicking a context menu item

```
OBR.contextMenu.create({  id: "rodeo.owlbear.example",  icons: [    {      icon: "icon.svg",      label: "Example",    },  ],  onClick(context) {    const ids = context.items.map((item) => item.id);    OBR.scene.items.deleteItems(ids);  },});
```

* * *

### `getItemAttachments`[​](#getitemattachments "Direct link to heading")

```
async getItemAttachments(ids)
```

Get all items, attachments and sub-attachments for a set of item IDs.

**Parameters**

NAME

TYPE

DESCRIPTION

ids

string\[\]

A list of items to look up by their IDs

Returns a list of [Items](/extensions/reference/items/item).

**Example**

Delete selected items and their attachments when clicking a context menu item

```
OBR.contextMenu.create({  id: "rodeo.owlbear.example",  icons: [    {      icon: "icon.svg",      label: "Example",    },  ],  async onClick(context) {    const ids = context.items.map((item) => item.id);    const allItems = await OBR.scene.items.getItemAttachments(ids);    const allIds = allItems.map((item) => item.id);    OBR.scene.items.deleteItems(allIds);  },});
```

* * *

### `getItemBounds`[​](#getitembounds "Direct link to heading")

```
async getItemBounds(ids)
```

Get the axis-aligned bounding box for the given items.

**Parameters**

NAME

TYPE

DESCRIPTION

ids

string\[\]

A list of items to look up by their IDs

Returns a [BoundingBox](/extensions/reference/bounding-box).

* * *

### `onChange`[​](#onchange "Direct link to heading")

```
onChange(callback);
```

**Parameters**

NAME

TYPE

DESCRIPTION

callback

(items: [Item](/extensions/reference/items/item)\[\]) => void

A callback for when an item changes. The items array will include all items in the scene, not just those that changed.

Returns a function that when called will unsubscribe from change events.

**Example**

```
/** * Use an `onChange` event with a React `useEffect`. * `onChange` returns an unsubscribe event to make this easy. */useEffect(  () =>    OBR.scene.items.onChange((items) => {      // React to item changes    }),  []);
```

* * *

## Type Definitions[​](#type-definitions "Direct link to heading")

### ItemFilter[​](#itemfilter "Direct link to heading")

A filter to run on a list of items.

TYPE

function

**Parameters**

NAME

TYPE

DESCRIPTION

item

[Item](/extensions/reference/items/item)

The item to run the filter on

Returns a boolean. If true the item passes the filter and will be used. If false the item will be ignored.

* * *

[

Previous

History

](/extensions/apis/scene/history)[

Next

Local

](/extensions/apis/scene/local)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c314cb6694aebe7',t:'MTc2OTI3NjI1NQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();