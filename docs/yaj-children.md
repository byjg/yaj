---
sidebar_position: 24
---

# yo(selector).children(data)

Return the first level child nodes of the current selector. Optionally can filter using a selector.

```html
<ul>
    <li class="a"></li>
    <li class="b">
        <li class="b1">
            <li class="b1-1"></li>
            <li class="b1-2"></li>
            <li class="special">level-b</li>
        </li>
        <li class="b2"></li>
    </li>
    <li class="c">
        <li class="special">level-c</li>
    </li>
</ul>

<script>
// This will return two nodes:
// <li class="b1"> and <li class="b2">
yo('.b').children();

// Optinally you can filter:
yo('.b').children('.b2');
</script>
```