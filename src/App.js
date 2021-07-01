import React from "react";
import Dapp from "./Dapp";
import { useContract } from "web3-hooks";
import { wordyRightsAddress, wordyRightsAbi } from "./contracts/WordyRights";

export const WordyRightsContext = React.createContext(null);

function App() {
  const wordyRights = useContract(wordyRightsAddress, wordyRightsAbi);
  return (
    <WordyRightsContext.Provider value={wordyRights}>
      <Dapp />
    </WordyRightsContext.Provider>
  );
}

export default App;
