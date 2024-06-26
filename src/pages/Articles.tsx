import ArticlesInfo from "../components/ArticlesInfo"
import { gettingDataFromNewsApi } from "../api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type Source = {
  id: string;
  name: string;
}

type Article = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string; 
}

type News = {
  status: string;
  totalResults: number;
  articles: Article[]
}

function Articles() {
  const [dataNew, setDataNew] = useState<News | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await gettingDataFromNewsApi()
      setDataNew(result)
    }

    fetchData()
  }, [])  

  return (
    <div className="p-6">
      {dataNew?.articles.map((article, index) => (
        <Link to={`/articles/${article.title}`} className="cursor-pointer">
            <div className="my-2" key={index}>
              <ArticlesInfo 
              title={article.title}
              publishedAt={article.publishedAt}
              />
            </div>
        </Link>
      ))}
    </div>
  )
}

export default Articles