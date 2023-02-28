import axios from 'axios';
import React,{useState,useReducer} from 'react';
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
    padding:20px 20px;
  }
  .delete{
    color:red;
  }
  
`
type propsType={
  id:string,
    closeDelModal:()=>void
}
const DeleteFileModal = ({closeDelModal,id}:propsType) => {
  console.log(id);
  const [success,setSuccess]=useState("");
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const handleDel=()=>{
    const data={
      id:id,
      rootId:"63fcf36f8d1d7e67de62c432",
     isFolder:true,
     items:[]
    }
    
     const result= axios.put("http://localhost:5000/delete",data).then(res=>{
      if(res.status){
         setSuccess("successfully deleted");
          setInterval(()=>{
            closeDelModal();
          },2000)
          forceUpdate();
      }
      else{
        setSuccess("error is given");
        closeDelModal();
      }
  })


  }
    return (
        <div>
        <ModalWrapper >
             <ModalContainer>
                <div className='input'>
                  <p className='delete'>{success}</p>
                <h3 >Delete this Folder ?</h3>
                <button onClick={closeDelModal} >cancel</button>
                <button onClick={handleDel} style={{marginLeft:"20px"}}>Delete </button>
                </div>
             </ModalContainer>
        </ModalWrapper>
         </div>
    );
};

export default DeleteFileModal;