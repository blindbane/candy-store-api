const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");

const app = express();

app.use(cors());

const { VENDORS_TABLE } = process.env;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get("/vendors/:vendorId", (req, res) => {
  const params = {
    TableName: VENDORS_TABLE,
    Key: {
      vendorId: req.params.vendorId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get vendor" });
    }
    if (result.Item) {
      const {
        vendorId,
        firstName,
        lastName,
        company,
        webAddress,
        phoneNumber,
        candySpecialty,
        dateAdded
      } = result.Item;

      res.json({
        vendorId,
        firstName,
        lastName,
        company,
        webAddress,
        phoneNumber,
        candySpecialty,
        dateAdded
      });
    } else {
      res.status(404).json({ error: "Vendor not found" });
    }
  });
});

app.post("/vendors", (req, res) => {
  const {
    vendorId,
    firstName,
    lastName,
    company,
    webAddress,
    phoneNumber,
    candySpecialty,
    dateAdded
  } = req.body;
  if (typeof vendorId !== "string") {
    res.status(400).json({ error: '"vendorId" must be a string' });
  } else if (typeof firstName !== "string") {
    res.status(400).json({ error: '"firstName" must be a string' });
  } else if (typeof lastName !== "string") {
    res.status(400).json({ error: '"lastName" must be a string' });
  } else if (typeof company !== "string") {
    res.status(400).json({ error: '"company" must be a string' });
  } else if (typeof webAddress !== "string") {
    res.status(400).json({ error: '"webAddress" must be a string' });
  } else if (typeof phoneNumber !== "string") {
    res.status(400).json({ error: '"phoneNumber" must be a string' });
  } else if (!Array.isArray(candySpecialty)) {
    res.status(400).json({ error: '"candySpecialty" must be an array' });
  } else if (typeof dateAdded !== "string") {
    res.status(400).json({ error: '"dateAdded" must be a string' });
  }

  const params = {
    TableName: VENDORS_TABLE,
    Item: {
      vendorId: vendorId,
      firstName,
      lastName,
      company,
      webAddress,
      phoneNumber,
      candySpecialty,
      dateAdded
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create vendor" });
    }
    res.json({ vendorId, firstName });
  });
});

module.exports.handler = serverless(app);
