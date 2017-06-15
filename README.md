# WAT

[![Greenkeeper badge](https://badges.greenkeeper.io/syzer/type-safety.svg)](https://greenkeeper.io/)

Add type safety to any route you have in your `express.js`

Auto Generate API docs, that would be in sync with current project version.

# Installation

```bash
npm install --save type-safety
```

# Usage

```js
const hasShape = require('type-safety')
const router = express.Router()

//.. later
router
    .post('/api/route', hasShape({
        text: String,
        sentiment: String
    }), routeHandler)
    .post('/api/route2', hasShape({
        text: String,
        lang: String
    }), route2Handler)

//.. where  routeHandler, and route2Handler are plain express routes

function routeHandler(req, res, next) {
    // its safe to use
    console.log(req.body.text)
}
```
