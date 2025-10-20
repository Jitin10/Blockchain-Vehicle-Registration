import { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import VehicleRegistryABI from './VehicleRegistry.json'; // Import the ABI
import './App.css'; // Import the new styles

// IMPORTANT: Replace with your deployed contract's address
const contractAddress = "0x0599Df6eD647a9d48cA883eb30E4c447DA42EdF2";
const contractABI = VehicleRegistryABI.abi;

function App() {
  // State variables to store information
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form input states
  const [registerVin, setRegisterVin] = useState('');
  const [registerMake, setRegisterMake] = useState('');
  const [registerModel, setRegisterModel] = useState('');
  const [registerYear, setRegisterYear] = useState('');
  const [registerOwner, setRegisterOwner] = useState('');

  const [transferVin, setTransferVin] = useState('');
  const [transferTo, setTransferTo] = useState('');

  const [viewVin, setViewVin] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState(null);

  // Function to connect to MetaMask - CORRECTED FOR ETHERS V6
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Use BrowserProvider for Ethers v6
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // It's recommended to get the signer this way in v6
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setAccount(address);
        
        const registryContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(registryContract);

        // Check if the connected account is the admin
        const adminAddress = await registryContract.admin();
        setIsAdmin(address.toLowerCase() === adminAddress.toLowerCase());

      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Handler for vehicle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const tx = await contract.registerVehicle(registerVin, registerMake, registerModel, parseInt(registerYear), registerOwner);
      await tx.wait();
      alert("Vehicle registered successfully!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. See console for details.");
    }
  };

  // Handler for viewing vehicle details
  const handleViewDetails = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const details = await contract.getVehicleDetails(viewVin);
      setVehicleDetails({
        make: details[0],
        model: details[1],
        year: details[2].toString(),
        owner: details[3],
      });
    } catch (err) {
      console.error("Failed to fetch details:", err);
      setVehicleDetails(null);
      alert("Could not fetch vehicle details. Check VIN and console.");
    }
  };

  // Handler for ownership transfer
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!contract) return;
    try {
      const tx = await contract.transferOwnership(transferVin, transferTo);
      await tx.wait();
      alert("Ownership transferred successfully!");
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Transfer failed. See console for details.");
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Vehicle Registration on Blockchain</h1>
        {account ? (
          <p>Connected Account: <strong>{account}</strong> {isAdmin && "(Admin)"}</p>
        ) : (
          <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
        )}
      </header>

      <main>
        {/* Admin Section */}
        {isAdmin && (
          <div className="card">
            <h2>🔐 Admin: Register Vehicle</h2>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="VIN" value={registerVin} onChange={(e) => setRegisterVin(e.target.value)} required />
              <input type="text" placeholder="Make" value={registerMake} onChange={(e) => setRegisterMake(e.target.value)} required />
              <input type="text" placeholder="Model" value={registerModel} onChange={(e) => setRegisterModel(e.target.value)} required />
              <input type="number" placeholder="Year" value={registerYear} onChange={(e) => setRegisterYear(e.target.value)} required />
              <input type="text" placeholder="Initial Owner Address" value={registerOwner} onChange={(e) => setRegisterOwner(e.target.value)} required />
              <button type="submit" className="action-button">Register Vehicle</button>
            </form>
          </div>
        )}
        
        {/* Public View Section */}
        <div className="card">
          <h2>🧾 Public: View Car Details</h2>
          <form onSubmit={handleViewDetails}>
            <input type="text" placeholder="Enter VIN" value={viewVin} onChange={(e) => setViewVin(e.target.value)} required />
            <button type="submit" className="action-button">View Details</button>
          </form>
          {vehicleDetails && (
            <div className="details">
              <p><strong>Make:</strong> {vehicleDetails.make}</p>
              <p><strong>Model:</strong> {vehicleDetails.model}</p>
              <p><strong>Year:</strong> {vehicleDetails.year}</p>
              <p><strong>Owner:</strong> {vehicleDetails.owner}</p>
            </div>
          )}
        </div>

        {/* Owner Section */}
        {account && (
          <div className="card">
            <h2>👤 Owner: Transfer Ownership</h2>
            <form onSubmit={handleTransfer}>
              <input type="text" placeholder="VIN of vehicle you own" value={transferVin} onChange={(e) => setTransferVin(e.target.value)} required />
              <input type="text" placeholder="New Owner Address" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} required />
              <button type="submit" className="action-button">Transfer Ownership</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;