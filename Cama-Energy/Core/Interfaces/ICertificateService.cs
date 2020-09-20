using Cama_Energy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cama_Energy.Core.Interfaces
{
   public interface ICertificateService
    {
        List<Certificate> GetAllCertificate();
        Certificate GetCertificateById(long id);

        long AddCertificate(Certificate certificate);

        void DeleteCertificate(Certificate certificate);

        void UpdateCertificate(Certificate certificate);

        int GetCertificateCount();
    }
}
