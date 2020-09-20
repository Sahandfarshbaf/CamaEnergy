using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class VideoService : IVideoService
    {
        private readonly CamaEnergyContext _context;

        public VideoService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddVideo(Videos video)
        {
            _context.Videos.Add(video);
            _context.SaveChanges();
            return video.Id;
        }

        public void DeleteVideo(Videos video)
        {
            _context.Videos.Remove(video);
            _context.SaveChanges();
        }

        public List<Videos> GetAllVideo()
        {
            return _context.Videos.OrderByDescending(c => c.Id).ToList();
        }

        public Videos GetVideoById(long id)
        {
            return _context.Videos.Find(id);
        }

        public void UpdateVideo(Videos video)
        {
            _context.Entry(video).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
