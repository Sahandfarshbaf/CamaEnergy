using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class News
    {
        public News()
        {
            NewsImage = new HashSet<NewsImage>();
        }

        public long Id { get; set; }
        public short Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string AuthorId { get; set; }
        public long NewsDateTime { get; set; }

        public virtual ICollection<NewsImage> NewsImage { get; set; }
    }
}
