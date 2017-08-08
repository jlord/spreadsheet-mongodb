var data = require('./data.json')
// var tabletop = require('tabletop') // TODO fetch from spreadsheet

var mongodb = require('mongodb').MongoClient

// TODO give this a CLI
// var argv = require('minimist')(process.argv.slice(2))
// node index.js --ssk <KEY> --mdburl <URL> --db <DB> --col <COL>

mongodb.connect('mongodb://localhost:27017/vermeer', function (err, db) {
  if (err) return console.log(err)
  var col = db.collection('visits')
  // TODO drop collection if it's there
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
    // TODO make booleans booleans and numbers numbers
  })
  return data
}
