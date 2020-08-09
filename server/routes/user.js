const express = require("express");
const mongoose = require("mongoose");

const Users = require("../models/users");
const router = express.Router();
router.use(bodyParser.json());
