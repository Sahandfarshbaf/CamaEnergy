using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class ProjectsImage
    {
        public long Id { get; set; }
        public long? ProjectsId { get; set; }
        public string FileImage { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public virtual Projects Projects { get; set; }
    }
}
