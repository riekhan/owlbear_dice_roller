# Create Your Site | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/tutorial-hello-world/create-your-site

---

  Create Your Site | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
*   Create Your Site

On this page

# Create Your Site

## Prerequisites[​](#prerequisites "Direct link to heading")

To create this hello world app we're going to use a build tool called [Vite](https://vitejs.dev/).

Node.js Required

This will require [Node.js](https://nodejs.org/en/) version 14.18+, 16+ to be installed.

## Create The Project[​](#create-the-project "Direct link to heading")

We're going to be creating a javascript project with the Vite vanilla template.

To do that either follow the instructions [here](https://vitejs.dev/guide/) or run:

```
$ npm create vite@latest
```

You can then follow the prompts to create your project like this:

```
✔ Project name: … hello-world✔ Select a framework: › Vanilla✔ Select a variant: › JavaScript
```

You should now have a new project created and can run:

```
$ cd hello-world$ npm install$ npm run dev
```

Which will install and start the project.

Opening the browser to `http://localhost:5173/` you should now see a starter Vite page.

![Vite Starter](/assets/images/starter-cbc901e1e1b86b6f56b74565ec52d83b.jpg)

## Enable CORS for Developement[​](#enable-cors-for-developement "Direct link to heading")

Since Vite `v6.0.9` CORS is disabled for the development server. CORS will be needed so that Owlbear Rodeo can access your site.

Create a new `vite.config.js` file in the root of your project:

/vite.config.js

```
import { defineConfig } from "vite";// https://vite.dev/config/export default defineConfig({  server: {    cors: {      origin: "https://www.owlbear.rodeo",    },  },});
```

[

Previous

Tutorial - Hello World

](/extensions/tutorial-hello-world/)[

Next

Create Your Manifest

](/extensions/tutorial-hello-world/create-your-manifest)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c313dc97fdb7ad6',t:'MTc2OTI3NTY0NA=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();