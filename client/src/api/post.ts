export const postPost = async(post)=>{

    const newPost = {
        title: post.title,
        category: post.category,
        content:post.content
    }

    const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(newPost)
    })

    console.log("서버 응답", response);

    return response
}