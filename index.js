require('dotenv').config();

const PORT = 3333;
const path = require('path');
const express = require('express');
const TWALA_API = require('./api');
const decryptFormField = require('./decrypt');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/', (req, res) => {
  const encrypted = req.body;

  // decrypt jotform request form data
  const email = decryptFormField(encrypted.email)
  const address = decryptFormField(encrypted.address);
  const position = decryptFormField(encrypted.position);
  const lastName = decryptFormField(encrypted.fullname.last);
  const firstName = decryptFormField(encrypted.fullname.first);
  const corporation = decryptFormField(encrypted.corporation);
  const payload = { firstName, lastName, email, corporation, position, address };

  // call Twala API send endpoint
  TWALA_API.send(payload)
    .then(response => {
      if (response.is_sent) {
        res.redirect(301, '/success');
      } else {
        res.redirect(401, '/failed');
      }
    })
    .catch(e => {
      res.redirect(401, '/failed');
    });
});

router.get('/success',function(req,res){
  res.sendFile(path.join(__dirname + '/success.html'));
});

router.get('/failed',function(req,res){
  res.sendFile(path.join(__dirname + '/failed.html'));
});

app.use('/', router);

app.listen(PORT);

console.log('Running at Port ' + PORT);
