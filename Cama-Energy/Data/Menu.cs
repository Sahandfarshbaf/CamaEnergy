using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cama_Energy.Data
{
    public partial class Menu
    {
        public Menu()
        {
            InverseP = new HashSet<Menu>();
        }

        public long Id { get; set; }
        public long? Pid { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string TableName { get; set; }
        public long? TableId { get; set; }
        [JsonIgnore]
        public virtual Menu P { get; set; }
        [JsonIgnore]
        public virtual ICollection<Menu> InverseP { get; set; }
    }
}
