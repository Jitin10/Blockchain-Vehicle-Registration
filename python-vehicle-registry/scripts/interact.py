# scripts/interact.py
from brownie import VehicleRegistry, accounts

def main():
    # The script assumes the contract is already deployed.
    # We will get the most recently deployed instance of VehicleRegistry.
    if not VehicleRegistry:
        print("No contracts deployed yet. Please run the deploy script first.")
        return

    contract = VehicleRegistry[-1]
    print(f"Interacting with contract at: {contract.address}")

    # Use accounts provided by Ganache
    admin = accounts[0]
    car_owner_1 = accounts[1]
    car_owner_2 = accounts[2]

    # 🔐 Feature 1: Admin registers a new vehicle
    print("\n--- Admin is registering a vehicle for Owner 1 ---")
    vin = "123XYZ"
    tx = contract.registerVehicle(vin, "Tesla", "Model S", 2025, car_owner_1, {'from': admin})
    tx.wait(1) # Wait for the transaction to be mined
    print(f"Vehicle with VIN {vin} registered for {car_owner_1.address}")

    # 🧾 Feature 2: Anyone can view car details
    print("\n--- Anyone can view vehicle details ---")
    details = contract.getVehicleDetails(vin)
    print(f"Details for VIN {vin}: Make={details[0]}, Model={details[1]}, Year={details[2]}, Owner={details[3]}")

    # 👤 Feature 3: Owner transfers ownership
    print(f"\n--- Owner 1 ({car_owner_1.address}) is transferring the vehicle to Owner 2 ({car_owner_2.address}) ---")
    tx2 = contract.transferOwnership(vin, car_owner_2, {'from': car_owner_1})
    tx2.wait(1)
    print("Ownership transferred successfully!")

    # Verify the new owner
    print("\n--- Verifying new owner details ---")
    new_details = contract.getVehicleDetails(vin)
    print(f"New owner for VIN {vin} is: {new_details[3]}")