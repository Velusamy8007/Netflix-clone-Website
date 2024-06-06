import React, { useEffect, useState } from 'react';
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom';

const player = () => {

  const {id} = useParams();


  const navigate = useNavigate();

  const [apidata, setApidata] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZkN2JjMjVjNTAyYTJmMjE0ODgyMzMyMWZiMTk2OCIsInN1YiI6IjY2NWZmN2YzZTFiNjk3MjM0ZDAwN2RhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x8LAwfn6dq40mIgSkNgspOjKWbN5For_kwexGTOtxjk'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApidata(response.results[0]))
    .catch(err => console.error(err));

  },[])

 



  return (
    <div className='player'>

        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>

        <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apidata.key}`}
        title='trailer' frameBorder="0" allowFullScreen></iframe>

        <div className="player-info">
          <p>{apidata.published_at.slice(0,10)}</p>
          <p>{apidata.name}</p>
          <p>{apidata.type}</p>
        </div>
    </div>
  )
}

export default player