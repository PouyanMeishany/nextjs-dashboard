import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { sql, sql2 } from '@/app/lib/db';
import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL2!, { ssl: 'require'});

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql2<User[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    if(parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email);
                        if(!user) return null;
                        const passwordsMatch = await bcrypt.compare(password, user.password);

                        if (passwordsMatch) {
                            if (user.role !== 'admin') {
                                return null;
                            }
                            return user;
                        }
                    }
                    console.log('Invalid credentials');
                    return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;

        },
    },
});