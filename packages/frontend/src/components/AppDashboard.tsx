import React from 'react';

interface AppDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderDashboard: () => React.ReactElement;
  renderServices: () => React.ReactElement;
  renderConfigurations: () => React.ReactElement;
  renderMonitoring: () => React.ReactElement;
}

const AppDashboard: React.FC<AppDashboardProps> = ({
  activeTab,
  setActiveTab,
  renderDashboard,
  renderServices,
  renderConfigurations,
  renderMonitoring,
}) => {
  return (
    <>
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'services' && renderServices()}
      {activeTab === 'config' && renderConfigurations()}
      {activeTab === 'monitoring' && renderMonitoring()}
    </>
  );
};

export default AppDashboard;
