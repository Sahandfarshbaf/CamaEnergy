using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class NewsController : ControllerBase
    {
        private readonly INewsService _news;

        public NewsController(INewsService news)
        {
            _news = news;
        }

        [HttpGet]
        [Route("api/News/GetAllNews")]
        public IActionResult GetAllNews()
        {

            return Ok(_news.GetAllNews());

        }

        [HttpPost]
        [Route("api/News/AddNews")]
        public IActionResult AddNews(News news)
        {

            var firstname = User.Claims.Where(c => c.Type == "firstname").Select(x => x.Value).SingleOrDefault();
            var lastname = User.Claims.Where(c => c.Type == "lastname").Select(x => x.Value).SingleOrDefault();
            var userid=User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            news.Author = firstname + " " + lastname;
            news.AuthorId = userid;
            news.NewsDateTime = DateTime.Now.Ticks;
            try
            {
                var a = _news.AddNews(news);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }

        [HttpPost]
        [Route("api/News/UploadImage")]
        public ActionResult UploadImage(string Title, long NewsId)
        {

            NewsImage tbl = new NewsImage();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "NewsImages");

            if (_uploadFileStatus.Status == 200)
            {

                tbl.NewsId = NewsId;
                tbl.Title = Title;
                tbl.FileImage = _uploadFileStatus.Path;
                try
                {
                    return Ok(_news.AddNewsImage(tbl));
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
        [Route("api/News/DeleteNews")]
        public IActionResult DeleteNews(long NewsId)
        {
            var news = _news.GetNewsById(NewsId);

            if (news != null)
            {
                List<string> fileList = news.NewsImage.Select(i => i.FileImage).ToList();
                _news.DeleteNews(news);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/News/GetNewsById")]
        public IActionResult GetServicesById(long NewsId)
        {
            return Ok(_news.GetNewsById(NewsId));

        }

        [HttpPut]
        [Route("api/News/UpdateNews")]
        public IActionResult UpdateNews(News news)
        {
            var firstname = User.Claims.Where(c => c.Type == "firstname").Select(x => x.Value).SingleOrDefault();
            var lastname = User.Claims.Where(c => c.Type == "lastname").Select(x => x.Value).SingleOrDefault();
            var userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            news.Author = firstname + " " + lastname;
            news.AuthorId = userid;
            news.NewsDateTime = DateTime.Now.Ticks;
            try
            {
                _news.UpdateNews(news);
                return Ok(news.Id);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }

        [HttpDelete]
        [Route("api/News/DeleteImage")]
        public IActionResult DeleteImage(long Id)
        {
            var ImageFile = _news.DeleteNewsImage(Id);

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