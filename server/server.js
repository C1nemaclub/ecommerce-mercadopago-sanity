const express = require('express');
const app = express();
const mercadopago = require('mercadopago');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Agrega credenciales
mercadopago.configure({
  access_token:
    'TEST-7885435085455941-121604-2176acfcd1e2601a42051fe1c9584f35-167251251',
});

app.use(express.static('public'));

app.post('/payment', (req, res) => {
  console.log(req.body);

  const { title, unit_price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: title,
        unit_price: unit_price,
        quantity: quantity,
      },
    ],
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
    })
    .catch(function (error) {
      console.log(error);
    });
  res.json({
    id: global.id,
    message: 'Id Sent',
  });
});

app.get('/admin', (req, res) => {
  res.sendFile('index.html');
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
