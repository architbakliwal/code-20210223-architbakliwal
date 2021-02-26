/* eslint @typescript-eslint/no-var-requires: "off" */

const https = require('https')
const express = require('express');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: true  })  

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const ENVIRONMENT = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;
console.log(ENVIRONMENT);

function between(x, max, min) {
  return (x > min && x < max) || x == min || x == max;
}

var input1 = {
  "rectangle_A": {
    "topRight": {
      "x": 5,
      "y": 5
    },
    "bottomLeft": {
      "x": 2,
      "y": 2
    }
  },
  "rectangle_B": {
    "topRight": {
      "x": 4,
      "y": 4
    },
    "bottomLeft": {
      "x": 1,
      "y": 1
    }
  }
}

app.post('/api/rectangles', urlencodedParser, function (req, res) {
  // Prepare output in JSON format  
  console.log('Got body:', JSON.stringify(req.body));
  console.log(JSON.parse(JSON.stringify(req.body)));
  let input = JSON.parse(JSON.stringify(req.body));
  // console.log(req)
  // console.log(input.rectangle_A);
  // console.log(input.rectangle_B)
  res.setHeader('Content-Type', 'application/json');
  if((between(input.rectangle_B.topRight.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x) &&
  between(input.rectangle_B.topRight.y, input.rectangle_A.topRight.y, input.rectangle_A.bottomLeft.y) &&
  !between(input.rectangle_B.bottomLeft.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x) &&
  !between(input.rectangle_B.bottomLeft.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x))
  ||
  (!between(input.rectangle_B.topRight.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x) &&
  !between(input.rectangle_B.topRight.y, input.rectangle_A.topRight.y, input.rectangle_A.bottomLeft.y) &&
  between(input.rectangle_B.bottomLeft.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x) &&
  between(input.rectangle_B.bottomLeft.x, input.rectangle_A.topRight.x, input.rectangle_A.bottomLeft.x))) {
    res.end(JSON.stringify({ intersect: true }));
  } else {
    res.end(JSON.stringify({ intersect: false }));
  }
})

app.post('/api/rectangles1', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  res.setHeader('Content-Type', 'application/json');
  console.log('Got body:', JSON.stringify(req.body));
  console.log(JSON.parse(JSON.stringify(req.body)));
  let input = JSON.parse(JSON.stringify(req.body));

  if (input.rectangle_A.bottomLeft.x > input.rectangle_B.topRight.x || input.rectangle_B.bottomLeft.x > input.rectangle_A.topRight.x) { 
    res.end(JSON.stringify({ intersect: false }));
  } else if (input.rectangle_A.bottomLeft.y < input.rectangle_B.topRight.y || input.rectangle_B.bottomLeft.y < input.rectangle_A.topRight.y) { 
      res.end(JSON.stringify({ intersect: false }));
  } else {
    res.end(JSON.stringify({ intersect: true }));
  }
})

ENVIRONMENT === 'prod' && app.listen(PORT, function () {
  console.log("app started at port", PORT);
});
