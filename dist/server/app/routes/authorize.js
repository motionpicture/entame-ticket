"use strict";
/**
 * ルーティングAPI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authorize = require("../controllers/authorize/authorize.controller");
const router = express.Router();
router.get('/mocoin/getCredentials', authorize.getMocoinCredentials);
router.get('/mocoin/signIn', authorize.mocoinSignIn);
router.get('/mocoin/signOut', authorize.mocoinSignOut);
exports.default = router;
