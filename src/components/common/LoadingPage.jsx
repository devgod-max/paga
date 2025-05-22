export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400"></div>
      <span className="ml-4 text-lg">Loading...</span>
    </div>
  );
}
