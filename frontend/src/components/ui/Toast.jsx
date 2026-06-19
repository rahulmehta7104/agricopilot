import { Toaster, toast as hotToast } from "react-hot-toast";

export const toast = {
  success: (message) => hotToast.success(message, {
    className: 'dark:bg-slate-800 dark:text-white',
    style: {
      borderRadius: '12px',
      padding: '12px 16px',
    }
  }),
  error: (message) => hotToast.error(message, {
    className: 'dark:bg-slate-800 dark:text-white',
    style: {
      borderRadius: '12px',
      padding: '12px 16px',
    }
  }),
  info: (message) => hotToast(message, {
    icon: 'ℹ️',
    className: 'dark:bg-slate-800 dark:text-white',
    style: {
      borderRadius: '12px',
      padding: '12px 16px',
    }
  })
};

export function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{
        duration: 4000,
      }}
    />
  );
}
