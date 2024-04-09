import express, { Router } from 'express';
import getActionsController from '../controllers/actions-controller/get-actions-controller';


const router: Router = express.Router();

router.get('/actions', getActionsController);

router.get('/queue-actions', getActionsController);

export default router;