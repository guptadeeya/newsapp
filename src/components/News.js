 /*eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useLayoutEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanup } from '@testing-library/react';

const News = (props) =>{

  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, settotalResults] = useState(0)
  
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
   

    const updateNews = async()=>{
        
        props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dae48a356e6b4cf7bbffa035ccfd0223&page=${page}&pagesize=${props.pageSize}`
        
        // setState({loading:true});
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(10);
        let parsedData = await data.json();
        props.setProgress(70);
        // console.log(parsedData);
        
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
      }
    
useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;
  updateNews();
}, [])

  // handleNextClick= async ()=>{
    
  //   setState({page: state.page + 1})
  //   updateNews();
  // }

  // handlePreviousClick= async ()=>{
  
  // setState({page: state.page - 1})
  // updateNews();
  // }

   const fetchMoreData = async() => {
    // setState({page: state.page + 1})
    setPage(page + 1);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dae48a356e6b4cf7bbffa035ccfd0223&page=${page+1}&pagesize=${props.pageSize}`
     setPage(page+1);   
    // setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <div className='container my-3'>
     
       <h1 className='text-center' style={{marginTop:'80px'}}>NewsMonkey - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
       {loading && <Spinner/> }    

       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

       <div className="container">

        <div className="row">     
        {articles.map((element) => {
            return <div className="col-md-4 my-4" key={element.url} >
            <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage}
            newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })} 
        </div>
        </div>
        </InfiniteScroll>
       </div>
    )
  }


News.defaultProps = {
  country:'us',
  pageSize:10,
  category: 'general'
}

News.propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string
}
export default News
