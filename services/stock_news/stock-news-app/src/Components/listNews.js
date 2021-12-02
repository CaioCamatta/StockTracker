import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NewsArticle from './newsarticle';

const ListNews = (props) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (props.tickname !== ""){
            const getArticles = async() => {
            
                var site = "https://api.polygon.io/v2/reference/news?ticker="+props.tickname+"&apiKey=WlATdfOpIR3hvwb5rGaVCvCc38B5bSjT";
               
                const res = await Axios.get(site);
                setArticles((res.data.results));
                
            };
            getArticles();
        }
    }, [props.tickname]
    );

    console.log(articles);
    return (
    <div className="mb-20">
        {articles.map((article, index) => (
            <NewsArticle title = {article.title} url = {article.article_url} publisher = {article.publisher.name} key = {index}/>
        ))}
    </div>
    );
}
export default ListNews;