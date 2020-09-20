using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Cama_Energy.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cama_Energy.Areas.Admin.Controllers
{

    [ApiController]
    [Authorize]
    public class ServicesController : ControllerBase
    {
        private IServicesService _services;

        public ServicesController(IServicesService services)
        {
            _services = services;
        }


        [HttpGet]
        [Route("api/Services/GetAllServices")]
        public IActionResult GetAllServices()
        {
            

            return Ok(_services.GetAllServices());

        }


        [HttpPost]
        [Route("api/Services/InsertServices")]
        public IActionResult InsertServices(Services Services)
        {
            try
            {
                var a = _services.AddServices(Services);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }

        [HttpPost]
        [Route("api/Services/UploadImage")]
        public ActionResult UploadImage(string Title, long ServicesId)
        {

            ServicesImage tbl = new ServicesImage();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "ServiceImages");

            if (_uploadFileStatus.Status == 200)
            {
                tbl.Id = 0;
                tbl.ServicesId = ServicesId;
                tbl.Title = Title;
                tbl.FileImage = _uploadFileStatus.Path;
                try
                {
                    return Ok(_services.AddServicesImage(tbl));
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }

            }
            else
            {
                return BadRequest(_uploadFileStatus.Path);
            }




        }

        [HttpDelete]
        [Route("api/Services/DeleteService")]
        public IActionResult DeleteEmploye(long ServicesId)
        {
            var service = _services.GetServicesById(ServicesId);

            if (service != null)
            {
                List<string> fileList = service.ServicesImage.Select(i => i.FileImage).ToList();
                _services.DeleteService(service);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Services/GetServicesById")]
        public IActionResult GetServicesById(long ServicesId)
        {
            return Ok(_services.GetServicesById(ServicesId));

        }

        [HttpPut]
        [Route("api/Services/UpdateService")]
        public IActionResult UpdateService(Services Services)
        {
            try
            {
                _services.UpdateService(Services);
                return Ok(Services.Id);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }

        [HttpDelete]
        [Route("api/Services/DeleteImage")]
        public IActionResult DeleteImage(long Id)
        {
            var ImageFile = _services.DeleteServicesImage(Id);

            if (ImageFile != null)
            {
                List<string> fileList = new List<string>();
                fileList.Add(ImageFile);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }
    }
}