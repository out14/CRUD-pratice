import React, { useEffect, useState } from 'react';
import { postPost } from '../api/post';
import { putPut } from '../api/put';
import { deleteDelete } from '../api/delete';
import { getListGet } from '../api/getList';

export const List = () => {

    const [get, setGet] = useState(null)
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [changeItem, setChangeItem] = useState({
      title:"",
      category:""
    })
    
    const add =  async ()=>{
  
      console.log("추가")
      await postPost({title,category})
      await fetchData()
    }
  
    const fix = async(el)=>{
      
        await putPut({
            id: el.id,
            title: changeItem.title,
            category: changeItem.category
        });
        await fetchData()
  
        setEditingId(null);
  
        // 목록 다시 가져오기
    }
    
  
    const del = async (e)=>{
      if(confirm("정말 삭제하시겠습니까?")){
        await deleteDelete(e.id);  
        await fetchData()
      }
    }
  
  
  
    
    
  
  
  const fetchData = async () => {
      const data = await getListGet()
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
                    {editingId === el.id ? (
                    <div className='item item_write'>
                        <input 
                        type="text" 
                        defaultValue={el.title}
                        onChange={
                        (e)=>setChangeItem({
                            title:e.target.value,
                            category:changeItem.category
                        }
                        )} 
                        placeholder={el.title}/>
                        <input 
                        type="text" 
                        defaultValue={el.category}
                        onChange={
                        (e)=>setChangeItem({
                            title:changeItem.title,
                            category:e.target.value
                        })}
                        placeholder={el.category}
                        />
                        <button onClick={()=>fix(el)}>change</button>
                        <button onClick={() => setEditingId(null)}>cancle</button>
                    </div>
                    ):(
                    <div className='item item_view'>
                        <h3>{el.title}</h3>
                        <p>{el.category}</p>
                        <button onClick={() => {
                        setEditingId(el.id)
                        setChangeItem({
                            title: el.title,
                            category: el.category
                        });
                        
                        }}>edit</button>
                        <button onClick={() => del(el)}>delete</button>
                    </div>
                    )}
                </li>

                ))}
            </ul>
        </div>
    );
};

 