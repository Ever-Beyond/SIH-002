import React, { useState } from 'react';
import { Button, Input, Card, EmptyState } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { ArrowLeft, MailCheck } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <EmptyState 
          icon={<MailCheck size={48} color="var(--color-success)" />}
          title="Check your email" 
          description={`We've sent a password reset link to ${email}.`} 
        />
        <Button variant="outline" onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '1.5rem' }}>
          Return to Login
        </Button>
      </Card>
    );
  }

  return (
    <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
      <button 
        onClick={() => navigate('/login')} 
        style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '2rem', fontSize: '0.875rem' }}
      >
        <ArrowLeft size={16} /> Back to login
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>Forgot Password</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="admin@ner-shield.gov.in" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <Button type="submit" variant="primary" isLoading={isLoading} style={{ width: '100%' }}>
          Send Reset Link
        </Button>
      </form>
    </Card>
  );
};

export default ForgotPassword;
