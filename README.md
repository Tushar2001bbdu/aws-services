@tushar_8122001/aws_services
@tushar_8122001/aws_services is an npm package that provides a set of REST APIs for interacting with various AWS services, including S3, DynamoDB, SES, Rekognition, Translate, Textract, and KMS. It simplifies common operations such as managing S3 buckets and objects, performing DynamoDB operations, sending and verifying emails with SES, analyzing images and videos with Rekognition, translating text, analyzing documents with Textract, and encrypting/decrypting data with KMS.

Features:
S3 Operations: Bucket management, file uploads, deletions, and more.

DynamoDB Operations: Table management and CRUD operations.

SES Operations: Email verification and sending.

Rekognition Operations: Image and video analysis for faces and objects.

Textract Operations: Document analysis for tables and forms.

Translate Operations: Text translation.

KMS Operations: Data encryption and decryption.

Security Note: This package encrypts all credentials using AWS KMS before storing them in the environment file, and it decrypts them when needed to create different AWS clients.

Installation
To install the package, run:

bash
Copy
Edit
npm install @tushar_8122001/aws_services
API Documentation
Base URL
The base URL for all API requests is:

arduino
Copy
Edit
https://localhost:5000
Endpoints
1. S3 Operations
Base Route: /DM

Create S3 Client

Endpoint: POST /createClient

Description: Initializes the S3 client.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Create Bucket

Endpoint: POST /createBucket

Description: Creates a new S3 bucket.

Parameters:

name (String): Name of the bucket to create.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Delete Bucket

Endpoint: DELETE /deleteBucket

Description: Deletes an S3 bucket.

Parameters:

bucketName (String): Name of the bucket to delete.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

List Buckets

Endpoint: GET /listOfBuckets

Description: Retrieves a list of all S3 buckets.

Response:

200 OK: { "status": "true", "buckets": [...] }

500 Internal Server Error: { "status": "false" }

Add File

Endpoint: POST /addFile

Description: Uploads a file to an S3 bucket.

Parameters:

bucketName (String): Name of the bucket.

fileName (String): Name of the file to upload.

type (String): Content type of the file.

key (String): Path where the file will be stored.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Get File

Endpoint: GET /getFile

Description: Gives a presigned URL for the file, which expires after a certain period.

Parameters:

bucketName (String): Name of the bucket.

key (String): Path of the file in the S3 bucket.

Response:

200 OK: { "status": "true", "fileContent": "..." }

500 Internal Server Error: { "status": "false" }

Delete File

Endpoint: DELETE /deleteFile

Description: Deletes a file from an S3 bucket.

Parameters:

bucketName (String): Name of the bucket.

key (String): Path of the file to delete in the S3 bucket.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Copy File

Endpoint: PUT /copyObject

Description: Copies a file from one S3 bucket to another.

Parameters:

sourceBucket (String): Name of the source bucket.

sourceFileName (String): Name of the file in the source bucket.

destinationBucket (String): Name of the destination bucket.

Key (String): Path of the file in the source bucket.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

List Objects

Endpoint: GET /getListOfObjects

Description: Retrieves a list of objects in a specific S3 bucket.

Parameters:

bucketName (String): Name of the bucket.

Response:

200 OK: { "status": "true", "objects": [...] }

500 Internal Server Error: { "status": "false" }

2. DynamoDB Operations
Base Route: /databaseOperations

Create DynamoDB Client

Endpoint: POST /createClient

Description: Initializes the DynamoDB client.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Create Table

Endpoint: POST /createTable

Description: Creates a new DynamoDB table.

Parameters:

tableName (String): Name of the table.

type (String): Data type of the primary key.

capacityUnits (Number): Provisioned throughput capacity units.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Delete Table

Endpoint: DELETE /deleteTable

Description: Deletes a DynamoDB table.

Parameters:

tableName (String): Name of the table to delete.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Add Item

Endpoint: POST /addItem

Description: Adds an item to a DynamoDB table.

Parameters:

tableName (String): Name of the table.

primaryKey (String): Primary key value for the item.

attr1 (String): Value for the first attribute.

attr2 (String): Value for the second attribute.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Get Item

Endpoint: GET /getItem

Description: Retrieves an item from a DynamoDB table.

Parameters:

tableName (String): Name of the table.

primaryKey (String): Primary key value of the item to retrieve.

Response:

200 OK: { "status": {...} }

500 Internal Server Error: { "status": "false" }

Update Item

Endpoint: PUT /updateItem

Description: Updates an item in a DynamoDB table.

Parameters:

tableName (String): Name of the table.

primaryKey (String): Primary key value of the item to update.

updatedValue (String): New value for the attribute to update.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Delete Item

Endpoint: DELETE /deleteItem

Description: Deletes an item from a DynamoDB table.

Parameters:

tableName (String): Name of the table.

primaryKey (String): Primary key value of the item to delete.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

3. SES Operations
Base Route: /emailServices

Create SES Client

Endpoint: POST /createClient

Description: Initializes the SES client.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Verify Email

Endpoint: POST /verifyEmail

Description: Verifies an email address with SES.

Parameters:

email (String): Email address to verify.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Send Email

Endpoint: POST /sendEmail

Description: Sends an email using SES.

Parameters:

senderEmail (String): Sender's email address.

targetEmail (String): Recipient's email address.

subject (String): Subject of the email.

textData (String): Body of the email.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

4. Rekognition Operations
Base Route: /rekognitionOperations

Create Rekognition Client

Endpoint: POST /createClient

Description: Initializes the Rekognition client.

Response:

200 OK: { "status": "true" }

500 Internal Server Error: { "status": "false" }

Face Detection for Images

Endpoint: GET /facedetectionForImages

Description: Detects faces in an image stored in S3.

Parameters:

bucketName (String): Name of the S3 bucket.

fileName (String): Name of the image file.

Response:

200 OK: { "status": "true", "faceDetails": [...] }

500 Internal Server Error: { "status": "false" }

Object Detection for Images

Endpoint: GET /objectdetectionForImages

Description: Detects objects in an image stored in S3.

Parameters:

bucketName (String): Name of the S3 bucket.

fileName (String): Name of the image file.

Response:

200 OK: { "status": "true", "labels": [...] }

500 Internal Server Error: { "status": "false" }

Face Detection for Videos

Endpoint: GET /faceDetectionForVideos

Description: Detects faces in a video stored in S3.

Parameters:

bucketName (String): Name of the S3 bucket.

fileName (String): Name of the video file.

LabelCategoryInclusionFilters (Array): Filters for label categories.

Response:

200 OK: { "status": "true", "data": {...} }

500 Internal Server Error: { "status": "false" }

5. Textract Operations
Base Route: /textractOperations

Analyze Document

Endpoint: GET /getData

Description: Creates a Textract client and analyzes a document for tables and forms.

Parameters:

bucketName (String): Name of the S3 bucket.

fileName (String): Name of the document file.

Response:

200 OK: { "status": "true", "data": {...} }

500 Internal Server Error: { "status": "false" }

6. Translate Operations
Base Route: /translateOperations

Translate Text

Endpoint: GET /translate

Description: Translates text from one language to another.

Parameters:

text (String): Text to translate.

source (String): Source language code (e.g., "en").

target (String): Target language code (e.g., "es").

Response:

200 OK: { "status": "translatedText" }

500 Internal Server Error: { "status": "false" }

7. KMS Operations
Base Route: /kmsOperations

Encrypt Data

Endpoint: GET /encryptData

Description: Encrypts data using AWS KMS.

Parameters:

Keyid (String): The ID of the KMS key.

text (String): The plaintext data to encrypt.

Response:

200 OK: { "status": "true", "cipherTextBlob": "..." }

500 Internal Server Error: { "status": "false" }

Decrypt Data

Endpoint: GET /decryptData

Description: Decrypts data using AWS KMS.

Parameters:

Keyid (String): The ID of the KMS key.

cipher (String): The encrypted data to decrypt.

Response:

200 OK: { "status": "true", "plaintext": "..." }

500 Internal Server Error: { "status": "false" }

Error Handling
All API responses include a status field. If an operation fails, the response will include:

"status": "false" with a generic error message.
For successful operations, the responses will include:

"status": "true" along with relevant data.

Contributing
Contributions to aws_services are welcome. Please fork the repository, make your changes, and submit a pull request.

License
This project is licensed under the Apache-2.0 License
