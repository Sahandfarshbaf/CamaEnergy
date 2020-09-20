using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Core.Interfaces;
using Cama_Energy.Data;
using Microsoft.EntityFrameworkCore;

namespace Cama_Energy.Core
{
    public class ProjectsService : IProjectsService
    {

        private CamaEnergyContext _context;

        public ProjectsService(CamaEnergyContext context)
        {
            _context = context;
        }
        public long AddProjects(Projects projects)
        {
            _context.Projects.Add(projects);
            _context.SaveChanges();
            return projects.Id;
        }

        public long AddProjectsImage(ProjectsImage projectsImage)
        {
            _context.ProjectsImage.Add(projectsImage);
            _context.SaveChanges();
            return projectsImage.Id;
        }

        public void DeleteProject(Projects projects)
        {

            _context.Projects.Remove(projects);
            _context.SaveChanges();

        }

        public string DeleteProjectsImage(long id)
        {
            var image = _context.ProjectsImage.Find(id);
            string ImageFile = image.FileImage;
            _context.ProjectsImage.Remove(image);
            _context.SaveChanges();
            return ImageFile;
        }

        public List<Projects> GetAllProjects()
        {
            return _context.Projects.Include(c => c.ProjectsImage).ToList();
        }


        public List<Projects> GetLastProjects()
        {
            return _context.Projects.Include(c => c.ProjectsImage).OrderByDescending(x=>x.Id).Take(4).ToList();
        }

        public Projects GetProjectsById(long id)
        {
            return _context.Projects.Where(s => s.Id == id).Include(ss => ss.ProjectsImage).FirstOrDefault();
        }

        public void UpdateProject(Projects projects)
        {
            _context.Entry(projects).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public int GetProjectsCount()
        {
            return _context.Projects.Count();
        }

        public List<Projects> GetAllProjectsByCategory(string cid)
        {
            return _context.Projects.Where(p => p.ProjectCategory == cid).Include(c => c.ProjectsImage).ToList();

        }
    }
}
