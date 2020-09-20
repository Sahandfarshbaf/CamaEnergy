using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class ProductsService: IProductsService
    {

        private CamaEnergyContext _context;

        public ProductsService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddProducts(Products products)
        {
            _context.Products.Add(products);
            _context.SaveChanges();
            return products.Id;
        }

        public long AddProductsImage(ProductsImage productsImage)
        {
            _context.ProductsImage.Add(productsImage);
            _context.SaveChanges();
            return productsImage.Id;
        }

        public void DeleteProduct(Products products)
        {

            _context.Products.Remove(products);
            _context.SaveChanges();

        }

        public string DeleteProductsImage(long id)
        {
            var image = _context.ProductsImage.Find(id);
            string ImageFile = image.FileImage;
            _context.ProductsImage.Remove(image);
            _context.SaveChanges();
            return ImageFile;
        }

        public List<Products> GetAllProducts()
        {
            return _context.Products.Include(c => c.ProductsImage).ToList();
        }

        public Products GetProductsById(long id)
        {
            return _context.Products.Where(s => s.Id == id).Include(ss => ss.ProductsImage).FirstOrDefault();
        }

        public void UpdateProduct(Products products)
        {
            _context.Entry(products).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public int GetProductsCount()
        {
            return _context.Products.Count();
        }

        public List<Products> GetLastProducts()
        {
            return _context.Products.Include(c => c.ProductsImage).Take(5).ToList();
        }

        public List<Products> GetAllProductsByCid(int cid)
        {
            return _context.Products.Where(p => p.ProductCategoryId == cid).Include(c => c.ProductsImage).ToList();
        }
    }
}
