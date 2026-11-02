import React, { useState } from 'react';
import { Button, Input, Card, useToast } from '../../components';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Passwords do not match.' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      addToast({ type: 'success', title: 'Password Reset', message: 'Your password has been successfully changed.' });
      navigate('/login');
    }, 1500);
  };

  return (
    <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>Reset Password</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input 
          label="New Password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          minLength={8}
        />
        
        <Input 
          label="Confirm New Password" 
          type="password" 
          placeholder="••••••••" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
          minLength={8}
        />
        
        <Button type="submit" variant="primary" isLoading={isLoading} style={{ width: '100%' }}>
          Update Password
        </Button>
      </form>
    </Card>
  );
};

export default ResetPassword;
