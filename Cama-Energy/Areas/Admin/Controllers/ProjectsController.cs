using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ProjectsController : ControllerBase
    {
        private IProjectsService _projects;

        public ProjectsController(IProjectsService project)
        {
            _projects = project;
        }


        [HttpGet]
        [Route("api/Projects/GetAllProjects")]
        public IActionResult GetAllProjects()
        {


            return Ok(_projects.GetAllProjects().OrderByDescending(c => c.Id));

        }


        [HttpPost]
        [Route("api/Projects/InsertProjects")]
        public IActionResult InsertProjects(Projects project)
        {
            try
            {
                var aa = DateTime.Now.Ticks;
                var a = _projects.AddProjects(project);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }

        [HttpPost]
        [Route("api/Projects/UploadImage")]
        public ActionResult UploadImage(string Title, long ProjectId)
        {

            ProjectsImage tbl = new ProjectsImage();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "ProjectImages");

            if (_uploadFileStatus.Status == 200)
            {
                tbl.Id = 0;
                tbl.ProjectsId = ProjectId;
                tbl.Title = Title;
                tbl.FileImage = _uploadFileStatus.Path;
                try
                {
                    return Ok(_projects.AddProjectsImage(tbl));
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
        [Route("api/Projects/DeleteProjects")]
        public IActionResult DeleteProjects(long ProjectId)
        {
            var project = _projects.GetProjectsById(ProjectId);

            if (project != null)
            {
                List<string> fileList = project.ProjectsImage.Select(i => i.FileImage).ToList();
                _projects.DeleteProject(project);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Projects/GetProjectsById")]
        public IActionResult GetProjectsById(long ProjectId)
        {
            return Ok(_projects.GetProjectsById(ProjectId));

        }

        [HttpPut]
        [Route("api/Projects/UpdateProjects")]
        public IActionResult UpdateProjects(Projects project)
        {
            try
            {
                _projects.UpdateProject(project);
                return Ok(project.Id);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }

        [HttpDelete]
        [Route("api/Projects/DeleteImage")]
        public IActionResult DeleteImage(long Id)
        {
            var ImageFile = _projects.DeleteProjectsImage(Id);

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

        [HttpGet]
        [Route("api/Projects/ActiveDeActive")]
        public IActionResult ActiveDeActive(long Id, bool Status)
        {

            _projects.ActiveDeActive(Id, Status);
            return Ok("");

        }

    }
}