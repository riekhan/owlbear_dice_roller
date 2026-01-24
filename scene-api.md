# Scene | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/apis/scene/

---

  Scene | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   Scene

On this page

# Scene

## `OBR.scene`[​](#obrscene "Direct link to heading")

A scene is an infinite space for you to lay out images, drawings, fog and more.

# Reference

## Methods[​](#methods "Direct link to heading")

### `isReady`[​](#isready "Direct link to heading")

```
async isReady()
```

Returns true if there is a scene opened and it is ready to interact with.

* * *

### `onReadyChange`[​](#onreadychange "Direct link to heading")

```
onReadyChange(callback);
```

**Parameters**

NAME

TYPE

DESCRIPTION

callback

(ready: boolean) => void

A callback for when the current scene changes its ready state

Returns a function that when called will unsubscribe from change events.

**Example**

```
/** * Use an `onReadyChange` event with a React `useEffect`. * `onReadyChange` returns an unsubscribe event to make this easy. */useEffect(  () =>    OBR.scene.onReadyChange((ready) => {      if (ready) {        // interact with the scene      }    }),  []);
```

* * *

### `getMetadata`[​](#getmetadata "Direct link to heading")

```
async getMetadata()
```

Get the current metadata for this scene.

returns a [Metadata](/extensions/reference/metadata) object.

* * *

### `setMetadata`[​](#setmetadata "Direct link to heading")

```
async setMetadata(update)
```

Update the metadata for this scene.

See [Metadata](/extensions/reference/metadata) for best practices when updating metadata.

**Parameters**

NAME

TYPE

DESCRIPTION

update

Partial<[Metadata](/extensions/reference/metadata)\>

A partial update to this scenes metadata. The included values will be spread among the current metadata to avoid overriding other values.

* * *

### `onMetadataChange`[​](#onmetadatachange "Direct link to heading")

```
onMetadataChange(callback);
```

**Parameters**

NAME

TYPE

DESCRIPTION

callback

(metadata: [Metadata](/extensions/reference/metadata)) => void

A callback for when the metadata changes

Returns a function that when called will unsubscribe from change events.

**Example**

```
/** * Use an `onMetadataChange` event with a React `useEffect`. * `onMetadataChange` returns an unsubscribe event to make this easy. */useEffect(  () =>    OBR.scene.onMetadataChange((metadata) => {      // React to metadata changes    }),  []);
```

* * *

[

## 📄️ Fog

OBR.scene.fog

](/extensions/apis/scene/fog)

[

## 📄️ Grid

OBR.scene.grid

](/extensions/apis/scene/grid)

[

## 📄️ History

OBR.scene.history

](/extensions/apis/scene/history)

[

## 📄️ Items

OBR.scene.items

](/extensions/apis/scene/items)

[

## 📄️ Local

OBR.scene.local

](/extensions/apis/scene/local)

[

Previous

Room

](/extensions/apis/room)[

Next

Fog

](/extensions/apis/scene/fog)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c314c4a6894760e',t:'MTc2OTI3NjIzOA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();