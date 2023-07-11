import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../componenents/Common/Button';
import InputComponent from '../../componenents/Common/Input';
import { auth, db } from '../../firebase';
import { setUser } from '../../slices/userSlice';

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        console.log("login")
        setLoading(true);
        if (email && password) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                const userDoc = await getDoc(doc(db, "user", user.uid));
                const userData = userDoc.data();
                console.log("userData", userData)

                dispatch(
                    setUser({
                        name: userData.name,
                        email: user.email,
                        uid: user.uid,

                    })
                );
                toast.success("Login Successful!")
                setLoading(false);
                navigate("/profile");
            }

            catch (error) {
                console.log("erroe", error)
                setLoading(false);
                toast.error(error.message)

            }
        }
        else {
            toast.error("Make Sure email and password are not empty")
            setLoading(false);
        }


    };
    return (
        <div>

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

            <Button text={loading ? "Loading.." : "Login Now"} onClick={handleLogin} disabled={loading} />
        </div>
    )
}

export default LoginForm