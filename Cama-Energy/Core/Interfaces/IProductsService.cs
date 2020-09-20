using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
    public interface IProductsService
    {

        List<Products> GetAllProducts();

        List<Products> GetAllProductsByCid(int cid);

        List<Products> GetLastProducts();

        Products GetProductsById(long id);

        long AddProducts(Products services);

        void DeleteProduct(Products services);

        void UpdateProduct(Products services);

        long AddProductsImage(ProductsImage servicesImage);

        string DeleteProductsImage(long id);

        public int GetProductsCount();
    }
}
