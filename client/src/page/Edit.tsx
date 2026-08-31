import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getView } from '../api/getView';
import { putPut } from '../api/put';

export const Edit = () => {
    const  navigate = useNavigate()
    const { id } =useParams();
    const [changeItem, setChangeItem] = useState({
        title:"",
        category:""
    })
    const fetchData = async () => {
        const data = await getView(id)
        setChangeItem(data)
    }
    const fix = async()=>{

        if(confirm("정말 수정하시곘습니까?")){
            await putPut(id,{
            
                title: changeItem.title,
                category: changeItem.category
            });
            await fetchData()
            navigate(`/list/view/${id}`)
        }
        
        
    }

    useEffect(()=>{
        fetchData()
    },[id])

    return (
        <div className='body'>
            <div className='item'>
                제목: 
                <input 
                    type="text"     
                    defaultValue={changeItem?.title} 
                    placeholder={changeItem?.title}
                    onChange={(e)=>setChangeItem({
                        title:e.target.value,
                        category:changeItem.category
                    })}
                />
            </div>
            <div className='item'>
                카테고리: 
                <input 
                    type="text" 
                    defaultValue={changeItem?.category} 
                    placeholder={changeItem?.category}
                    onChange={(e)=>setChangeItem({
                        title:changeItem.title,
                        category:e.target.value,
                    })}
                />
            </div>
            <div className="view_cnt">
                내용:
                <textarea name="" id=""></textarea>
            </div>

            <div className="item">
                <Link to={`/list/view/${id}`}>취소</Link>
                <button onClick={fix}>완료</button>
                <Link to="/list">목록으로</Link>

            </div>
        </div>
    );
};

