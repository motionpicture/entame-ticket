/**
 * ルーティングAPI
 */

import * as express from 'express';
import * as authorize from '../controllers/authorize/authorize.controller';
const router = express.Router();

router.get('/mocoin/getCredentials', authorize.getMocoinCredentials);
router.get('/mocoin/signIn', authorize.mocoinSignIn);
router.get('/mocoin/signOut', authorize.mocoinSignOut);

export default router;
