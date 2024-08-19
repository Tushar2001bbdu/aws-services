@tushar_8122001/aws_services is an npm package that provides a set of REST APIs for interacting with various AWS services, including S3, DynamoDB, SES, Rekognition, Translate, Textract, and KMS. This package allows you to manage S3 buckets and objects, perform DynamoDB operations, send and verify emails with SES, analyze images and videos with Rekognition, translate text, analyze documents with Textract, and encrypt/decrypt data with KMS.(Note:This REST API encrypts all the credentials using the KMS Client before storing it in the environmental file and decrypts it when it is needed for creating different clients)
Installation
To install the package, run:

npm install aws_services
API Documentation
Base URL
The base URL for all API requests is:

https://localhost:5000
Endpoints
Base Route:  /DM
1. S3 Operations
•	Create S3 Client
o	Endpoint: POST /createClient
o	Description: Initializes the S3 client.
o	Parameters: None
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Create Bucket
o	Endpoint: POST /createBucket
o	Description: Creates a new S3 bucket.
o	Parameters:
	name(String) - Name of the bucket to create.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Delete Bucket
o	Endpoint: DELETE /deleteBucket
o	Description: Deletes an S3 bucket.
o	Parameters:
	bucketName (String) - Name of the bucket to delete.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	List Buckets
o	Endpoint: GET /listOfBuckets
o	Description: Retrieves a list of all S3 buckets.
o	Parameters: None
o	Responses:
	200 OK - { "status": "true", "buckets": [...] }
	500 Internal Server Error - { "status": "false" }
•	Add File
o	Endpoint: POST /addFile
o	Description: Uploads a file to an S3 bucket.
o	Parameters:
	bucketName (String) - Name of the bucket.
	fileName (String) - Name of the file to upload.
	type (String) - Type Of Content of the file.
	key(String)-Key(path) where the file will be stored
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Get File
o	Endpoint: GET /getFile
o	Description: Gives you a presigned url of the file which will expire after a certain period of time.
o	Parameters:
	bucketName (String) - Name of the bucket.
	key (String) - Path of the file in the S3 bucket
o	Responses:
	200 OK - { "status": "true", "fileContent": "..." }
	500 Internal Server Error - { "status": "false" }
•	Delete File
o	Endpoint: DELETE /deleteFile
o	Description: Deletes a file from an S3 bucket.
o	Parameters:
	bucketName (String) - Name of the bucket
	key (String) - Patj of the file to delete in the S3 bucket/.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Copy File
o	Endpoint: PUT /copyObject
o	Description: Copies a file from one S3 bucket to another.
o	Parameters:
	sourceBucket (String) - Name of the source bucket.
	sourceFileName (String) - Name of the file in the source bucket.
	destinationBucket (String) - Name of the destination bucket.
	Key(String) -key(path) of the file in the source bucket
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	List Objects
o	Endpoint: GET /getListOfObjects
o	Description: Retrieves a list of objects in a specific S3 bucket.
o	Parameters:
	bucketName (String) - Name of the bucket.
o	Responses:
	200 OK - { "status": "true", "objects": [...] }
	500 Internal Server Error - { "status": "false" }
2. DynamoDB Operations
Base Route:  /databaseOperations
•	Create DynamoDB Client
o	Endpoint: POST /createClient
o	Description: Initializes the DynamoDB client.
o	Parameters: None
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Create Table
o	Endpoint: POST /createTable
o	Description: Creates a new DynamoDB table.
o	Parameters:
	tableName (String) - Name of the table.
	type (String) - Data type of the primary key.
	capacityUnits (Number) - Provisioned throughput capacity units.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Delete Table
o	Endpoint: DELETE /deleteTable
o	Description: Deletes a DynamoDB table.
o	Parameters:
	tableName (String) - Name of the table to delete.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Add Item
o	Endpoint: POST /addItem
o	Description: Adds an item to a DynamoDB table.
o	Parameters:
	tableName (String) - Name of the table.
	primaryKey (String) - Primary key value for the item.
	attr1 (String) - Value for the first attribute.
	attr2 (String) - Value for the second attribute.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Get Item
o	Endpoint: GET /getItem
o	Description: Retrieves an item from a DynamoDB table.
o	Parameters:
	tablename (String) - Name of the table.
	primaryKey (String) - Primary key value of the item to retrieve.
o	Responses:
	200 OK - { "status": {...} }
	500 Internal Server Error - { "status": "false" }
•	Update Item
o	Endpoint: PUT /updateItem
o	Description: Updates an item in a DynamoDB table.
o	Parameters:
	tableName (String) - Name of the table.
	primaryKey (String) - Primary key value of the item to update.
	updatedValue (String) - New value for the attribute to update.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Delete Item
o	Endpoint: DELETE /deleteItem
o	Description: Deletes an item from a DynamoDB table.
o	Parameters:
	tableName (String) - Name of the table.
	primaryKey (String) - Primary key value of the item to delete.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
3. SES Operations
Base Route : /emailServices
•	Create SES Client
o	Endpoint: POST /createClient
o	Description: Initializes the SES client.
o	Parameters: None
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Verify Email
o	Endpoint: POST /verifyEmail
o	Description: Verifies an email address with SES.
o	Parameters:
	email (String) - Email address to verify.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Send Email
o	Endpoint: POST /sendEmail
o	Description: Sends an email using SES.
o	Parameters:
	senderEmail (String) - Sender's email address.
	targetEmail (String) - Recipient's email address.
	subject (String) - Subject of the email.
	textData (String) - Body of the email.
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
4. Rekognition Operations
•	Create Rekognition Client
o	Endpoint: POST /createClient
o	Description: Initializes the Rekognition client.
o	Parameters: None
o	Responses:
	200 OK - { "status": "true" }
	500 Internal Server Error - { "status": "false" }
•	Face Detection for Images
o	Endpoint: GET /facedetectionForImages
o	Description: Detects faces in an image stored in S3.
o	Parameters:
	bucketName (String) - Name of the S3 bucket.
	fileName (String) - Name of the image file.
o	Responses:
	200 OK - { "status": "true", "faceDetails": [...] }
	500 Internal Server Error - { "status": "false" }
•	Object Detection for Images
o	Endpoint: GET /objectdetectionForImages
o	Description: Detects objects in an image stored in S3.
o	Parameters:
	bucketName (String) - Name of the S3 bucket.
	fileName (String) - Name of the image file.
o	Responses:
	200 OK - { "status": "true", "labels": [...] }
	500 Internal Server Error - { "status": "false" }
•	Face Detection for Videos
o	Endpoint: GET /faceDetectionForVideos
o	Description: Detects faces in a video stored in S3.
o	Parameters:
	bucketName (String) - Name of the S3 bucket.
	fileName (String) - Name of the video file.
	LabelCategoryInclusionFilters (Array) - Filters for label categories.
o	Responses:
	200 OK - { "status": "true", "data": {...} }
	500 Internal Server Error - { "status": "false" }
5. Textract Operation
•	Analyze Document
o	Endpoint: GET /getData
o	Description:Creates a textract client and analyzes a document for tables and forms using Textract.
o	Parameters:
	bucketName (String) - Name of the S3 bucket.
	fileName (String) - Name of the document file.
o	Responses:
	200 OK - { "status": "true", "data": {...} }
	500 Internal Server Error - { "status": "false" }
6. Translate Operation
•	Translate Text
o	Endpoint: GET /translate
o	Description: Creates a Translate Client and translates text from one language to another.
o	Parameters:
	text (String) - Text to translate.
	source (String) - Source language code (e.g., "en").
	target (String) - Target language code (e.g., "es").
o	Responses:
	200 OK - { "status": translatedtext }
	500 Internal Server Error - { "status": "false" }

6.Comprehend Operation
Sentiment Analysis


o	Endpoint: GET /getSentimentAnalysis
o	Description: Gets Sentiment Analysis For The Text
o	Parameters:
	text (String) - Text to translate.
	langCode(String) - Source language code for the text(e.g., "en")
o	Responses:
	200 OK - { "status": sentimentAnalysis }
	500 Internal Server Error - { "status": "false" }

7. KMS Operations
•	Encrypt Data
o	Endpoint: GET /encryptData
o	Description: Encrypts data using AWS KMS.
o	Parameters:
	Keyid (String) - The ID of the KMS key.
	text (String) - The plaintext data to encrypt.
o	Responses:
	200 OK - { "status": "true", "cipherTextBlob": "..." }
	500 Internal Server Error - { "status": "false" }
•	Decrypt Data
o	Endpoint: GET /decryptData
o	Description: Decrypts data using AWS KMS.
o	Parameters:
	Keyid (String) - The ID of the KMS key.
	cipher (String) - The encrypted data to decrypt.
o	Responses:
	200 OK - { "status": "true", "plaintext": "..." }
	500 Internal Server Error - { "status": "false" }
________________________________________
Error Handling
All API responses include a "status" field. If an operation fails, the response will include:
•	"status": "false" with a generic error message for failures.
For successful operations, responses will include "status": "true" along with relevant data.
Contributing
Contributions to aws_services are welcome. Please fork the repository, make your changes, and submit a pull request.
License
This project is licensed under the Apache-2.0 License.

