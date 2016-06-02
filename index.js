module.exports = function expressLib(_) {
    _ = _ || require('lodash')

    const isNumeric = (num) => !_.isNaN(_.toNumber(num))

    const hasShape = (props) => (req, res, next) => {
        const test = _(props)
            .filter((type, p) => !!req.body[p] && typeof type() === typeof req.body[p])
            .value()

        if (test.length !== _.size(props)) {
            throw new Error(`Wrong property | shape`)
        }

        return next()
    }

    const hasShapeComplex = (props) => (req, res, next) => {
        _(props).filter((t, prop) => {

            if (t.required && (!!req[t.from][prop]) === false) {
                throw new Error(`Missing required property '${prop}' in req.${t.from} `)
            }

            if (req[t.from][prop] && typeof t.type() !== typeof req[t.from][prop]) {
                if (typeof t.type !== Number && !isNumeric(req[t.from][prop])) {
                    throw new Error(`Wrong type property '${prop}' in req.${t.from}, required ${t.type.name}`)
                }
            }

            return true
        }).value()

        return next()
    }

    const onError = (res) => (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json({status: 'ok'})
    }

    return {
        hasShape,
        hasShapeComplex,
        onError
    }
}
