const fs = require('fs');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });
const { responseReceived, randomize } = require('./helperfunctions')
const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, 'UI', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'UI')));

const fileDir = path.join(__dirname, '/photos');
const specialDir = path.join(__dirname, '/Joe');

app.get('/', (req, res) => {
  res.status(200).sendFile('./UI/index.html', {root: __dirname});
})

app.get('/error', (req, res) => {
  res.status(200).sendFile('/UI/error.html', {root: __dirname});
})

app.get('/joe/:width/:height', (req, res) => {
  const paramHeight = responseReceived(req.params.height);
  const paramWidth = responseReceived(req.params.width);
  
  paramHeight
    .map(height => paramWidth.map(width => {
      return { height, width };
    })
      .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
        gm(`${specialDir}/${randomize(fs.readdirSync(specialDir))}`)
          .resize(width, height, '^')
          .gravity('Center')
          .crop(width, height)
          .toBuffer((err, buffer) => {
            res.set('Content-type', 'image/png');
            res.send(buffer);
          });
      }))
    .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
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

app.get('/joe/:width', (req, res) => {
  const params = responseReceived(req.params.width);
  
  params
    .map(width => {
      const height = width;
      return { height, width };
    })
    .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
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
    .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
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
      return { height, width };
    })
      .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
        gm(`${fileDir}/${randomize(fs.readdirSync(fileDir))}`)
          .resize(width, height, '^')
          .gravity('Center')
          .crop(width, height)
          .toBuffer((err, buffer) => {
            res.set('Content-type', 'image/png');
            res.send(buffer);
          });
      }))
    .fold(() => res.status(404).redirect('/error'), ({ height, width }) => {
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

app.get('*', (req, res) => {
  res.redirect('/error');
})

app.listen(port, () => {
  console.log(`running on port: ${port}`);
})