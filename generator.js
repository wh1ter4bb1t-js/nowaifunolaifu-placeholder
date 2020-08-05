const fs = require('fs');
const express = require('express');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
const { responseReceived, randomize } = require('./helperfunctions')
const port = process.env.PORT || 3000;
const app = express();

const fileDir = path.join(__dirname, '/photos');
const specialDir = path.join(__dirname, '/Joe');


app.get('/joe/:width/:height', (req, res) => {
  const paramHeight = responseReceived(req.params.height);
  const paramWidth = responseReceived(req.params.width);
  
  paramHeight
    .map(height => paramWidth.map(width => {
      return {height, width}
    })
    .fold(() => res.send('you done fucked up'), ({ height, width }) => {
      gm(`${specialDir}/${randomize(fs.readdirSync(specialDir))}`)
        .resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .toBuffer((err, buffer) => {
          res.set('Content-type', 'image/png');
          res.send(buffer);
        });
    }));
});

app.get('/joe/:width', (req, res) => {
  const params = responseReceived(req.params.width);
  
  params
    .map(width => {
      const height = width;
      return { height, width };
    })
    .fold(() => res.send('you done fucked up'), ({ height, width }) => {
      gm(`${specialDir}/${randomize(fs.readdirSync(specialDir))}`)
        .resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .toBuffer((err, buffer) => {
          res.set('Content-type', 'image/png');
          res.send(buffer);
        });
    });
});

app.get('/:width', (req, res) => {
  const params = responseReceived(req.params.width);

  params.
    map(width => {
      const height = width;
      return { height, width };
    })
    .fold(() => res.send('you done fucked up'), ({ height, width }) => {
      gm(`${fileDir}/${randomize(fs.readdirSync(fileDir))}`)
        .resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .toBuffer((err, buffer) => {
          res.set('Content-type', 'image/png');
          res.send(buffer);
        });
    });
});

app.get('/:width/:height', (req, res) => {
  const paramHeight = responseReceived(req.params.height);
  const paramWidth = responseReceived(req.params.width);
  
  paramHeight
    .map(height => paramWidth.map(width => {
      return {height, width}
    })
    .fold(() => res.send('you done fucked up'), ({ height, width }) => {
      gm(`${fileDir}/${randomize(fs.readdirSync(fileDir))}`)
        .resize(width, height, '^')
        .gravity('Center')
        .crop(width, height)
        .toBuffer((err, buffer) => {
          res.set('Content-type', 'image/png');
          res.send(buffer);
        });
    }));
});


app.listen(port, () => {
  console.log(`running on port: ${port}`);
})