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
    public class DownloadController : ControllerBase
    {
        private readonly IDownloadService _download;

        public DownloadController(IDownloadService download)
        {
            _download = download;
        }

        [HttpGet]
        [Route("api/Download/GetAllDownload")]
        public IActionResult GetAllDownload()
        {


            return Ok(_download.GetAllDownload());

        }

        [HttpPost]
        [Route("api/Download/AddDownload")]
        public IActionResult AddDownload(short typeId, string title, string desc)
        {

            Downloads download = new Downloads();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 3, "DownloadFiles");

            if (_uploadFileStatus.Status == 200)
            {
                download.TypeId = typeId;

                download.Title = title;
                download.Description = desc;
                download.FileLocation = _uploadFileStatus.Path;
                try
                {
                    return Ok(_download.AddDownload(download));
                }
                catch (Exception e)
                {

                    List<string> fileList = new List<string>();
                    fileList.Add(_uploadFileStatus.Path);
                    FileManeger.FileRemover(fileList);
                    return BadRequest(e.Message);
                }

            }
            else
            {
                return BadRequest(_uploadFileStatus.Path);
            }

        }


        [HttpGet]
        [Route("api/Download/DeleteDownload")]
        public IActionResult DeleteDownload(long id)
        {
            var download = _download.GetDownloadById(id);

            if (download != null)
            {
                List<string> fileList = new List<string>();
                fileList.Add(download.FileLocation);
                _download.DeleteDownload(download);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Download/GetDownloadById")]
        public IActionResult GetDownloadById(long id)
        {
            return Ok(_download.GetDownloadById(id));

        }

        [HttpPost]
        [Route("api/Download/UpdateDownload")]
        public IActionResult UpdateDownload(long id, short typeId,string title, string desc)
        {

            var download = _download.GetDownloadById(id);
            download.TypeId = typeId;
            
            download.Description = desc;
            download.Title = title;
            var delfile = download.FileLocation;
            List<string> fileList = new List<string>();


            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var a = HttpContext.Request.Form.Files[0];
                FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 3, "DownloadFiles");

                if (_uploadFileStatus.Status == 200)
                {

                    download.FileLocation = _uploadFileStatus.Path;
                    try
                    {
                        _download.UpdateDownload(download);
                        fileList.Add(delfile);
                        FileManeger.FileRemover(fileList);
                        return Ok();
                    }
                    catch (Exception e)
                    {


                        fileList.Add(_uploadFileStatus.Path);
                        FileManeger.FileRemover(fileList);
                        return BadRequest(e.Message);
                    }

                }
                else
                {
                    return BadRequest(_uploadFileStatus.Path);
                }

            }
            else
            {
                try
                {
                    _download.UpdateDownload(download);
                    return Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest(e.Message.ToString());
                }

            }


        }
    }
}