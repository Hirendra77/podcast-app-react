import React from 'react'
import Header from '../componenents/Common/Header';

import CreatePodcastForm from '../componenents/StartAPodcast/CreatePodcastForm';

function CreateAPodcast() {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
        <h1>Create A Podcast</h1>
        <CreatePodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcast;