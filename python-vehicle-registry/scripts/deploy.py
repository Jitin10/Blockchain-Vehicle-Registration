# scripts/deploy.py
from brownie import VehicleRegistry, accounts

def main():
    # Get the first account from the local Ganache instance
    admin_account = accounts[0]

    # Deploy the contract
    print("Deploying the contract...")
    vehicle_registry = VehicleRegistry.deploy({'from': admin_account})

    print(f"Contract deployed to: {vehicle_registry.address}")
    return vehicle_registry