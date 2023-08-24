import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { stripe } from '@/lib/stripe';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      // When creating a user, create a customer for them in Stripe
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
        });

        // Update our prisma user with the stripe customer id
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }
    },
  },
  // Add stripeCustomerId to session
  callbacks: {
    async session({ session, token, user }) {
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
