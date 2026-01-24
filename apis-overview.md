# APIs | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/

---

  APIs | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   APIs

On this page

# APIs

## `OBR`[​](#obr "Direct link to heading")

The base API to interact with Owlbear Rodeo

# Reference

**Properties**

NAME

TYPE

DESCRIPTION

isReady

boolean

True if the SDK has been loaded and is ready to send messages

isAvailable

boolean

True if the current site is embedded in an instance of Owlbear Rodeo

**Example**

```
if (OBR.isAvailable) {  // The current site is embedded in Owlbear Rodeo}
```

## Methods[​](#methods "Direct link to heading")

### `onReady`[​](#onready "Direct link to heading")

```
onReady(callback);
```

**Parameters**

NAME

TYPE

DESCRIPTION

callback

() => void

A callback for when when the SDK is ready

Returns a function that when called will unsubscribe from change events.

**Example**

```
/** * Use an `onReady` event with a React `useEffect`. * `onReady` returns an unsubscribe event to make this easy. */useEffect(  () =>    OBR.onReady(() => {      // interact with the SDK    }),  []);
```

* * *

[

## 📄️ Action

OBR.action

](/extensions/apis/action)

[

## 📄️ Assets

OBR.assets

](/extensions/apis/assets)

[

## 📄️ Broadcast

OBR.broadcast

](/extensions/apis/broadcast)

[

## 📄️ Context Menu

OBR.contextMenu

](/extensions/apis/context-menu)

[

## 📄️ Interaction

OBR.interaction

](/extensions/apis/interaction)

[

## 📄️ Modal

OBR.modal

](/extensions/apis/modal)

[

## 📄️ Notification

OBR.notification

](/extensions/apis/notification)

[

## 📄️ Party

OBR.party

](/extensions/apis/party)

[

## 📄️ Player

OBR.player

](/extensions/apis/player)

[

## 📄️ Popover

OBR.popover

](/extensions/apis/popover)

[

## 📄️ Room

OBR.room

](/extensions/apis/room)

[

## 🗃️ Scene

5 items

](/extensions/apis/scene/)

[

## 📄️ Theme

OBR.theme

](/extensions/apis/theme)

[

## 📄️ Tool

OBR.tool

](/extensions/apis/tool)

[

## 📄️ Viewport

OBR.viewport

](/extensions/apis/viewport)

[

Previous

Initiative Tracker

](/extensions/examples/initiative-tracker)[

Next

Action

](/extensions/apis/action)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c314c141c25b1b4',t:'MTc2OTI3NjIyOQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();