import express from 'express';
import fs from 'fs';
import { randomUUID } from 'crypto';

const router = express.Router();

router.get("/",(req,res)=>{
    // res.json({massage:"GET post"});
    const data = fs.readFileSync("./data/post.json", "utf-8");
    const posts = JSON.parse(data);

    res.json(posts);
});


router.get("/:id", (req, res) => {
    const { id } = req.params;

    const data = fs.readFileSync("./data/post.json", "utf-8");
    const posts = JSON.parse(data);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "게시물을 찾을 수 없습니다."
        });
    }

    res.json(post);
});


router.post("/", (req, res) => {
    // res.json({ message: "POST post" });
    const data = fs.readFileSync("./data/post.json", "utf-8");
    const posts = JSON.parse(data);

    const newPost = {
        id: randomUUID(),
        ...req.body
    };

    posts.push(newPost);

    fs.writeFileSync(
        "./data/post.json",
        JSON.stringify(posts, null, 2)
    );

    res.json(newPost);

    console.log(newPost);
});

router.put("/:id", (req, res) => {
    // res.json({ message: "PUT post" });

    const { id } = req.params;
    console.log("PUT 요청 ID:", id);
    const data = fs.readFileSync("./data/post.json", "utf-8");
    const puts = JSON.parse(data);

    console.log("JSON에 있는 ID:", puts.map(post => post.id));

    const index = puts.findIndex(
        // (post) => post.id === req.body.id
        (post) => post.id === id
    );


    console.log("찾은 index:", index);

    if (index === -1) {
        return res.status(404).json({
            message: "게시물을 찾을 수 없습니다."
        });
    }

    puts[index] = {
        ...puts[index],
        ...req.body,
        id: id
    };
    
    fs.writeFileSync(
        "./data/post.json",
        JSON.stringify(puts, null, 2)
    );

    res.json(puts[index]);
    console.log("수정 완료", puts[index]);
});

router.delete("/:id", (req, res) => {
    // res.json({ message: "DELETE post" });
    const data = fs.readFileSync("./data/post.json", "utf-8");
    const deletes = JSON.parse(data);
    const index = deletes.findIndex((e) => e.id===req.params.id);


    if (index === -1) {
        return res.status(404).json({
            message: "게시물을 찾을 수 없습니다."
        });
    }

    deletes.splice(index,1)

    fs.writeFileSync(
        "./data/post.json",
        JSON.stringify(deletes,null,2)
    )
    res.json(deletes);
});

export default router;
