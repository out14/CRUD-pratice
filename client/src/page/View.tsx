import React, { useEffect, useState } from 'react';
import { getView } from '../api/getView';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDelete } from '../api/delete';

export  const View = () => {

    const { id}= useParams();
    const navigate  = useNavigate();

    const [get, setGet] = useState(null)
    const btnDel = async()=>{
        if(confirm("정말 삭제 하시겠습니까?")){
            await deleteDelete(id)
            navigate("/list");
        }
    }

    const fetchData = async () => {
        const data = await getView(id)
        setGet(data)
    }

    useEffect(()=>{
        fetchData()
    },[id])

    return (
        <div className='body'>
            <div className='item'>
                <div className="title">제목:</div> {get?.title}
            </div>
            <div className='item'>
                <div className="title">카테고리:</div> {get?.category}
            </div>
            <div className="item">
                <div className="title">내용:</div> {get?.text}
            </div>

            <div className="btn_controller">
                <Link to={`/list/edit/${id}`}>수정</Link>
                <button onClick={btnDel}>삭제</button>
                <Link to="/list">목록으로</Link>

            </div>
        </div>
    );
};

