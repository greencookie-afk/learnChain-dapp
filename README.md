# 📚 LearnChain – Decentralized Learning Platform

LearnChain is a decentralized learning platform where educators can upload courses to a decentralized database and students can access them with blockchain-verified credentials. It aims to provide an affordable, global, and blockchain-powered education system with transparent transactions and verifiable achievements.

## 🚀 Features

- 👩‍🏫 **Educator Dashboard**: Create, manage, and monetize courses with real-time analytics
- 🎓 **Student Learning Portal**: Discover, enroll in, and track progress on courses
- 🔐 **Web3 Authentication**: Secure login with MetaMask and other Ethereum wallets
- 🧾 **Smart Contract Integration**: Transparent course ownership and enrollment
- 📜 **NFT Certificates**: Blockchain-verified credentials for completed courses
- 📁 **Decentralized Storage**: Course content stored on IPFS for censorship resistance
- 💰 **Token Economy**: LRN utility token for platform transactions
- 📱 **Responsive Design**: Optimized for all devices and screen sizes

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite) + CSS |
| Blockchain | Solidity + Ethers.js |
| Wallet | MetaMask + Web3 Providers |
| Storage | IPFS / Arweave |
| State Management | React Context API |
| Routing | React Router |

## 🏗️ Project Structure

```
learnchain-dapp/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── CourseCard/  # Course display component
│   │   ├── Footer/      # Site footer
│   │   ├── Navbar/      # Navigation component
│   │   └── ...          # Other components
│   ├── context/         # React context providers
│   │   └── WalletContext.jsx  # Wallet connection context
│   ├── contracts/       # Smart contract code and ABIs
│   │   ├── abis/        # Contract ABIs
│   │   ├── CourseRegistry.sol  # Course management contract
│   │   └── CertificateNFT.sol  # NFT certificate contract
│   ├── pages/           # Page components
│   ├── services/        # Service integrations
│   │   ├── blockchainService.js  # Smart contract interactions
│   │   └── ipfsService.js        # IPFS storage integration
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── App.css          # Global styles
│   ├── index.css        # Base styles
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/learnchain-dapp.git
   cd learnchain-dapp
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_INFURA_ID=your_infura_project_id
   VITE_CHAIN_ID=80001  # Mumbai testnet
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 🔗 Smart Contracts

LearnChain uses two main smart contracts:

1. **CourseRegistry**: Manages course creation, enrollment, and completion
2. **CertificateNFT**: Issues and verifies NFT certificates for completed courses

The contracts are deployed on the Polygon Mumbai testnet for development and testing.

## 📝 Documentation

Comprehensive documentation is available within the application. Navigate to the `/documentation` route to access:

- User guides for students and educators
- Technical documentation for developers
- Smart contract specifications
- API references

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, please open an issue or contact the team at support@learnchain.io

---

© 2025 LearnChain. All rights reserved.
