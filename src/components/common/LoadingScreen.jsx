export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin border-t-4 border-cyan-400 border-solid rounded-full h-12 w-12 mx-auto mb-4" />
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
}
