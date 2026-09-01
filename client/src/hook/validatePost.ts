export const validatePost = ({title,category}:{title:string,category:string}) => {
    if(title.trim()===''){
        
        return '제목을 입력해주세요.'
    }
    if(category.trim()===''){
        
        return '카테고리를 입력해주세요.'
    }

    return null
};

 