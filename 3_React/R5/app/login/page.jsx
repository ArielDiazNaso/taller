'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../hooks/useToast';

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();
  const toast = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Capturar errores de NextAuth via query params
  useEffect(() => {
    const err = searchParams.get('error');
    if (err) {
      const msgs = {
        OAuthSignin: 'Error al conectar con el proveedor OAuth.',
        OAuthCallback: 'Error de callback OAuth.',
        OAuthCreateAccount: 'Error al crear la cuenta OAuth.',
        Callback: 'Error en el callback de autenticación.',
        Default: 'Error de autenticación.',
        CredentialsSignin: 'Credenciales inválidas.',
      };
      setError(msgs[err] || msgs.Default);
    }
  }, [searchParams]);

  useEffect(() => {
    if (session) router.replace('/dashboard');
  }, [session, router]);

  const handleOAuth = async (provider) => {
    setLoading(provider);
    setError('');
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Completá todos los campos.');
      return;
    }

    setLoading('credentials');

    if (isRegister) {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!data.success) {
          setError(data.message);
          setLoading(null);
          return;
        }

        toast.success('¡Cuenta creada! Iniciando sesión...');
      } catch {
        setError('Error de conexión al registrar.');
        setLoading(null);
        return;
      }
    }

    // Login (también se ejecuta después de registro exitoso)
    const res = await signIn('credentials', {
      redirect: false,
      email: email.toLowerCase().trim(),
      password,
    });

    if (res?.error) {
      setError(isRegister ? 'Cuenta creada pero error al iniciar sesión. Intentá iniciar sesión manualmente.' : 'Email o contraseña incorrectos.');
      setLoading(null);
    } else if (res?.ok) {
      router.replace('/dashboard');
    }
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ color: 'var(--color-text)' }}>Cargando UserHub...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-layout ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <div className="auth-page">
        <div className="auth-card card">
            <div className="auth-logo" style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(180, 83, 9, 0.2))', width: '68px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '18px', margin: '0 auto 1rem', border: '1px solid rgba(212, 199, 181, 0.25)' }}>
              🏛️
            </div>
            <h1 className="auth-title" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>
              CAMPUS <span style={{ color: 'var(--color-primary)' }}>PORTAL</span>
            </h1>
            <p className="auth-subtitle" style={{ fontSize: '0.9rem' }}>
              {isRegister ? 'Creá tu credencial de acceso al campus' : 'Portal institucional de autenticación y usuarios'}
            </p>

          {error && (
            <div className="form-alert form-alert-error" role="alert" style={{ marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {isRegister && (
              <div className="form-field">
                <label className="form-label">Nombre</label>
                <input type="text" className="input-control" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} disabled={!!loading} />
              </div>
            )}
            <div className="form-field">
              <label className="form-label">Email</label>
              <input type="email" className="input-control" placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} disabled={!!loading} required />
            </div>
            <div className="form-field">
              <label className="form-label">Contraseña</label>
              <input type="password" className="input-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} disabled={!!loading} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={!!loading} style={{ marginTop: '0.25rem', padding: '0.75rem' }}>
              {loading === 'credentials' ? 'Procesando...' : isRegister ? '📝 Crear cuenta' : '🔑 Iniciar sesión'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-primary)' }}>
              {isRegister ? '¿Ya tenés cuenta? Iniciá sesión' : '¿No tenés cuenta? Registrate'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '0.75rem 0', gap: '0.75rem', color: 'var(--color-text-subtle)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.8rem' }}>o continuá con</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          </div>

          <div className="oauth-buttons">
            <button className="btn btn-oauth btn-google" onClick={() => handleOAuth('google')} disabled={!!loading} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {loading === 'google' ? 'Conectando...' : 'Google'}
            </button>
            <button className="btn btn-oauth btn-facebook" onClick={() => handleOAuth('facebook')} disabled={!!loading} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              {loading === 'facebook' ? 'Conectando...' : 'Facebook'}
            </button>
            <button className="btn btn-oauth btn-github" onClick={() => handleOAuth('github')} disabled={!!loading} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              {loading === 'github' ? 'Conectando...' : 'GitHub'}
            </button>
          </div>

          <p className="auth-legal">
            Al continuar, aceptás nuestros términos de uso y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Cargando...</h2></div>}>
      <LoginContent />
    </Suspense>
  );
}
