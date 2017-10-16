## yo(selector).find(data)

Find some element from the current selector  

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
// This will return only the node:
// <li class="special">level-b</li>
yo('.b').find('.special');

// It differs from the command below because will be selected two nodes 
yo('.special');
</script>
```

Go to [index](index.md)