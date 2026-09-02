import React, { useEffect, useState } from 'react';
import { postPost } from '../api/post';
import { getList } from '../api/getList';
import { Link } from 'react-router-dom';
import { validatePost } from '../hook';

export const List = () => {

    const [get, setGet] = useState(null)
    const [insert,setInsert] = useState({
        title:'',
        category:'',
        content:''
    })
    
    
    const add =  async ()=>{
        const error = validatePost(insert)

        if (error) {
            alert(error);
            return;
        }

        await postPost(insert)
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
            <div className="insert_sec">
                <input 
                    type="text" 
                    onChange={(e)=>setInsert({
                        title:e.target.value,
                        category:insert.category,
                        content:insert.content
                    })} 
                    placeholder='title' 
                />
                <input 
                    type="text" 
                    onChange={(e)=>setInsert({
                        title:insert.title,
                        category:e.target.value,
                        content:insert.content
                    })}  
                    placeholder='category' 
                />
                <textarea 
                    name="" 
                    id=""
                    onChange={(e)=>setInsert({
                        title:insert.title,
                        category:insert.category,
                        content:e.target.value,
                    })}  
                    placeholder='content' 
                ></textarea>
                <button onClick={add}>Insert</button>
            </div>
            

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

 