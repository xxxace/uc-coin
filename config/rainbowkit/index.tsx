import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
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