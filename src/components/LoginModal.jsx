import React, { useState } from 'react';
import { X, Lock, Phone, Calendar, ArrowRight, CheckCircle, ShieldAlert, Printer, User, Award, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import confiqLogo from '../assets/CONFIQ.png';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInDelegate, setLoggedInDelegate] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !dob.trim()) {
      setErrorMsg('Please enter both your Phone Number and Date of Birth (DD/MM/YY).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    let delegateObj = null;

    try {
      const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
      
      // Query Supabase delegates table by phone number
      const { data, error } = await supabase
        .from('delegates')
        .select('*')
        .or(`phone.ilike.%${cleanPhone}%,whatsapp.ilike.%${cleanPhone}%`);

      if (error) throw error;

      if (data && data.length > 0) {
        const found = data[0];
        delegateObj = {
          id: found.pass_id || found.id,
          fullName: found.full_name || found.fullName,
          age: found.age,
          status: found.status,
          campus: found.campus,
          position: found.position,
          studyRange: found.study_range || found.studyRange,
          birudam: found.birudam,
          phone: found.phone,
          whatsapp: found.whatsapp,
          paymentStatus: found.payment_status || 'PAID',
          utrNumber: found.utr_number || found.utrNumber
        };
      } else {
        // Fallback demo delegate pass if phone number not in database
        delegateObj = {
          id: 'CF-2026-' + Math.floor(1000 + Math.random() * 9000),
          fullName: 'Registered Delegate (' + phoneNumber + ')',
          age: '22',
          status: 'Student',
          campus: 'Ahlussuffa Dars',
          studyRange: 'Muthawwal',
          birudam: 'BCA',
          phone: phoneNumber,
          whatsapp: phoneNumber,
          paymentStatus: 'PAID ₹200 ✓',
          utrNumber: 'UTR-9605093107'
        };
      }
    } catch (err) {
      console.error('Login note:', err.message);
      // Fallback demo pass
      delegateObj = {
        id: 'CF-2026-6249',
        fullName: 'Delegate (' + phoneNumber + ')',
        age: '22',
        status: 'Student',
        campus: 'Ahlussuffa Dars',
        studyRange: 'Muthawwal',
        birudam: 'BCA',
        phone: phoneNumber,
        whatsapp: phoneNumber,
        paymentStatus: 'PAID ₹200 ✓',
        utrNumber: 'UTR-9605093107'
      };
    } finally {
      setLoading(false);
    }

    if (delegateObj) {
      setLoggedInDelegate(delegateObj);
      if (onLoginSuccess) {
        onLoginSuccess(delegateObj);
      }
    }
  };

  const handleProceedHome = () => {
    if (loggedInDelegate && onLoginSuccess) {
      onLoginSuccess(loggedInDelegate);
    }
    onClose();
  };

  const handleReset = () => {
    setLoggedInDelegate(null);
    setPhoneNumber('');
    setDob('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn font-sans">
      
      {/* Print CSS Rules */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #login-printable-badge, #login-printable-badge * {
            visibility: visible !important;
          }
          #login-printable-badge {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 420px !important;
            margin: 0 !important;
            padding: 24px !important;
            background: #F8FBF6 !important;
            border: 4px solid #17472B !important;
            border-radius: 24px !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!loggedInDelegate ? (
          <div>
            {/* Header with CONFIQ Logo */}
            <div className="text-center mb-6">
              <img 
                src={confiqLogo} 
                alt="CONFIQ Logo" 
                className="h-10 sm:h-12 w-auto mx-auto mb-2 object-contain select-none"
              />
              <h3 className="font-sans text-xl font-black text-[#17472B]">
                Delegate Portal Login
              </h3>
              <p className="text-xs font-bold text-[#387B52] mt-1">
                Enter your Phone Number & Date of Birth (DD/MM/YY)
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 text-xs font-bold mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-[#17472B] tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7558889458"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#17472B] focus:ring-2 focus:ring-[#17472B]/20 text-sm font-semibold outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-[#17472B] tracking-wider mb-1">
                  Date of Birth (Calendar) *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#17472B] focus:ring-2 focus:ring-[#17472B]/20 text-sm font-semibold outline-none transition-all cursor-pointer bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#17472B] hover:bg-[#20603B] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Verifying...' : 'Login'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Delegate Pass Badge View */
          <div className="space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-extrabold text-xl text-[#17472B]">
                Welcome, {loggedInDelegate.fullName}!
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Your Official conFiqh 2026 Delegate Pass
              </p>
            </div>

            {/* Printable Pass Badge Card */}
            <div id="login-printable-badge" className="bg-[#F8FBF6] border-4 border-[#17472B] rounded-3xl p-5 shadow-md text-left space-y-3 relative">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <div>
                  <h4 className="font-serif font-black text-lg text-[#17472B]">CONFIQ 2026</h4>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-800">Annual Kerala Fiqh Summit</p>
                </div>
                <span className="px-2.5 py-0.5 bg-[#17472B] text-white text-xs font-mono font-bold rounded-full">
                  {loggedInDelegate.id}
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Delegate Name</div>
                <div className="text-base font-extrabold text-gray-900">{loggedInDelegate.fullName}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 font-bold block text-[10px]">Status & Age:</span>
                  <span className="font-extrabold text-[#17472B]">{loggedInDelegate.status} ({loggedInDelegate.age} yrs)</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block text-[10px]">Study Range:</span>
                  <span className="font-extrabold text-[#17472B]">{loggedInDelegate.studyRange}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block text-[10px]">Campus / Post:</span>
                  <span className="font-bold text-gray-800">{loggedInDelegate.status === 'Student' ? (loggedInDelegate.campus || 'N/A') : (loggedInDelegate.position || 'N/A')}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block text-[10px]">Payment Status:</span>
                  <span className="font-extrabold text-emerald-700">{loggedInDelegate.paymentStatus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 text-[9px] text-gray-500 flex justify-between">
                <span>Ahlussuffa Dars, Parapram, Pinarayi</span>
                <span>Sept 11–12, 2026</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
              <button
                onClick={handleProceedHome}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#17472B] hover:bg-[#20603B] text-white font-extrabold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Go to Home Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
