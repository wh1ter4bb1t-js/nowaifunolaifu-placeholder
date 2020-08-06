//========= Imports ============
const fs = require('fs');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const gm = require('gm').subClass({ imageMagick: false });
const { responseReceived, randomize } = require('./helperFunctions');
const port = process.env.PORT || 3000;
const app = express();

//=========== Middleware =============
app.use(favicon(path.join(__dirname, 'UI', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'UI')));

//============ File Directories =================
const fileDir = path.join(__dirname, '/photos');
const specialDir = path.join(__dirname, '/Joe');

//============== Routes ==================
//============== Home ==================
app.get('/', (req, res) => {
  res.status(200).sendFile('./UI/index.html', { root: __dirname });
});

//============== Error ==================
app.get('/error', (req, res) => {
  res.status(200).sendFile('/UI/error.html', { root: __dirname });
});

//========================================
//============= Joe Routes ===============
//========================================

//============ Joe Width Route =============
app.get('/joe/:width', (req, res) => {
  const params = responseReceived(req.params.width);

  params
    .map((width) => {
      const height = width;
      return { height, width };
    })
    .fold(
      () => res.status(404).redirect('/error'),
      ({ height, width }) => {
        gm(`${specialDir}/${randomize(fs.readdirSync(specialDir))}`)
          .resize(width, height, '^')
          .gravity('Center')
          .crop(width, height)
          .toBuffer((err, buffer) => {
            res.set('Content-type', 'image/png');
            res.send(buffer);
          });
      }
    );
});

//============ Joe Width & Height Route =============
app.get('/joe/:width/:height', (req, res) => {
  const paramHeight = responseReceived(req.params.height);
  const paramWidth = responseReceived(req.params.width);

  paramHeight
    .map((height) =>
      paramWidth
        .map((width) => {
          return { height, width };
        })
        .fold(
          () => res.status(404).redirect('/error'),
          ({ height, width }) => {
            gm(`${specialDir}/${randomize(fs.readdirSync(specialDir))}`)
              .resize(width, height, '^')
              .gravity('Center')
              .crop(width, height)
              .toBuffer((err, buffer) => {
                res.set('Content-type', 'image/png');
                res.send(buffer);
              });
          }
        )
    )
    .fold(
      () => res.status(404).redirect('/error'),
      () => console.log('complete')
    );
});

//========================================
//============ waifu Routes ==============
//========================================

//========== Waifu Width Route ============
app.get('/:width', (req, res) => {
  const params = responseReceived(req.params.width);

  params
    .map((width) => {
      const height = width;
      return { height, width };
    })
    .fold(
      () => res.status(404).redirect('/error'),
      ({ height, width }) => {
        gm(`${fileDir}/${randomize(fs.readdirSync(fileDir))}`)
          .resize(width, height, '^')
          .gravity('Center')
          .crop(width, height)
          .toBuffer((err, buffer) => {
            res.set('Content-type', 'image/png');
            res.send(buffer);
          });
      }
    );
});

//========== Waifu Width & Height Route ============
app.get('/:width/:height', (req, res) => {
  const paramHeight = responseReceived(req.params.height);
  const paramWidth = responseReceived(req.params.width);

  paramHeight
    .map((height) =>
      paramWidth
        .map((width) => {
          return { height, width };
        })
        .fold(
          () => res.status(404).redirect('/error'),
          ({ height, width }) => {
            gm(`${fileDir}/${randomize(fs.readdirSync(fileDir))}`)
              .resize(width, height, '^')
              .gravity('Center')
              .crop(width, height)
              .toBuffer((err, buffer) => {
                res.set('Content-type', 'image/png');
                res.send(buffer);
              });
          }
        )
    )
    .fold(
      () => res.status(404).redirect('/error'),
      () => console.log('complete')
    );
});

//========= Remaining Routes ===========
app.get('*', (req, res) => {
  res.redirect('/error');
});

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
