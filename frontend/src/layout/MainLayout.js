import { useReducer, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import ThemeButton from "../components/ThemeButton";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const myCustomTheme: Theme ={
  colors: {
    accentColor: '#07296d',
  },
}
const queryClient = new QueryClient()

const MainLayout = () => {
  return (
    <div className="relative flex w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Header />
            <Outlet />
            <Footer />
            <ThemeButton />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
};

export default MainLayout;