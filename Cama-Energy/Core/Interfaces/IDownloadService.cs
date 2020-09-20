using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
  public  interface IDownloadService
    {
        List<Downloads> GetAllDownload();
        Downloads GetDownloadById(long id);

        List<Downloads> GetDownloadByType(int typeId);

        long AddDownload(Downloads download);

        void DeleteDownload(Downloads download);

        void UpdateDownload(Downloads download);
    }
}
