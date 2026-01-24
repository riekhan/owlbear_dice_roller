# Getting Started | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/getting-started/

---

  Getting Started | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
    
*   [Reference](/extensions/reference/)
    

*   [](/)
*   Getting Started

On this page

# Getting Started

Extensions in Owlbear Rodeo allow you to embed your custom code to extend the functionality of the site.

## Architecture Overview[​](#architecture-overview "Direct link to heading")

The entry point to an extension is a `manifest.json` file which describes information about the extension.

The [manifest file](/extensions/reference/manifest) contains general information such as the name of the extension, the author, version number, etc.

It also contains information on how to load the extension such as a background page url or details on the extension action.

Generally the manifest file for your extension is hosted alongside the code for your extension. Users can then load your extension by linking to this manifest file in the UI of Owlbear Rodeo.

## Interface Overview[​](#interface-overview "Direct link to heading")

Below is a breakdown of the main interface of Owlbear Rodeo.

Each number is described below the image.

![UI Overview](/assets/images/overview-c8de5eddcd4be4a58b503a132c1c32e5.jpg)

### 1\. Action[​](#1-action "Direct link to heading")

The extension action is shown in the top left of a room. Clicking on this action will open a popover to display your custom site.

The details for the extension action are described in the [manifest](/extensions/reference/manifest#manifestaction).

### 2\. Action Popover[​](#2-action-popover "Direct link to heading")

When an action is clicked your site will be embedded into Owlbear Rodeo as an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

For example the action for the dice extension will show a dice tray when clicked.

More information about controlling the extension action can be found [here](/extensions/apis/action).

### 3\. Context Menu[​](#3-context-menu "Direct link to heading")

A extension can create a custom context menu item that will be shown when an item is selected.

More information about custom context menus can be found [here](/extensions/apis/context-menu).

### 4\. Popover[​](#4-popover "Direct link to heading")

A extension can open a popover to show a website as custom UI.

More information about popovers can be found [here](/extensions/apis/popover).

### 5\. Tool[​](#5-tool "Direct link to heading")

A extension can create a custom [tool](/extensions/apis/tool#tool-1) in the toolbar.

When clicked that tool will be activated.

The toolbar will only be shown when a scene is open. This means any items added to the toolbar will only be available when a scene is open and ready.

### 6\. Tool Mode[​](#6-tool-mode "Direct link to heading")

To respond to interaction events you can define a [tool mode](/extensions/apis/tool#toolmode).

A tool mode sits on the left side of the tool menu.

Once this mode is activated you will receive click and drag events that can be responded to.

### 7\. Tool Action[​](#7-tool-action "Direct link to heading")

If you just need a button in the tool menu you can use a [tool action](/extensions/apis/tool#toolaction).

A tool action sits on the right side of the tool menu.

Once clicked you will receive an `onClick` event for that action.

## SDK[​](#sdk "Direct link to heading")

The [Owlbear Rodeo SDK](https://github.com/owlbear-rodeo/sdk) allows your extension to communicate with Owlbear Rodeo.

The SDK is written in typescript and is available as a module to use in your extension.

For an example of using the SDK see the [basic tutorial](/extensions/tutorial-hello-world/).

[

Next

Tutorial - Hello World

](/extensions/tutorial-hello-world/)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c313aa1cc6f6799',t:'MTc2OTI3NTUxNQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();