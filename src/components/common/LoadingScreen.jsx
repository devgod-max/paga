export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#102232]">
      <div className="text-center">
        <div className="animate-spin border-t-4 border-[#00ffd1] border-solid rounded-full h-12 w-12 mx-auto mb-4" />
        <p className="text-lg text-white/80">{message}</p>
      </div>
    </div>
  );
}
