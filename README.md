### in-memory queue that lets you enqueue/dequeue items in constant time using an api endpoint

this is a simple in memory queue that lets you enqueue/dequeue items in constant time using an api endpoint. the queue is implemented using a doubly linked list. the queue is thread safe and can be used by multiple threads concurrently.

this is really just something i did out of boredom, though it could be useful in some cases. i'll probably use it in the future for something i guess.

#### testing

to test you can run the following commands:

```bash
$ cd queue-backend
$ go run server.go

# in another terminal
$ cd queue-frontend
$ npm run start
```

after opening the link you get from running `npm run start` you can test the queue by enqueuing/dequeuing items.

theres initall two links you can press, `Enqueue` to enqueue an person and `Dequeue` to dequeue an item. you can also press the

- Enqueue will allow you to fill out data to add a person to a queue, after you add the button to add will be disabled though, so youll have to open up multiple tabs to add several people.

- Dequeue will remove the first person in the queue and return it to you in a structred format.

while i chose this example for a use case, you can also use the api to enqueue/dequeue any type of data you want.

```bash

then you can open your browser and go to `http://localhost:3000` to test the queue.
```

## peace :P
