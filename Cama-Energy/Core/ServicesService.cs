using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;


namespace Cama_Energy.Core
{
    public class ServicesService : IServicesService
    {
        private CamaEnergyContext _context;

        public ServicesService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddServices(Services services)
        {
            _context.Services.Add(services);
            _context.SaveChanges();
            return services.Id;
        }

        public long AddServicesImage(ServicesImage servicesImage)
        {
            _context.ServicesImage.Add(servicesImage);
            _context.SaveChanges();
            return servicesImage.Id;
        }

        public void DeleteService(Services services)
        {

           _context.Services.Remove(services);
           _context.SaveChanges();

        }

        public string DeleteServicesImage(long id)
        {
            var image = _context.ServicesImage.Find(id);
            string ImageFile = image.FileImage;
            _context.ServicesImage.Remove(image);
            _context.SaveChanges();
            return ImageFile;
        }

        public List<Services> GetAllServices()
        {
            return _context.Services.Include(c => c.ServicesImage).OrderByDescending(n=>n.Id).ToList();
        }

        public Services GetServicesById(long id)
        {
            return _context.Services.Where(s=>s.Id==id).Include(ss=>ss.ServicesImage).FirstOrDefault();
        }

        public void UpdateService(Services services)
        {
            _context.Entry(services).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public int GetServicesCount()
        {
            return _context.Services.Count();
        }
    }
}
