import React from "react";
import {ThemeProvider} from 'styled-components';
import {Web3ReactProvider} from "@web3-react/core";
import { ToastContainer } from 'react-toastify';
import {ethers} from 'ethers';
import Header from './components/Header';
import Home from './pages/Home';
import theme from "./theme";
import "./App.css";
import {AppContextProvider} from './AppContext';
import 'react-toastify/dist/ReactToastify.css';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const App = () => (
  <AppContextProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </Web3ReactProvider>
  </AppContextProvider>
);

export default App;
