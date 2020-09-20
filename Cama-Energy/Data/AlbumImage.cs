using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class AlbumImage
    {
        public long AlbumImageId { get; set; }
        public long? AlbumId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string SmallImageFile { get; set; }
        public string BigImageFile { get; set; }
        [JsonIgnore]
        public virtual Album Album { get; set; }
    }
}
