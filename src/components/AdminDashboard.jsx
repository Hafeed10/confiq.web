import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users, Calendar, FileText, Settings, Plus, Search, Download,
  Trash2, Eye, LogOut, CheckCircle, RefreshCw, Lock, Key, ShieldAlert, ArrowRight, X, Edit3, Image as ImageIcon, Sparkles, Tag, Upload, BookOpen, Layers
} from 'lucide-react';

export default function AdminDashboard({ onReturnToPublic, sessionsData = [], setSessionsData, tracksData = [], setTracksData }) {
  // Check if session is already authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('confiqh_admin_auth') === 'true';
  });

  // Login form inputs (Phone Number & DOB DD/MM/YY)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('delegates');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStudyRange, setFilterStudyRange] = useState('All');
  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(true);

  // Modal to inspect delegate payment receipt screenshot
  const [viewReceiptModal, setViewReceiptModal] = useState(null);

  // Official Brochure Poster CMS State
  const [brochuresData, setBrochuresData] = useState([
    {
      id: 'brochure-1',
      title: 'conFiqh 2026 Official Summit Prospectus & Poster',
      subtitle: '1st Edition • Annual Kerala Fiqh Summit',
      posterImage: '',
      date: '11–12 September 2026',
      venue: 'Ahlussuffa Dars, Parapram, Pinarayi, Kannur, Kerala'
    }
  ]);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState(null);
  const [brochureForm, setBrochureForm] = useState({
    title: '',
    subtitle: '',
    posterImage: '',
    date: '11–12 September 2026',
    venue: 'Ahlussuffa Dars, Parapram, Pinarayi, Kannur, Kerala'
  });

  const handleOpenAddBrochure = () => {
    setEditingBrochure(null);
    setBrochureForm({
      title: '',
      subtitle: '',
      posterImage: '',
      date: '11–12 September 2026',
      venue: 'Ahlussuffa Dars, Parapram, Pinarayi, Kannur, Kerala'
    });
    setBrochureModalOpen(true);
  };

  const handleOpenEditBrochure = (brochure) => {
    setEditingBrochure(brochure);
    setBrochureForm({
      title: brochure.title || '',
      subtitle: brochure.subtitle || '',
      posterImage: brochure.posterImage || '',
      date: brochure.date || '11–12 September 2026',
      venue: brochure.venue || 'Ahlussuffa Dars, Parapram, Pinarayi, Kannur, Kerala'
    });
    setBrochureModalOpen(true);
  };

  const handleBrochurePosterUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid poster image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setBrochureForm((prev) => ({ ...prev, posterImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBrochure = (e) => {
    e.preventDefault();
    if (editingBrochure) {
      setBrochuresData(brochuresData.map(b => b.id === editingBrochure.id ? { ...editingBrochure, ...brochureForm } : b));
    } else {
      const newBrochure = { id: 'brochure-' + Date.now(), ...brochureForm };
      setBrochuresData([...brochuresData, newBrochure]);
    }
    setBrochureModalOpen(false);
  };

  const handleDeleteBrochure = (brochureId) => {
    if (window.confirm('Are you sure you want to delete this official brochure poster?')) {
      setBrochuresData(brochuresData.filter(b => b.id !== brochureId));
    }
  };

  // Scheduled Sessions CMS Admin State
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    speakerName: '',
    flag: '🇬🇧',
    role: '',
    affiliation: '',
    photo: '/zack_wilson.jpg',
    tags: 'UX/UI design, Product design, Copywriting',
    bio: '',
    abstract: ''
  });

  const handleOpenAddSession = () => {
    setEditingSession(null);
    setSessionForm({
      speakerName: '',
      flag: '🇬🇧',
      role: '',
      affiliation: '',
      photo: '/zack_wilson.jpg',
      tags: 'UX/UI design, Product design, Copywriting',
      bio: '',
      abstract: ''
    });
    setSessionModalOpen(true);
  };

  const handleOpenEditSession = (session) => {
    setEditingSession(session);
    setSessionForm({
      speakerName: session.speakerName || '',
      flag: session.flag || '🇬🇧',
      role: session.role || '',
      affiliation: session.affiliation || '',
      photo: session.photo || '/zack_wilson.jpg',
      tags: Array.isArray(session.tags) ? session.tags.join(', ') : session.tags || '',
      bio: session.bio || '',
      abstract: session.abstract || ''
    });
    setSessionModalOpen(true);
  };

  const handleSaveSession = async (e) => {
    e.preventDefault();
    const tagList = sessionForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingSession) {
      const updatedSession = {
        ...editingSession,
        speakerName: sessionForm.speakerName,
        flag: sessionForm.flag,
        role: sessionForm.role,
        affiliation: sessionForm.affiliation,
        photo: sessionForm.photo,
        tags: tagList,
        bio: sessionForm.bio,
        abstract: sessionForm.abstract
      };

      setSessionsData(sessionsData.map(s => s.id === editingSession.id ? updatedSession : s));

      // Push UPDATE to Supabase Cloud DB
      try {
        await supabase.from('sessions').update({
          speaker_name: sessionForm.speakerName,
          flag: sessionForm.flag,
          role: sessionForm.role,
          affiliation: sessionForm.affiliation,
          photo: sessionForm.photo,
          tags: tagList,
          bio: sessionForm.bio,
          abstract: sessionForm.abstract
        }).eq('id', editingSession.id);
      } catch (err) {
        console.log('Supabase session update note:', err.message);
      }
    } else {
      const newSessionId = 'session-' + Date.now();
      const newSession = {
        id: newSessionId,
        speakerName: sessionForm.speakerName,
        flag: sessionForm.flag,
        role: sessionForm.role,
        affiliation: sessionForm.affiliation,
        photo: sessionForm.photo || '/zack_wilson.jpg',
        tags: tagList,
        bio: sessionForm.bio,
        abstract: sessionForm.abstract
      };

      setSessionsData([newSession, ...sessionsData]);

      // Push INSERT to Supabase Cloud DB
      try {
        await supabase.from('sessions').insert([{
          id: newSessionId,
          speaker_name: sessionForm.speakerName,
          flag: sessionForm.flag,
          role: sessionForm.role,
          affiliation: sessionForm.affiliation,
          photo: sessionForm.photo || '/zack_wilson.jpg',
          tags: tagList,
          bio: sessionForm.bio,
          abstract: sessionForm.abstract
        }]);
      } catch (err) {
        console.log('Supabase session insert note:', err.message);
      }
    }
    setSessionModalOpen(false);
  };

  // Academic Tracks CMS Admin State & Handlers
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [trackForm, setTrackForm] = useState({
    code: 'TRACK 01',
    title: '',
    speakersCount: '4 Keynotes',
    description: '',
    topics: 'DeFi Yield Farming, Algorithmic Stablecoins, Smart Contract Gharar'
  });

  const handleOpenAddTrack = () => {
    setEditingTrack(null);
    setTrackForm({
      code: `TRACK 0${tracksData.length + 1}`,
      title: '',
      speakersCount: '4 Sessions',
      description: '',
      topics: ''
    });
    setTrackModalOpen(true);
  };

  const handleOpenEditTrack = (track) => {
    setEditingTrack(track);
    setTrackForm({
      code: track.code || 'TRACK 01',
      title: track.title || '',
      speakersCount: track.speakersCount || '4 Sessions',
      description: track.description || '',
      topics: Array.isArray(track.topics) ? track.topics.join(', ') : track.topics || ''
    });
    setTrackModalOpen(true);
  };

  const handleSaveTrack = async (e) => {
    e.preventDefault();
    const topicList = trackForm.topics.split(',').map(t => t.trim()).filter(Boolean);

    if (editingTrack) {
      const updatedTrack = {
        ...editingTrack,
        code: trackForm.code,
        title: trackForm.title,
        speakersCount: trackForm.speakersCount,
        description: trackForm.description,
        topics: topicList
      };

      setTracksData(tracksData.map(t => t.id === editingTrack.id ? updatedTrack : t));

      // Push UPDATE to Supabase Cloud DB
      try {
        await supabase.from('tracks').update({
          code: trackForm.code,
          title: trackForm.title,
          speakers_count: trackForm.speakersCount,
          description: trackForm.description,
          topics: topicList
        }).eq('id', editingTrack.id);
      } catch (err) {
        console.log('Supabase track update note:', err.message);
      }
    } else {
      const newTrackId = 'track-' + Date.now();
      const newTrack = {
        id: newTrackId,
        code: trackForm.code,
        title: trackForm.title,
        speakersCount: trackForm.speakersCount,
        description: trackForm.description,
        topics: topicList
      };

      setTracksData([...tracksData, newTrack]);

      // Push INSERT to Supabase Cloud DB
      try {
        await supabase.from('tracks').insert([{
          id: newTrackId,
          code: trackForm.code,
          title: trackForm.title,
          speakers_count: trackForm.speakersCount,
          description: trackForm.description,
          topics: topicList
        }]);
      } catch (err) {
        console.log('Supabase track insert note:', err.message);
      }
    }
    setTrackModalOpen(false);
  };

  const handleDeleteTrack = async (trackId) => {
    if (window.confirm('Are you sure you want to delete this Academic Track?')) {
      setTracksData(tracksData.filter(t => t.id !== trackId));

      // Push DELETE to Supabase Cloud DB
      try {
        await supabase.from('tracks').delete().eq('id', trackId);
      } catch (err) {
        console.log('Supabase track delete note:', err.message);
      }
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this scheduled session?')) {
      setSessionsData(sessionsData.filter(s => s.id !== sessionId));

      // Push DELETE to Supabase Cloud DB
      try {
        await supabase.from('sessions').delete().eq('id', sessionId);
      } catch (err) {
        console.log('Supabase session delete note:', err.message);
      }
    }
  };

  const handleSpeakerPhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSessionForm((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Real delegates state - Source: Supabase Database ONLY
  const [delegates, setDelegates] = useState([]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim() && dob.trim()) {
      sessionStorage.setItem('confiqh_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('confiqh_admin_auth');
    setIsAuthenticated(false);
    onReturnToPublic();
  };

  const fetchSupabaseDelegates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('delegates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase DB fetch error:', error.message);
        setDbConnected(false);
      } else if (data) {
        setDbConnected(true);
        const mapped = data.map(d => ({
          id: d.pass_id || d.id,
          fullName: d.full_name,
          age: d.age,
          address: d.address,
          phone: d.phone,
          whatsapp: d.whatsapp,
          studyRange: d.study_range,
          birudam: d.birudam,
          status: d.status,
          campus: d.campus,
          position: d.position,
          studiedAlfiyyaAndFathulMueen: d.studied_alfiyya,
          paymentScreenshot: d.payment_screenshot || d.paymentScreenshot || null,
          paymentStatus: d.payment_status || d.paymentStatus || 'Paid (₹200)',
          registeredAt: d.created_at ? new Date(d.created_at).toLocaleDateString() : new Date().toLocaleDateString()
        }));
        setDelegates(mapped);
      }
    } catch (err) {
      console.error('Supabase connection exception:', err.message);
      setDbConnected(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSupabaseDelegates();

      // Real-time Postgres database subscription for instant table updates
      const channel = supabase
        .channel('public:delegates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'delegates' },
          (payload) => {
            console.log('Real-time database payload received:', payload);
            fetchSupabaseDelegates();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  const filteredDelegates = delegates.filter(d => {
    const matchesSearch = d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRange = filterStudyRange === 'All' || d.studyRange === filterStudyRange;
    return matchesSearch && matchesRange;
  });

  const handleExportCSV = () => {
    const headers = [
      "Pass ID", "Full Name", "Age", "Address", "Phone No", "WhatsApp No",
      "Study Range", "Birudam", "Status", "Campus / Position", "Alfiyya & Fathul Mueen Studied", "Registration Date"
    ];
    const rows = delegates.map(d => [
      d.id, `"${d.fullName}"`, d.age, `"${d.address}"`, d.phone, d.whatsapp,
      d.studyRange, `"${d.birudam}"`, d.status, `"${d.status === 'Student' ? d.campus : d.position}"`,
      d.studiedAlfiyyaAndFathulMueen ? "Yes" : "No", d.registeredAt
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "conFiqh_2026_Delegates_Supabase.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteDelegate = async (targetId) => {
    if (!targetId) return;

    if (window.confirm(`Are you sure you want to delete delegate ${targetId}?`)) {
      // 1. Immediately remove from React state (Instant UI delete)
      setDelegates((prevDelegates) => prevDelegates.filter((d) => d.id !== targetId && d.pass_id !== targetId));

      // 3. Delete from Supabase database cleanly
      try {
        let error = null;

        // Try deleting by pass_id first
        const res1 = await supabase
          .from('delegates')
          .delete()
          .eq('pass_id', targetId);

        error = res1.error;

        // If pass_id delete failed or didn't match, try deleting by numeric/uuid id
        if (error || (res1.count !== null && res1.count === 0)) {
          const res2 = await supabase
            .from('delegates')
            .delete()
            .eq('id', targetId);
          error = res2.error;
        }

        if (error) {
          console.error('Supabase DB delete error:', error.message);
        } else {
          console.log(`Successfully deleted ${targetId} from Supabase DB and UI.`);
        }
      } catch (err) {
        console.error('Supabase delete exception:', err.message);
      }
    }
  };

  // IF NOT AUTHENTICATED: Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#17472B] flex items-center justify-center p-4 relative overflow-hidden font-sans">

        {/* Subtle background overlay */}
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern pointer-events-none" />

        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative z-10 border border-[#354823]">

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#17472B] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-[#17472B]">
              Registration Portal Login
            </h2>
            <p className="text-xs font-bold text-[#387B52] mt-1">
              conFiqh 2026 • Enter your Phone Number & Date of Birth
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-200 text-xs font-bold mb-5 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              <span>Please enter a valid Phone Number and Date of Birth (DD/MM/YY).</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 7558889458"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#17472B] focus:ring-2 focus:ring-[#17472B]/20 text-sm font-medium outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                Date of Birth (Calendar) *
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#17472B] focus:ring-2 focus:ring-[#17472B]/20 text-sm font-medium outline-none transition-all cursor-pointer bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#17472B] hover:bg-[#20603B] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Login to Registration Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onReturnToPublic}
              className="text-xs font-bold text-gray-500 hover:text-[#17472B] transition-colors"
            >
              ← Back to Public Website
            </button>
          </div>

        </div>

      </div>
    );
  }

  // IF AUTHENTICATED: Render Full Secretariat Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">

      {/* Admin Header */}
      <header className="bg-[#17472B] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2.5 select-none">
                <span className="font-sans text-xl font-black text-white tracking-tight uppercase">
                  <span className="text-[#A1CF7F]">CON</span> FIQH
                </span>
                <span className="inline-block px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-black bg-[#354823] text-white uppercase tracking-wider shadow-xs">
                  1ST EDITION
                </span>
              </div>
              <span className="text-xs font-bold text-[#A1CF7F] border-l border-emerald-700 pl-3">
                Secretariat Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchSupabaseDelegates}
                disabled={loading}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                title="Refresh Supabase Data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={onReturnToPublic}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Website</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600/80 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                title="Logout Secretariat Portal"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">

        {/* Nav Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('delegates')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'delegates'
              ? 'bg-[#17472B] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Delegates Database ({delegates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'sessions'
              ? 'bg-[#17472B] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Scheduled Sessions CMS ({sessionsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'tracks'
              ? 'bg-[#17472B] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            <Layers className="w-4 h-4" />
            <span>Academic Tracks CMS ({tracksData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('brochures')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'brochures'
              ? 'bg-[#17472B] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            <FileText className="w-4 h-4" />
            <span>Brochure Poster CMS ({brochuresData.length})</span>
          </button>
        </div>

        {/* TAB 1: Delegates Table */}
        {activeTab === 'delegates' && (
          <div className="space-y-6">

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, pass ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs font-medium outline-none"
                  />
                </div>

                <select
                  value={filterStudyRange}
                  onChange={(e) => setFilterStudyRange(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold bg-white outline-none"
                >
                  <option value="All">All Study Ranges</option>
                  <option value="Mukhtasar">Mukhtasar</option>
                  <option value="Muthawwal">Muthawwal</option>
                </select>
              </div>

              <button
                onClick={handleExportCSV}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Database CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                      <th className="py-3.5 px-4">Pass ID</th>
                      <th className="py-3.5 px-4">Name & Age</th>
                      <th className="py-3.5 px-4">Phone & WhatsApp</th>
                      <th className="py-3.5 px-4">Study Range</th>
                      <th className="py-3.5 px-4">Payment (₹200)</th>
                      <th className="py-3.5 px-4">Status & Campus / Job</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-medium">
                    {filteredDelegates.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#17472B]">
                          {d.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900">{d.fullName} ({d.age} yrs)</div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[150px]">{d.address}</div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          <div>Ph: {d.phone}</div>
                          <div className="text-[11px] text-emerald-700 font-bold">WA: {d.whatsapp}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#17472B]">
                          <div>{d.studyRange}</div>
                          <div className="text-[11px] text-gray-500 font-normal">{d.birudam || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase mb-1">
                            Paid ₹200 ✓
                          </span>
                          {d.paymentScreenshot ? (
                            <div className="flex items-center gap-2 mt-1">
                              <img 
                                src={d.paymentScreenshot} 
                                alt={`Receipt thumbnail for ${d.fullName}`}
                                className="w-9 h-9 rounded-lg border-2 border-emerald-400 object-cover cursor-pointer shadow-xs hover:scale-110 transition-transform shrink-0"
                                onClick={() => setViewReceiptModal(d)}
                                title="Click to view full payment receipt screenshot"
                              />
                              <button
                                onClick={() => setViewReceiptModal(d)}
                                className="text-[11px] text-[#17472B] hover:underline font-extrabold flex items-center gap-1"
                              >
                                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                                <span>View Full Screenshot</span>
                              </button>
                            </div>
                          ) : (
                            <div className="text-[10px] text-gray-400 font-medium italic">No image attached</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-bold text-[10px] uppercase mb-0.5">
                            {d.status}
                          </span>
                          <div className="text-[11px] text-gray-600 truncate max-w-[140px]">
                            {d.status === 'Student' ? d.campus : d.position}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteDelegate(d.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                            title="Delete Delegate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredDelegates.length === 0 && (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-gray-500 font-semibold">
                          No delegates registered yet. Real registrations submitted on the website sync here automatically via Supabase!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Scheduled Sessions CMS (Admin Only Control) */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">

            {/* Header Control Toolbar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#17472B] flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-700" />
                  <span>Scheduled Summit Sessions Management</span>
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Admin Only Control: Add, edit, or delete scheduled speakers and session topics displayed on the public website.
                </p>
              </div>

              <button
                onClick={handleOpenAddSession}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Scheduled Session</span>
              </button>
            </div>

            {/* Grid of Scheduled Speaker Sessions */}
            <div className="grid grid-cols-1 gap-6">
              {sessionsData.map((session) => (
                <div 
                  key={session.id} 
                  className="bg-[#123C2C] text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border-4 border-[#1D4E3B]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Speaker Photo Box matching user screenshot design */}
                    <div className="md:col-span-4 flex justify-center">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10 shrink-0">
                        <img 
                          src={session.photo || '/zack_wilson.jpg'} 
                          alt={session.speakerName}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/zack_wilson.jpg'; }}
                        />
                      </div>
                    </div>

                    {/* Speaker Details */}
                    <div className="md:col-span-8 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-2xl sm:text-3xl font-black text-white">
                              {session.speakerName}
                            </h4>
                            <span className="text-xl sm:text-2xl">{session.flag}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-1">
                            {session.role}
                          </p>
                          {session.affiliation && (
                            <p className="text-[11px] text-gray-300 italic font-mono mt-0.5">
                              {session.affiliation}
                            </p>
                          )}
                        </div>

                        {/* Admin Control Action Buttons */}
                        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
                          <button
                            onClick={() => handleOpenEditSession(session)}
                            className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                            title="Edit Session Details"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSession(session.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                            title="Delete Session"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>

                      {/* HELPING WITH / Category Tags */}
                      {session.tags && session.tags.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block">
                            HELPING WITH:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {session.tags.map((tag, idx) => (
                              <span 
                                key={idx} 
                                className="px-3.5 py-1 rounded-full text-xs font-bold bg-white text-[#123C2C] shadow-sm border border-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Session Abstract */}
                      {session.abstract && (
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                            SESSION ABSTRACT:
                          </span>
                          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                            {session.abstract}
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              ))}

              {sessionsData.length === 0 && (
                <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-800">No Scheduled Sessions Added</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Click the "Add New Scheduled Session" button above to add speaker sessions to the summit schedule.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: Academic Tracks CMS (Admin Only Control) */}
        {activeTab === 'tracks' && (
          <div className="space-y-6">

            {/* Header Control Toolbar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#17472B] flex items-center gap-2">
                  <Layers className="w-6 h-6 text-emerald-700" />
                  <span>Summit Academic Tracks Management</span>
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Admin Only Control: Add, edit, or delete summit academic tracks displayed on the public website.
                </p>
              </div>

              <button
                onClick={handleOpenAddTrack}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Academic Track</span>
              </button>
            </div>

            {/* Grid of Academic Tracks matching user screenshot design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tracksData.map((track) => {
                const topicsList = Array.isArray(track.topics) ? track.topics : (track.topics ? track.topics.split(',') : []);
                return (
                  <div 
                    key={track.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col justify-between relative group hover:border-emerald-600 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold font-mono tracking-widest px-3 py-1 rounded-md bg-[#123C2C] text-white uppercase">
                          {track.code}
                        </span>
                        <span className="text-xs font-semibold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                          {track.speakersCount}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                          {track.title}
                        </h4>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-gray-50 p-1 rounded-xl border border-gray-200">
                          <button
                            onClick={() => handleOpenEditTrack(track)}
                            className="p-1.5 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-all"
                            title="Edit Track Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrack(track.id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-all"
                            title="Delete Track"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {track.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {topicsList.map((t, topicIdx) => (
                          <span key={topicIdx} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200">
                            #{t.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="w-full py-2.5 px-4 rounded-xl border-2 border-[#123C2C] text-[#123C2C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-emerald-50/50">
                        <span>Register for {track.code}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {tracksData.length === 0 && (
                <div className="md:col-span-2 bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
                  <Layers className="w-12 h-12 text-gray-400 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-800">No Academic Tracks Added</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Click the "Add New Academic Track" button above to publish tracks on the website.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: Official Brochure Poster CMS */}
        {activeTab === 'brochures' && (
          <div className="space-y-6">

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#17472B]">
                  Official Summit Brochure Posters
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Upload and manage official summit posters displayed on the public website and brochure modal.
                </p>
              </div>

              <button
                onClick={handleOpenAddBrochure}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Brochure Poster</span>
              </button>
            </div>

            {/* Brochure Posters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brochuresData.map((brochure) => (
                <div key={brochure.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  
                  {/* Poster Image Container */}
                  <div className="relative bg-gray-100 min-h-[220px] flex items-center justify-center overflow-hidden group">
                    {brochure.posterImage ? (
                      <img 
                        src={brochure.posterImage} 
                        alt={brochure.title}
                        className="w-full h-auto max-h-[320px] object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="p-8 text-center space-y-2">
                        <ImageIcon className="w-12 h-12 text-emerald-700/40 mx-auto" />
                        <span className="text-xs font-bold text-gray-400 block">No Poster Image Attached</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-[#17472B] leading-snug">
                        {brochure.title}
                      </h4>
                      {brochure.subtitle && (
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {brochure.subtitle}
                        </p>
                      )}
                      <div className="mt-2 text-[11px] text-gray-600 font-semibold space-y-0.5">
                        <div>📅 {brochure.date}</div>
                        <div>📍 {brochure.venue}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenEditBrochure(brochure)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Poster</span>
                      </button>

                      <button
                        onClick={() => handleDeleteBrochure(brochure.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="Delete Brochure Poster"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}

              {brochuresData.length === 0 && (
                <div className="md:col-span-3 bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-800">No Brochure Posters Added</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Click the "Upload New Brochure Poster" button above to add summit posters.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Payment Receipt Screenshot Modal for Secretariat Verification */}
      {viewReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setViewReceiptModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">
                  Payment Receipt Verification
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Delegate: <strong>{viewReceiptModal.fullName}</strong> ({viewReceiptModal.id}) • Fee: <strong>₹200</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-center">
              {viewReceiptModal.paymentScreenshot ? (
                <img 
                  src={viewReceiptModal.paymentScreenshot} 
                  alt={`Payment Screenshot for ${viewReceiptModal.fullName}`}
                  className="max-h-[60vh] w-auto mx-auto rounded-xl object-contain shadow-md"
                />
              ) : (
                <div className="py-12 text-gray-400 text-sm font-semibold">
                  No payment screenshot uploaded for this delegate.
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setViewReceiptModal(null)}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Scheduled Session Form Modal */}
      {sessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[92vh] overflow-y-auto no-scrollbar">
            
            <button
              onClick={() => setSessionModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2.5 bg-[#17472B] text-white rounded-2xl shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-xl text-[#17472B]">
                  {editingSession ? 'Edit Scheduled Session' : 'Add New Scheduled Session'}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Secretariat Admin Control • {editingSession ? 'Update existing session details' : 'Publish new speaker session'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Speaker Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Zack Wilson"
                    value={sessionForm.speakerName}
                    onChange={(e) => setSessionForm({ ...sessionForm, speakerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Flag Emoji *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 🇬🇧"
                    value={sessionForm.flag}
                    onChange={(e) => setSessionForm({ ...sessionForm, flag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B] text-center text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Speaker Role / Designation *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Senior Product Designer at Meta"
                  value={sessionForm.role}
                  onChange={(e) => setSessionForm({ ...sessionForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Institution / Affiliation
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Lead Researcher in AI Fatwa Limits & UX Guardrails"
                  value={sessionForm.affiliation}
                  onChange={(e) => setSessionForm({ ...sessionForm, affiliation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Speaker Photo (Upload Image File or Enter URL) *
                </label>
                
                <div className="space-y-2">
                  {/* File Upload Button */}
                  <div className="relative border-2 border-dashed border-emerald-600/40 rounded-xl p-3 bg-emerald-50/40 hover:bg-emerald-50 text-center cursor-pointer transition-all">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleSpeakerPhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#17472B]">
                      <Upload className="w-4 h-4 text-emerald-700" />
                      <span>Click to Upload Speaker Image File</span>
                    </div>
                  </div>

                  {/* Manual URL Input & Live Thumbnail Preview */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      required
                      placeholder="Or enter photo URL: /zack_wilson.jpg or https://..."
                      value={sessionForm.photo}
                      onChange={(e) => setSessionForm({ ...sessionForm, photo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                    />

                    {sessionForm.photo && (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100 shadow-sm" title="Speaker photo preview">
                        <img 
                          src={sessionForm.photo} 
                          alt="Speaker Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/zack_wilson.jpg'; }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Helping With / Category Tags (comma separated) *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. UX/UI design, Product design, Copywriting"
                  value={sessionForm.tags}
                  onChange={(e) => setSessionForm({ ...sessionForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Speaker Biography
                </label>
                <textarea 
                  rows="2"
                  placeholder="Short speaker biography..."
                  value={sessionForm.bio}
                  onChange={(e) => setSessionForm({ ...sessionForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Session Abstract / Description *
                </label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Detailed abstract of the scheduled session topic..."
                  value={sessionForm.abstract}
                  onChange={(e) => setSessionForm({ ...sessionForm, abstract: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium outline-none focus:border-[#17472B]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSessionModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#17472B] hover:bg-[#20603B] shadow"
                >
                  {editingSession ? 'Save Session Changes' : 'Publish Scheduled Session'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Add / Edit Academic Track Form Modal */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[92vh] overflow-y-auto no-scrollbar">
            
            <button
              onClick={() => setTrackModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2.5 bg-[#17472B] text-white rounded-2xl shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-xl text-[#17472B]">
                  {editingTrack ? 'Edit Academic Track' : 'Add New Academic Track'}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Secretariat Admin Control • {editingTrack ? 'Update existing curriculum track' : 'Publish new summit academic track'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveTrack} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Track Code *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. TRACK 01"
                    value={trackForm.code}
                    onChange={(e) => setTrackForm({ ...trackForm, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Track Title *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Decentralized Crypto Finance & Smart Contracts"
                    value={trackForm.title}
                    onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Session Count Badge *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 4 Keynotes, 5 Sessions, 3 Panels"
                  value={trackForm.speakersCount}
                  onChange={(e) => setTrackForm({ ...trackForm, speakersCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Track Description *
                </label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Detailed description of the academic domain..."
                  value={trackForm.description}
                  onChange={(e) => setTrackForm({ ...trackForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Hashtags / Topics (comma separated) *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. DeFi Yield Farming, Algorithmic Stablecoins, Smart Contract Gharar"
                  value={trackForm.topics}
                  onChange={(e) => setTrackForm({ ...trackForm, topics: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setTrackModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#17472B] hover:bg-[#20603B] shadow"
                >
                  {editingTrack ? 'Save Track Changes' : 'Publish Academic Track'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Upload / Edit Brochure Poster Modal */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[92vh] overflow-y-auto no-scrollbar">
            
            <button
              onClick={() => setBrochureModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-3 bg-[#17472B] text-white rounded-2xl shadow-sm">
                <ImageIcon className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-[#17472B]">
                  {editingBrochure ? 'Edit Brochure Poster' : 'Upload Brochure Poster'}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Upload official summit poster image and details
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBrochure} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Poster Title *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. conFiqh 2026 Official Summit Poster"
                  value={brochureForm.title}
                  onChange={(e) => setBrochureForm({ ...brochureForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Subtitle / Edition
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 1st Edition • Annual Kerala Fiqh Summit"
                  value={brochureForm.subtitle}
                  onChange={(e) => setBrochureForm({ ...brochureForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                />
              </div>

              {/* Poster Image File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                  Poster Image (Upload Image File or Enter URL) *
                </label>
                
                <div className="space-y-2">
                  <div className="relative border-2 border-dashed border-emerald-600/40 rounded-xl p-3 bg-emerald-50/40 hover:bg-emerald-50 text-center cursor-pointer transition-all">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleBrochurePosterUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center justify-center gap-2 text-[#17472B]">
                      <Upload className="w-4 h-4" />
                      <span className="text-xs font-extrabold">Choose Poster Image File (PNG, JPG, WEBP)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Or enter image URL: https://..."
                      value={brochureForm.posterImage}
                      onChange={(e) => setBrochureForm({ ...brochureForm, posterImage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                    />

                    {brochureForm.posterImage && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100 shadow-sm" title="Poster preview">
                        <img 
                          src={brochureForm.posterImage} 
                          alt="Poster Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Event Date
                  </label>
                  <input 
                    type="text"
                    placeholder="11–12 September 2026"
                    value={brochureForm.date}
                    onChange={(e) => setBrochureForm({ ...brochureForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#17472B] tracking-wider mb-1">
                    Venue
                  </label>
                  <input 
                    type="text"
                    placeholder="Ahlussuffa Dars, Pinarayi"
                    value={brochureForm.venue}
                    onChange={(e) => setBrochureForm({ ...brochureForm, venue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold outline-none focus:border-[#17472B]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setBrochureModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#17472B] hover:bg-[#20603B] shadow cursor-pointer"
                >
                  {editingBrochure ? 'Save Poster Changes' : 'Publish Brochure Poster'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
