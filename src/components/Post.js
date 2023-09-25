import { Button, TextField } from '@mui/material';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import React, { forwardRef, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { auth, database } from '../firebase/setup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Post(props, ref) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'grey';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [text,setText] = useState("")
    const [userData,setUserData] = useState([])

    const getUser = ()=>{
        setTimeout(async()=>{
          try{
            const userDocument = doc(database,"Users",`${auth.currentUser?.uid}`)
            const data = await getDoc(userDocument)
            setUserData(data)
          }catch(err){
            console.log(err)
          }
        },1000)
        
      }

      useEffect(()=>{
       getUser()
      },[])

    const addPost = async () => {
        const postDocument = doc(database,"Users", `${auth.currentUser?.uid}`)
        const postRef = doc(postDocument, "Posts",`${Math.random()}`)
        try {
            await setDoc(postRef,{
                textPost:text,
                username:userData._document?.data?.value.mapValue.fields.username.stringValue,
                designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
                profile_image:userData._document?.data?.value.mapValue.fields.profile_image.stringValue
            })
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div>
            <button ref={ref} onClick={openModal} style={{ display: "none" }}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>What do you want to talk about?</h2>
                <TextField
                    onChange={(e)=> setText(e.target.value)}
                    sx={{ width: "500px" }}
                    id="outlined-multiline-static"
                    label="Type here..."
                    multiline
                    rows={4}
                />
                <br />
                <Button sx={{ mt: "10px" }} variant='outlined' size='small' onClick={closeModal}>Cancel</Button>
                <Button sx={{ ml: "10px", mt: "10px" }} variant='contained' size='small' onClick={addPost}>Done</Button>
            </Modal>
        </div>
    );
}

export default forwardRef(Post)
