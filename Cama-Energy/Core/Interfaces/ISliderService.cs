using Cama_Energy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cama_Energy.Core.Interfaces
{
    public interface ISliderService
    {
        long AddSlider(Slider slider);
        void DeleteSlider(Slider slider);
        Slider GetSliderById(long id);
        List<Slider> GetAllSlider();
        void UpdateSlider(Slider slider);
    }
}
