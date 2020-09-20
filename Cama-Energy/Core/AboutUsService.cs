using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class AboutUsService: IAboutUsService
    {

        private readonly CamaEnergyContext _context;

        public AboutUsService(CamaEnergyContext context)
        {
            _context = context;
        }

        public long AddAbout(AboutUs about)
        {
            _context.AboutUs.Add(about);
            _context.SaveChanges();
            return about.Id;
        }

        public void DeleteAbout(AboutUs about)
        {
            _context.AboutUs.Remove(about);
            _context.SaveChanges();
        }

        public AboutUs GetAboutById(long id)
        {
            return _context.AboutUs.Find(id);
        }

        public List<AboutUs> GetAllAboutUs()
        {
            return _context.AboutUs.OrderByDescending(a=>a.Id).ToList();
        }

        public void UpdateAbout(AboutUs about)
        {
            _context.Entry(about).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
