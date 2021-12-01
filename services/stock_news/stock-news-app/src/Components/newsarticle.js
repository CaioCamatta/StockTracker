import React from 'react';

const NewsArticle = ({title, url, publisher}) =>{
    return (
        <div>
            <h3>{publisher}</h3>
            <h3>{title}</h3>
            <h3>{url}</h3>
        </div>
    )
}
export default NewsArticle;