/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const packageJSONPath = `${path.resolve()}/package.json`;
const packageJSON = require(packageJSONPath);

const createNewLambda = async (lambda, lambdaName, zipPath) => {
  try {
    await lambda.createFunction({
      Code: {
        ZipFile: fs.readFileSync(zipPath),
      },
      FunctionName: lambdaName,
      Handler: 'index.default',
      Role: 'arn:aws:iam::764074376504:role/lambda-full-access',
      Runtime: 'nodejs18.x',
      Timeout: 15,
      Tags: {
        project: 'fantasy_sports',
      },
    }).promise();
  } catch (error) {
    console.error(`Could not save ${lambdaName}, ${JSON.stringify(error)}`);
    process.exit(1);
  }
};

const updateExistingLambda = async (lambda, lambdaName, zipPath) => {
  await lambda.getFunction({
    FunctionName: lambdaName,
  }).promise();

  await lambda.updateFunctionCode({
    FunctionName: lambdaName,
    ZipFile: fs.readFileSync(zipPath),
  }).promise();
};

(async () => {
  const lambdaName = packageJSON.name;
  const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    region: 'us-east-2',
  });

  const zipPath = `${path.resolve()}/dist/archive.zip`;

  try {
    await updateExistingLambda(lambda, lambdaName, zipPath);
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      await createNewLambda(lambda, lambdaName, zipPath);
    } else {
      console.error(`Could not save ${lambdaName}, ${JSON.stringify(error)}`);
      process.exit(1);
    }
  }
})();
