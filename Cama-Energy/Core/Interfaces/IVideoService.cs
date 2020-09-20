using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
  public interface IVideoService
    {
        List<Videos> GetAllVideo();
        Videos GetVideoById(long id);

        long AddVideo(Videos video);

        void DeleteVideo(Videos video);

        void UpdateVideo(Videos video);
    }
}
