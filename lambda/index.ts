import {EventBridgeHandler} from 'aws-lambda';
import 'source-map-support/register';
import {constants, fetchUrl} from "./constants";

const axios = require('axios');

export const handler: EventBridgeHandler<any, any, any> = async (_event, _context) => {

  const all = constants.map(getRequest);

  const resolvedPromise = Promise.all(all);
  resolvedPromise.then(resolve => {
    console.log('RESOLVED');
    console.log(resolve);
    return apiResponses._200({message: 'REJECTION - There was an error'});
  }, rejected => {
    console.log('REJECTED');
    console.log(rejected);
    return apiResponses._400({message: 'REJECTION - There was an error'});
  });
  resolvedPromise.catch(error => {
    console.log('ERROR');
    console.log(error);
    return apiResponses._500({message: 'EXCEPTION - There was an error'});
  });
}

const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2)
    };
  },
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2)
    };
  },
  _500: (body: { [key: string]: any }) => {
    return {
      statusCode: 500,
      body: JSON.stringify(body, null, 2)
    };
  }

}

async function getRequest(salesOrg) {
  console.log(`Calling API for sales org: ${salesOrg}`);
  const res = await axios.get(fetchUrl(salesOrg));
  console.log(`Status code: ${res.status}`);
  console.log(`Status text: ${res.statusText}`);
  console.log(`Request method: ${res.request.method}`);
  console.log(`Path: ${res.request.path}`);
  console.log(`Date: ${res.headers.date}`);
  console.log(`Data: ${res.data}`);
  return res;
}

