// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VehicleRegistry {
    address public admin;

    struct Vehicle {
        string vin;
        string make;
        string model;
        uint256 year;
        address currentOwner;
        bool isRegistered;
    }

    mapping(string => Vehicle) public vehicles;

    event VehicleRegistered(string indexed vin, address indexed owner);
    event OwnershipTransferred(string indexed vin, address indexed from, address indexed to);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerVehicle(
        string memory _vin,
        string memory _make,
        string memory _model,
        uint256 _year,
        address _initialOwner
    ) public onlyAdmin {
        require(!vehicles[_vin].isRegistered, "VIN already registered");

        vehicles[_vin] = Vehicle({
            vin: _vin,
            make: _make,
            model: _model,
            year: _year,
            currentOwner: _initialOwner,
            isRegistered: true
        });

        emit VehicleRegistered(_vin, _initialOwner);
    }

    function transferOwnership(string memory _vin, address _newOwner) public {
        require(vehicles[_vin].isRegistered, "Vehicle not found");
        require(vehicles[_vin].currentOwner == msg.sender, "You are not the owner of this vehicle");
        require(_newOwner != address(0), "Invalid new owner address");

        address previousOwner = vehicles[_vin].currentOwner;
        vehicles[_vin].currentOwner = _newOwner;

        emit OwnershipTransferred(_vin, previousOwner, _newOwner);
    }

    function getVehicleDetails(string memory _vin)
        public
        view
        returns (string memory, string memory, uint256, address)
    {
        require(vehicles[_vin].isRegistered, "Vehicle not found");
        Vehicle storage v = vehicles[_vin];
        return (v.make, v.model, v.year, v.currentOwner);
    }
}