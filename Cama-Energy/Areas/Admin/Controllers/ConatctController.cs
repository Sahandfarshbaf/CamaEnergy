using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.AspNetCore.Authorization;

namespace Cama_Energy.Areas.Admin.Controllers
{

    [ApiController]
    public class ConatctController : ControllerBase
    {
        private readonly IContactService _contact;

        public ConatctController(IContactService contact)
        {
            _contact = contact;
        }
        [HttpGet]
        [Route("api/Contact/GetContact")]
        public IActionResult GetAboutById()
        {
            return Ok(_contact.GetContact());

        }

        [Authorize]
        [HttpPost]
        [Route("api/Contact/UpdateContact")]
        public IActionResult UpdateAbout(Contact contact)
        {

            try
            {
                _contact.UpdateContact(contact);
                return Ok(1);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }
    }
}
