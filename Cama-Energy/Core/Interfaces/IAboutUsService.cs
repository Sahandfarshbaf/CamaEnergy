using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
  public interface IAboutUsService
    {
        List<AboutUs> GetAllAboutUs();

        long AddAbout(AboutUs about);

        void DeleteAbout(AboutUs about);

        AboutUs GetAboutById(long id);

        void UpdateAbout(AboutUs about);
    }
}
