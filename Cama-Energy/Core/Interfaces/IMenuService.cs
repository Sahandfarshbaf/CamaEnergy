using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
  public  interface IMenuService
    {
        List<Menu> GetAllMenu();

        List<Menu> GetAllSubMenu(long parentId);
        Menu GetMenuById(long id);

        long AddMenu(Menu menu);

        void DeleteMenu(Menu menu);

        void UpdateMenu(Menu menu);
    }
}
