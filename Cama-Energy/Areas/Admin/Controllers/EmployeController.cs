using System;
using System.Collections.Generic;
using System.Linq;
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
    public class EmployeController : ControllerBase
    {
        private IEmployeService _employe;

        public EmployeController(IEmployeService employe)
        {
            _employe = employe;
        }
        [HttpGet]
        [Route("api/Employe/GetAllEmploye")]
        public IActionResult GetAllEmploye()
        {
            return Ok(_employe.GetAllEmploye());

        }

        [HttpDelete]
        [Route("api/Employe/DeleteEmploye")]
        public IActionResult DeleteEmploye(long EmployeId)
        {
            var employe = _employe.GetEmployeById(EmployeId);

            if (employe != null)
            {
                if (!string.IsNullOrWhiteSpace(employe.ImageFile)) {

                    FileManeger.FileRemover(new List<string> { employe.ImageFile });
                }
                _employe.DeleteEmploye(employe);
                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpPost]
        [Route("api/Employe/InsertEmploye")]
        public IActionResult InsertEmploye()
        {
            var a = HttpContext.Request.Form.Files[0];
            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "EmployeeImages");

            var employe = JsonSerializer.Deserialize<Employe>(HttpContext.Request.Form["Employee"]);
            if (_uploadFileStatus.Status == 200)
            {

                employe.ImageFile = _uploadFileStatus.Path;

            }
            else
            {

                return BadRequest(_uploadFileStatus.Path);


            }

            try
            {
                var aid = _employe.AddEmploye(employe);
                return Ok(aid);
            }
            catch (Exception e)
            {
                FileManeger.FileRemover(new List<string> { _uploadFileStatus.Path });
                return BadRequest(e.Message.ToString());
            }

        }

        [HttpGet]
        [Route("api/Employe/GetEmployeById")]
        public IActionResult GetEmployeById(long EmployeId)
        {
            return Ok(_employe.GetEmployeById(EmployeId));

        }

        [HttpPut]
        [Route("api/Employe/UpdateEmploye")]
        public IActionResult UpdateEmploye()
        {


            var emp = JsonSerializer.Deserialize<Employe>(HttpContext.Request.Form["Employee"]);
            var employe = _employe.GetEmployeById(emp.Id);
            employe.Name = emp.Name;
            employe.Skills = emp.Skills;
            employe.Degree = emp.Degree;
            employe.Description = emp.Description;
            var deletedFile = employe.ImageFile;

            FileManeger.UploadFileStatus _uploadFileStatus = new FileManeger.UploadFileStatus();

            if (HttpContext.Request.Form.Files.Count > 0)
            {

                var a = HttpContext.Request.Form.Files[0];
                _uploadFileStatus = FileManeger.FileUploader(a, 1, "EmployeeImages");

                if (_uploadFileStatus.Status == 200)
                {

                    employe.ImageFile = _uploadFileStatus.Path;
                }
                else
                {
                    return BadRequest(_uploadFileStatus.Path);


                }
                try
                {
                    _employe.UpdateEmploye(employe);
                    if (!string.IsNullOrWhiteSpace(deletedFile))
                    {
                        FileManeger.FileRemover(new List<string> { deletedFile });
                    }

                    return Ok(employe.Id);
                }
                catch (Exception e)
                {
                    FileManeger.FileRemover(new List<string> { _uploadFileStatus.Path });
                    return BadRequest(e.Message.ToString());
                }


            }
            else
            {
                try
                {
                    _employe.UpdateEmploye(employe);
                    return Ok(employe.Id);
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message.ToString());
                }

            }




        }

    }
}