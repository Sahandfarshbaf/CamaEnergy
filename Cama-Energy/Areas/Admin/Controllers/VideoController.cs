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
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _video;

        public VideoController(IVideoService video)
        {
            _video = video;
        }

        [HttpGet]
        [Route("api/Video/GetAllVideo")]
        public IActionResult GetAllVideo()
        {


            return Ok(_video.GetAllVideo());

        }

        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("api/Video/AddVideo")]
        public IActionResult AddVideo(string name, string title, string desc)
        {

            Videos video = new Videos();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 2, "VideoFiles");

            if (_uploadFileStatus.Status == 200)
            {
                video.Name = name;
                video.Title = title;
                video.Description = desc;
                video.FileLocation = _uploadFileStatus.Path;
                try
                {
                    return Ok(_video.AddVideo(video));
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
        [Route("api/Video/DeleteVideo")]
        public IActionResult DeleteVideo(long id)
        {
            var video = _video.GetVideoById(id);

            if (video != null)
            {
                List<string> fileList = new List<string>();
                fileList.Add(video.FileLocation);
                _video.DeleteVideo(video);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Video/GetVideoById")]
        public IActionResult GetVideoById(long id)
        {
            return Ok(_video.GetVideoById(id));

        }

        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("api/Video/UpdateVideo")]
        public IActionResult UpdateVideo(long id, string name, string title, string desc)
        {

            var video = _video.GetVideoById(id);
            video.Name = name;
            video.Description = desc;
            video.Title = title;
            var delfile = video.FileLocation;
            List<string> fileList = new List<string>();


            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var a = HttpContext.Request.Form.Files[0];
                FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 2, "VideoFiles");

                if (_uploadFileStatus.Status == 200)
                {

                    video.FileLocation = _uploadFileStatus.Path;
                    try
                    {
                        _video.UpdateVideo(video);
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
                    _video.UpdateVideo(video);
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