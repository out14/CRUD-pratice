import express from 'express';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { getView, getList, createPost, updatePost, deletePost } from '../controller/postController.js';

const router = express.Router();

router.get("/",getList);

router.get("/:id",getView);

// createPost   → 게시물 생성
// updatePost   → 게시물 수정
// deletePost   → 게시물 삭제

router.post("/",createPost);

router.put("/:id",updatePost);

router.delete("/:id",deletePost);

export default router;
