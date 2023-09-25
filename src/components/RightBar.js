import React, { useEffect, useState } from 'react'

function RightBar() {

  const [news,setNews] = useState([])

  const getNews = ()=>{
    fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=6046867fa79f4b379c70524289a2823b")
    .then(res => res.json())
    .then(json => setNews(json.articles))
  }

  useEffect(()=>{
    getNews()
  },[])

  const newsList = news.slice(0,6)


  return (
    <div style={{borderRadius:"10px",backgroundColor:"white",height:"400px",paddingTop:"5px",paddingLeft:"20px"}}>
      <h4>News</h4>
      {newsList.map((eachNews)=>{
        return <>
        <li style={{marginTop:"10px"}}>{eachNews.title}</li>
        </>
      })}
    </div>
  )
}

export default RightBar
