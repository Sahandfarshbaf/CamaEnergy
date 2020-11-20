using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class ContactService : IContactService
    {
        private readonly CamaEnergyContext _context;

        public ContactService(CamaEnergyContext context)
        {
            _context = context;
        }

        public Contact GetContact()
        {
            return _context.Contact.FirstOrDefault();
        }

        public void UpdateContact(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
