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
    public class AboutUsController : ControllerBase
    {
        private readonly IAboutUsService _about;

        public AboutUsController(IAboutUsService about)
        {
            _about = about;
        }

        [HttpGet]
        [Route("api/AboutUs/GetAllAboutUs")]
        public IActionResult GetAllAboutUs()
        {


            return Ok(_about.GetAllAboutUs());

        }

        [HttpPost]
        [Route("api/AboutUs/AddAbout")]
        public IActionResult AddAbout(AboutUs about)
        {

            try
            {
               return Ok(_about.AddAbout(about));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }


        [HttpDelete]
        [Route("api/AboutUs/DeleteAbout")]
        public IActionResult DeleteAbout(long id)
        {
            var about = _about.GetAboutById(id);

            if (about != null)
            {
               _about.DeleteAbout(about);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/AboutUs/GetAboutById")]
        public IActionResult GetAboutById(long id)
        {
            return Ok(_about.GetAboutById(id));

        }

        [HttpPost]
        [Route("api/AboutUs/UpdateAbout")]
        public IActionResult UpdateAbout(AboutUs about)
        {

            try
            {
                _about.UpdateAbout(about);
                return Ok(1);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }



    }
}