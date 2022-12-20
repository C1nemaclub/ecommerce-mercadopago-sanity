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
  const cartItems = req.body.map((item) => {
    return {
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      currency_id: 'COP',
    };
  });
  console.log(cartItems);

  let preference = {
    items: req.body,
    shipments: {
      cost: 5000,
      receiver_address: {
        zip_code: '5700',
        street_number: 123,
        street_name: 'Street',
        floor: '4',
        apartment: 'C',
      },
      payment_methods: {
        installments: 1,
      },
    },
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:4000/',
      pending: 'http://localhost:4000/',
    },
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
      res.json({
        id: global.id,
        message: 'Id Sent',
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/admin', (req, res) => {
  res.sendFile('index.html');
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
