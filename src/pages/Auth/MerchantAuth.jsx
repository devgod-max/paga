import MerchantAuthForm from "../../components/auth/AuthForm/MerchantAuthForm";

export default function MerchantAuth() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold mb-8">
        Smarter payments, Real rewards.
      </h1>
      <MerchantAuthForm />
    </div>
  );
}
