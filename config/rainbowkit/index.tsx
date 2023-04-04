import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const defaultChains = [mainnet, ...(process.env.NEXT_PUBLIC_MODE === 'development' ? [sepolia] : [])]
const { chains, provider } = configureChains(
    [...defaultChains],
    [
        infuraProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'UCcoin',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

export const withRainbowKitProvider = (app) => {

    return function (...args) {
        
        return (
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider theme={{
                    lightMode: lightTheme(),
                    darkMode: darkTheme(),
                }} chains={chains}>
                    {app(...args)}
                </RainbowKitProvider>
            </WagmiConfig>
        )
    }
}