import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../componenents/Common/Button';
import InputComponent from '../../componenents/Common/Input';
import { auth, db,} from '../../firebase';
import { setUser } from '../../slices/userSlice';

function SignupForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
     const dispatch = useDispatch(); 

    const handleSignup = async ()=>{
        console.log("signup...");
        setLoading(true)
        if(password==confirmPassword && password.length>=6 && fullName && email){
            try{
                //creating uer's account.
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                console.log("user",user);
                // save user's details
                await setDoc(doc(db, "user", user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                }); 

                // save data in the redux, call the redux action
                dispatch(setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                   
                })
                );
                toast.success("User has been created");
                setLoading(false);
                navigate("/profile");
            }
            
            catch(e){
                console.log("erroe", e)
                toast.error(e.message);
                setLoading(false);
            }
        }
            else {
                //throw an error
                if(password!=confirmPassword){
                    toast.error(" Please Make Sure your password and confirm password matches!");
                }
                else if(password.length< 6){
                    toast.error(" password should be more than 6 digit!");
                }
                setLoading(false);
            }
       
    };
  return (
    <div>
         <InputComponent 
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
        />
         <InputComponent 
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required={true}
        />
         <InputComponent 
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
        />
        <InputComponent 
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
        />
        <Button text={loading?"Loading..":"Signup Now"}  disabled={loading} onClick={handleSignup} />
    </div>
  )
}

export default SignupForm