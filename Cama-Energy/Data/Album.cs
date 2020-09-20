using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class Album
    {
        public Album()
        {
            AlbumImage = new HashSet<AlbumImage>();
        }

        public long AlbumId { get; set; }
        public string Title { get; set; }
        public bool? IsActive { get; set; }
        public string CoverImage { get; set; }
        public virtual ICollection<AlbumImage> AlbumImage { get; set; }
    }
}
