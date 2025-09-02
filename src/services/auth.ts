import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export interface AuthResult {
  token: string;
  isNewUser: boolean;
}

export interface AuthError {
  type: 'user_exists' | 'invalid_password' | 'registration_failed' | 'unknown';
  message: string;
}

// Check if user exists by attempting to sign in with a dummy password
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    // Try to sign in with a dummy password to check if user exists
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy-password-check'
    });
    
    // If error message indicates invalid credentials, user exists but password is wrong
    if (error?.message?.toLowerCase().includes('invalid login credentials')) {
      return true;
    }
    
    // If no error or different error, assume user doesn't exist
    return false;
  } catch {
    return false;
  }
}

// Authenticate existing user with password
export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw {
        type: 'invalid_password',
        message: 'Invalid email or password'
      } as AuthError;
    }
    
    if (!data.session?.access_token) {
      throw {
        type: 'unknown',
        message: 'Authentication failed'
      } as AuthError;
    }
    
    return {
      token: data.session.access_token,
      isNewUser: false
    };
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }
    throw {
      type: 'unknown',
      message: 'Authentication failed'
    } as AuthError;
  }
}

// Register new user
export async function registerUser(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      throw {
        type: 'registration_failed',
        message: error.message || 'Registration failed'
      } as AuthError;
    }
    
    // If email confirmation is disabled, session should be available immediately
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session?.access_token) {
      throw {
        type: 'registration_failed',
        message: 'Registration completed but session not available'
      } as AuthError;
    }
    
    return {
      token: sessionData.session.access_token,
      isNewUser: true
    };
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }
    throw {
      type: 'registration_failed',
      message: 'Registration failed'
    } as AuthError;
  }
}

// Main authentication flow - checks if user exists and returns appropriate action
export async function initiateAuth(email: string): Promise<{ userExists: boolean }> {
  const userExists = await checkUserExists(email);
  return { userExists };
}

// Legacy function for backward compatibility (if needed)
export async function ensureUserSession(email: string): Promise<string> {
  const { data: s1 } = await supabase.auth.getSession();
  if (s1.session) return s1.session.access_token;

  const key = `cleanpro_pw_${email}`;
  let pw = localStorage.getItem(key) || crypto.randomUUID();

  // Try sign-in with saved/random password (works if user already created on this device)
  let { data: si, error: siErr } = await supabase.auth.signInWithPassword({ 
    email, 
    password: pw 
  });

  // If sign-in fails because user doesn't exist yet, create it
  if (siErr?.message?.toLowerCase().includes("invalid login credentials")) {
    const { data: su, error: suErr } = await supabase.auth.signUp({ 
      email, 
      password: pw 
    });
    if (suErr) throw suErr;
    // If confirmations OFF, session is ready immediately
    localStorage.setItem(key, pw);
    const { data: s2 } = await supabase.auth.getSession();
    return s2.session?.access_token!;
  }

  // Sign-in worked → persist password for future auto-login
  localStorage.setItem(key, pw);
  return si.session?.access_token!;
}