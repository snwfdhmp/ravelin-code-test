### Example of resize event request:
```
{
	"websiteURL": "http://ravelin.com",
	"sessionId": "123-123-123-123123123",
	"eventType": "resize",
	"resizeFrom": {
		"width": "786",
		"heigth": "789"
	},
	"resizeTo": {
		"width": "450",
		"heigth": "456"
	}
}
```

### Example of copyAndPaste event request:
```
{
  "eventType": "copyAndPaste",
  "websiteUrl": "https://ravelin.com",
  "sessionId": "123123-123123-123123123",
  "pasted": true,
  "formId": "inputCardNumber"
}
```
