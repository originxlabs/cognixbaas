import { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects, Project, Account } from '@/hooks/useProjects';

interface ProjectContextType {
  account: Account | null;
  projects: Project[];
  currentProject: Project | null;
  setCurrentProjectId: (id: string | null) => void;
  loading: boolean;
  createProject: (name: string, description?: string) => Promise<Project | null>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const navigate = useNavigate();
  const {
    account,
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects,
  } = useProjects();
  
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(projectId || null);

  // Sync with URL params
  useEffect(() => {
    if (projectId) {
      setCurrentProjectId(projectId);
    }
  }, [projectId]);

  const currentProject = projects.find(p => p.id === currentProjectId) || null;

  const handleSetCurrentProjectId = (id: string | null) => {
    setCurrentProjectId(id);
    if (id) {
      navigate(`/dashboard/project/${id}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        account,
        projects,
        currentProject,
        setCurrentProjectId: handleSetCurrentProjectId,
        loading,
        createProject,
        updateProject,
        deleteProject,
        refreshProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
