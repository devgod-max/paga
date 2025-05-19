import {
  SET_PAYMENT_METHOD,
  SET_PAYMENT_DETAILS,
  RESET_CHECKOUT,
} from "./checkoutTypes";

import { supabase } from "../../supabaseClient";

// Synchronous actions
export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method,
});

export const setPaymentDetails = (details) => ({
  type: SET_PAYMENT_DETAILS,
  payload: details,
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
});

// ✅ Async thunk action to fetch payment summary data
export const fetchCheckoutData = (method) => async (dispatch) => {
  try {
    // Fetch the goods data (assume static item: 'membership_1month')
    const { data: goods, error: goodsError } = await supabase
      .from("goods")
      .select("*")
      .eq("payment_method", method)
      .single();

    if (goodsError) throw goodsError;

    let details = {};

    // Dispatch to store
    if (method === "crypto") {
      const { data: cryptos, error: cryptosError } = await supabase
        .from("cryptos")
        .select("*")
        .eq("type", "ETH")
        .single();
      if (cryptosError) throw cryptosError;
      details = {
        item: goods.name,
        usdPrice: null,
        cryptoPrice: goods.price,
        discount: goods.discount,
        rate: cryptos.rate,
        merchant_name: goods.merchant,
      };
    } else {
      details = {
        item: goods.name,
        usdPrice: goods.price,
        discount: goods.discount,
        rate: null,
        merchant_name: goods.merchant,
        cryptoPrice: null,
      };
    }
    dispatch(setPaymentDetails(details));
  } catch (error) {
    console.error("Error fetching checkout data:", error.message);
    // Optionally dispatch an error action here
  }
};
