import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Edit, List, View } from './page'


function App() {
  const [get, setGet] = useState(null)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [changeItem, setChangeItem] = useState({
    title:"",
    category:""
  })
  
  // const add =  async ()=>{

  //   console.log("추가")
  //   await postPost({title,category})
  //   await fetchData()
  // }

  // const fix = async(el)=>{
    
  //     await putPut({
  //         id: el.id,
  //         title: changeItem.title,
  //         category: changeItem.category
  //     });
  //     await fetchData()

  //     setEditingId(null);

  //     // 목록 다시 가져오기
  // }
  

  // const del = async (e)=>{
  //   if(confirm("정말 삭제하시겠습니까?")){
  //     await deleteDelete(e.id);  
  //     await fetchData()
  //   }
  // }


  return (
    
      
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<List/>} />
        <Route path="/list/view/:id" element={<View/>} />
        <Route path="/list/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
