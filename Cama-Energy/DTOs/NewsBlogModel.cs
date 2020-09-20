using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.DTOs
{
    public class NewsBlogModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string AuthorId { get; set; }
        public string NewsDateTime { get; set; }

        public virtual ICollection<NewsImage> NewsImage { get; set; }
    }
}
