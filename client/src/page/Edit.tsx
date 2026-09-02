import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getView } from '../api/getView';
import { putPut } from '../api/put';
import { validatePost } from '../hook';

export const Edit = () => {
    const  navigate = useNavigate()
    const { id } =useParams();
    const [changeItem, setChangeItem] = useState({
        title:"",
        category:"",
        content:""
    })
    const fetchData = async () => {
        const data = await getView(id)
        setChangeItem(data)
    }
    const fix = async()=>{

        if(confirm("정말 수정하시곘습니까?")){

            const error = validatePost(changeItem)
            if(error){
                alert(error);
                return
            }
            console.log('?????')
            await putPut(id,{
            
                title: changeItem.title,
                category: changeItem.category,
                content: changeItem.content
            });
            
            console.log('!!!!')
            navigate(`/list/view/${id}`)
        }
        
        
    }

    useEffect(()=>{
        fetchData()
    },[id])

    return (
        <div className='body'>
            <div className='item'>
                <div className="title">제목: </div>
                <input 
                    type="text"     
                    defaultValue={changeItem?.title} 
                    placeholder={changeItem?.title}
                    onChange={(e)=>setChangeItem({
                        ...changeItem,
                        title:e.target.value,
                    })}
                />
            </div>
            <div className='item'>
                <div className="title" >카테고리:</div>
                <input 
                    type="text" 
                    defaultValue={changeItem?.category} 
                    placeholder={changeItem?.category}
                    onChange={(e)=>setChangeItem({
                        ...changeItem,
                        category:e.target.value,
                    })}
                />
            </div>
            <div className="item">
                <div className="title">내용:</div>
                <textarea 
                    name="" id="" 
                    defaultValue={changeItem?.content} 
                    onChange={(e) =>
                        setChangeItem({
                            ...changeItem,
                            content: e.target.value
                        })
                    }
                ></textarea>
            </div>

            <div className="btn_controller">
                <Link to={`/list/view/${id}`}>취소</Link>
                <button onClick={fix}>완료</button>
                <Link to="/list">목록으로</Link>

            </div>
        </div>
    );
};

