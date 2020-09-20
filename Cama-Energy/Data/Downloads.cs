using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class Downloads
    {
        public long Id { get; set; }
        public short TypeId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileLocation { get; set; }
    }
}
