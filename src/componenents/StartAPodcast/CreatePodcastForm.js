import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../firebase';
import Button from '../Common/Button';
import InputComponent from '../Common/Input';
import FileInput from '../Common/Input/FileInput';

function CreatePodcastForm() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDispalyImage] = useState();
    const [bannerImage, setBannerImage] = useState();

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch(); 

     const handleSubmit = async ()=>{
      
      //   toast.success("Handling Form")
        if(title && desc && displayImage && bannerImage){
         setLoading(true);
         // 1.upload files -> get downloadable links
         try{
            const bannerImageRef = ref (storage,
               `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(bannerImageRef, bannerImage);
            // toast.success(" file uploaded");
            const bannerImageUrl = await getDownloadURL(bannerImageRef);

            const displayImageRef = ref (storage,
               `podcasts/${auth.currentUser.uid}/${Date.now()}`);

            await uploadBytes(displayImageRef, displayImage);
            toast.success(" file uploaded");
            const displayImageUrl = await getDownloadURL(displayImageRef);
            const podcastData = {
               title:title,
               description:desc,
               bannerImage:bannerImageUrl,
               displayImage:displayImageUrl,
               createdBy:auth.currentUser.uid,
           };
           const docRef = await addDoc(collection(db, "podcasts"), podcastData); 
           setTitle("");
           setDesc("");
           setBannerImage(null);
           setDispalyImage(null);
           toast.success("podcast created")
           setLoading(false);
         }
         catch(e){
            toast.error(e.message);
            console.log(e)
            setLoading(false);
         }
        
      //    const bannerImageRef = ref (storage,`podcasts-bannerImage`);
      //   const uploaded =  await uploadBytes(bannerImageRef, bannerImage);
      //   console.log(uploaded);
      
         // 2.create a new doc in a new collection called podcast
         //3. save this new podcast episodes  states in our podcast
            }
            else{
                toast.error("Please Enter All Values")
                setLoading(false);
            }
     }
     const displayImageHandle=(file)=>{
        setDispalyImage(file)
     }
     const bannerImageHandle=(file)=>{
        setBannerImage(file)
     }
  return (
    <>
     <InputComponent 
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
        />
         <InputComponent 
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
        />
        <FileInput 
         accept={"image/*"} 
         id="display-image-input"
         fileHandleFnc={displayImageHandle}
         text ={"Dispaly Image Upload"}
         />
        <FileInput 
         accept={"image/*"} 
         id="banner-image-input" 
         fileHandleFnc={bannerImageHandle}
         text={"Banner Image Upload"}
         />
        <Button 
        text={loading?"Loading..":"Create Podcast"}  
        disabled={loading} 
        onClick={handleSubmit} />

        </>
  )
}

export default CreatePodcastForm;