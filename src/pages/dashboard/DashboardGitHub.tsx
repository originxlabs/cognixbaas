import { useParams } from 'react-router-dom';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useDashboardStore } from '@/stores/dashboardStore';
import { GitHubAppInstall } from '@/components/dashboard/GitHubAppInstall';

const DashboardGitHub = () => {
  const { projectId } = useParams();
  const { currentProject } = useProjectContext();
  const { github } = useDashboardStore();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">GitHub Integration</h1>
        <p className="text-muted-foreground">Repository connection and sync status</p>
      </div>

      {/* GitHub App Installation Component */}
      <GitHubAppInstall
        projectId={projectId || ''}
        projectName={currentProject?.name || 'Project'}
        isConnected={github.connected}
        repository={github.repository}
        branch={github.branch}
        lastSync={github.lastSyncAt}
      />
    </div>
  );
};

export default DashboardGitHub;
