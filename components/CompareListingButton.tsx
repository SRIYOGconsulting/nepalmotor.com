'use client';

/**
 * Showroom (CarListing) compare:
 * - If this id is not in the list and a slot exists: add it, then navigate to /compare.
 * - If already in the list: no-op + toast.
 * - If the list is full: do not add; toast; still navigate to /compare.
 * - If the list holds used-car compares: kind_mismatch + toast (no navigation).
 */
import { ArrowLeftRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MAX_COMPARE } from '@/lib/compareConstants';
import { COMPARE_BUTTON_CLASS } from '@/lib/compareButtonStyles';
import { useCompareStore } from '@/store/useCompareStore';

type Props = {
  listingId: string;
  className?: string;
};

export default function CompareListingButton({ listingId, className }: Props) {
  const router = useRouter();
  const add = useCompareStore((s) => s.add);

  return (
    <button
      type="button"
      onClick={() => {
        const result = add('car_listing', listingId);
        if (result === 'added') {
          router.push('/compare');
          return;
        }
        if (result === 'already') {
          toast('Already in compare');
          return;
        }
        if (result === 'kind_mismatch') {
          toast.error(
            'You can’t mix used cars and showroom cars in one compare list. Open Compare, remove the used cars, then add this showroom car—or finish comparing used cars first.'
          );
          return;
        }
        toast.error(
          `Compare is full (max ${MAX_COMPARE}). Remove a car on the compare page to add another.`
        );
        router.push('/compare');
      }}
      className={className ?? COMPARE_BUTTON_CLASS}
    >
      Compare <ArrowLeftRight className="h-5 w-5" />
    </button>
  );
}
