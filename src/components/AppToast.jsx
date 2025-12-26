import toast from 'react-hot-toast';
import { Save, X } from 'lucide-react';

export const showToast = (message, type = 'success', duration = 3000) => {
  toast.custom(
    (t) => (
      <div
        className={`
          ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
          text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2
          ${t.visible ? 'animate-enter' : 'animate-leave'}
        `}
      >
        {type === 'success' ? <Save className="h-4 w-4" /> : <X className="h-4 w-4" />}
        <span>{message}</span>
      </div>
    ),
    { duration: duration === null ? Infinity : duration }
  );
};
