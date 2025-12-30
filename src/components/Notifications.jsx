import { useEffect } from 'react';
import toast, { useToaster } from 'react-hot-toast/headless';
import { Save, X } from 'lucide-react';

export const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts
        .filter((t) => t.visible)
        .map((t) => (
          <div
            key={t.id}
            {...t.ariaProps}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg
              text-white min-w-50 max-w-xs
              ${t.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            `}
          >
            {t.type === 'success' ? <Save className="h-4 w-4" /> : null}
            <span className="flex-1">{t.message}</span>
            <X className="h-4 w-4 cursor-pointer hover:opacity-80 transition" onClick={() => toast.dismiss(t.id)} />
          </div>
        ))}
    </div>
  );
};
