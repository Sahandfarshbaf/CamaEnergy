using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;
using Cama_Energy.DTOs;

namespace Cama_Energy.Core.Interfaces
{
   public interface INewsService
    {
        List<News> GetAllNews();

        List<News> GetLastNews();

        News GetNewsById(long id);

        long AddNews(News news);

        void DeleteNews(News news);

        void UpdateNews(News news);

        long AddNewsImage(NewsImage newsImage);

        string DeleteNewsImage(long id);

        List<NewsBlogModel> GetAllNewsBlog(short type,string txtSearch);

        NewsBlogModel GetSingleNews(long Id);
    }
}
