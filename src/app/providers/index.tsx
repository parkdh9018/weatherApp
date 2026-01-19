import { QueryProvider } from "./QueryProvider";
import { RouterProvider } from "./RouterProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers() {
  return (
    <QueryProvider>
      <RouterProvider />
      <ToastProvider />
    </QueryProvider>
  );
}
