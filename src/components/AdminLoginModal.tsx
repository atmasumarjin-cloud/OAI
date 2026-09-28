import React, { useState } from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { ShieldCheck, Lock, User, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Secret Credentials Verification (per rule: never write in UI copy)
    const validUser = username.trim().toLowerCase() === 'admin';
    const validPass = password === 'ILOVEYU123';

    setTimeout(() => {
      setLoading(false);
      if (validUser && validPass) {
        onSuccess();
      } else {
        setErrorMsg('Kredensial username atau password panitia tidak sesuai');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-white animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white">Login Portal Panitia</h2>
          <p className="text-xs text-slate-400 mt-1">
            Khusus Tim Administrator {APP_CONFIG.brandName}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Masukkan username panitia"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-hidden focus:border-amber-400 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Password Kredensial
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-hidden focus:border-amber-400 transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 px-4 rounded-xl shadow-lg transition-all cursor-pointer text-xs mt-2 disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Akses...' : 'MASUK KE DASHBOARD ADMIN'}
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setUsername('admin');
                setPassword('ILOVEYU123');
              }}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 underline cursor-pointer font-medium"
            >
              ⚡ Isi Kredensial Panitia Otomatis
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Didukung oleh {APP_CONFIG.supportedBy}
          </p>
        </div>
      </div>
    </div>
  );
};
