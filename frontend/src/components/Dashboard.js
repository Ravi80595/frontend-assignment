import React, { useEffect, useState } from "react";
import { getTitles, addTitle, deleteTitle } from "../services/api";
import { useMetaMask } from "../hooks/useMetaMask";
import TitleForm from "./TitleForm";
import { Box, Flex } from "@chakra-ui/react";
import Notes from "./Notes";

function Dashboard() {
  const [titles, setTitles] = useState([]);
  const { connectWallet, walletAddress } = useMetaMask();


return (
    <div>
      <Flex justifyContent={'space-between'} p={'30px'} boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'>
        <Box> Dashboard</Box>
        <Box><button onClick={connectWallet}>Connect MetaMask</button>
        {walletAddress && <p>Connected Wallet: {walletAddress}</p>}</Box>
      </Flex>

      <Notes/>


      {/* <h2>Dashboard</h2> */}
      

      {/* <TitleForm onSubmit={handleAddTitle} /> */}
      {/* <ul>
        {titles.map((title) => (
          <li key={title.id}>
            {title.subject} <button onClick={() => handleDeleteTitle(title.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Dashboard;
