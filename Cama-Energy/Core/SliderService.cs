using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cama_Energy.Core
{
    public class SliderService : ISliderService
    {
        private readonly CamaEnergyContext _context;

        public SliderService(CamaEnergyContext context)
        {
            _context = context;
        }

        public long AddSlider(Slider slider)
        {
            _context.Slider.Add(slider);
            _context.SaveChanges();
            return slider.Id;
        }

        public void DeleteSlider(Slider slider)
        {
            _context.Slider.Remove(slider);
            _context.SaveChanges();
        }

        public Slider GetSliderById(long id)
        {
            return _context.Slider.Find(id);
        }

        public List<Slider> GetAllSlider()
        {
            return _context.Slider.ToList();
        }

        public void UpdateSlider(Slider slider)
        {
            _context.Entry(slider).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}
