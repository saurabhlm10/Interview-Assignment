"use client";

import { Toaster } from "react-hot-toast";
import { FC, ReactNode } from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />

      {children}
    </Provider>
  );
};

export default Providers;
