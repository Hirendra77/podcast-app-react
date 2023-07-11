import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componenents/Common/Header';
import Profile from './pages/Profile';
import SignUpPage from './pages/SignUpPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { setUser } from './slices/userSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './componenents/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user)=>{
if(user){
  const unsubscribeSnapshot = onSnapshot(
    doc(db,"users", user.uid),
    (userDoc)=>{
      if(userDoc.exists()){
        const userData = userDoc.data();
        dispatch(
          setUser({
            name:userData.name,
            email:userData.email,
            uid:user.id,

          })
        );
      }
    },
    (error)=>{
        console.error("Error fetching user data:", error);
    }
  );
  return ()=>{
    unsubscribeSnapshot();
  };
}
    
    });
    return unsubscribeAuth();
  }, []);
 
  return (
   <div className="App">
    <ToastContainer/>
     <Router>
    <Routes>
    <Route path="/" element={<SignUpPage />}/>
    <Route element ={<PrivateRoutes/>}>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/create-a-podcast" element={<CreateAPodcast/>}/>
    <Route path="/Podcasts" element={<PodcastsPage/>}/> 
    <Route path="/podcast/:id" element={<PodcastDetailsPage/>}/> 
    <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage />}/>
    </Route>
    </Routes>
    </Router>
    
    
    
   </div>
  );
}

export default App;
