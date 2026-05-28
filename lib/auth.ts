import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Extend the AdapterUser type to include plan
declare module "next-auth/adapters" {
  interface AdapterUser {
    plan?: string;
  }
}

interface SessionUser {
  id: string;
  email?: string;
  name?: string;
}

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true, // TODO: remove after fixing OAuth callback error
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async signIn({ user }) {
      console.log('SIGNING IN USER:', user?.email);
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as SessionUser).id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl + '/dashboard';
    },
  },
};
