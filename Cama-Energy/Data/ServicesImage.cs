using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class ServicesImage
    {
        public long Id { get; set; }
        public long? ServicesId { get; set; }
        public string FileImage { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public virtual Services Services { get; set; }
    }
}
