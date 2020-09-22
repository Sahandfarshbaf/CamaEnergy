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
    public class SliderController : ControllerBase
    {
        private readonly ISliderService _slider;

        public SliderController(ISliderService slider)
        {
            _slider = slider;
        }

        [HttpGet]
        [Route("api/Slider/GetAllSlider")]
        public IActionResult GetAllSlider()
        {


            return Ok(_slider.GetAllSlider());

        }


        [HttpDelete]
        [Route("api/Slider/DeleteSlider")]
        public IActionResult DeleteSlider(long sliderId)
        {
            var slider = _slider.GetSliderById(sliderId);

            if (slider != null)
            {
                if (!string.IsNullOrWhiteSpace(slider.ImageFile))
                {

                    FileManeger.FileRemover(new List<string> { slider.ImageFile });
                }
                _slider.DeleteSlider(slider);
                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }


        [HttpPost]
        [Route("api/Slider/InsertSlider")]
        public IActionResult InsertSlider()
        {
            var a = HttpContext.Request.Form.Files[0];
            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "SliderImages");

            var slider = JsonSerializer.Deserialize<Slider>(HttpContext.Request.Form["Slider"]);
            if (_uploadFileStatus.Status == 200)
            {

                slider.ImageFile = _uploadFileStatus.Path;

            }
            else
            {

                return BadRequest(_uploadFileStatus.Path);


            }

            try
            {
                var aid = _slider.AddSlider(slider);
                return Ok(aid);
            }
            catch (Exception e)
            {
                FileManeger.FileRemover(new List<string> { _uploadFileStatus.Path });
                return BadRequest(e.Message.ToString());
            }

        }
    }
}
