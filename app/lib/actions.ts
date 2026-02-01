'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql2 } from '@/app/lib/db';

export type ReviewState = {
    errors?: {
        status?: string[];    
    };
    message?: string | null;
};

export type QuoteState = {
    errors?: {
        status?: string[];
    };
    message?: string | null;
}

const ReviewFormSchema = z.object({
    id: z.string(),
    status: z.enum(['pending', 'declined', 'approved'], {
        invalid_type_error: 'Please select an invoice status.'
    }),
    date: z.string(),
})

const QuoteFormSchema = z.object({
    id: z.string(),
    status: z.enum(['pending', 'completed'], {
        invalid_type_error: 'Please select a Quote status.'
    }),
    date: z.string(),
})
const UpdateReview = ReviewFormSchema.omit({id: true, date: true});
const UpdateQuoteStatus = QuoteFormSchema.omit({id: true, date: true});

export async function updateQuote(id: string, prevState: QuoteState, formData: FormData) {
    const validatedFields = UpdateQuoteStatus.safeParse({
        status: formData.get('status'),
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update Quote.'
        };
    }
    const { status } = validatedFields.data;
    try {
        await sql2 `UPDATE quote_submissions SET status = ${status} WHERE id = ${id}`;
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to update quote.'
        };
    }

    revalidatePath('/dashboard/quotes');
    redirect('/dashboard/quotes');
}

export async function updateReview(id:string, prevState: ReviewState, formData: FormData) {
    const validatedFields = UpdateReview.safeParse({
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Review.'
        };
    }
    const { status } = validatedFields.data;
    try {
        await sql2 `UPDATE customer_reviews SET status = ${status} WHERE id = ${id}`;
    } catch(error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to Update Review.'
        };
    }

    revalidatePath(`/dashboard/reviews`);
    redirect(`/dashboard/reviews`);
}


export async function deleteQuote(id:string) {
    await sql2`DELETE FROM quote_submissions WHERE id = ${id}`;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}