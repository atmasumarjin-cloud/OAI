/**
 * OLIMPIADE ANAK INDONESIA
 * Supported by: YAYASAN BESARRASA BAGI BANGSA
 * Enterprise & Luxury Grade Full-Stack Application
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationForm } from './components/RegistrationForm';
import { LandingSections } from './components/LandingSections';
import { StudentPortal } from './components/StudentPortal';
import { CBTExamRoom } from './components/CBTExamRoom';
import { SocialConfirmationModal } from './components/SocialConfirmationModal';
import { CertificateModal } from './components/CertificateModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AIConsultantDrawer } from './components/AIConsultantDrawer';
import { Footer } from './components/Footer';
import { ApiService, Participant, SystemSettings } from './services/apiClient';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'portal' | 'exam' | 'admin'>('landing');
  const [activeStudent, setActiveStudent] = useState<Participant | null>(null);
  const [activeExamType, setActiveExamType] = useState<'simulasi' | 'penyisihan' | 'final'>('simulasi');
  const [activeExamSubject, setActiveExamSubject] = useState<string>('Matematika');
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  // Modals
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certExamType, setCertExamType] = useState<'simulasi' | 'penyisihan' | 'final'>('penyisihan');
  const [certSubject, setCertSubject] = useState<string>('Matematika');

  // Initialize data & session
  useEffect(() => {
    const init = async () => {
      // Restore Admin Session if previously logged in
      const adminLogged = localStorage.getItem('oai_admin_logged_in') === 'true';
      const hash = window.location.hash;
      if (adminLogged) {
        setCurrentView('admin');
      } else if (hash === '#admin') {
        setShowAdminLoginModal(true);
      }

      const student = ApiService.getActiveStudent();
      if (student) setActiveStudent(student);

      const sysSettings = await ApiService.getSettings();
      setSettings(sysSettings);

      // Dynamic Meta Pixel injection (Poin 1)
      if (sysSettings?.metaPixelScript) {
        const container = document.getElementById('meta-pixel-container');
        if (container && !container.hasChildNodes()) {
          const scriptEl = document.createElement('div');
          scriptEl.innerHTML = sysSettings.metaPixelScript;
          container.appendChild(scriptEl);
        }
      }
    };
    init();
  }, []);

  // Handle successful registration
  const handleRegistrationSuccess = (newStudent: Participant) => {
    setActiveStudent(newStudent);
    ApiService.setActiveStudent(newStudent);
    setShowSocialModal(true);
  };

  // Handle start CBT exam (supports multi-mapel)
  const handleStartExam = (type: 'simulasi' | 'penyisihan' | 'final', subject?: string) => {
    if (!activeStudent) {
      setCurrentView('portal');
      return;
    }
    const targetSub = subject || (activeStudent.subjects && activeStudent.subjects.length > 0 ? activeStudent.subjects[0] : activeStudent.subject);
    setActiveExamSubject(targetSub);
    setActiveExamType(type);
    setCurrentView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle exam finished
  const handleExamFinished = (updatedStudent: Participant, score: number) => {
    setActiveStudent(updatedStudent);
    ApiService.setActiveStudent(updatedStudent);
  };

  // Handle view certificate (supports multi-mapel)
  const handleViewCertificate = (type: 'simulasi' | 'penyisihan' | 'final', subject?: string) => {
    setCertExamType(type);
    setCertSubject(subject || (activeStudent?.subjects?.[0] ?? activeStudent?.subject ?? 'Matematika'));
    setShowCertificateModal(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Admin View
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onLogout={() => {
          localStorage.removeItem('oai_admin_logged_in');
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Active CBT Exam Room View
  if (currentView === 'exam' && activeStudent) {
    return (
      <CBTExamRoom
        student={activeStudent}
        examType={activeExamType}
        subject={activeExamSubject}
        settings={settings}
        onExamFinished={handleExamFinished}
        onExit={() => {
          setCurrentView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-amber-400 selection:text-slate-900">
      {/* Global Navigation Header */}
      <Navbar
        activeStudent={activeStudent}
        onOpenRegister={() => {
          setCurrentView('landing');
          setTimeout(() => {
            const el = document.getElementById('pendaftaran');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenPortal={() => {
          setCurrentView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setShowAdminLoginModal(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Dynamic View Body */}
      {currentView === 'portal' ? (
        <StudentPortal
          student={activeStudent}
          settings={settings}
          onSelectStudent={student => {
            setActiveStudent(student);
            ApiService.setActiveStudent(student);
          }}
          onStartExam={handleStartExam}
          onViewCertificate={handleViewCertificate}
          onLogout={() => {
            setActiveStudent(null);
            ApiService.setActiveStudent(null);
          }}
        />
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <div id="beranda">
            <HeroSection
              settings={settings}
              onOpenRegister={() => {
                const el = document.getElementById('pendaftaran');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSimulation={() => {
                if (activeStudent) {
                  handleStartExam('simulasi');
                } else {
                  setCurrentView('portal');
                }
              }}
            />
          </div>

          {/* Registration Section */}
          <RegistrationForm onSuccess={handleRegistrationSuccess} />

          {/* Product Grid, Categories, Alur, FAQ */}
          <LandingSections
            settings={settings}
            onOpenRegister={() => {
              const el = document.getElementById('pendaftaran');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenSimulation={() => {
              if (activeStudent) {
                handleStartExam('simulasi');
              } else {
                setCurrentView('portal');
              }
            }}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setShowAdminLoginModal(true)}
        onOpenPortal={() => {
          setCurrentView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRegister={() => {
          setCurrentView('landing');
          setTimeout(() => {
            const el = document.getElementById('pendaftaran');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Floating AI Educational Consultant */}
      <AIConsultantDrawer />

      {/* MODAL 1: Konfirmasi WA & Follow Sosmed */}
      {showSocialModal && activeStudent && (
        <SocialConfirmationModal
          student={activeStudent}
          onProceedToSimulation={() => {
            setShowSocialModal(false);
            handleStartExam('simulasi');
          }}
          onClose={() => setShowSocialModal(false)}
        />
      )}

      {/* MODAL 2: E-Sertifikat Digital Resmi */}
      {showCertificateModal && activeStudent && (
        <CertificateModal
          student={activeStudent}
          examType={certExamType}
          subject={certSubject}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* MODAL 3: Login Admin (Kredensial: user: admin, password: ILOVEYU123) */}
      {showAdminLoginModal && (
        <AdminLoginModal
          onSuccess={() => {
            localStorage.setItem('oai_admin_logged_in', 'true');
            setShowAdminLoginModal(false);
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onClose={() => setShowAdminLoginModal(false)}
        />
      )}
    </div>
  );
}
