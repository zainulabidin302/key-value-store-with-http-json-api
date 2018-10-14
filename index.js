const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const datastore = require('./ds')

let store_get = (path, cb) => {
    cb(200, {
        'data': datastore.get(path) 
    })
}

let store_post = (path, data, cb) => {
    datastore.save(path, data)
    cb(200, {
        'path': path,
        'done': true
    })
}

let handle = (req, res) => {

    let parsedUrl = url.parse(req.url, true)

    let route = parsedUrl.pathname.replace(/^\/|\/$/, '')
    
    let decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })
    req.on('end', () => { 
        handleRoute((statusCode, data) => {
            res.writeHead(statusCode)
            res.end(JSON.stringify(data))
        }, route, req.method.toLowerCase(), buffer)
    })
    req.on('error', (err) => {
        res.writeHead(500)
        res.end(err)
    })
}

let handleRoute = (cb, name, method, data) => {
    if (name.match(/^store/)) {
        if (method == 'get') {
            store_get(name, cb)
        } else if (method == 'post') {
            console.log(JSON.stringify(data))

            console.log(
                `name: ${name} `
            )
            store_post(name, data, cb)
        }
    } else {
        return cb(400, {'errorMessage': 'Route not found'})
    }
}
http.createServer(handle).listen(3000, () => console.log('listening at 3000'))
