import fs from 'fs'
import { randomUUID } from "crypto";
import pool from "../db/database.js";


export const getList = async(req,res)=>{
    try {
        // const data = fs.readFileSync("./data/post.json","utf-8");
        // const posts = JSON.parse(data);

        const [rows] = await pool.query("SELECT * FROM posts")
        res.status(200).json(rows);
    }catch (error){

        console.error(error);
        res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
}

export const getView = async (req,res)=>{
    try{
        const { id } = req.params;

        // const data = fs.readFileSync("./data/post.json", "utf-8");
        // const posts = JSON.parse(data);
        //const post = posts.find((post) => post.id === id);

        const [rows] = await pool.query("SELECT * FROM posts WHERE id =?",[id])
        

        if (rows.length===0) {
            return res.status(404).json({
                message: "게시물을 찾을 수 없습니다."
            });
        }

        res.status(200).json(rows[0]);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
        
    }
}

export const createPost = async (req,res)=>{
    // const data = fs.readFileSync("./data/post.json", "utf-8");
    // const posts = JSON.parse(data);

    // const newPost = {
    //     id: randomUUID(),
    //     ...req.body
    // };

    try{
        const { title, category, content } = req.body;
        const id = randomUUID();

        await pool.query(
            `INSERT INTO posts (id,title,category,content)
            VALUES(?,?,?,?)`,
            [id,title,category,content]
        )

        res.status(201).json({
            id,
            title,
            category,
            content
        })

        // posts.push(newPost);

        // fs.writeFileSync(
        //     "./data/post.json",
        //     JSON.stringify(posts, null, 2)
        // );

        // res.json(newPost);
    }catch(error){
        console.error(error);

        res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
}

export const updatePost = async(req,res)=>{
    const { id } = req.params;
    const { title, category, content }= req.body;
    const [result]=await pool.query(`
        UPDATE posts
        SET title = ?,category=?,content=?
        WHERE id=?`,
        [title,category,content,id]
    )

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "게시물을 찾을 수 없습니다."
        });
    }

    return res.status(200).json({
        message: "게시물이 수정되었습니다."
    });

    // const data = fs.readFileSync("./data/post.json", "utf-8");
    // const puts = JSON.parse(data);
    // const index = puts.findIndex(
    //     (post) => post.id === id
    // );
    // if (index === -1) {
    //     return res.status(404).json({
    //         message: "게시물을 찾을 수 없습니다."
    //     });
    // }
    // puts[index] = {
    //     ...puts[index],
    //     ...req.body,
    //     id: id
    // };
    
    // fs.writeFileSync(
    //     "./data/post.json",
    //     JSON.stringify(puts, null, 2)
    // );
    // res.json(puts[index]);
    
}

export const deletePost = async(req, res)=>{
    // const data = fs.readFileSync("./data/post.json", "utf-8");
    // const deletes = JSON.parse(data);
    // const index = deletes.findIndex((e) => e.id===req.params.id);

    

    // if (index === -1) {
    //     return res.status(404).json({
    //         message: "게시물을 찾을 수 없습니다."
    //     });
    // }

    // deletes.splice(index,1)

    // fs.writeFileSync(
    //     "./data/post.json",
    //     JSON.stringify(deletes,null,2)
    // )


    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM posts WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "게시물을 찾을 수 없습니다."
            });
        }

        return res.status(200).json({
            message: "게시물이 삭제되었습니다."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
    
}