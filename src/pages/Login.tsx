import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const { loginWithEmail, loginWithGoogle, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);
    setLoading(true);

    const result = await loginWithEmail(email, password);
    
    if (result.success) {
      navigate('/app');
    } else {
      setError(result.error || 'Login failed');
      setNeedsVerification(result.needsVerification || false);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    const result = await loginWithGoogle();
    
    if (result.success) {
      navigate('/app');
    } else {
      setError(result.error || 'Google sign in failed');
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendingEmail(true);
    const result = await resendVerificationEmail();
    
    if (result.success) {
      setError('Verification email sent! Please check your inbox.');
    } else {
      setError(result.error || 'Failed to send email');
    }
    setResendingEmail(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="floating-emoji">👨‍🍳</div>
        <div className="floating-emoji">🍕</div>
        <div className="floating-emoji">🥗</div>
        <div className="floating-emoji">🍝</div>
        <div className="floating-emoji">🍰</div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">👨‍🍳</div>
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Login to continue cooking</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className={`auth-error ${needsVerification ? 'verification-notice' : ''}`}>
              {error}
              {needsVerification && (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResendEmail}
                  disabled={resendingEmail}
                >
                  {resendingEmail ? 'Sending...' : '📧 Resend Verification Email'}
                </button>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chef@example.com"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? '🔄 Logging in...' : '🔥 Login & Start Cooking'}
          </button>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link to="/signup" className="auth-link">
            Sign up here →
          </Link>
        </div>
      </div>
    </div>
  );
}
