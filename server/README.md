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
  "websiteURL": "https://ravelin.com",
  "sessionId": "123123-123123-123123123",
  "pasted": true,
  "formId": "inputCardNumber"
}
```

### Explanation of the solution
The purpose of the exercise is to make a server that receive only POST request. We can for example imagine a website that want to analyse the behavior of the users on their website.

The requests are only sent at some events occurs.

On the backend I used a *key/value authentification* (<- key/value-pair identification) so that we can identify a user this way
`Clients[websiteURL][sessionId]`
This way I can identify and complete the structure of a client easily

I handled the different events by creating different routes
These routes are in charge of building the struct for the good client depending of the websiteURL and the sessionId

Memory optimization is made by using pointers instead of storing directly the objects in the map <- tu peux pas dire ça, c'est pas de l'optimisation, c'est une best practice

Une optimisation aurait été par exemple de ne pas stocker websiteURL et sessionId dans l'objet (seulement dans les clés de la map), de définir ta structure de sorte à ce qu'elle utilise le moins d'octets possibles (et tu gg si t'arrive à faire en sorte d'optimiser à la fois pour les architectures 32 et 64 bits)

### Tests
I could test the backend thanks to [Postman](https://www.getpostman.com/) avalaible in the `tests` folder.
