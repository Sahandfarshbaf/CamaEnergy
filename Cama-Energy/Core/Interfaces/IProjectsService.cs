using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cama_Energy.Data;

namespace Cama_Energy.Core.Interfaces
{
    public interface IProjectsService
    {

        List<Projects> GetAllProjects();

        List<Projects> GetAllProjectsByCategory(string cid);

        List<Projects> GetLastProjects();
        Projects GetProjectsById(long id);

        long AddProjects(Projects projects);

        void DeleteProject(Projects projects);

        void UpdateProject(Projects projects);

        long AddProjectsImage(ProjectsImage projectsImage);

        string DeleteProjectsImage(long id);

        int GetProjectsCount();
    }
}
