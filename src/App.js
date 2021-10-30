import classes from './App.module.css';
import {useEffect,useState} from 'react'
import axios from 'axios'

function App() {
  // EMPTY STATE FOR DATA 
  const [data,setData]=useState({});

  //STATE FOR CURRENT PAGE
  const [page,setPage]=useState(1);


  //FETCH THE DATA WHEN PAGE LOADS AND WHENEVER THE PAGE GETS CHANGED... 
  useEffect(()=>{
    axios.get(`https://reqres.in/api/users?page=${page}`).then(res=>{
      if(page>=1 && page<=res.data.total_pages)
      {setData(res);}
      
    })
  },[page])
  

  return (

    <div className={classes.App}>
      <div className={classes.showcase}>

        {/* ------------------   MAPPED ALL THE FETCHED DATA IN FORM OF CARDS ------------------------------ */}
      {data && data.data && data.data.data.map((dta,index)=>
      <div className={classes.card}key={dta.id}>
        <div className={classes.avatarContainer}>
          <img src={dta.avatar}/>
        </div>
        <div className={classes.cardText}>
          <p>{dta.first_name}</p>
          <p>{dta.last_name}</p>
          <p>{dta.email}</p>
        </div>
      </div>
        
        )}
      </div>
      
      
      {/* -------------------- PAGE NAVIGATION BUTTON CODE--------------------------------- */}
      <div className={classes.nav}>
      <button onClick={(e)=>{setPage(page-1)}} className={classes.navbtn} disabled={data && !(data.data && page === data.data.total_pages)}>-</button>
      <p className={classes.navpage}>{page}</p>
      <button onClick={(e)=>{setPage(page+1)}} className={classes.navbtn} disabled={data && data.data && page === data.data.total_pages}>+</button>
      </div>
    </div>
  );
}

export default App;
