/* eslint @typescript-eslint/no-var-requires: "off" */

const https = require('https')
const express = require('express');

const app = express();
const url = 'https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv';
let csvString = '';
let csvArray = [];
let fileSize = 0;
const ENVIRONMENT = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;
console.log(ENVIRONMENT);

export const download = (callback) => {
  https.get(url, (res) => {
    fileSize = res && res.headers && res.headers['content-length'];

    res.on('data', (d) => {
      csvString += d.toString();
    });
    res.on('end', () => {
      callback();
    });

  }).on('error', (e) => {
    console.error(e);
  })
}

export const parseCsv = () => {
  // console.log(csvString);
  csvArray = csvString && csvString.split("\n");
  csvArray && csvArray.length > 0 && csvArray.pop();
  return csvArray;
}

export const getHeaders = () => {
  const headers = csvArray && csvArray.length > 0 && csvArray[0].split(';')
  // console.log(headers);
  return headers;
}

export const getFileSize = () => {
  // console.log(fileSize);
  return fileSize;
}

export const getTotalRows = () => {
  // console.log(csvArray.length - 1);
  return (csvArray && csvArray.length > 0 && csvArray.length - 1) || 0;
}

app.get('/', function (req, res) {
  console.log(req);
  download(() => {
    parseCsv();
    const response = {
      "CSV file size (bytes)": getFileSize(),
      "Total number of rows": getTotalRows(),
      "Column names": getHeaders()
    }
    res.send(response);
  });
});

ENVIRONMENT === 'prod' && app.listen(PORT, function () {
  console.log("CSV app started at port", PORT);
});
