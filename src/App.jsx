import React, { useState, useEffect } from 'react';
// Common Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import GeometricPatternDivider from './components/common/GeometricPatternDivider';
import BrochureModal from './components/common/BrochureModal';

// Home Feature Components
import Hero from './components/home/Hero';
import QuickLinksSection from './components/home/QuickLinksSection';
import AcademicIntro from './components/home/AcademicIntro';
import AcademicTracks from './components/home/AcademicTracks';
import ScheduledSessions from './components/home/ScheduledSessions';
import CountdownSection from './components/home/CountdownSection';

// Page Views
import AdminDashboard from './pages/AdminDashboard';
import AllSessionsPage from './pages/AllSessionsPage';

import { supabase } from './lib/supabase';

export default function App() {
  // Check initial URL hash / path for view routing (#admin, #all-sessions, etc.)
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#admin' || path === '/admin' || window.location.search.includes('admin')) {
      return 'admin';
    }
    if (hash === '#all-sessions' || hash === '#sessions-page' || path === '/sessions' || window.location.search.includes('sessions')) {
      return 'sessions';
    }
    return 'home';
  });

  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#admin' || path === '/admin' || window.location.search.includes('admin')) {
        setCurrentView('admin');
      } else if (hash === '#all-sessions' || hash === '#sessions-page' || path === '/sessions' || window.location.search.includes('sessions')) {
        setCurrentView('sessions');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Shared sessions state (loaded dynamically from Supabase)
  const [sessionsData, setSessionsData] = useState([]);

  // Shared tracks state (loaded dynamically from Supabase)
  const [tracksData, setTracksData] = useState([]);

  const fetchSupabaseSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map((s) => ({
          id: s.id,
          speakerName: s.speaker_name || s.speakerName,
          flag: s.flag || '🇬🇧',
          role: s.role || '',
          affiliation: s.affiliation || '',
          photo: s.photo || '/zack_wilson.jpg',
          tags: Array.isArray(s.tags) ? s.tags : (s.tags ? s.tags.split(',') : []),
          bio: s.bio || '',
          abstract: s.abstract || ''
        }));
        setSessionsData(mapped);
      }
    } catch (err) {
      console.log('Supabase sessions fetch note:', err.message);
    }
  };

  const fetchSupabaseTracks = async () => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        const mapped = data.map((t) => ({
          id: t.id,
          title: t.title || '',
          code: t.code || 'TRACK 01',
          description: t.description || '',
          topics: Array.isArray(t.topics) ? t.topics : (t.topics ? t.topics.split(',') : []),
          speakersCount: t.speakers_count || t.speakersCount || '4 Sessions'
        }));
        setTracksData(mapped);
      }
    } catch (err) {
      console.log('Supabase tracks fetch note:', err.message);
    }
  };

  useEffect(() => {
    fetchSupabaseSessions();
    fetchSupabaseTracks();

    const channelSessions = supabase
      .channel('public:sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sessions' },
        () => fetchSupabaseSessions()
      )
      .subscribe();

    const channelTracks = supabase
      .channel('public:tracks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tracks' },
        () => fetchSupabaseTracks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelSessions);
      supabase.removeChannel(channelTracks);
    };
  }, []);

  const scrollToSection = (id) => {
    // If currently on sessions page, first navigate back to home, then scroll
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      history.pushState("", document.title, window.location.pathname.replace('/sessions', '').replace('/admin', ''));
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAllSessions = () => {
    setCurrentView('sessions');
    window.location.hash = '#all-sessions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    history.pushState("", document.title, window.location.pathname.replace('/sessions', '').replace('/admin', ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToPublic = () => {
    setCurrentView('home');
    window.location.hash = '';
    history.pushState("", document.title, window.location.pathname.replace('/admin', ''));
  };

  // 1. Render Admin Dashboard ONLY when accessed via URL (#admin or /admin)
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onReturnToPublic={handleReturnToPublic}
        sessionsData={sessionsData}
        setSessionsData={setSessionsData}
        tracksData={tracksData}
        setTracksData={setTracksData}
      />
    );
  }

  // 2. Render Dedicated All Sessions Page when navigated to (#all-sessions or /sessions)
  if (currentView === 'sessions') {
    return (
      <>
        <AllSessionsPage
          onBackToHome={handleBackToHome}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          sessionsData={sessionsData}
        />
        <BrochureModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
      </>
    );
  }

  // 3. Render Landing Page
  return (
    <div className="min-h-screen bg-brand-bg text-brand-textDark font-sans selection:bg-brand-dark selection:text-white flex flex-col">
      
      {/* Navigation Header */}
      <Navbar 
        onOpenBrochure={() => setIsBrochureOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Section matching mockup */}
        <Hero 
          onOpenBrochure={() => setIsBrochureOpen(true)}
          scrollToSection={scrollToSection}
        />

        {/* 2. Quick Links Section (4 Squircles + 3 Action Buttons) */}
        <QuickLinksSection 
          onOpenBrochure={() => setIsBrochureOpen(true)}
          scrollToSection={scrollToSection}
        />

        {/* 3. Academic Summit for Applied Fiqh Intro Section */}
        <AcademicIntro />

        {/* 3. Academic Tracks Grid */}
        <AcademicTracks 
          tracksData={tracksData}
        />

        {/* 4. Scheduled Sessions Carousel */}
        <ScheduledSessions 
          sessionsData={sessionsData}
          onExploreAllSessions={handleExploreAllSessions}
        />

        {/* 5. Full Width Geometric Cross Pattern Banner */}
        <GeometricPatternDivider />

        {/* 6. Let's Witness the First Edition Countdown & Stats */}
        <CountdownSection />

      </main>

      {/* Footer & Secretariat Desk */}
      <Footer 
        onOpenBrochure={() => setIsBrochureOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* Official Brochure Viewer Modal */}
      <BrochureModal 
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

    </div>
  );
}
