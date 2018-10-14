var fs = require('fs')


function pathR(path, obj, n = -1) {
    if (n == -1) {
        n = path.length - 1
        path = path.reverse()
    }
    
    if (n >0) {
        if (obj[path[n]]) {
            return pathR(path, obj[path[n]], n-1)
        } else {
            obj[path[n]] = {}
            return pathR(path, obj[path[n]], n-1)
        }
    } 


    if (!obj[path[n]]) {
        obj[path[n]] = {}
    }
    return obj[path[n]]
}

function save(path, userData) {
    let storeData = fs.readFileSync('./data/data.json')
    storeData = JSON.parse(storeData)
    console.log(storeData)
    let pathArray = path.split('/').splice(1)
    
    let ref
    if (pathArray.length == 1) {
        ref = storeData
    } else {
        ref = pathR(pathArray, storeData)
    }
    console.log('what is ref?', ref, userData)
    ref[pathArray[pathArray.length - 1]] = userData
    
    fs.writeFileSync('./data/data.json', JSON.stringify(storeData))
}

function get(path) {
    let storeData = fs.readFileSync('./data/data.json')
    storeData = JSON.parse(storeData)
    try {
       return path.split('/').splice(1).reduce((a, b) => {
            return a[b]
        }, storeData)
    } catch (e) {
        return e
    }
}

let ds = {
    save: save,
    get: get
}
module.exports = ds