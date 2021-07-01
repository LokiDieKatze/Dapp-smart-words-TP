import { useContext, useState } from "react";
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import { wordyRightsAddress } from "./contracts/WordyRights";
import { WordyRightsContext } from "./App";
import {
  Container,
  Box,
  Textarea,
  Button,
  Input,
  Center,
  useToast,
} from "@chakra-ui/react";

const Dapp = () => {
  const wordyRights = useContext(WordyRightsContext);
  const toast = useToast();
  const [web3State, login] = useContext(Web3Context);
  const [text, setText] = useState("");
  const [idSale, setIdSale] = useState(0);
  const [price, setPrice] = useState(0);
  const [idNoSale, setIdNoSale] = useState(0);
  const [idIsForSale, setIdIsForSale] = useState(false);
  const [getPrice, setGetPrice] = useState(0);
  const [idBuy, setIdBuy] = useState(0);

  const handleOnClickLogin = () => {
    if (!web3State.isLogged) {
      login();
    } else {
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateNftClick = async () => {
    let textProcessed = text.replace(/[.…,/#!$%^&*;':{}=\-_`~()]/g, "");
    textProcessed = textProcessed.split(" ").join("");
    textProcessed = textProcessed.toLowerCase();

    let hash = ethers.utils.id(textProcessed);

    try {
      let tx = await wordyRights.createRights(hash);
      await tx.wait();
      toast({
        title: "Congrats!",
        description: `You have created WYD with id: ${tx}.`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Ooops!",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleSaleChange = (e) => {
    setIdSale(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSetForSaleClick = async () => {
    try {
      let tx = await wordyRights.setForSale(price, idSale);
      await tx.wait();
      toast({
        title: `Your WYR id: ${idSale} is now for sale!`,
        description: `Price: ${price}`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Ooops!",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleNotForSaleChange = (e) => {
    setIdNoSale(e.target.value);
  };

  const handleNotForSaleClick = async () => {
    try {
      let tx = await wordyRights.notForSale(idNoSale);
      await tx.wait();
      toast({
        title: `Your WYR is not for sale anymore!`,
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Ooops!",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleIdSaleRequestChange = (e) => {
    setIdIsForSale(e.target.value);
  };

  const handleIsForSaleClick = async () => {
    try {
      let tx = await wordyRights.isForSale(idIsForSale);
      await tx.wait();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleIdPriceChange = (e) => {
    setGetPrice(e.target.value);
  };

  const handleGetPriceClick = async () => {
    try {
      await wordyRights.WYRPrice(getPrice);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleIdBuyChange = (e) => {
    setIdBuy(e.target.value);
  };

  const handleBuyClick = async () => {
    try {
      await wordyRights.buyWYR(idBuy);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Box
        as="header"
        p={4}
        bg="purple.800"
        color="gray.100"
        textAlign="center"
      >
        <h1 fontSize="30px">WordyRights NFT Creator</h1>
        {!web3State.isLogged ? (
          <Button
            textAlign="left"
            colorScheme="teal"
            onClick={() => handleOnClickLogin()}
          >
            Login
          </Button>
        ) : (
          <p>Logged</p>
        )}
        <p>Deployed at {wordyRightsAddress}</p>
      </Box>
      <Container p={4}>
        <Box border="2px" borderColor="gray.400" p={3} m={5}>
          <Center>
            <b>Create your WYR</b>
          </Center>
          <Textarea
            m={2}
            placeholder="Please enter your text and get your WYR!"
            onChange={handleTextChange}
          />
          <Button m={2} onClick={handleCreateNftClick}>
            Create WYR!
          </Button>
        </Box>
        <Box border="2px" borderColor="gray.400" p={3} m={5}>
          <Center>
            <b>Handle your WYR</b>
          </Center>
          <h2>Set your WYR for sale now!</h2>
          <Input
            m={2}
            placeholder="Enter your WYR's id here."
            onChange={handleSaleChange}
          />
          <Input
            m={2}
            placeholder="Enter your price (18 decimals)"
            onChange={handlePriceChange}
          />
          <Button m={2} onClick={handleSetForSaleClick}>
            Set for sale
          </Button>
          <h2>Withdraw your WYR from sale</h2>
          <Input
            m={2}
            placeholder="Enter your WYR's id here."
            onChange={handleNotForSaleChange}
          />
          <Button m={2} onClick={handleNotForSaleClick}>
            Withdraw
          </Button>
        </Box>
        <Box border="2px" borderColor="gray.400" p={3} m={5}>
          <Center>
            <b>Buy WYRs!</b>
          </Center>
          <h2>Is it for sale?</h2>
          <Input
            m={2}
            placeholder="Enter the id of the WYR you're interested in."
            onChange={handleIdSaleRequestChange}
          />
          <Button m={2} onClick={handleIsForSaleClick}>
            Send request
          </Button>
          <h2>What's the price?</h2>
          <Input
            m={2}
            placeholder="Enter the id of the WYR you're interested in."
            onChange={handleIdPriceChange}
          />
          <Button m={2} onClick={handleGetPriceClick}>
            Send request
          </Button>
          <h2>Want to buy it?</h2>
          <Input
            m={2}
            placeholder="Enter the id of the WYR you're interested in."
            onChange={handleIdBuyChange}
          />
          <p>
            Don't forget to add the right transaction value on your Metamask!
            &#128540;
          </p>
          <Button m={2} onClick={handleBuyClick}>
            Buy now!
          </Button>
        </Box>
      </Container>{" "}
      <Box
        as="footer"
        p={4}
        bg="purple.800"
        color="gray.100"
        textAlign="center"
      >
        WordyRights NFT Creator from LokiDieKatze
      </Box>{" "}
    </>
  );
};

export default Dapp;
