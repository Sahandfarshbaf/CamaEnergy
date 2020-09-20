using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
  public  interface IEmployeService
    {
         List<Employe> GetAllEmploye();
         Employe GetEmployeById(long id);

         long AddEmploye(Employe employe);

         void DeleteEmploye(Employe employe);

         void UpdateEmploye(Employe employe);


    }
}
