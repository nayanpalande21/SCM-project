// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChainSimple {

    /*=================================
        USER PROFILE STRUCTURE
    =================================*/
    struct User {
        string name;
        string email;
        string role;   // Manufacturer, Distributor, Retailer, Customer
        bool exists;
    }

    /*=================================
        PRODUCT BATCH STRUCTURE
    =================================*/
    struct ProductBatch {
        string batchId;
        string productName;
        string expiryDate;
        address manufacturer;
        bool verified;
    }

    /*=================================
        SHIPMENT STRUCTURE
    =================================*/
    struct Shipment {
        string shipmentId;
        string batchId;
        address distributor;
        address receiver;
        string status; // Created / InTransit / Delivered
    }

    /*=================================
        STORAGE
    =================================*/
    mapping(address => User) public users;
    mapping(string => ProductBatch) public batches;
    mapping(string => Shipment) public shipments;

    /*=================================
        USER REGISTRATION FUNCTION
        (KEPT AS-IS)
    =================================*/
    function registerUser(
        string memory _name,
        string memory _email,
        string memory _role
    ) public {
        require(!users[msg.sender].exists, "User already registered");

        users[msg.sender] = User({
            name: _name,
            email: _email,
            role: _role,
            exists: true
        });
    }

    /*=================================
        PRODUCT BATCH CREATION
        ✅ DEV MODE (NO ROLE CHECK)
    =================================*/
    function createProductBatch(
        string memory _batchId,
        string memory _productName,
        string memory _expiryDate
    ) public {
        require(bytes(_batchId).length > 0, "Invalid Batch ID");
        require(bytes(_productName).length > 0, "Invalid Product Name");

        batches[_batchId] = ProductBatch({
            batchId: _batchId,
            productName: _productName,
            expiryDate: _expiryDate,
            manufacturer: msg.sender,
            verified: true
        });
    }

    /*=================================
        SHIPMENT CREATION
        (KEPT SAME)
    =================================*/
    function createShipment(
        string memory _shipmentId,
        string memory _batchId,
        address _receiver
    ) public {
        require(users[msg.sender].exists, "User not registered");
        require(
            keccak256(bytes(users[msg.sender].role)) ==
            keccak256(bytes("Distributor")),
            "Only Distributor allowed"
        );

        shipments[_shipmentId] = Shipment({
            shipmentId: _shipmentId,
            batchId: _batchId,
            distributor: msg.sender,
            receiver: _receiver,
            status: "Created"
        });
    }

    /*=================================
        PRODUCT VERIFICATION FUNCTION
    =================================*/
    function verifyProduct(
        string memory _batchId
    )
        public
        view
        returns (
            bool valid,
            string memory productName,
            string memory expiryDate,
            address manufacturer
        )
    {
        if (bytes(batches[_batchId].batchId).length == 0) {
            return (false, "", "", address(0));
        }

        ProductBatch memory p = batches[_batchId];
        return (true, p.productName, p.expiryDate, p.manufacturer);
    }
}
