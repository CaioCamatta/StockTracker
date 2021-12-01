import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NewsArticle from './newsarticle';

const ListNews = (props) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async() => {
            
            const res = await Axios.get("https://api.polygon.io/v2/reference/news?ticker="+props.tickname+"&apiKey=WlATdfOpIR3hvwb5rGaVCvCc38B5bSjT");
            console.log(res.data.results[0].title)
            setArticles(res.data.results);
            
        };
        getArticles();
    }, []
    );

    console.log(articles);
    return (
    <div>
        {articles.map(article => (
            <NewsArticle title = {article.title} url = {article.article_url} publisher = {article.publisher.name}/>
        ))}
    </div>
    );
}
export default ListNews;