// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

error CourseCertificate__NotIssued();
error CourseCertificate__NotOwner();

contract CourseCertificate is ERC721URIStorage {
    using Strings for uint256;

    // Certificate Variables:
    string internal s_courseName; // Name of the course
    address private _owner; // Contract owner
    mapping(address => bool) internal s_issuedCertificates;
    mapping(address => string) internal s_studentToCertificate;
    uint256 private _tokenIds; // Manual counter for token IDs

    // Events:
    event CertificateIssued(address student);
    event CertificateMinted(address student, uint256 tokenId, string tokenURI);

    modifier onlyOwner() {
        if (msg.sender != _owner) {
            revert CourseCertificate__NotOwner();
        }
        _;
    }

    constructor(
        string memory courseName
    ) ERC721("CourseCertificateSoulBoundToken", "CCSBT") {
        s_courseName = courseName;
        _owner = msg.sender;
        _tokenIds = 0; // Initialize the token ID counter
    }

    function issueCertificate(address student, string memory courseName) external onlyOwner {
        if (keccak256(abi.encodePacked(s_courseName)) != keccak256(abi.encodePacked(courseName))) {
            revert CourseCertificate__NotIssued();
        }

        s_issuedCertificates[student] = true;
        emit CertificateIssued(student);
    }

    function mintCertificate(string memory ocid) public returns (uint256) {
        if (!s_issuedCertificates[msg.sender]) {
            revert CourseCertificate__NotIssued();
        }

        _tokenIds += 1; // Increment the token ID counter
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);

        string memory tokenURI = generateTokenURI(newItemId, ocid);
        _setTokenURI(newItemId, tokenURI);

        s_issuedCertificates[msg.sender] = false;
        s_studentToCertificate[msg.sender] = tokenURI;
        s_courseName = getCourseName();
        emit CertificateMinted(msg.sender, newItemId, tokenURI);

        return newItemId;
    }

    function generateTokenURI(uint256 tokenId, string memory ocid) private view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "', s_courseName, ' Certificate #', tokenId.toString(), '",',
                '"description": "Certificate for completing the course",',
                '"attributes": [',
                    '{',
                        '"trait_type": "Course Name",',
                        '"value": "', s_courseName, '"',
                    '},',
                    '{',
                        '"trait_type": "OCID",',
                        '"value": "', ocid, '"',
                    '}',
                ']',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    // Getters
    function checkCertificateOfStudent(
        address student
    ) external view returns (string memory) {
        return s_studentToCertificate[student];
    }

    function isStudentCertificateIssued(
        address student
    ) public view returns (bool) {
        return s_issuedCertificates[student];
    }

    function getTokenCounter() public view returns (uint256) {
        return _tokenIds;
    }

    function getCourseName() public view returns (string memory) {
        return s_courseName;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }
}