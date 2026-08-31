export const deleteDelete = async (id)=>{
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
       
    });

    console.log("서버 응답", response);

    return response;
}

