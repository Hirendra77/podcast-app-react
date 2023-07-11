import { signOut } from 'firebase/auth';
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../componenents/Common/Button';
import Header from '../componenents/Common/Header';
import Loader from '../componenents/Common/Loader';
import { auth } from '../firebase';
import { setUser } from '../slices/userSlice';



function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user);
    useEffect(() => {
        if(auth.currentUser) {
          dispatch(
            setUser({
              name:auth.currentUser.name,
              email:auth.currentUser.email,
              uid:auth.currentUser.id,
            })
          );
        }
        // eslint-disable-next-line
      }, [auth])
    console.log("My User", user); 
    if(!user){
        return <Loader/>
    }
   
    const handleLogout =()=>{
        signOut(auth)
        .then(()=>{
            toast.success("User Loggged Out!");
        })
        .catch((error)=>{
            toast.error(error.message)
        });
    };

    return (
        <div>
            <Header/>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button text={"Logout"} onClick={handleLogout} />
        </div>
      )
  
}

export default Profile