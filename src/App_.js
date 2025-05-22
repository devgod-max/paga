import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/AuthForm";
import { createContext } from "react";
import { useState } from "react";
import Home from "./pages/Home";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentSummary from "./components/PaymentSummary";
import CustomerDashboard from "./components/CustomerDashboard";
import MerchantLogin from "./temp_code/MerchantLogin";
import MerchantDashboard from "./temp_code/merchantdashboard";

export const AuthContext = createContext();
function App() {
  const [jwt, setJWt] = useState(null);
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            auth: [jwt, setJWt],
          }}
        >
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/paymentmethod" element={<PaymentMethodSelection />} />
            <Route path="/paymentsummary" element={<PaymentSummary />} />
            <Route path="/customerdashboard" element={<CustomerDashboard />} />
            <Route path="/merchantlogin" element={<MerchantLogin />} />
            <Route path="/merchantdashboard" element={<MerchantDashboard />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
