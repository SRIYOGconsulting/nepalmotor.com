import Image from 'next/image';
import Link from 'next/link';
import { getPublicEvNewArrivals } from '@/actions/evNewArrivals.action';

type Arrival = {
  _id: string;
  label?: string;
  priceText?: string;
  href?: string;
  imageFileId?: string;
};

const NewArrivalCars = async () => {
  const result = await getPublicEvNewArrivals(8);
  const items: Arrival[] = result.success ? (result as unknown as { items: Arrival[] }).items : [];

	return (
		<section className="w-full pb-12 bg-[#090909]">
			<h2 className="text-3xl md:text-4xl text-center font-black uppercase mb-6 pt-8">
				New Arrivals
			</h2>
			<div className='w-full max-w-screen-2xl mx-auto px-2 md:px-6 lg:px-8 '>
			<div className="flex flex-wrap gap-8 justify-center p-4">
	{items.map((v) => (
		<Link
			key={v._id}
			href={v.href || '/'}
			className="block w-48 rounded-lg border border-primary/10 bg-[#131313] hover:border-[#f4c430]/60 hover:shadow-xl transition-all duration-300"
		>
			<div className="w-full  flex items-center justify-center">
				<Image
					src={v.imageFileId ? `/api/ev-arrival-files/${v.imageFileId}` : '/MainLogo.png'}
					alt={v.label || 'EV'}
					width={300}
					height={200}
					className="object-contain h-full w-full "
				/>
			</div>
			<div className="px-4 pb-2">
				<h3 className="text-lg font-semibold tracking-tight text-white">
					{v.label || 'EV'}
				</h3>
				<p className="mt-1 font-normal text-sm text-gray-400">
					{v.priceText || ''}
				</p>
			</div>
		</Link>
	))}
			</div>
			</div>
		</section>
	);
};

export default NewArrivalCars;
