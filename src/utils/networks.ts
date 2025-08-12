const networks_const = [
  {
    chainId: 1,
    network: "Ethereum Mainnet",
    apiUrl:"https://api.etherscan.io/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY"
  },
  {
    chainId: 11155111,
    network: "Sepolia",
    apiUrl:"https://api-sepolia.etherscan.io/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY"
  },
  {
    chainId: 137,
    network: "Polygon Mainnet",
    apiUrl:"https://api.polygonscan.com/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY"
  },
  {
    chainId: 80001,
    network: "Mumbai Testnet",
    apiUrl:"https://api-testnet.polygonscan.com/api",
    apiKeyEnvVar: "NEXT_PUBLIC_ETHERSCAN_API_KEY"
  },
];
export default networks_const