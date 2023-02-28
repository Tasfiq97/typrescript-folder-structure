
import './App.css';
import FolderStructure from './components/FolderStructure';
import styled from "styled-components";
import {useState, useEffect } from 'react';
import axios from 'axios';
const Container=styled.div`
   height:100%;
   width:100vh;
   display:flex;
   justify-content:center;
   align-items:center;
   margin-left:300px;
   margin-top:100px;
   `
   type listProps = {
      name: string;
      isFolder: boolean;
      _id:string,
      items: {
        _id:string,
        name: string;
        isFolder: boolean;
        items: {
          _id:string,
          name: string;
          isFolder: boolean;
          items: {
            _id:string,
            name: string;
            isFolder: boolean;
            items: never[];
          }[];
        }[];
      }[];
    };
function App() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/folders").then(data=>setData(data.data.data));

  },[data])
  
  return (
    <div className="App">
      <Container>
       {
        data?.map((list:listProps)=>(

          <FolderStructure ids={list._id}  list={list}></FolderStructure>
        ))
       }
       </Container>
    </div>
  );
}

export default App;
