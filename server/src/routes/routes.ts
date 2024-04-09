import express, { Router } from 'express';
import getActionsController from '../controllers/actions-controller/get-actions-controller';
import postQueueActionsController from '../controllers/queue-actions-controller/post-queue-actions-controller';
import getQueueActionsController from '../controllers/queue-actions-controller/get-queue-actions-controller';


const router: Router = express.Router();

router.get('/actions', getActionsController);

router.get('/queue-actions', getQueueActionsController);
router.post('/queue-actions', postQueueActionsController);

export default router;