# Create Your Manifest | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/tutorial-hello-world/create-your-manifest

---

  Create Your Manifest | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
    
    *   [Create Your Site](/extensions/tutorial-hello-world/create-your-site)
    *   [Create Your Manifest](/extensions/tutorial-hello-world/create-your-manifest)
    *   [Install Your Extension](/extensions/tutorial-hello-world/install-your-extension)
    *   [Install the SDK](/extensions/tutorial-hello-world/install-the-sdk)
    *   [What's Next?](/extensions/tutorial-hello-world/whats-next)
*   [Tutorial - Initiative Tracker](/extensions/tutorial-initiative-tracker/)
    
*   [Tutorial - Custom Tool](/extensions/tutorial-custom-tool/)
    
*   [Tutorial - Sharing your Extension](/extensions/tutorial-sharing-your-extension/)
    
*   [Examples](/extensions/examples/)
    
*   [APIs](/extensions/apis/)
    
*   [Reference](/extensions/reference/)
    

*   [](/)
*   [Tutorial - Hello World](/extensions/tutorial-hello-world/)
*   Create Your Manifest

On this page

# Create Your Manifest

## Add an Icon[​](#add-an-icon "Direct link to heading")

Before we add our extension manifest let's add an icon for the extension action.

Create a new `icon.svg` file in the public folder of your `hello-world` project:

public/icon.svg

```
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">  <circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="#000" stroke-width="2" /></svg>
```

## Add a Manifest[​](#add-a-manifest "Direct link to heading")

An Owlbear Rodeo manifest tells Owlbear Rodeo how to load your extension.

We'll create a simple manifest that allows us to load our Vite starter site as an embedded popover in Owlbear Rodeo.

Create a new `manifest.json` file in the public folder of your `hello-world` project:

public/manifest.json

```
{  "name": "Hello, World!",  "version": "1.0.0",  "manifest_version": 1,  "action": {    "title": "Hello, World!",    "icon": "/icon.svg",    "popover": "/",    "height": 600,    "width": 400  }}
```

For more information about the manifest format for Owlbear Rodeo see [here](/extensions/reference/manifest).

[

Previous

Create Your Site

](/extensions/tutorial-hello-world/create-your-site)[

Next

Install Your Extension

](/extensions/tutorial-hello-world/install-your-extension)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c313de36c9ded3d',t:'MTc2OTI3NTY0OA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();