## Yaj.request(method, url, data, success, error) 

Makes an ajax request. This is the most customizable option. 

```javascript
Yaj.request({
    method: 'PUT',
    url: 'http://someurl',
    headers: {},
    data: { payload: "value" },
    success: function (data, status, info) {
        console.log('Success!' + data);
    },
    error: function (data, status, info) {
        console.log('Error!' + data);
    },
    uploadProgress: function (e) {
        if (e.lengthComputable) {
            console.log(e.loaded / e.total);
        }        
    },
    downloadProgress: function (e) {
        if (e.lengthComputable) {
            console.log(e.loaded / e.total);
        }        
    }
});
```
## Yaj.get(url, data, success, error) 

It is a shortcut for Yaj.request('GET'); 

```javascript
Yaj.get(
    'http://www.example.com/rest',
    null,
    function (data) {
        console.log(data);
    }
)
```

## Yaj.post(url, data, success, error) 

It is a shortcut for Yaj.request('POST'); 

## Yaj.getJson(url, data, success, error) 

It is a shortcut for Yaj.request('GET'); The value of data passed 
to the succefull function will be converted to JSON. 

## Yaj.postJson(url, data, success, error) 

It is a shortcut for Yaj.request('POST'); The value of data passed 
to the succefull function will be converted to JSON. 


Go to [index](toc.md)