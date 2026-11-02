import React, { useState } from 'react';
import { Button, Input, Card, useToast } from '../../components';
import { ShieldAlert } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      addToast({ type: 'success', title: 'Login successful', message: 'Welcome back to NER-SHIELD' });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      addToast({ type: 'error', title: 'Authentication Failed', message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        {/* Only show logo on mobile, hidden on desktop since the left pane has it */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="mobile-only-logo">
          <ShieldAlert size={40} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>Welcome Back</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="admin@ner-shield.gov.in" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <div>
          <div className="page-header">
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-base)', marginBottom: '0.25rem', display: 'block' }}>Password</label>
            <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        <Button type="submit" variant="primary" isLoading={isLoading} style={{ width: '100%', marginTop: '0.5rem' }}>
          Sign In
        </Button>
      </form>
    </Card>
  );
};

export default Login;
