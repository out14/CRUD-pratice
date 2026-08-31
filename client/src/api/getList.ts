

export const getList = async () => {
    const response = await fetch(`http://localhost:3000/api/posts`);

    if (!response.ok) {
        throw new Error("게시글을 불러오지 못했습니다.");
    }

    return response.json();
};