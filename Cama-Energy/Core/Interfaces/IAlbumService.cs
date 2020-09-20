using Cama_Energy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cama_Energy.Core.Interfaces
{
    public interface IAlbumService
    {
        long AddAlbum(Album album);
        List<Album> GetAllAlbum();
        void DeleteAlbum(Album album);
        void DeleteAlbumImages(List<AlbumImage> albumImages);
        long AddAlbumImage(AlbumImage albumImage);
        void UpdateAlbum(Album album);
        Album GetAlbumById(long albumId);
        void SaveChanges();
        AlbumImage GetAlbumImageById(long albumImageId);



    }
}
