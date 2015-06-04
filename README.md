# react-comments

A React app that allows visitors to post comments.

Based on the tutorial found at
http://facebook.github.io/react/docs/tutorial.html.

## How to use

```
git clone git@github.com:thinkswan/react-comments.git
mv comments.json-example comments.json
npm install
npm start
```

This will start a server at http://localhost:5000/.

## How it works

The server (`server.js`) runs an Express app that exposes two routes:

1. `GET /comments.json`: Parse the `comments.json` file and render its contents
1. `POST /comments.json`: Write a new comment to the `comments.json` file

The client (`public/js/app.js`) is a React app that polls for changes to the
`comments.json` file on the server and updates the UI via React's `setState()`
method.

State is maintained by storing previous comments in the `comments.json` file.

## License

MIT
