

export const putPut = async(id,put) => {

    console.log("PUT id:", id);
    console.log("PUT data:", put);

    const newPut ={
        title:put.title,    
        category:put.category
    }

    const response = await fetch(`http://localhost:3000/api/posts/${id}`,{
        method:"PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(newPut)
    });
   
    console.log("PUT URL:", response.url);
    console.log("PUT status:", response.status);

    return response
};

