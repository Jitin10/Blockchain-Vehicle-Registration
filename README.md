# Blockchain Vehicle Registration System

![Static Badge](https://img.shields.io/badge/Blockchain-Ethereum-blue)
![Static Badge](https://img.shields.io/badge/Language-Solidity-gray)
![Static Badge](https://img.shields.io/badge/Framework-Brownie%20(Python)-green)
![Static Badge](https://img.shields.io/badge/Framework-React-blueviolet)
![Static Badge](https://img.shields.io/badge/Library-Ethers.js-orange)

A full-stack decentralized application (DApp) for registering vehicles and managing ownership on the Ethereum blockchain. This project provides a transparent, secure, and immutable ledger for vehicle provenance.

---

## 📸 Screenshot

![DApp Screenshot](https://i.imgur.com/uR1dO9n.png)

---

## ✨ Key Features

* **🔐 Secure Registration:** Only a designated admin account (representing a transport authority) can register new vehicles.
* **👤 Owner-Controlled Transfers:** Only the current, cryptographically-verified owner of a vehicle can initiate an ownership transfer.
* **🧾 Public Verifiability:** Anyone can enter a Vehicle Identification Number (VIN) to view the car's details and confirm its current owner.
* **⛓️ On-Chain Integrity:** All registration and ownership data is stored on the blockchain, creating a tamper-proof and permanent audit trail.

---

## 🛠️ Technology Stack

### Backend (Smart Contract)
* **Blockchain:** Ethereum (simulated locally with Ganache)
* **Smart Contract Language:** Solidity
* **Development Framework:** Brownie (Python-based)
* **Testing & Deployment:** Web3.py, Pytest

### Frontend (DApp)
* **UI Library:** React
* **Build Tool:** Vite
* **Blockchain Interaction:** Ethers.js
* **Wallet Integration:** MetaMask

---

## 📂 Project Structure

This project is a monorepo containing both the backend and frontend in a single repository.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* **Git:** [Download Git](https://git-scm.com/downloads)
* **Python:** Version 3.10+ ([Download Python](https://www.python.org/downloads/))
* **Node.js:** Version 18+ ([Download Node.js](https://nodejs.org/))
* **Ganache:** A personal blockchain for local development ([Download Ganache](https://trufflesuite.com/ganache/))
* **MetaMask:** A browser extension wallet ([Download MetaMask](https://metamask.io/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/blockchain-vehicle-registration.git](https://github.com/your-username/blockchain-vehicle-registration.git)
    cd blockchain-vehicle-registration
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend folder
    cd python-vehicle-registry

    # Install Brownie if you haven't already
    pipx install eth-brownie

    # Compile the smart contracts
    brownie compile
    ```

3.  **Set up the Frontend:**
    ```bash
    # Navigate to the frontend folder from the root directory
    cd ../frontend-new

    # Install npm packages
    npm install
    ```

---

## ▶️ Running the Application

1.  **Start the Local Blockchain:**
    * Launch the Ganache desktop application.
    * Click on **"Quickstart Ethereum"**.

2.  **Deploy the Smart Contract:**
    * Open a terminal and navigate to the backend directory (`python-vehicle-registry`).
    * Run the deployment script:
        ```bash
        brownie run scripts/deploy.py --network ganache-local
        ```
    * **Important:** Copy the new contract address that is printed in the console.

3.  **Update the Frontend Config:**
    * Open the frontend project (`frontend-new`) in your code editor.
    * Navigate to `src/App.jsx`.
    * Paste the new contract address into the `contractAddress` variable.

4.  **Start the Frontend Server:**
    * In a new terminal, navigate to the frontend directory (`frontend-new`).
    * Run the development server:
        ```bash
        npm run dev
        ```
    * Open your browser and go to the URL provided (usually `http://localhost:5173`).

5.  **Configure MetaMask:**
    * Add Ganache as a custom network (`RPC URL: http://127.0.0.1:7545`, `Chain ID: 1337`).
    * Import accounts from Ganache into MetaMask using their private keys to act as the Admin and different vehicle owners.

---