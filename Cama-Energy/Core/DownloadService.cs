using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class DownloadService: IDownloadService
    {
        private readonly CamaEnergyContext _context;

        public DownloadService(CamaEnergyContext context)
        {
            _context = context;
        }

        public long AddDownload(Downloads download)
        {
            _context.Downloads.Add(download);
            _context.SaveChanges();
            return download.Id;
        }

        public void DeleteDownload(Downloads download)
        {
            _context.Downloads.Remove(download);
            _context.SaveChanges();
        }

        public List<Downloads> GetAllDownload()
        {
            return _context.Downloads.OrderByDescending(c => c.Id).ToList();
        }

        public Downloads GetDownloadById(long id)
        {
            return _context.Downloads.Find(id);
        }

        public List<Downloads> GetDownloadByType(int typeId)
        {
            return _context.Downloads.Where(c => c.TypeId == typeId).ToList();
        }

        public void UpdateDownload(Downloads download)
        {
            _context.Entry(download).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
