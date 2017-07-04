# FAQ

### Why do you create the YAJ library?

I create the YAJ for two reasons:

- I needed created a piece of javascript that was not jQuery dependant
- I would not like to rely on the DOMElement because browser incompatibilities

Because of this I resolve to create my own library.

### Why width(), height() and other are not implemented?

The main objective of this library is not to *recreate* all jQuery features but
create a lightweigth library solving the problems of browser compatibilities (polyfill) and 
looks like to jQuery.

Based on this point of view every method or property that's there is no issue between browsers we recommend use
the HTML feature directly. 

*properties*

Use `yo(selector).attr()`

*CSS/Style*

Use `yo(selector).css()`

*everything else*

Use `yo(selector).el()` to get the HTMLElement and manipulate it directly.

