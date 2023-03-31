/*eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const NewsItem =(props) => {

    let {title,description,imageUrl, newsUrl,author,date} = props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://www.reuters.com/resizer/9l3u-ZToJAdAiAplkHuO_LpbCN8=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WMYI2AUZGZOSHLQCWIGUHX4O6M.jpg" : imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}..<span className="badge bg-success">Source</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
       </div>
      </div>
    )
  
}
export default NewsItem
