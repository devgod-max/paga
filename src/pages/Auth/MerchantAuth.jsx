import MerchantAuthForm from "../../components/auth/AuthForm/MerchantAuthForm";

export default function MerchantAuth() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 bg-white text-black">
      <div className="w-full max-w-md space-y-6">
        {/* <h1 className="text-2xl font-semibold text-center">
          Sign in to your merchant account
        </h1> */}
        <MerchantAuthForm />
      </div>
    </div>
  );
}
