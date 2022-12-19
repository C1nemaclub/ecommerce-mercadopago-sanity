import { useContext, createContext, useState, useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';
import axios from 'axios';

const Context = createContext();
const project_id = process.env.REACT_APP_SANITY_PROJECT_ID;
let DATASET = 'production';

let BANNER_QUERY = encodeURIComponent(`*[_type == 'banner']{
  desc,
  price,
  "imageUrl": image.asset->url
}`);

const PRODUCT_QUERY = `*[_type == "product"]{
  name,
  price,
  details,
  slug,
  "imageUrl" : image[].asset->url
}`;

const shopData = {
  title: 'Libro 4',
  unit_price: 15000,
  quantity: 3,
};

let PRODUCT_URL = `https://${project_id}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${PRODUCT_QUERY}`;
let BANNER_URL = `https://${project_id}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${BANNER_QUERY}`;

export function StateContext({ children }) {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const mercadopago = useMercadopago.v2(
    process.env.REACT_APP_MERCADOPAGO_PUBLIC_TOKEN,
    {
      locale: 'es-CO',
    }
  );

  async function getProducts() {
    const response = await axios.get(PRODUCT_URL);
    setProducts(response.data.result);
    setIsLoading(false);
  }

  async function getBanner() {
    const response = await axios.get(BANNER_URL);
    setBanner(response.data.result);
  }

  useEffect(() => {
    //When page loads execute getProducts function once
    getProducts();
    getBanner();
  }, []);

  async function requestMercadoPagoPreferenceId() {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.post(
      'http://localhost:4000/payment',
      shopData,
      options
    );
    console.log(response.data.id);
    createCheckoutButton(response.data.id);
  }

  function createCheckoutButton(preference_id) {
    mercadopago.checkout({
      preference: {
        id: preference_id,
      },
      autoOpen: true,
    });
  }

  //Shopping Cart Functionality
  function addToCart(product) {
    //Check if there is an item with the clicked Slug in the cart already, if there is check which item, and add quantity + 1
    if (cart.some((item) => item.slug === product.slug.current)) {
      setCart((prev) => {
        return cart.map((item) => {
          if (item.slug === product.slug.current) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      });
    } else {
      setCart((prev) => {
        return [
          ...prev,
          {
            slug: product.slug.current,
            price: product.price,
            name: product.name,
            quantity: 1,
          },
        ];
      });
    }
  }


  useEffect(() => {
    setTotalPrice(0);
    cart.forEach((item) => {
      setTotalPrice((prev) => {
        return (prev = prev + item.price * item.quantity);
      });
    });
  }, [cart]);

  return (
    <Context.Provider
      value={{
        products,
        requestMercadoPagoPreferenceId,
        addToCart,
        cart,
        totalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
