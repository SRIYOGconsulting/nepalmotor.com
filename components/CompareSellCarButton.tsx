'use client';

/**
 * Used car (SellCar) compare — same rules as CompareListingButton, but for /buy/[id] inventory.
 */
import { ArrowLeftRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MAX_COMPARE } from '@/lib/compareConstants';
import { COMPARE_BUTTON_CLASS } from '@/lib/compareButtonStyles';
import { useCompareStore } from '@/store/useCompareStore';

type Props = {
  sellCarId: string;
  className?: string;
};

export default function CompareSellCarButton({ sellCarId, className }: Props) {
  const router = useRouter();
  const add = useCompareStore((s) => s.add);

  return (
    <button
      type="button"
      onClick={() => {
        const result = add('sell_car', sellCarId);
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
            'Your compare list has showroom cars. Open Compare and remove them to add used listings, or finish comparing showroom cars first.'
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
