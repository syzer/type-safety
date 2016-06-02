const tap = require('tap')
const lib = require('./index')()

// yes, i'm bored
tap.test('simple API check', t => {
    const shape = lib.hasShape({
        text: String,
        sentiment: String
    })

    const req = {
        body: {
            text: 'volkswagen',
            sentiment: 'much wow!'
        }
    }

    shape(req, null, () => {
        t.pass('volkswagen')
        t.end('ok')
    })

})

tap.test('more complex API description', t => {
    const shape = lib.hasShapeComplex({
        name: {
            type: String,
            required: true,
            from: 'params'
        },
        // binary: {
        //     type: Boolean,
        //     required: true,
        //     from: 'params'
        // },
        text: {
            type: String,
            required: true,
            from: 'body'
        },
        sentiment: {
            type: Boolean,
            required: false,
            from: 'params'
        }
    })

    const req = {
        params: {
            name: 'To complex',
            binary: false
        },
        body: {
            text: 'volkswagen',
            sentiment: 'much wow!'
        }
    }

    shape(req, null, () => {
        t.pass('volkswagen')
        t.end('ok')
    })
})
