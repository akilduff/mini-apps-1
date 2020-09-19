const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Do we need a get request?
app.get('/', (req, res) => {
  res.send('Hello World! Get Request Made')
})
*/

app.post('/', (req, res) => {
  var dataString = req.body.data

  if (dataString.length !== 0) {
    var dataObject = JSON.parse(req.body.data)

    // How can I parse the dataObject into a CSV file? Tough formula!
    var JSONtoCSV = function (file) {
      var titleRow = '';
      for (var key in file) {
        if (key !== 'children') {
          titleRow = titleRow + key + ','
        }
      }

      var JSONstring = '';
      var recurse = function (input) {
        var newLine = '';
        if (input.children.length === 0) {
          var newLine = '';
          for (var key in input) {
            if (key !== 'children') {
              newLine = newLine + input[key] + ','
            }
          }
          var finalNewLine = newLine.slice(0, -1) + '\n'
          JSONstring += finalNewLine
        } else {
          var newLine = '';
          for (var key in input) {
            if (key !== 'children') {
              newLine = newLine + input[key] + ','
            }
          }
          var interNewLine = newLine.slice(0, -1) + '\n'
          JSONstring += interNewLine
          input.children.forEach(element => {
            recurse(element)
          })
        }
      }
      recurse(file)
      return titleRow.slice(0, -1) + '\n' + JSONstring
    }

    var outCSV = JSONtoCSV(dataObject)
    console.log('OutCSV: ', outCSV)

    fs.writeFile('mycsv_report.csv', outCSV, (err) => {
      if (err) {
        console.log('Error in writeFile', err)
      } else {
        console.log('File written')
        fs.readFile('mycsv_report.csv', (err, data) => {
          if (err) {
            console.log('Error in readFile', err)
          } else {
            console.log('File read')
            outputCSVdata = data
            console.log('Directory of my CSV: ', __dirname + '/mycsv_report.csv')
            res.sendFile(__dirname + '/mycsv_report.csv', (err) => {
              if (err) {
                console.log('Error: ', err)
              }
            })
            res.format({
              'text/html': function () {
                res.send(`<!DOCTYPE html>
                  <html>
                    <head>
                      <title>CSV Report Generator</title>
                    </head>
                    <body>
                      <h1>CSV Report Generator</h1>
                      <p> Enter your JSON file below</p>
                      <form action="http://localhost:3000" method="post">
                        <textarea id="json_data" name="data"></textarea>
                        <br>
                        <button type="submit">Submit your JSON file</button>
                      </form>
                      <h3>CSV Output:</h3>
                      <p>`+ data + `<p>
                    </body>
                  </html>`
                );
              }
            });
            res.end();
          }
        });
      }
    });
  }
})

app.listen(port, () => {
  console.log(`CSV Report app listening at http://localhost:${port}`)
})