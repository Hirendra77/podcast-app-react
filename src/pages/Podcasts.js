import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../componenents/Common/Header'
import InputComponent from '../componenents/Common/Input';
import PodcastCard from '../componenents/Common/Podcasts/PodcastCard';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';

function PodcastsPage() {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcast.podcasts);
    const [search, setSearch] = useState("")
    useEffect(() => {
        const unsubscribe = onSnapshot(
          query(collection(db, "podcasts")),
          (querySnapshot) => {
            const podcastsData = [];
            querySnapshot.forEach((doc) => {
              podcastsData.push({ id: doc.id, ...doc.data() });
            });
            dispatch(setPodcasts(podcastsData));
          },
          (error) => {
            console.error("Error fetching podcasts:", error);
          }
        );
    
        return () => {
          unsubscribe();
        };
      }, [dispatch]);
      console.log(podcasts)
  var filterPodcasts = podcasts?.filter((item)=>item.title?.trim().toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
        <Header />
        <div className="input-wrapper" style={{marginTop: "1rem"}}>
        <h1>Discover Podcasts</h1>
        <InputComponent 
        state={search}
        setState={setSearch}
        placeholder="search by title"
        type="text"
    
        />
        {filterPodcasts.length > 0 ?(
        <div className='podcast-flex' style={{marginTop: "2rem"}}>
          {filterPodcasts.map((item)=>{
          return <p>
            <PodcastCard 
            key={item.id}
              id={item.id}        
              title={item.title}
              displayImage={item.displayImage}
          /></p>
        })}
        </div>
        ):(
        <p>{search ?"Podcasts Not found":"No Podcasts on the plateform"}</p>)
        }
        </div>
        
    </div>
  )
}


export default PodcastsPage