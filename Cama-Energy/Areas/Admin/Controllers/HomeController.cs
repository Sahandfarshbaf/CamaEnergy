using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cama_Energy.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize]
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Certificate()
        {
            return View();
        }
        public IActionResult Downloads()
        {
            return View();
        }
        public IActionResult Employe()
        {
            return View();
        }
        public IActionResult Menu()
        {
            return View();
        }

        public IActionResult News()
        {
            return View();
        }

        public IActionResult Products()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Videos()
        {
            return View();
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        public IActionResult Album()
        {
            return View();
        }
    }
}