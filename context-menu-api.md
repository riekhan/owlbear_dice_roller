# Context Menu | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/context-menu

---

  Context Menu | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   Context Menu

On this page

# Context Menu

## `OBR.contextMenu`[​](#obrcontextmenu "Direct link to heading")

A context menu is shown when an item is selected, this API allows you to extend that menu with custom buttons.

# Reference

## Methods[​](#methods "Direct link to heading")

### `create`[​](#create "Direct link to heading")

```
async create(contextMenu)
```

Create a context menu item.

**Parameters**

NAME

TYPE

DESCRIPTION

contextMenu

[ContextMenuItem](#contextmenuitem)

The context menu item to create

* * *

### `remove`[​](#remove "Direct link to heading")

```
async remove(id)
```

Remove a context menu item.

**Parameters**

NAME

TYPE

DESCRIPTION

id

string

The ID of the context menu to remove

* * *

## Type Definitions[​](#type-definitions "Direct link to heading")

### ContextMenuItem[​](#contextmenuitem "Direct link to heading")

A single context menu item.

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

id

string

The ID of this context menu item

icons

[ContextMenuIcon](#contextmenuicon)\[\]

An array of icons to use

onClick

[ContextMenuClickHandler](#contextmenuclickhandler)

A callback function triggered when the context menu item is clicked

shortcut

string

An optional key combination to use as a shortcut

embed

[ContextMenuEmbed](#contextmenuembed)

An optional embedded url to provide custom controls in the context menu

* * *

### ContextMenuIcon[​](#contextmenuicon "Direct link to heading")

An icon for a context menu item.

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

icon

string

The url of the icon as either a relative or absolute path

label

string

The label to use for the tooltip of the icon

filter

[ContextMenuIconFilter](#contextmenuiconfilter)

An optional filter to control when this icon will be shown

* * *

### ContextMenuIconFilter[​](#contextmenuiconfilter "Direct link to heading")

A filter to control when an icon will be shown. If this filter returns true then this icon will be shown. If no filter returns true then the context menu item won't be shown.

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

min

number

An optional minimum number of items selected, defaults to 1

max

number

An optional maximum number of items selected

permissions

("UPDATE" | "DELETE" | "CREATE" | [Permission](/extensions/reference/permission))\[\]

An optional array of permissions needed for the selected items, defaults to no permissions needed

roles

("GM" | "PLAYER")\[\]

An optional array of roles needed for the player, defaults to no role needed

every

[KeyFilter](/extensions/reference/filters#keyfilter)\[\]

An optional array of filters to run on the selected items. Every item must pass this filter for a success

some

[KeyFilter](/extensions/reference/filters#keyfilter)\[\]

An optional array of filters to run on the selected items. Only one item must pass this filter for a success

* * *

### ContextMenuClickHandler[​](#contextmenuclickhandler "Direct link to heading")

A callback when a context menu item is clicked.

TYPE

function

**Parameters**

NAME

TYPE

DESCRIPTION

context

[ContextMenuContext](#contextmenucontext)

The context for this menu

elementId

string

The ID of the button clicked

* * *

### ContextMenuContext[​](#contextmenucontext "Direct link to heading")

The context for a menu item.

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

items

[Item](/extensions/reference/items/item)\[\]

An array of Items that are currently selected

selectionBounds

[BoundingBox](/extensions/reference/bounding-box)

A bounding box for the current selection

* * *

### ContextMenuEmbed[​](#contextmenuembed "Direct link to heading")

An embedded view in the context menu popup.

TYPE

object

**Properties**

NAME

TYPE

DESCRIPTION

url

string

The url of the site to embed

height

number

An optional height of the embed in pixels

* * *

[

Previous

Broadcast

](/extensions/apis/broadcast)[

Next

Interaction

](/extensions/apis/interaction)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c314cd45c97a0f2',t:'MTc2OTI3NjI2MA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();