import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {HashRouter} from "react-router-dom";
import {StrictMode} from 'react';
import App from './App.js';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon, polygonMumbai, goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy';

const projectId = 'db5c024ee3fdfeff82ef8e7875616465'
const alchemyProviderId = 'gMY5GGqB2XD7zwh3zA6hnSOwEFEWW8bv'

const { chains, publicClient } = configureChains([polygonMumbai], [w3mProvider({ projectId }), alchemyProvider({ apiKey: alchemyProviderId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </HashRouter>
  </StrictMode>
);

