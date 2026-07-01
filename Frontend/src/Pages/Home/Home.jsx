// import React from 'react'
import React, { useState } from 'react';
import Header from '../../Component/Header/Header'
import '../Home/home.css'
import Exploremenus from '../../Component/Exploremenus/Exploremenus'
import Fooddisplay from '../../Component/fooddisplay/Fooddisplay';
import Appdownload from '../../Component/appdownload/Appdownload';

const Home = () => {

  const [category,setCategory ] = useState("All");
  return (
    <div>
      <Header/>
      {/* home */}
        <Exploremenus category={category} setCategory={setCategory} />
    <Fooddisplay category={category}/>
    <Appdownload/>
    </div>
  )
}

export default Home