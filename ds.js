var fs = require('fs')



function save(path, data) {
    let data = fs.readFileSync('./data/data.json')
    
    let x = path.split('/').reduce((a, b) => {
        if (!a[b]) {
            a[b] = {}
        }
        return a[b]
    }, data)


    
    pathItems.forEach(p => {
        if (typeof(data[p]) === 'undefined') {
            data[p] = ''
        }
    })
}

function get(path) {

}

let ds = {
    save: save,
    get: get
}
module.exports = ds