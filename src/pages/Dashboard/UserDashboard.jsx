import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";

import AccountInfo from "../../components/dashboard/AccountInfo";
import MarketData from "../../components/dashboard/MarketData";
import PurchaseHistory from "../../components/dashboard/PurchaseHistory";
import RewardHistory from "../../components/dashboard/RewardHistory";

export default function Dashboard() {
  const loginUser = JSON.parse(localStorage.getItem("authUser"));

  const dispatch = useDispatch();
  const { user, cryptos, purchaseHistory, rewardHistory, status, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData(loginUser.email));
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-white text-center">Loading...</p>;
  if (status === "failed")
    return <p className="text-red-400 text-center">Error: {error}</p>;
  if (!user) {
    return <p className="text-white text-center">Please log in to continue.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-700 text-white px-4 py-10 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Better Life With Crypto
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <AccountInfo user={user} />
        <MarketData cryptos={cryptos} />
      </div>

      <div className="mb-10">
        <PurchaseHistory data={purchaseHistory} />
      </div>

      <RewardHistory data={rewardHistory} />
    </div>
  );
}
