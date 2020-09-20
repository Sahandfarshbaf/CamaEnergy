using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace Cama_Energy.Core
{
    public class MenuService : IMenuService
    {
        private readonly CamaEnergyContext _context;

        public MenuService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddMenu(Menu menu)
        {
            _context.Menu.Add(menu);
            _context.SaveChanges();
            return menu.Id;
        }

        public void DeleteMenu(Menu menu)
        {
            var submenulist = _context.Menu.Where(c => c.Pid == menu.Id).ToList();
            if (submenulist.Count > 0)
            {
                _context.Menu.RemoveRange(submenulist);
            }

            _context.Menu.Remove(menu);
            _context.SaveChanges();
        }

        public List<Menu> GetAllMenu()
        {
           return _context.Menu.Where(c => c.Id == c.Pid).OrderBy(c => c.Id).ToList();
        }

        public List<Menu> GetAllSubMenu(long parentId)
        {
            return _context.Menu.Where(c => c.Id != c.Pid && c.Pid==parentId).OrderBy(c => c.Id).ToList();
        }

        public Menu GetMenuById(long id)
        {
            return _context.Menu.Find(id);
        }

        public void UpdateMenu(Menu menu)
        {
            _context.Entry(menu).State = EntityState.Modified;
            _context.SaveChanges();
        }

        
    }
}
