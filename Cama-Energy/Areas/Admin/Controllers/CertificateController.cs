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
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateService _certificate;

        public CertificateController(ICertificateService certificate)
        {
            _certificate = certificate;
        }

        [HttpGet]
        [Route("api/Certificate/GetAllCertificate")]
        public IActionResult GetAllCertificate()
        {


            return Ok(_certificate.GetAllCertificate());

        }

        [HttpPost]
        [Route("api/Certificate/AddCertificate")]
        public IActionResult AddCertificate(int type, string title, string desc)
        {

            Certificate certificate = new Certificate();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "CertificateImages");

            if (_uploadFileStatus.Status == 200)
            {
                certificate.Type = type;
                certificate.Title = title;
                certificate.Description = desc;
                certificate.FileImage = _uploadFileStatus.Path;
                try
                {
                    return Ok(_certificate.AddCertificate(certificate));
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


        [HttpDelete]
        [Route("api/Certificate/DeleteCertificate")]
        public IActionResult DeleteCertificate(long id)
        {
            var certificate = _certificate.GetCertificateById(id);

            if (certificate != null)
            {
                List<string> fileList = new List<string>();
                fileList.Add(certificate.FileImage);
                _certificate.DeleteCertificate(certificate);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Certificate/GetCertificateById")]
        public IActionResult GetCertificateById(long id)
        {
            return Ok(_certificate.GetCertificateById(id));

        }

        [HttpPost]
        [Route("api/Certificate/UpdateCertificate")]
        public IActionResult UpdateCertificate(long id, int type, string title, string desc)
        {

            var certificate = _certificate.GetCertificateById(id);
            certificate.Type = type;
            certificate.Description = desc;
            certificate.Title = title;
            var delfile = certificate.FileImage;
            List<string> fileList = new List<string>();


            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var a = HttpContext.Request.Form.Files[0];
                FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "CertificateImages");

                if (_uploadFileStatus.Status == 200)
                {

                    certificate.FileImage = _uploadFileStatus.Path;
                    try
                    {
                        _certificate.UpdateCertificate(certificate);
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
                    _certificate.UpdateCertificate(certificate);
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