import fs from 'fs'


export const getList =(req,res)=>{
    const data = fs.readFileSync("./data/post.json","utf-8");
    const posts = JSON.parse(data);

    res.json(posts);
}

export const getView = (req,res)=>{
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

}

export const getPost = (req,res)=>{
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
}

export const getPut = (req,res)=>{
    const { id } = req.params;
    const data = fs.readFileSync("./data/post.json", "utf-8");
    const puts = JSON.parse(data);
    const index = puts.findIndex(
        (post) => post.id === id
    );
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
    
}

export const getDelete =(req, res)=>{
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
}