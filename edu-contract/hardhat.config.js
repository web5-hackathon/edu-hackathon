require("@nomicfoundation/hardhat-toolbox");


let dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const privatekey = process.env.PRIVATEKEY;

module.exports = {
  solidity: "0.8.22",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    dev: {
      url: "http://0.0.0.0:8545",
      chainId: 1337,
      gas: 30000000,
    },
    edu: {
      url: "https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=Ak0AqOiweUGkrAgyZ9IqJ4P_Er-6Y60R74IerifuQQh_",
      accounts: [privatekey],
      chainId: 656476,
    }
  }
};