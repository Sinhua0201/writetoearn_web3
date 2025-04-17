import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, localhost } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Write-to-Earn',
  projectId: '25018c94ba728a339e935363ac0a1b1f',
  chains: [localhost, mainnet],
});

const queryClient = new QueryClient();

export default function RainbowKitAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
