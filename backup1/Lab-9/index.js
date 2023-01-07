const fs = require('fs')
const path = require('path')
var bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 9000
app.use(bodyParser.urlencoded({extended: false}))

app.post('/addreview', function (req, res) { console.log(req.body);
    var Name=req.body.pname
    var Category=req.body.Category
    var Link=req.body.Link
    var Review=req.body.Review

    var obj = {
        "Name":Name,
        "Category": Category,
        "Link": Link,
        "Review": Review
     
}

fs.readFile('./review.json', (err, data) => {
    if(!err) {
        var updated = JSON.parse(data)
        updated.push(obj)
        fs.writeFile('./review.json', JSON.stringify(updated, null, 2), (err) => {
            if(!err) {
                console.log("File Write Successful")
            }
            else {
                console.log(err)
            }
        })
    }
})
})

app.use(express.static('public'));

//start server at port 9000
app.listen(port, () => console.log(`Server listening on port ${port}`))
app.use(express.static(path.join(__dirname, '../frontend/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/review', (req, res) => {
  fs.readFile('./review.json', (err, data) => {
      if(!err) {
          res.write(data)
          res.end()
          return
      }
      res.write("Error reading review.json file")
      res.end()
      console.log("Error reading review.json file")
  })
})

