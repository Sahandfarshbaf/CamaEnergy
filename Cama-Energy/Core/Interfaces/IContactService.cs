using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
    public interface IContactService
    {
        void UpdateContact(Contact contact);
        Contact GetContact();
       
    }
}
