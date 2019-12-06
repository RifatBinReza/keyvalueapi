Challenge
Build a version controlled key-value store with a HTTP API we can query that from. The API needs to be able to:

Accept a key(string) and value(some json blob/string) {"key" : "value"} and store them. If an existing key is sent, the value should be updated
Accept a key and return the corresponding latest value
When given a key AND a timestamp, return whatever the value of the key at the time was.
Assume only GET and POST requests for simplicity.

Explanation
GET
Endpoint /object/mykey

Response

{
    "value": "value1"
}
POST
Endpoint /object

Body

{
    "mykey" : "value2"
}
Time: 6.05 pm

Response

{
    "key": "mykey",
    "value": "value2",
    "timestamp": "<time>"
}
Where time is timestamp of the new value (6.05pm)
GET
Endpoint /object/mykey

Response

{
    "value": "value2"
}
GET
Endpoint /object/mykey?timestamp=1440568980

Notice that timestamp=1440568980 [6.03pm] here is not exactly 6.00pm
Response

{
    "value": "value1"
}
still return value1 , because value2 was only added at 6.05pm
All timestamps are unix timestamps according UTC timezone.