## yo().request(method, url, data, success, error) 

Makes an ajax request

```javascript
yo().request(
    'PUT',
    'http://someurl',
    { payload: "value" },
    function (data) {
        console.log('Success!' + data);
    },
    function (data) {
        console.log('Error!' + data);
    }
);
```
## yo().get(url, data, success, error) 

It is a shortcut for yo().request('GET'); 

## yo().post(url, data, success, error) 

It is a shortcut for yo().request('POST'); 

## yo().getJson(url, data, success, error) 

It is a shortcut for yo().request('GET'); The value of data passed 
to the succefull function will be converted to JSON. 

## yo().postJson(url, data, success, error) 

It is a shortcut for yo().request('POST'); The value of data passed 
to the succefull function will be converted to JSON. 


Go to [index](README.md)