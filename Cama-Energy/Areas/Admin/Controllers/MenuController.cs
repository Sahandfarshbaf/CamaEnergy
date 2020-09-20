using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cama_Energy.Areas.Admin.Controllers
{
 
    [ApiController]
    [Authorize]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menu;

        public MenuController(IMenuService menu)
        {
            _menu = menu;
        }

        [HttpGet]
        [Route("api/Menu/GetAllMenu")]
        public IActionResult GetAllMenu()
        {

            var list = _menu.GetAllMenu();

            var str = "[";

            foreach (var item in list)
            {
                str += "{";
                str += "'mid':" + item.Id + ",";
                str += "'text':" +"'"+ item.Name + "'";
                str += GetSecondNode(item.Id);
                str += "},";
            }

            str += "]";

            return Ok(str);
        }

        [HttpDelete]
        [Route("api/Menu/DeleteMenu")]
        public IActionResult DeleteMenu(long Id)
        {
            var menu = _menu.GetMenuById(Id);

            if (menu != null)
            {
                _menu.DeleteMenu(menu);
                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpPost]
        [Route("api/Menu/InsertMenu")]
        public IActionResult InsertMenu(Menu menu)
        {
            try
            {
                var a = _menu.AddMenu(menu);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }
        [HttpGet]
        [Route("api/Menu/GetMenuById")]
        public IActionResult GetMenuById(long Id)
        {
            return Ok(_menu.GetMenuById(Id));

        }

        [HttpPut]
        [Route("api/Menu/UpdateMenu")]
        public IActionResult UpdateMenu(long id,string name,string url)
        {
            try
            {
                var menu = _menu.GetMenuById(id);
                menu.Name = name;
                menu.Url = url;
                _menu.UpdateMenu(menu);
                return Ok(menu.Id);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }

       [Route("Second")]
        public virtual string GetSecondNode(long id)
        {
            var list = _menu.GetAllSubMenu(id);
            var str = "";
            if (list.Count > 0)
            {
                str += ",'nodes':";
                str += "[";
                foreach (var item in list)
                {
                    str += "{";
                    str += "'mid':" + item.Id + ",";
                    str += "'text':'" + item.Name + "',";
                    str += GetSecondNode(item.Id);
                    str += "},";
                }

                str += "]";

            }

            
            return str;
        }

    }
}