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

const SINGLE_PRODUCT_QUERY = `*[_type == "product"]{
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
  const [currentProduct, setCurrentProduct] = useState(null);

  const mercadopago = useMercadopago.v2(
    process.env.REACT_APP_MERCADOPAGO_PUBLIC_TOKEN,
    {
      locale: 'es-CO',
    }
  );

  async function getProducts() {
    setIsLoading(true);
    const response = await axios.get(PRODUCT_URL);
    setProducts(response.data.result);
    setIsLoading(false);
  }

  async function getBanner() {
    setIsLoading(true);
    const response = await axios.get(BANNER_URL);
    setBanner(response.data.result);
    setIsLoading(false);
  }

  async function getSingleProduct(slug) {
    getProducts();
    setIsLoading(true);
    const SINGLE_PRODUCT_QUERY = `*[_type == "product"  && slug.current == '${slug}']{
      name,
      price,
      details,
      slug,
      "imageUrl" : image[].asset->url
      }`;
    const SINGLE_PRODUCT_URL = `https://${project_id}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${encodeURIComponent(
      SINGLE_PRODUCT_QUERY
    )}`;
    const response = await axios.get(SINGLE_PRODUCT_URL);
    setCurrentProduct(response.data.result[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    //When page loads execute getProducts  and getBanner function once
    getProducts();
    getBanner();
  }, []);

  //Send cart items to server and receive the Preference id response to create Checkout
  async function requestMercadoPagoPreferenceId() {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.post(
      'http://localhost:4000/payment',
      cart,
      options
    );
    console.log(response.data.id);
    //createCheckoutButton(response.data.id);
    mercadopago.checkout({
      preference: {
        id: response.data.id,
      },
      // render: {
      //   container: '.cho-container',
      //   label: 'Pagar',
      // },
      autoOpen: true,
    });
  }

  function createCheckoutButton(preference_id) {
    mercadopago.checkout({
      preference: {
        id: preference_id,
      },
      render: {
        container: '.cho-container',
        label: 'Pagar',
      },
      // autoOpen: true,
    });
  }

  function addQty(product) {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.slug === product.slug) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    });
  }
  function decQty(product) {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.slug === product.slug) {
          if (item.quantity <= 1) {
            return { ...item, quantity: 1 };
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        } else {
          return item;
        }
      });
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
            unit_price: product.price,
            title: product.name,
            quantity: 1,
          },
        ];
      });
    }
  }

  function removeFromCart(product) {
    setCart((prev) => {
      return prev.filter((item) => {
        return item.slug !== product.slug;
      });
    });
  }

  useEffect(() => {
    setTotalPrice(0);
    cart.forEach((item) => {
      setTotalPrice((prev) => {
        return (prev = prev + item.unit_price * item.quantity);
      });
    });
  }, [cart]);

  return (
    <Context.Provider
      value={{
        products,
        requestMercadoPagoPreferenceId,
        addToCart,
        banner,
        cart,
        totalPrice,
        addQty,
        decQty,
        removeFromCart,
        isLoading,
        getSingleProduct,
        currentProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
