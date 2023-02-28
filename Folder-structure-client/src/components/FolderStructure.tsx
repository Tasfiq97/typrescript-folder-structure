import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPlay } from "react-icons/bi";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NewFolderModal } from "./NewFolderModal";
import DeleteFileModal from "./DeleteFileModal";
import axios from "axios";

const Container = styled.div`
background:#b7b7e2;
   width:80%;
   height:100%;
    margin: 0 auto;
    padding:15px;
  span{
    font-size:20px;
    
  }
  .folder-inner{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .del-btn{
    font-size:30px;
  }
  .add-btn{
    font-size:30px;
  }
  .btn{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:30px;
    padding:5px;
  }
  }
 }
   
`;
type listProps = {
  ids:string,
  list: {
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
        items: {
          _id:string,
          name: string;
          isFolder: boolean;
          items: never[];
        }[];
      }[];
    }[];
  };
};
type listProps2 = {
  isFolder: boolean;
  items: [];
  name: string;
  _id: string;
};

const FolderStructure = ({ list,ids }: listProps) => {
  const [expand, setExpand] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id,setId]=useState("");
  const [data, setData] = useState({
    isFolder: true,
    items: [],
    name: "",
    _id: "",
  });

  useEffect(() => {
    axios
      .get("https://folder-backend-tau.vercel.app/folders")
      .then((data) => data.data.data.map((data: listProps2) => setData(data)));
  }, []);
  const openModal = () => {
    setShowModal(!showModal);
   
    setId(ids);
  };
  const delModal = () => {
    setDeleteModal(!deleteModal);
    setId(ids);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const closeDelModal = () => {
    setDeleteModal(false);
  };

  return (
    <Container>
      <div className="folder">
        <div className="folder-inner">
          <span onClick={() => setExpand(!expand)}>
            {" "}
            {!expand ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}{" "}
            {list.name}
          </span>
          {list.name === "Root" ? (
            <></>
          ) : (
            <TiDelete onClick={delModal} className="del-btn" />
          )}
          <div onClick={openModal} className="btn">
            <IoMdAddCircleOutline className="add-btn"></IoMdAddCircleOutline>{" "}
            <span>New</span>
          </div>
          {showModal && (
            <NewFolderModal id={id} closeModal={closeModal} />
          )}
          {deleteModal && <DeleteFileModal id={id} closeDelModal={closeDelModal} />}
        </div>
        <br />
        <div style={{ display: expand ? "block" : "none", paddingLeft: 5 }}>
          {list?.items?.length===0?<><p>-no folders here</p> </>:  list?.items?.map((explore) => (
            <div className="inner">
              <FolderStructure ids={explore._id} list={explore} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FolderStructure;
