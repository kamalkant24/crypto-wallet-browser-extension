
# Metamask Clone Browser Extension

This project is a browser extension built using Next.js, TypeScript, and ethers.js that adding core wallet functionality and a cohesive “MagicCraft” theme. It allows users to manage their Ethereum wallets, interact with Address & QR, and perform various blockchain-related operations within their web browsers.

##  Core Wallet Functions

- **Wallet Management**: Create and Import Ethereum wallets.
- **Transaction Management**: Send and receive ETH and see latest transactions.
- **Address & QR**: Allow a user to drop a QR code image onto the extension to pre-fill the recipient field.
- **MagicCraft Theme**


## Installation

To run the extension locally or build it for distribution, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   npm install
   npm run local

Note: - we need .env file to run this project on local system.

Below are the mandatory variables to run this project

NEXT_PUBLIC_JWT_KEY= JWT_TOKEN
NEXT_PUBLIC_ETHEREUM_PROVIDER=https://mainnet.infura.io/v3/{infura_project_key}
NEXT_PUBLIC_POLYGON_MAINNET_PROVIDER=https://polygon-rpc.com/
NEXT_PUBLIC_MUMBAI_TESTNET_PROVIDER=https://polygon-amoy.infura.io/v3/{infura_project_key}
NEXT_PUBLIC_SEPOLIA_PROVIDER=https://sepolia.infura.io/v3/{infura_project_key}
NEXT_PUBLIC_DEFAULT_PROVIDER=https://polygon-amoy.infura.io/v3/e6c{infura_project_key}
NEXT_PUBLIC_ETHERSCAN_API_KEY=API_KEY
