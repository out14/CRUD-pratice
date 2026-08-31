import React, { useEffect, useState } from 'react';
import { postPost } from '../api/post';
import { getList } from '../api/getList';
import { Link } from 'react-router-dom';

export const List = () => {

    const [get, setGet] = useState(null)
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    
    
    const add =  async ()=>{
  
      console.log("추가")
      await postPost({title,category})
      await fetchData()
    }
  
    const fetchData = async () => {
        const data = await getList()
        setGet(data)
    }
  
  useEffect(() => {
      fetchData()
  }, [])

    return (

        <div className='body'>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='title' />
            <input type="text" onChange={(e)=>setCategory(e.target.value)}  placeholder='category' />
            <button onClick={add}>Insert</button>

            <ul className='customList'>
                {get?.map((el)=>(
                <li className='customList-item' key={el.id}>
                    
                    <Link to={`./view/${el.id}`} className='item item_view'>
                        <h3>{el.title}</h3>
                        <p>{el.category}</p>
                        
                        
                    </Link>
                    
                </li>

                ))}
            </ul>
        </div>
    );
};

 