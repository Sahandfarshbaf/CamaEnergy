using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class EmployeService : IEmployeService
    {
        private CamaEnergyContext _context;
        public EmployeService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddEmploye(Employe employe)
        {
            _context.Employe.Add(employe);
            _context.SaveChanges();
            return employe.Id;

        }


        public void DeleteEmploye(Employe employe)
        {
            _context.Employe.Remove(employe);
            _context.SaveChanges();
        }

        public List<Employe> GetAllEmploye()
        {
            return _context.Employe.OrderByDescending(x => x.Id).ToList();
        }

        public Employe GetEmployeById(long id)
        {
            return _context.Employe.Find(id);
        }

        public void UpdateEmploye(Employe employe)
        {
            _context.Employe.Update(employe);
            _context.SaveChanges();
        }
    }
}
