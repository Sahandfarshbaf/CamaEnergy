using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class Services
    {
        public Services()
        {
            ServicesImage = new HashSet<ServicesImage>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ServicesImage> ServicesImage { get; set; }
    }
}
