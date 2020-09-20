using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Cama_Energy.DTOs;
using Cama_Energy.Tools;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class NewsService : INewsService
    {
        private readonly CamaEnergyContext _context;

        public NewsService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddNews(News news)
        {
            _context.News.Add(news);
            _context.SaveChanges();
            return news.Id;
        }

        public long AddNewsImage(NewsImage newsImage)
        {
            _context.NewsImage.Add(newsImage);
            _context.SaveChanges();
            return newsImage.Id;
        }

        public void DeleteNews(News news)
        {
            _context.News.Remove(news);
            _context.SaveChanges();
        }

        public string DeleteNewsImage(long id)
        {
            var image = _context.NewsImage.Find(id);
            string ImageFile = image.FileImage;
            _context.NewsImage.Remove(image);
            _context.SaveChanges();
            return ImageFile;
        }

        public List<News> GetAllNews()
        {
            return _context.News.Include(c => c.NewsImage).OrderByDescending(n => n.Id).ToList();

        }

        public List<NewsBlogModel> GetAllNewsBlog(short type, string txtSearch)
        {
            var a = _context.News
                .Where(n => n.Type == type && (n.Title.Contains(txtSearch) || String.IsNullOrWhiteSpace(txtSearch)))
                .Include(c => c.NewsImage).OrderByDescending(n => n.Id)
                .Select(st => new NewsBlogModel
                {
                    Id = st.Id,
                    Title = st.Title,
                    Description = st.Description,
                    Author = st.Author,
                    NewsDateTime = DateTimeFunc.TimeTickToShamsi(st.NewsDateTime),
                    NewsImage = st.NewsImage
                }).ToList();

            return a;
        }

        public List<News> GetLastNews()
        {
            return _context.News.Include(c => c.NewsImage).OrderByDescending(n => n.Id).Take(4).ToList();
        }

        public News GetNewsById(long id)
        {
            return _context.News.Where(s => s.Id == id).Include(ss => ss.NewsImage).FirstOrDefault();
        }

        public NewsBlogModel GetSingleNews(long Id)
        {
            var a = _context.News.Include(c => c.NewsImage).Where(n => n.Id == Id).Select(st => new NewsBlogModel
            {
                Id = st.Id,
                Title = st.Title,
                Description = st.Description,
                Author = st.Author,
                NewsDateTime = DateTimeFunc.TimeTickToShamsi(st.NewsDateTime),
                NewsImage = st.NewsImage
            }).FirstOrDefault();

            return a;
        }

        public void UpdateNews(News news)
        {
            _context.Entry(news).State = EntityState.Modified;
            _context.SaveChanges();
        }


    }
}
