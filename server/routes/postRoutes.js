import express from 'express';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { getView, getList, getPost, getPut, getDelete } from '../controller/postController.js';

const router = express.Router();

router.get("/",getList);

router.get("/:id",getView);

router.post("/",getPost);

router.put("/:id",getPut);

router.delete("/:id",getDelete);

export default router;
