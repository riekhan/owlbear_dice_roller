# ImageBuilder | Owlbear Rodeo | Documentation

Source: https://docs.owlbear.rodeo/extensions/reference/builders/image

---

  ImageBuilder | Owlbear Rodeo | Documentation    !function(){function t(t){document.documentElement.setAttribute("data-theme",t)}var e=function(){var t=null;try{t=localStorage.getItem("theme")}catch(t){}return t}();t(null!==e?e:"dark")}()

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
    
    *   [BoundingBox](/extensions/reference/bounding-box)
    *   [Builders](/extensions/reference/builders/)
        
        *   [CurveBuilder](/extensions/reference/builders/curve)
        *   [ImageUploadBuilder](/extensions/reference/builders/image-upload)
        *   [ImageBuilder](/extensions/reference/builders/image)
        *   [GenericItemBuilder](/extensions/reference/builders/item)
        *   [LabelBuilder](/extensions/reference/builders/label)
        *   [LightBuilder](/extensions/reference/builders/light)
        *   [LineBuilder](/extensions/reference/builders/line)
        *   [PathBuilder](/extensions/reference/builders/path)
        *   [PointerBuilder](/extensions/reference/builders/pointer)
        *   [RulerBuilder](/extensions/reference/builders/ruler)
        *   [SceneUploadBuilder](/extensions/reference/builders/scene-upload)
        *   [ShapeBuilder](/extensions/reference/builders/shape)
        *   [TextBuilder](/extensions/reference/builders/text)
        *   [WallBuilder](/extensions/reference/builders/wall)
    *   [Dynamic Fog](/extensions/reference/dynamic-fog)
    *   [Effects](/extensions/reference/effects/)
    *   [Filters](/extensions/reference/filters)
    *   [Items](/extensions/reference/items/)
        
    *   [Manifest](/extensions/reference/manifest)
    *   [Math](/extensions/reference/math/)
        
    *   [Matrix](/extensions/reference/matrix)
    *   [Metadata](/extensions/reference/metadata)
    *   [Permission](/extensions/reference/permission)
    *   [Player](/extensions/reference/player)
    *   [TextContent](/extensions/reference/text-content)
    *   [Vector2](/extensions/reference/vector2)
    *   [Vector3](/extensions/reference/vector3)

*   [](/)
*   [Reference](/extensions/reference/)
*   [Builders](/extensions/reference/builders/)
*   ImageBuilder

On this page

# ImageBuilder

A builder for the [Image](/extensions/reference/items/image) item.

Extends [GenericItemBuilder](/extensions/reference/builders/item)

**Example**

```
import OBR, { buildImage } from "@owlbear-rodeo/sdk";const item = buildImage(  {    height: 300,    width: 300,    url: "https://www.example.com/test.png",    mime: "image/png",  },  { dpi: 300, offset: { x: 150, y: 150 } })  .plainText("Player 1")  .build();OBR.scene.items.addItems([item]);
```

# Reference

### `constructor`[​](#constructor "Direct link to heading")

```
buildImage(image, grid);
```

Create an image builder with the given image and grid.

**Parameters**

NAME

TYPE

DESCRIPTION

image

[ImageContent](/extensions/reference/items/image#imagecontent)

The image

grid

[ImageGrid](/extensions/reference/items/image#imagegrid)

The image grid

* * *

## Methods[​](#methods "Direct link to heading")

### `text`[​](#text "Direct link to heading")

```
text(text);
```

Set the images [`text content`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

text

[TextContent](/extensions/reference/text-content)

The content of the images text

Returns the current builder.

* * *

### `textItemType`[​](#textitemtype "Direct link to heading")

```
textItemType(textItemType);
```

Set the images [`text item type`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

textItemType

"LABEL" | "TEXT"

The type of the images text

Returns the current builder.

* * *

### `textWidth`[​](#textwidth "Direct link to heading")

```
textWidth(width);
```

Set the image texts [`width`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

width

[TextSize](/extensions/reference/text-content#textsize)

The text width

Returns the current builder.

* * *

### `textHeight`[​](#textheight "Direct link to heading")

```
textHeight(height);
```

Set the image texts [`height`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

height

[TextSize](/extensions/reference/text-content#textsize)

The text height

Returns the current builder.

* * *

### `richText`[​](#richtext "Direct link to heading")

```
richText(richText);
```

Set the image texts [`richText`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

richText

[RichText](/extensions/reference/text-content#richtext)

The rich text

Returns the current builder.

* * *

### `plainText`[​](#plaintext "Direct link to heading")

```
plainText(plainText);
```

Set the image texts [`plainText`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

plainText

string

The plain text

Returns the current builder.

* * *

### `textType`[​](#texttype "Direct link to heading")

```
textType(textType);
```

Set the image texts [`textType`](/extensions/reference/items/image).

**Parameters**

NAME

TYPE

DESCRIPTION

textType

"PLAIN" | "RICH"

The text type

Returns the current builder.

* * *

### `textPadding`[​](#textpadding "Direct link to heading")

```
textPadding(padding);
```

Set the image text styles [`padding`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

padding

number

The text padding

Returns the current builder.

* * *

### `fontFamily`[​](#fontfamily "Direct link to heading")

```
fontFamily(fontFamily);
```

Set the image text styles [`fontFamily`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

fontFamily

string

The text font family

Returns the current builder.

* * *

### `fontSize`[​](#fontsize "Direct link to heading")

```
fontSize(fontSize);
```

Set the image text styles [`fontSize`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

fontSize

number

The text font size

Returns the current builder.

* * *

### `fontWeight`[​](#fontweight "Direct link to heading")

```
fontWeight(fontWeight);
```

Set the image text styles [`fontWeight`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

fontWeight

number

The text font weight

Returns the current builder.

* * *

### `textAlign`[​](#textalign "Direct link to heading")

```
textAlign(textAlign);
```

Set the image text styles [`textAlign`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

textAlign

"LEFT" | "CENTER" | "RIGHT"

The text horizontal alignment

Returns the current builder.

* * *

### `textAlignVertical`[​](#textalignvertical "Direct link to heading")

```
textAlignVertical(textAlignVertical);
```

Set the image text styles [`textAlignVertical`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

textAlignVertical

"BOTTOM" | "MIDDLE" | "TOP"

The text vertical alignment

Returns the current builder.

* * *

### `textFillColor`[​](#textfillcolor "Direct link to heading")

```
textFillColor(fillColor);
```

Set the image text styles [`fillColor`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

fillColor

string

The texts fill color

Returns the current builder.

* * *

### `textFillOpacity`[​](#textfillopacity "Direct link to heading")

```
textFillOpacity(fillOpacity);
```

Set the image text styles [`fillOpacity`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

fillOpacity

number

The texts fill opacity

Returns the current builder.

* * *

### `textStrokeColor`[​](#textstrokecolor "Direct link to heading")

```
textStrokeColor(strokeColor);
```

Set the image text styles [`strokeColor`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

strokeColor

string

The texts stroke color

Returns the current builder.

* * *

### `textStrokeOpacity`[​](#textstrokeopacity "Direct link to heading")

```
textStrokeOpacity(strokeOpacity);
```

Set the image text styles [`strokeOpacity`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

strokeOpacity

number

The texts stroke opacity

Returns the current builder.

* * *

### `textStrokeWidth`[​](#textstrokewidth "Direct link to heading")

```
textStrokeWidth(strokeWidth);
```

Set the image text styles [`strokeWidth`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

strokeWidth

number

The texts stroke width

Returns the current builder.

* * *

### `textLineHeight`[​](#textlineheight "Direct link to heading")

```
textLineHeight(lineHeight);
```

Set the image text styles [`lineHeight`](/extensions/reference/text-content#textstyle).

**Parameters**

NAME

TYPE

DESCRIPTION

lineHeight

number

The texts line height

Returns the current builder.

* * *

### `build`[​](#build "Direct link to heading")

```
build();
```

Returns the final [Image](/extensions/reference/items/image) item.

* * *

[

Previous

ImageUploadBuilder

](/extensions/reference/builders/image-upload)[

Next

GenericItemBuilder

](/extensions/reference/builders/item)

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

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.\_\_CF$cv$params={r:'9c314db17db6eb1e',t:'MTc2OTI3NjI5NQ=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')\[0\].appendChild(a);";b.getElementsByTagName('head')\[0\].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();