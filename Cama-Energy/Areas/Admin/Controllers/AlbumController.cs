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
    [Authorize]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _album;

        public AlbumController(IAlbumService album)
        {
            _album = album;
        }

        [HttpGet]
        [Route("api/Album/GetAllAlbums")]
        public IActionResult GetAllAlbums()
        {

            return Ok(_album.GetAllAlbum());

        }

        [HttpPost]
        [Route("api/Album/AddAlbum")]
        public IActionResult AddAlbum(string title)
        {

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "GalleryImage");
            Album tbl = new Album();
            if (_uploadFileStatus.Status == 200)
            {


                tbl.CoverImage = _uploadFileStatus.Path;
                tbl.Title = title;
                tbl.IsActive = true;

                try
                {
                    var id = _album.AddAlbum(tbl);
                    return Ok(id);
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message.ToString());
                }
            }
            else
            {
                return BadRequest(_uploadFileStatus.Path);
            }



        }

        [HttpPut]
        [Route("api/Album/ChangAlbumStatus")]
        public IActionResult ChangAlbumStatus(long albumId)
        {
            try
            {
                var album = _album.GetAlbumById(albumId);
                album.IsActive = !album.IsActive;
                _album.UpdateAlbum(album);
                return Ok("");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message.ToString());
            }


        }

        [HttpPost]
        [Route("api/Album/UploadImage")]
        public IActionResult UploadImage(long albumId, string Title, string Desc)
        {

            var smallFile = HttpContext.Request.Form.Files[0];
            var bigFile = HttpContext.Request.Form.Files[1];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(smallFile, 1, "GalleryImage");
            FileManeger.UploadFileStatus _uploadFileStatus1 = FileManeger.FileUploader(bigFile, 1, "GalleryImage");

            AlbumImage tbl = new AlbumImage();
            if (_uploadFileStatus.Status == 200 && _uploadFileStatus1.Status == 200)
            {
                tbl.AlbumId = albumId;
                tbl.Title = Title;
                tbl.Description = Desc;
                tbl.SmallImageFile = _uploadFileStatus.Path;
                tbl.BigImageFile = _uploadFileStatus1.Path;



                try
                {
                    var id = _album.AddAlbumImage(tbl);
                    return Ok(id);
                }
                catch (Exception e)
                {
                    FileManeger.FileRemover(new List<string> { _uploadFileStatus.Path, _uploadFileStatus1.Path });
                    return BadRequest(e.Message.ToString());
                }
            }
            else
            {
                return BadRequest(_uploadFileStatus.Path);
            }



        }

        [HttpDelete]
        [Route("api/Album/DeleteAlbum")]
        public IActionResult DeleteAlbum(long albumId)
        {

            var album = _album.GetAlbumById(albumId);
            List<string> removeFile = new List<string>();
            removeFile.Add(album.CoverImage);
            removeFile.AddRange(album.AlbumImage.Select(c => c.BigImageFile).ToList());
            removeFile.AddRange(album.AlbumImage.Select(c => c.SmallImageFile).ToList());
            _album.DeleteAlbumImages(album.AlbumImage.ToList());
            _album.DeleteAlbum(album);


            try
            {
                _album.SaveChanges();
                FileManeger.FileRemover(removeFile);
                return Ok("");

            }
            catch (Exception e)
            {

                return BadRequest(e.Message.ToString());
            }





        }

        [HttpGet]
        [Route("api/Album/GetAlbumById")]
        public IActionResult GetAlbumById(long albumId)
        {

            return Ok(_album.GetAlbumById(albumId));

        }

        [HttpDelete]
        [Route("api/Album/DeleteImage")]
        public IActionResult DeleteImage(long albumImageId)
        {

            var AlbumImage = _album.GetAlbumImageById(albumImageId);
            _album.DeleteAlbumImages(new List<AlbumImage> { AlbumImage });



            try
            {
                _album.SaveChanges();
                FileManeger.FileRemover(new List<string> { AlbumImage.SmallImageFile, AlbumImage.BigImageFile });
                return Ok("");

            }
            catch (Exception e)
            {

                return BadRequest(e.Message.ToString());
            }





        }

    }
}
