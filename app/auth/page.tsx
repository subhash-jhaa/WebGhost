import { requireGuest } from '@/lib/auth-utils'
import React from 'react'
import AuthClient from '@/components/auth/AuthClient';
import { Navbar } from '@/components/landing/Navbar';

const Auth = async () => {
  // This will redirect authenticated users to /dashboard
  const session = await requireGuest();
  
  return (
    <>
      <Navbar session={session} />
      <AuthClient />
    </>
  );
}

export default Auth;