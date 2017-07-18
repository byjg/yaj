## yo().request(method, url, data, success, error) 

Makes an ajax request. This is the most customizable option. 

```javascript
yo().request({
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