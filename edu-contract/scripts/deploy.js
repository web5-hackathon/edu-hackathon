// 部署测试USDT
const hre = require("hardhat");
let courseCertificate;

async function main() {

  const CourseCertificate = await ethers.getContractFactory("CourseCertificate");
  courseCertificate = await CourseCertificate.deploy("EDU");
  await courseCertificate.deployed();
  console.log("courseCertificate:" + courseCertificate.address);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});