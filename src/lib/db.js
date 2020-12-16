import AWS from 'aws-sdk';

AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:1056edee-e9e2-4c61-8f7e-45d31a5ab8a4',
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'hiitrx';

export function fetchItem(TableName, Key, AttributesToGet) {
  const params = { TableName, Key };
  if (AttributesToGet) {
    params.AttributesToGet = AttributesToGet;
  }
  return new Promise((resolve, reject) => {
    dynamo.get(params, (err, data) => {
      if (err) {
        reject('item cannot be retrieved');
      } else {
        resolve(data.Item);
      }
    });
  });
}

export function put(Item, TableName = TABLE_NAME) {
  return new Promise((resolve, reject) => {
    dynamo.put({ Item, TableName }, (err, data) => {
      if (err) {
        reject(`Error: data was not saved to ${TableName}`);
      } else {
        resolve();
      }
    });
  });
}

export function scan(TableName = TABLE_NAME) {
  return new Promise((resolve, reject) => {
    dynamo.scan({ TableName }, (err, data) => {
      if (err) {
        reject('data cannot be retrieved');
      } else {
        resolve(data.Items);
      }
    });
  });
}
