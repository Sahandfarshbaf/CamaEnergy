using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Cama_Energy.Data;
using Microsoft.AspNetCore.Identity.UI.V3.Pages.Internal.Account;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using Org.BouncyCastle.Crypto.Digests;

namespace Cama_Energy.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IServicesService _services;
        private readonly IProjectsService _projects;
        private readonly IProductsService _products;
        private readonly ICertificateService _certificate;
        private readonly INewsService _news;
        private readonly IEmployeService _employe;
        private readonly IVideoService _video;
        private readonly IDownloadService _download;
        private readonly IAlbumService _album;
        private readonly ISliderService _slider;
        private readonly IContactService _contact;


        public HomeController(ILogger<HomeController> logger, IServicesService services, IProjectsService projects, IProductsService products, ICertificateService certificate, INewsService news, IEmployeService employe, IVideoService video, IDownloadService download, IAlbumService album, ISliderService slider, IContactService contact)
        {
            _logger = logger;
            _services = services;
            _projects = projects;
            _products = products;
            _certificate = certificate;
            _news = news;
            _employe = employe;
            _video = video;
            _download = download;
            _album = album;
            _slider = slider;
            _contact = contact;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult AllNews()
        {
            return View();
        }
        public IActionResult SingleNews()
        {
            return View();
        }

        #region AboutUs

        public IActionResult PishGoftar()
        {
            return View();
        }
        public IActionResult Manshur()
        {
            return View();
        }
        public IActionResult CamaTeam()
        {
            return View();
        }
        public IActionResult Certificate()
        {
            return View();
        }

        #endregion

        #region Services

        #region NewTech

        public IActionResult SmartSystemIot()
        {
            return View();
        }
        public IActionResult SmartParking()
        {
            return View();
        }
        public IActionResult IPTV()
        {
            return View();
        }

        #endregion

        #region SmartBuilding

        public IActionResult Interface()
        {
            return View();
        }
        public IActionResult SmartBuilding()
        {
            return View();
        }
        public IActionResult WhySmart()
        {
            return View();
        }

        #endregion

        #region IT


        public IActionResult StructureCabling()
        {
            return View();
        }
        public IActionResult WiFiMetro()
        {
            return View();
        }
        public IActionResult WiFiSolutionGuide()
        {
            return View();
        }

        #endregion

        #region BuildingEnergy


        public IActionResult EnergyMeter()
        {
            return View();
        }
        public IActionResult EnergyManage()
        {
            return View();
        }

        #endregion

        #endregion

        #region Download

        public IActionResult proposal()
        {
            return View();
        }
        public IActionResult Learning()
        {
            return View();
        }
        public IActionResult Video()
        {
            return View();
        }
        public IActionResult Catalog()
        {
            return View();
        }

        #endregion

        #region product

        public IActionResult ProductList()
        {
            return View();
        }

        public IActionResult SingleProduct()
        {
            return View();
        }

        #endregion

        #region Project

        public IActionResult ProjectaList()
        {
            return View();
        }
        public IActionResult SingleProject()
        {
            return View();
        }


        #endregion

        public IActionResult Gallery()
        {

            return View();
        }

        public IActionResult SingleGallery()
        {

            return View();
        }
        public IActionResult ContactUs()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        [HttpGet]
        [Route("api/Home/GetCounter")]
        public IActionResult GetCounter()
        {
            var project = _projects.GetProjectsCount();
            var product = _products.GetProductsCount();
            var service = _services.GetServicesCount();
            var certificate = _certificate.GetCertificateCount();

            var v = new { project = project, product = product, service = service, certificate = certificate };
            return Ok(v);

        }

        [HttpGet]
        [Route("api/Home/GetLastNews")]
        public IActionResult GetLastNews()
        {

            return Ok(_news.GetLastNews());

        }

        [HttpGet]
        [Route("api/Home/GetLastProducts")]
        public IActionResult GetLastProducts()
        {


            return Ok(_products.GetLastProducts());

        }

        [HttpGet]
        [Route("api/Home/GetLastProjects")]
        public IActionResult GetLastProjects()
        {


            return Ok(_projects.GetLastProjects());

        }


        [HttpGet]
        [Route("api/Home/GetAllProducts")]
        public IActionResult GetAllProducts()
        {


            return Ok(_products.GetLastProducts());

        }

        [HttpGet]
        [Route("api/Home/GetAllProductsByCid")]
        public IActionResult GetAllProductsByCid(int cid)
        {


            return Ok(_products.GetAllProductsByCid(cid));

        }


        [HttpGet]
        [Route("api/Home/GetAllProjectsByCid")]
        public IActionResult GetAllProjectsByCid(string cid)
        {


            return Ok(_projects.GetAllProjectsByCategory(cid));

        }

        [HttpGet]
        [Route("api/Home/GetCertificate")]
        public IActionResult GetCertificate()
        {


            return Ok(_certificate.GetAllCertificate());

        }

        [HttpGet]
        [Route("api/Home/GetAllNewsBlog")]
        public IActionResult GetAllNewsBlog(short type, string searchtxt)
        {

            return Ok(_news.GetAllNewsBlog(type, searchtxt));

        }

        [HttpGet]
        [Route("api/Home/GetNewsById")]
        public IActionResult GetServicesById(long NewsId)
        {
            return Ok(_news.GetSingleNews(NewsId));

        }

        [HttpGet]
        [Route("api/Home/GetProjectById")]
        public IActionResult GetProjectById(long Id)
        {
            return Ok(_projects.GetProjectsById(Id));

        }

        [HttpGet]
        [Route("api/Home/GetProductById")]
        public IActionResult GetProductById(long Id)
        {
            return Ok(_products.GetProductsById(Id));

        }

        [HttpGet]
        [Route("api/Home/GetAllServices")]
        public IActionResult GetAllServices()
        {


            return Ok(_services.GetAllServices());

        }

        [HttpGet]
        [Route("api/Home/GetAllVideo")]
        public IActionResult GetAllVideo()
        {


            return Ok(_video.GetAllVideo());

        }

        [HttpGet]
        [Route("api/Home/GetDownloadByType")]
        public IActionResult GetDownloadByType(int typeId)
        {


            return Ok(_download.GetDownloadByType(typeId));

        }

        [HttpGet]
        [Route("api/Home/SendEmail")]
        public IActionResult SendEmail(string name, string emaill, string subject, string message)
        {

            // create email message
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emaill);
            email.To.Add(MailboxAddress.Parse("info@cama-energy.com"));

            email.Subject = subject;
            string body = "نام ارسال کننده : ";
            body += name;
            body += System.Environment.NewLine;
            body += "آدرس ایمیل ارسال کننده : ";
            body += emaill;
            body += System.Environment.NewLine;
            body += "متن پیام : ";
            body += message;
            email.Body = new TextPart(TextFormat.Text) { Text = body };
            try
            {
                using var smtp = new SmtpClient();

                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

                // hotmail
                //smtp.Connect("smtp.live.com", 587, SecureSocketOptions.StartTls);

                // office 365
                //smtp.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("cama.eenergy@gmail.com", "cama1390");
                smtp.Send(email);
                smtp.Disconnect(true);

                return Ok("OK");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            // send email

        }

        [HttpGet]
        [Route("api/Home/GetAlbumList")]
        public IActionResult GetAlbumList()
        {

            return Ok(_album.GetAllAlbum().Where(a => a.IsActive == true).ToList());

        }

        [HttpGet]
        [Route("api/Home/GetAlbumImageById")]
        public IActionResult GetAlbumImageById(long albumId)
        {

            return Ok(_album.GetAlbumById(albumId).AlbumImage.ToList());

        }

        [HttpGet]
        [Route("api/Home/GetAllEmploye")]
        public IActionResult GetAllEmploye()
        {
            return Ok(_employe.GetAllEmploye());

        }

        [HttpGet]
        [Route("api/Home/GetAllSlider")]
        public IActionResult GetAllSlider()
        {

            return Ok(_slider.GetAllSlider());

        }

        [HttpGet]
        [Route("api/Home/GetContact")]
        public IActionResult GetAboutById()
        {
            return Ok(_contact.GetContact());

        }
    }
}
