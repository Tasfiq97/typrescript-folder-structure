import axios from 'axios'
import React,{useState,useEffect,useReducer} from 'react'
import styled from 'styled-components'

 const ModalWrapper=styled.div`
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
  background-color:rgba(189,189,189,.8);
 `
const ModalContainer=styled.div`
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  max-width:30rem;
  max-height:20rem;
  background-color:white;
  .input{
    padding:20px 20px
  }
  .success{
    color:green;
  }
`
type listProps={
  isFolder:true,
items: []
name: string
_id:string
   }  

type propsType={
  
  id:string,
    closeModal:()=>void
}

export const NewFolderModal = ({closeModal,id}:propsType) => {
  const [input,setInput]=useState("");
  const [success,setSuccess]=useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const handleOnChange=(e: React.FormEvent<HTMLInputElement>)=>{
     setInput(e.currentTarget.value);
  }
    const handleCreate= async()=>{
      const data={
         id:id,
        name:input,
        isFolder:true,
        items:[]
       }
        const result= axios.put("https://folder-backend-tau.vercel.app/folder",data).then(res=>{
            if(res.status){
               setSuccess("successfully created");
               setInterval(()=>{
                closeModal();
              },2000)
               forceUpdate();
            }
            else{
              setSuccess("error is given");
              closeModal();
            }
        })


    }
    
  return (
    <div>
        <ModalWrapper >
             <ModalContainer>
                <div className='input'>
                  <h3 className='success'>{success}</h3>
                <h3>Add a new Folder</h3>
                <input onChange={(e)=>handleOnChange(e)} className='input-sec' type="text" placeholder='file name'/> <br />
                <button onClick={closeModal} >cancel</button>
                <button onClick={handleCreate} style={{marginLeft:"20px"}}>create </button>
                </div>
             </ModalContainer>
        </ModalWrapper>
         </div>
  )
}
