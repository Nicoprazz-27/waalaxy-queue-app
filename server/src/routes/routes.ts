import express, { Router } from 'express';
import getActionsController from '../controllers/actions-controller/get-actions-controller';
import getQueueActionsController from '../controllers/queue-actions-controller/get-queue-actions-controller';


const router: Router = express.Router();

router.get('/actions', getActionsController);

router.get('/queue-actions', getQueueActionsController);

export default router;