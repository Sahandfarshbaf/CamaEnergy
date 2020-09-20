using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cama_Energy.Core
{
    public class AlbumService : IAlbumService
    {
        private readonly CamaEnergyContext _context;

        public AlbumService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddAlbum(Album album)
        {

            _context.Album.Add(album);
            _context.SaveChanges();
            return album.AlbumId;

        }

        public List<Album> GetAllAlbum()
        {
            return _context.Album.Include(a => a.AlbumImage).ToList();
        }

        public void DeleteAlbum(Album album)
        {
            _context.Album.Remove(album);
            
        }

        public void DeleteAlbumImages(List<AlbumImage> albumImages) {


            _context.AlbumImage.RemoveRange(albumImages);
            

        }

        public long AddAlbumImage(AlbumImage albumImage) {

            _context.AlbumImage.Add(albumImage);
            _context.SaveChanges();
            return albumImage.AlbumImageId;
        }

        public void UpdateAlbum(Album album) {

            _context.Entry(album).State = EntityState.Modified;
            _context.SaveChanges();

        }

        public Album GetAlbumById(long albumId) {

            return _context.Album.Include(c => c.AlbumImage).Where(a=>a.AlbumId==albumId).FirstOrDefault();
        }

        public AlbumImage GetAlbumImageById(long albumImageId)
        {

            return _context.AlbumImage.Where(a => a.AlbumImageId == albumImageId).FirstOrDefault();
        }

        public void SaveChanges() {

            _context.SaveChanges();
        }
    }
}
