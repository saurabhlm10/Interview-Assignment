"use client";

import { FC, ReactNode } from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
