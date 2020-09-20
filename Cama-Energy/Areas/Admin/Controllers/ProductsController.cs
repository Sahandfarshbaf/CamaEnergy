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
    public class ProductsController : ControllerBase
    {

        private IProductsService _products;

        public ProductsController(IProductsService product)
        {
            _products = product;
        }


        [HttpGet]
        [Route("api/Products/GetAllProducts")]
        public IActionResult GetAllProducts()
        {


            return Ok(_products.GetAllProducts());

        }


        [HttpPost]
        [Route("api/Products/InsertProducts")]
        public IActionResult InsertServices(Products Products)
        {
            try
            {
                var a = _products.AddProducts(Products);
                return Ok(a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }

        }

        [HttpPost]
        [Route("api/Products/UploadImage")]
        public ActionResult UploadImage(string Title, long ProductId)
        {

            ProductsImage tbl = new ProductsImage();

            var a = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus _uploadFileStatus = FileManeger.FileUploader(a, 1, "ProductImages");

            if (_uploadFileStatus.Status == 200)
            {
                tbl.Id = 0;
                tbl.ProdutcsId = ProductId;
                tbl.Title = Title;
                tbl.FileImage = _uploadFileStatus.Path;
                try
                {
                    return Ok(_products.AddProductsImage(tbl));
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
        [Route("api/Products/DeleteProducts")]
        public IActionResult DeleteEmploye(long ProductId)
        {
            var product = _products.GetProductsById(ProductId);

            if (product != null)
            {
                List<string> fileList = product.ProductsImage.Select(i => i.FileImage).ToList();
                _products.DeleteProduct(product);
                FileManeger.FileRemover(fileList);

                return Ok();
            }
            else
            {
                return BadRequest("Error");
            }

        }

        [HttpGet]
        [Route("api/Products/GetProductsById")]
        public IActionResult GetServicesById(long ProductId)
        {
            return Ok(_products.GetProductsById(ProductId));

        }

        [HttpPut]
        [Route("api/Products/UpdateProducts")]
        public IActionResult UpdateService(Products products)
        {
            try
            {
                _products.UpdateProduct(products);
                return Ok(products.Id);
            }
            catch (Exception e)
            {
                return BadRequest("Error");
            }

        }

        [HttpDelete]
        [Route("api/Products/DeleteImage")]
        public IActionResult DeleteImage(long Id)
        {
            var ImageFile = _products.DeleteProductsImage(Id);

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