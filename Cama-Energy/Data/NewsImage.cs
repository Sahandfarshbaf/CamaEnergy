using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class NewsImage
    {
        [Key]
        public long Id { get; set; }
        public long? NewsId { get; set; }
        public string FileImage { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public virtual News News { get; set; }
    }
}
