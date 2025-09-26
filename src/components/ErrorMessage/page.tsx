export default function ErrorMessage() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">!</span>
        </div>
        <h3 className="text-xl font-bold">Error</h3>
      </div>
      <p className="text-gray-600">Something went wrong</p>
    </div>
  );
}