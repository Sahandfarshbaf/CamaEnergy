using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class CertificateService : ICertificateService
    {
        private CamaEnergyContext _context;

        public CertificateService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddCertificate(Certificate certificate)
        {
            _context.Certificate.Add(certificate);
            _context.SaveChanges();
            return certificate.Id;
        }

        public void DeleteCertificate(Certificate certificate)
        {
            _context.Certificate.Remove(certificate);
            _context.SaveChanges();
        }

        public List<Certificate> GetAllCertificate()
        {
            return _context.Certificate.OrderByDescending(c => c.Id).ToList();
        }

        public Certificate GetCertificateById(long id)
        {
            return _context.Certificate.Find(id);
        }

        public void UpdateCertificate(Certificate certificate)
        {
            _context.Entry(certificate).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public int GetCertificateCount()
        {
            return _context.Certificate.Count();
        }

    }
}
