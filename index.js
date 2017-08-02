var data = require('./data.json')
var tabletop = require('tabletop') // TODO fetch from spreadsheet

var monodb = require('mongodb').MongoClient

// TODO give this a CLI
// var argv = require('minimist')(process.argv.slice(2))
// node index.js --ssk <KEY> --mdburl <URL> --db <DB> --col <COL>

monodb.connect('mongodb://localhost:27017/vermeer', function (err, db) {
  var col = db.collection('visits')
  col.insertMany(bestowIdUpon(data), function (err, resp) {
    if (err) return console.log(err)
    console.log('Inserted:', resp.insertedCount)
    db.close()
  })
})

function bestowIdUpon (data) {
  data.forEach(function (d, i) {
    // TODO make this BSON and better
    d._id = i + 1
  })
  return data
}
