import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import { AuthContext } from './AuthContextValue.js';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error) {
        setProfile(data);
      } else {
        setProfile(null);
        console.error('Failed to load profile:', error.message);
      }
    };

    fetchProfile();
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error && error.message?.toLowerCase().includes("email not confirmed")) {
      return {
        data,
        error: {
          ...error,
          message: "Email belum dikonfirmasi. Silakan cek email dan klik tautan verifikasi.",
        },
      };
    }

    return { data, error };
  };

  const register = async (email, password, fullname) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          fullname,
        },
      },
    });
    setLoading(false);
    return { data, error };
  };

  const resetPassword = async (email) => {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      emailRedirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    return { data, error };
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        login,
        register,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
