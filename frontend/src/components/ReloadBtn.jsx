import { RefreshCw } from 'lucide-react';

const ReloadBtn = ({ isLoading = false, onReload}) => {
  return (
    <button
      onClick={onReload}
      disabled={isLoading}
      className={`flex items-center justify-center
        rounded-lg transition-all duration-200
        bg-blue-500 hover:bg-blue-600
        text-white shadow-sm hover:shadow
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed p-2`}
      aria-label="Reload content"
    >
      <RefreshCw 
        size={20} 
        className={`transition-transform ${isLoading ? 'animate-spin' : ''}`}
      />
    </button>
  );
};

export default ReloadBtn;