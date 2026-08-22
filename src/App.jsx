import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AcademicIntro from './components/AcademicIntro';
import AcademicTracks from './components/AcademicTracks';
import ScheduledSessions from './components/ScheduledSessions';
import GeometricPatternDivider from './components/GeometricPatternDivider';
import CountdownSection from './components/CountdownSection';
import BrochureModal from './components/BrochureModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AllSessionsPage from './components/AllSessionsPage';

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

  // Initial default sessions
  const defaultSessionsList = [
    {
      id: 'session-1',
      speakerName: 'Zack Wilson',
      flag: '🇬🇧',
      role: 'Senior Product Designer at Meta',
      affiliation: 'Lead Researcher in AI Fatwa Limits & UX Guardrails',
      photo: '/zack_wilson.jpg',
      tags: ['UX/UI design', 'Product design', 'Copywriting'],
      bio: 'Zack Wilson is a Senior Product Designer at Meta with over 12 years of experience designing complex algorithmic interfaces and human-AI interaction patterns.',
      abstract: 'This session explores how user interfaces can transparently signal AI confidence levels, prevent automated fatwa hallucinations, and preserve human scholarly authority in digital legal consultations.'
    },
    {
      id: 'session-2',
      speakerName: 'Dr. Abdullah Al-Makhdoomi',
      flag: '🇮🇳',
      role: 'Professor of Shafi\'i Jurisprudence',
      affiliation: 'Ahlussuffa Dars Complex & Ponnani Research Chair',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      tags: ['Shafi\'i Fiqh', 'Makhdoomi Legacy', 'Maritime Trade'],
      bio: 'Dr. Abdullah Al-Makhdoomi is a distinguished scholar of classical Shafi\'ite jurisprudence and author of 14 treatises on Indian Ocean maritime legal history.',
      abstract: 'An analytical review of how 16th-century Shafi\'i jurists in Malabar resolved novel trade contracts and maritime disputes.'
    },
    {
      id: 'session-3',
      speakerName: 'Sheikh Ibrahim Al-Kerali',
      flag: '🇦🇪',
      role: 'Islamic Finance & Crypto Ethicist',
      affiliation: 'Advisor to Global Decentralized Finance Protocols',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      tags: ['DeFi Yields', 'Smart Contracts', 'Crypto Fiqh'],
      bio: 'Sheikh Ibrahim Al-Kerali is a pioneer in Islamic Fintech and cryptocurrency jurisprudence.',
      abstract: 'Evaluating liquidity pool staking, automated market makers (AMMs), and algorithmic stablecoins under traditional legal maxims.'
    }
  ];

  // Shared sessions state
  const [sessionsData, setSessionsData] = useState(defaultSessionsList);

  // Initial default academic tracks
  const defaultTracksList = [
    {
      id: 'track-1',
      title: 'Decentralized Crypto Finance & Smart Contracts',
      code: 'TRACK 01',
      description: 'Examining tokenomics, decentralized liquidity pools, automated market makers (AMMs), and staking rewards under Islamic jurisprudence and Usul al-Fiqh.',
      topics: ['DeFi Yield Farming', 'Algorithmic Stablecoins', 'Smart Contract Gharar'],
      speakersCount: '4 Keynotes'
    },
    {
      id: 'track-2',
      title: 'Artificial Intelligence & Algorithmic Fatwa Limits',
      code: 'TRACK 02',
      description: 'Delineating ethical boundary conditions, LLM hallucination risks, and legal accountability when AI agents generate legal opinions or fatwas.',
      topics: ['LLM Jurisprudential Limits', 'Autonomous Ijtihad Risks', 'Algorithmic Bias'],
      speakersCount: '5 Sessions'
    },
    {
      id: 'track-3',
      title: 'CRISPR Gene Editing & Bioethical Jurisprudence',
      code: 'TRACK 03',
      description: 'Scholarly evaluation of somatic vs. germline modification, human enhancement boundaries, synthetic biology, and genetic patenting in Fiqh.',
      topics: ['Germline Editing Limits', 'Gene Therapy Fiqh', 'Genomic Privacy'],
      speakersCount: '3 Panels'
    },
    {
      id: 'track-4',
      title: 'Makhdoomi Shafi\'i Heritage & Applied Jurisprudence',
      code: 'TRACK 04',
      description: 'Tracing the Indian Ocean jurisprudence tradition from Ponnani Makhdooms to contemporary Malabar Coast legal applications.',
      topics: ['Makhdoomi Manuscripts', 'Maritime Jurisprudence', 'Contemporary Nawazil'],
      speakersCount: '6 Lectures'
    }
  ];

  // Shared tracks state
  const [tracksData, setTracksData] = useState(defaultTracksList);

  const fetchSupabaseSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map((s) => ({
          id: s.id,
          speakerName: s.speaker_name || s.speakerName,
          flag: s.flag || '🇬🇧',
          role: s.role,
          affiliation: s.affiliation,
          photo: s.photo || '/zack_wilson.jpg',
          tags: Array.isArray(s.tags) ? s.tags : (s.tags ? s.tags.split(',') : []),
          bio: s.bio,
          abstract: s.abstract
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

      if (!error && data && data.length > 0) {
        const mapped = data.map((t) => ({
          id: t.id,
          title: t.title,
          code: t.code || 'TRACK 01',
          description: t.description,
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

        {/* 2. Academic Summit for Applied Fiqh Intro Section */}
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
