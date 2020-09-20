using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class Products
    {
        public Products()
        {
            ProductsImage = new HashSet<ProductsImage>();
        }

        public long Id { get; set; }
        public int ProductCategoryId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ProductsImage> ProductsImage { get; set; }
    }
}
