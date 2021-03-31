import AWS from 'aws-sdk';

const dynamoDocumentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-2',
  apiVersion: '2018-05-21',
});

export default dynamoDocumentClient;
