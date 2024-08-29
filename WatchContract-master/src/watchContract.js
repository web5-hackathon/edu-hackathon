const { ethers } = require("ethers");
const axios = require("axios");
const { abi } = require("../abi/CourseCertificate.json");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = abi;
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const api = axios.create({
  baseURL: process.env.BASE_URL,
});

contract.on("CertificateMinted", async (student, tokenId, tokenURI, event) => {
  const tokenIdStr = tokenId.toString();
  console.log(`tokenId as string: ${tokenIdStr}`);

  try {
    const response = await api.post("/api/nft", {
      tokenURI: tokenURI,
      tokenId: tokenIdStr,
      userAddress: student,
    });
    console.log("API response:", response.data);
  } catch (error) {
    console.error("Error calling API:", error);
  }
});
