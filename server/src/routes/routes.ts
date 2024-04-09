import express, { Router, Request, Response } from 'express';
import getActionsController from '../controllers/get-actions-controller';

const router: Router = express.Router();

router.get('/actions', getActionsController);

export default router;