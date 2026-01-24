# Install the SDK | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/tutorial-hello-world/install-the-sdk

---

  Install the SDK | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   Install the SDK

On this page

# Install the SDK

Now that we have our code running as a extension to Owlbear Rodeo we want to be able to interact with the site.

To do this we'll install the [Owlbear Rodeo SDK](https://github.com/owlbear-rodeo/sdk).

Inside your `hello-world` project run:

```
$ npm install @owlbear-rodeo/sdk
```

This will install the SDK using [NPM](https://www.npmjs.com/).

## Interact with the SDK[​](#interact-with-the-sdk "Direct link to heading")

To test our interaction with the SDK we're going to show a notification every time the counter in the Vite example changes.

Edit the `counter.js` file in the src folder of your `hello-world` project to import the SDK and call `OBR.notification.show` when the counter changes:

src/counter.js

```
import OBR from "@owlbear-rodeo/sdk";export function setupCounter(element) {  let counter = 0;  const setCounter = (count) => {    counter = count;    element.innerHTML = `count is ${counter}`;    OBR.notification.show(`count is ${counter}`);  };  element.addEventListener("click", () => setCounter(counter + 1));  setCounter(0);}
```

Now whenever you click the count button a notification should show in the Owlbear Rodeo interface.

![Notification](/assets/images/notification-a29719f9b9255ec6eb44cccb27623647.jpg)

[

Previous

Install Your Extension

](/extensions/tutorial-hello-world/install-your-extension)[

Next

What's Next?

](/extensions/tutorial-hello-world/whats-next)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c313e16482e8627',t:'MTc2OTI3NTY1Ng=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();