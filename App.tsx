
import React, { useState } from 'react';
import { AppView, UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import MarketplaceView from './components/MarketplaceView';
import ServicesMarketplaceView from './components/ServicesMarketplaceView';
import FinanceView from './components/FinanceView';
import ProjectView from './components/ProjectView';
import HRView from './components/HRView';
import JobAggregatorView from './components/JobAggregatorView';
import BOQView from './components/BOQView';
import PublicSiteView from './components/PublicSiteView';
import ClientPortalView from './components/ClientPortalView';
import DocumentsView from './components/DocumentsView';
import CollaborationView from './components/CollaborationView';
import SubscriptionView from './components/SubscriptionView';
import SecurityView from './components/SecurityView';
import InvoiceGeneratorView from './components/InvoiceGeneratorView';
import LoginOverlay from './components/LoginOverlay';
import LandingView from './components/LandingView';
import AboutUsView from './components/AboutUsView';
import PartnerNetworkView from './components/PartnerNetworkView';
import ContactView from './components/ContactView';
import LegalView from './components/LegalView';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [publicView, setPublicView] = useState<'landing' | 'about' | 'partners' | 'contact' | 'legal'>('landing');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setShowAuth(false);
    setCurrentView(AppView.DASHBOARD);
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const renderView = () => {
    const props = { setView: setCurrentView };
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView {...props} />;
      case AppView.ANALYTICS: return <AnalyticsView {...props} />;
      case AppView.MARKETPLACE: return <MarketplaceView {...props} />;
      case AppView.SERVICES_MARKETPLACE: return <ServicesMarketplaceView {...props} />;
      case AppView.FINANCE: return <FinanceView {...props} />;
      case AppView.PROJECTS: return <ProjectView {...props} />;
      case AppView.HR: return <HRView {...props} />;
      case AppView.JOBS: return <JobAggregatorView {...props} />;
      case AppView.BOQ: return <BOQView {...props} />;
      case AppView.COMPANY_PROFILE: return <PublicSiteView {...props} />;
      case AppView.CLIENT_PORTAL: return <ClientPortalView {...props} />;
      case AppView.DOCUMENTS: return <DocumentsView {...props} />;
      case AppView.COLLABORATION: return <CollaborationView {...props} />;
      case AppView.SUBSCRIPTION: return <SubscriptionView {...props} />;
      case AppView.SECURITY: return <SecurityView {...props} />;
      case AppView.INVOICE_GENERATOR: return <InvoiceGeneratorView {...props} />;
      default: return <DashboardView {...props} />;
    }
  };

  if (!userRole) {
    const handleSetPublicView = (view: any) => setPublicView(view);

    return (
      <div className="min-h-screen bg-slate-50">
        {publicView === 'landing' && (
          <LandingView 
            onGetStarted={() => openAuth('signup')} 
            onLoginClick={() => openAuth('login')} 
            setView={handleSetPublicView}
          />
        )}
        {publicView === 'about' && <AboutUsView onBack={() => setPublicView('landing')} />}
        {publicView === 'partners' && <PartnerNetworkView onBack={() => setPublicView('landing')} />}
        {publicView === 'contact' && <ContactView onBack={() => setPublicView('landing')} />}
        {publicView === 'legal' && <LegalView onBack={() => setPublicView('landing')} />}

        {showAuth && (
          <LoginOverlay 
            initialMode={authMode}
            onLogin={handleLogin} 
            onClose={() => setShowAuth(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen}
        role={userRole}
        onLogout={() => {
          setUserRole(null);
          setPublicView('landing');
          setShowAuth(false);
        }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} role={userRole} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
