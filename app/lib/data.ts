import {
  Quote,
  QuotesTable,
  QuoteForm,
  LatestQuote,
  ReviewForm,
  Reviews,
} from './definitions';
import { sql2 } from '@/app/lib/db';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
// const sql2 = postgres(process.env.POSTGRES_URL2!, { ssl: 'require' });
const ITEMS_PER_PAGE = 6;

export async function fetchReviews() {
  try {
    const data = await sql2<Reviews[]>`SELECT * FROM customer_reviews`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch review data.');
  }
}

export async function fetchQuotes() {
  try {
    const data = await sql2<Quote[]>`
    SELECT * FROM quote_submissions;
    `
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes.');
  }
}

export async function fetchFilteredQuotes(query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const quotes = await sql2<QuotesTable[]>`
      SELECT
        quote_submissions.id,
        quote_submissions.name,
        quote_submissions.email,
        quote_submissions.help_with,
        quote_submissions.pdf_generated,
        quote_submissions.email_sent,
        quote_submissions.address,
        quote_submissions.city,
        quote_submissions.phone,
        quote_submissions.status,
        quote_submissions.created_at
      FROM quote_submissions
      WHERE
        quote_submissions.name ILIKE ${`%${query}%`} OR
        quote_submissions.email ILIKE ${`%${query}%`} OR
        quote_submissions.help_with ILIKE ${`%${query}%`} OR
        quote_submissions.created_at::text ILIKE ${`%${query}%`} OR
        quote_submissions.status ILIKE ${`%${query}%`}
      ORDER BY quote_submissions.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return quotes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes.');
  }
}

export async function fetchQuotesPages(query: string) {
  try {
    const data = await sql2`SELECT COUNT(*)
    FROM quote_submissions
    WHERE
      quote_submissions.name ILIKE ${`%${query}%`} OR
      quote_submissions.email ILIKE ${`%${query}%`} OR
      quote_submissions.help_with ILIKE ${`%${query}%`} OR
      quote_submissions.created_at::text ILIKE ${`%${query}%`} OR
      quote_submissions.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of quotes.');
  }
}

export async function fetchQuotesByMonth() {
  try {
    const data = await sql2<{ month: string; count: number }[]>`
    WITH months AS (
        SELECT 
          TO_CHAR(DATE_TRUNC('month', CURRENT_DATE - INTERVAL '11 months') + (n || ' months')::INTERVAL, 'Mon') as month,
          EXTRACT(MONTH FROM DATE_TRUNC('month', CURRENT_DATE - INTERVAL '11 months') + (n || ' months')::INTERVAL) as month_num
        FROM generate_series(0, 11) n
      )
      SELECT 
        m.month,
        COALESCE(COUNT(q.id), 0)::int as count
      FROM months m
      LEFT JOIN quote_submissions q 
        ON TO_CHAR(q.created_at, 'Mon') = m.month
        AND q.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '11 months')
      GROUP BY m.month, m.month_num
      ORDER BY m.month_num
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch quotes by month.');
  }
}

export async function fetchLatestQuotes() {
  try {
    const data = await sql2<LatestQuote[]>`
      SELECT 
        quote_submissions.id,
        quote_submissions.name,
        quote_submissions.email,
        quote_submissions.help_with,
        quote_submissions.status,
        quote_submissions.created_at
      FROM quote_submissions
      ORDER BY quote_submissions.created_at DESC
      LIMIT 5`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest quotes.');
  }
}


export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const QuoteCountPromise = sql2`SELECT COUNT(*) FROM quote_submissions`;
    const reviewCountPromise = sql2`SELECT COUNT(*) FROM customer_reviews`;
    const pendingQuotesPromise = sql2`SELECT COUNT(*) FROM quote_submissions WHERE status = 'pending'`;
    const completedQuotesPromise = sql2`SELECT COUNT(*) FROM quote_submissions WHERE status = 'completed'`;

    const data = await Promise.all([
      QuoteCountPromise,
      reviewCountPromise,
      pendingQuotesPromise,
      completedQuotesPromise,
    ]);

    const numberOfQuotes = Number(data[0][0].count ?? '0');
    const numberOfReviews = Number(data[1][0].count ?? '0');
    const totalPendingQuotes = Number(data[2][0].count ?? '0');
    const totalCompletedQuotes = Number(data[3][0].count ?? '0');

    return {
      numberOfReviews,
      numberOfQuotes,
      totalCompletedQuotes,
      totalPendingQuotes,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchReviewPages(query: string) {
  try {
    const data = await sql2`SELECT COUNT(*)
    FROM customer_reviews
    WHERE
    customer_reviews.name ILIKE ${`%${query}%`} OR
    customer_reviews.city ILIKE ${`%${query}%`} OR
    customer_reviews.status ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reviews.');
  }
}

export async function fetchReviewsById(id: string) {
  try {
    const data = await sql2<ReviewForm[]>`
    SELECT
      customer_reviews.id,
      customer_reviews.name,
      customer_reviews.city,
      customer_reviews.review_text,
      customer_reviews.status,
      customer_reviews.rating
      FROM customer_reviews
      WHERE customer_reviews.id = ${id};
    `;
    const reviews = data.map((review) => ({
      ...review,
    }));
    return reviews[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch review.');
  }
}

export async function fetchQuotesById(id: string) {
  try {
    const data = await sql2<QuoteForm[]>`
    SELECT
        quote_submissions.id,
        quote_submissions.name,
        quote_submissions.email,
        quote_submissions.help_with,
        quote_submissions.pdf_generated,
        quote_submissions.email_sent,
        quote_submissions.address,
        quote_submissions.city,
        quote_submissions.phone,
        quote_submissions.status,
        quote_submissions.created_at
      FROM quote_submissions
      WHERE quote_submissions.id = ${id};
    `;
    const quotes = data.map((quote) => ({
      ...quote,
    }));
    return quotes[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch review.');
  }
}

export async function fetchFilteredReviews(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    
    const data = await sql2<Reviews[]>`
    SELECT
      customer_reviews.id,
      customer_reviews.name,
      customer_reviews.city,
      customer_reviews.review_text,
      customer_reviews.status,
      customer_reviews.rating
      FROM customer_reviews
      WHERE 
      customer_reviews.name ILIKE ${`%${query}%`} OR
      customer_reviews.city ILIKE ${`%${query}%`} OR
      customer_reviews.status ILIKE ${`%s${query}%`}
      ORDER BY customer_reviews.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    const reviews = data.map((review) => ({
      ...review
    }));
    // add WHERE customer_reviews.website_id Like 'kekirenovering' later
    return reviews;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch customer reviews table.');
  }

}
