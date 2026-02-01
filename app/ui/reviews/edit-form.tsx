'use client';

import { ReviewForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReview, ReviewState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditReviewForm({
  reviews,
}: {
  reviews: ReviewForm;
}) {
  const initialState: ReviewState = { message: null, errors: {} };
  const updateReviewWithId = updateReview.bind(null, reviews.id);
  const [state, formAction] = useActionState(updateReviewWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name - Display Only */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Reviewer Name
          </label>
          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
            <UserCircleIcon className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-700">
              {reviews.name || 'No reviewer name available'}
            </p>
          </div>
        </div>

        {/* Review Text - Display Only */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Review Text
          </label>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              {reviews.review_text || 'No review text available'}
            </p>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex-col space-y-1 md:flex md:gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={reviews.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="declined"
                  name="status"
                  type="radio"
                  value="declined"
                  defaultChecked={reviews.status === 'declined'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="declined"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Declined <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="approved"
                  name="status"
                  type="radio"
                  value="approved"
                  defaultChecked={reviews.status === 'approved'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="approved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Approved <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reviews"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Review</Button>
      </div>
    </form>
  );
}
