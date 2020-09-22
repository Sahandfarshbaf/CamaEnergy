using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class Slider
    {
        public long Id { get; set; }
        public string ImageFile { get; set; }
        public string Title { get; set; }
        public string SubTitle1 { get; set; }
        public string SubTitle2 { get; set; }
        public bool? IsActive { get; set; }
    }
}
