using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
   public interface IServicesService
   {
       List<Services> GetAllServices();

       Services GetServicesById(long id);

       long AddServices(Services services);

       void DeleteService(Services services);

       void UpdateService(Services services);

       long AddServicesImage(ServicesImage servicesImage);

       string DeleteServicesImage(long id);

       int GetServicesCount();
   }
}
