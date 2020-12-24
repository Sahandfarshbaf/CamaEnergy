using System;
using System.Collections.Generic;

namespace Cama_Energy.Data
{
    public partial class Projects
    {
        public Projects()
        {
            ProjectsImage = new HashSet<ProjectsImage>();
        }

        public long Id { get; set; }
        public string ProjectCategory { get; set; }
        public bool? Selected { get; set; }
        public string Karfarma { get; set; }
        public string ModirAmel { get; set; }
        public string Brand { get; set; }
        public string Emkanat { get; set; }
        public string ControlBy { get; set; }
        public long? TarikhTahvil { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long? FromDate { get; set; }
        public long? ToDate { get; set; }
        public string Owner { get; set; }

        public virtual ICollection<ProjectsImage> ProjectsImage { get; set; }
    }
}
