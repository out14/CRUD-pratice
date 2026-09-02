

export const putPut = async(id,put) => {

    const newPut ={
        title:put.title,    
        category:put.category,
        content:put.content
    }
    try {
        const url = `http://localhost:3000/api/posts/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPut)
        });

        // 서버에서 JSON으로 응답하는 경우
        const result = await response.json();
        return result;

    } catch (error) {
        console.error("❌ PUT 에러:", error);
        throw error;
    }
};

