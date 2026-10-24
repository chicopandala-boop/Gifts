import React, { useState } from 'react';
import { FolderGit2, RefreshCw, CheckCircle2, AlertCircle, LogOut, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { User } from 'firebase/auth';
import { DEFAULT_DRIVE_FOLDER_ID } from '../services/drive';

interface GoogleDriveSyncProps {
  user: User | null;
  token: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  onSync: (folderInput: string) => Promise<void>;
  isSyncing: boolean;
  driveProductsCount: number;
  lastSyncedAt: Date | null;
  syncError: string | null;
  onOpenAddImagesModal: () => void;
}

export const GoogleDriveSync: React.FC<GoogleDriveSyncProps> = ({
  user,
  token,
  onLogin,
  onLogout,
  onSync,
  isSyncing,
  driveProductsCount,
  lastSyncedAt,
  syncError,
  onOpenAddImagesModal
}) => {
  const [folderInput, setFolderInput] = useState<string>(
    `https://drive.google.com/drive/folders/${DEFAULT_DRIVE_FOLDER_ID}?usp=drive_link`
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginClick = async () => {
    setIsLoggingIn(true);
    try {
      await onLogin();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSyncClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token && !user) {
      await handleLoginClick();
      return;
    }
    await onSync(folderInput);
  };

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-900 text-white p-6 shadow-md border border-emerald-700/50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Header & Context */}
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Google Drive Integration
            </span>
            {driveProductsCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-emerald-400 text-emerald-950 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {driveProductsCount} Images in Catalogue
              </span>
            )}
          </div>

          <h3 className="text-xl font-black tracking-tight text-white font-display flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>Google Drive Collection Folder</span>
          </h3>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Connected to Drive folder <span className="font-mono text-emerald-300 font-semibold">{DEFAULT_DRIVE_FOLDER_ID}</span>. With user permission, folder images are imported and displayed directly as live sports products in your catalogue.
          </p>

          {syncError && (
            <div className="mt-2 p-3 bg-red-900/60 border border-red-500/50 rounded-lg text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-100">Folder Sync Error:</strong>
                <span>{syncError}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Action Controls */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {!user || !token ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Official Google Sign-In Button */}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  disabled={isLoggingIn}
                  className="gsi-material-button relative inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg bg-white text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 font-medium text-xs shadow-md transition-all border border-zinc-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-label="Sign in with Google to load images from Google Drive"
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-4 h-4 block"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-zinc-900 tracking-wide text-xs">
                    {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onOpenAddImagesModal}
                  className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>+ Place Images</span>
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200/90 pt-1">
                <span>Syncs folder <span className="font-mono text-emerald-300 font-semibold">{DEFAULT_DRIVE_FOLDER_ID}</span></span>
                <a
                  href={`https://drive.google.com/drive/folders/${DEFAULT_DRIVE_FOLDER_ID}?usp=sharing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline underline-offset-2 ml-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View in Drive</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full border border-emerald-400"
                  />
                )}
                <div className="text-left">
                  <span className="text-xs font-bold text-white block">
                    {user.displayName || user.email}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out of Google"
                  className="ml-2 p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-700/50 rounded-md transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSync(folderInput)}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-70"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Importing from Drive...' : 'Sync Drive Folder'}</span>
                </button>

                <a
                  href={folderInput}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-800 rounded-lg border border-emerald-700/60 transition-colors"
                  title="Open folder in Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {lastSyncedAt && (
                <span className="text-[10px] text-emerald-300/80 font-mono">
                  Last updated: {lastSyncedAt.toLocaleTimeString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
