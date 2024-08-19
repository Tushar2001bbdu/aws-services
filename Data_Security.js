require("dotenv").config(); // Load environment variables from .env file

let client; // Variable to hold the KMS client instance

/**
 * Initializes the KMS client with AWS credentials and region.
 * @param {Object} req - The request object containing AWS credentials and region.
 * @param {Object} res - The response object (not used in this function).
 */
async function createClient(req, res) {
    const { KMSClient } = require("@aws-sdk/client-kms"); // Import KMSClient from AWS SDK
    client = new KMSClient({
        region: req.body.AWS_REGION, // Set the AWS region from request body
        credentials: {
            accessKeyId: req.body.AWS_ACCESS_KEY_ID, // Set AWS Access Key ID from request body
            secretAccessKey: req.body.AWS_SECRET_ACCESS_KEY, // Set AWS Secret Access Key from request body
        },
    });
}

/**
 * Encrypts the given plaintext using AWS KMS.
 * @param {string} text - The plaintext to be encrypted.
 * @returns {Promise<Buffer|string>} - The encrypted ciphertext blob or an error message.
 */
async function encryptData(text) {
    try {
        const { EncryptCommand } = require("@aws-sdk/client-kms"); // Import EncryptCommand from AWS SDK
        const param = {
            KeyId: req.body.Keyid, // KMS key ID from request body
            Plaintext: text, // Plaintext to be encrypted
        };
        const encrypt = new EncryptCommand(param); // Create EncryptCommand with parameters
        const response = await client.send(encrypt); // Send the encrypt command to KMS
        return response.CiphertextBlob; // Return the encrypted ciphertext blob
    } catch (error) {
        return "some error occurred"; // Return error message if encryption fails
    }
}

/**
 * Decrypts the given ciphertext using AWS KMS.
 * @param {Buffer} text - The ciphertext blob to be decrypted.
 * @returns {Promise<string|Buffer>} - The decrypted plaintext or an error message.
 */
async function decryptData(text) {
    try {
        const { DecryptCommand } = require("@aws-sdk/client-kms"); // Import DecryptCommand from AWS SDK
        const param = {
            KeyId: req.body.Keyid, // KMS key ID from request body
            CiphertextBlob: text, // Ciphertext blob to be decrypted
        };
        const decrypt = new DecryptCommand(param); // Create DecryptCommand with parameters
        const response = await client.send(decrypt); // Send the decrypt command to KMS
        return response.Plaintext; // Return the decrypted plaintext
    } catch (error) {
        return "some error occurred"; // Return error message if decryption fails
    }
}

module.exports = { encryptData, decryptData, createClient }; // Export functions for use in other modules
