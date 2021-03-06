# Challenge

Build a version controlled key-value store with a HTTP API we can query that from. The API needs to be able to:
- Accept a key(string) and value(some json blob/string) {"key" : "value"} and store them. If an existing key is sent, the value should be updated
- Accept a key and return the corresponding latest value
- When given a key AND a timestamp, return whatever the value of the key at the time was.

Assume only GET and POST requests for simplicity.


## Explanation 

### GET
Endpoint  `/object/mykey`

Response 
```json
{
    "value": "value1"
}
```

### POST
Endpoint  `/object`

Body 
```json
{
    "mykey" : "value2"
}
```
Time: 6.05 pm

Response 
```json
{
    "key": "mykey",
    "value": "value2",
    "timestamp": "<time>"
}
```
- Where time is timestamp of the new value (6.05pm)

### GET
Endpoint  `/object/mykey`

Response 
```json
{
    "value": "value2"
}
```

### GET
Endpoint  `/object/mykey?timestamp=1440568980` 
- Notice that timestamp=1440568980 [6.03pm] here is not exactly 6.00pm

Response 
```json
{
    "value": "value1"
}
```
- still return value1 , because value2 was only added at 6.05pm
- All timestamps are unix timestamps according UTC timezone.


# Installing and Using
- Clone this repository
- `cd keyvalueapi`
- `npm install`
- `npm test //for running test cases`
- `npm start //for starting the appication`

Make sure you have a postgres database setup and credentials are given in a `.env` file.

### POST
Endpoint `https://keyvalueapi.herokuapp.com/api/object`

Body
```json
{
    "key" : "9d5ed769-a97a-47d5-8acb-0586f1cf660d",
    "value": {
        "name": "Node.js",
         "version": "v10.15.3"
    }
}
```

Response
```json
{
    "status": "success",
    "message": "Successfully saved data",
    "data": {
        "id": 1,
        "key": "9d5ed769-a97a-47d5-8acb-0586f1cf660d",
        "value": {
            "name": "Node.js",
            "version": "v10.15.3"
        },
        "timestamp": "2019-12-06T20:52:06.000Z"
    }
}
```

### GET
Endpoint `https://keyvalueapi.herokuapp.com/api/object/9d5ed769-a97a-47d5-8acb-0586f1cf660d`

Response
```json
{
    "status": "success",
    "message": "Found data",
    "data": {
        "id": 1,
        "key": "9d5ed769-a97a-47d5-8acb-0586f1cf660d",
        "value": {
            "name": "Node.js",
            "version": "v10.15.3"
        },
        "timestamp": "2019-12-06T20:52:06.000Z"
    }
}
```

### GET
Endpoint `https://keyvalueapi.herokuapp.com/api/object/9d5ed769-a97a-47d5-8acb-0586f1cf660d?timestamp=1575666271`

Response
```json
{
    "status": "success",
    "message": "Found data",
    "data": {
        "id": 1,
        "key": "9d5ed769-a97a-47d5-8acb-0586f1cf660d",
        "value": {
            "name": "Node.js",
            "version": "v10.15.3"
        },
        "timestamp": "2019-12-06T20:52:06.000Z"
    }
}
```
