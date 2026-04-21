import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


type Vehicle={
    label:string;
    img:string;
    href:string;
    price:string;
}

type Vehicles=Vehicle[]

const vehicles:Vehicles = [
	{
		label: 'Tata Curvv Ev',
		img: '/compareVehicleImage/tata-curvv-ev.png',
		href: '/compare/sedans',
		price: '38 lakhs Onwards',
	},
	{
		label: 'Maxus eTerron 9',
		img: '/compareVehicleImage/Maxus-eTerron-9.png',
		href: '/compare/trucks',
		price: '70 lakhs Onwards',
	},
	{
		label: 'Proton eMas 7',
		img: '/compareVehicleImage/proton-eMas-7.png',
		href: '/compare/suvs',
		price: '56.99 lakhs Onwards',
	},
	// {
	// 	label: 'Coupes',
	// 	img: '/compareVehicleImage/coupes.png',
	// 	href: '/compare/coupes',
	// 	price:'48 lakhs Onwards',
	// },
	{
		label: 'Hyundai Kona',
		img: '/compareVehicleImage/Hyundai-Kona-Electric.png',
		href: '/compare/hatchbacks',
		price:'48 lakhs Onwards'
	},
	// {
	// 	label: 'Convertibles',
	// 	img: '/compareVehicleImage/convertibles.png',
	// 	href: '/compare/convertibles',
	// },
];

const NewArrivalCars = () => {
	return (
		<section className="w-full pb-12 bg-[#090909]">
			<h2 className="text-3xl md:text-4xl text-center font-black uppercase mb-6 pt-8">
				New Arrivals
			</h2>
			{/* <div className="flex flex-wrap gap-6 justify-center ">
				{vehicles.map((v) => (
					<Link
						key={v.label}
						href={v.href}
						className="flex flex-col items-center w-40 sm:w-36 md:w-40 bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-3"
					>
						<div className="w-full h-20 sm:h-24 md:h-28 flex items-center justify-center mb-2">
							<Image
								src={v.img}
								alt={v.label}
								width={120}
								height={60}
								className="object-contain w-full h-full"
							/>
						</div>
						<span className="text-sm md:text-base font-medium text-center">
							Compare popular <br />
							{v.label}{' '}
							<span className="inline-block align-middle"><ChevronRight size={16} /></span>
						</span>
					</Link>
				))}
			</div> */}
			<div className='w-full max-w-screen-2xl mx-auto px-2 md:px-6 lg:px-8 '>
			<div className="flex flex-wrap gap-8 justify-center p-4">
	{vehicles.map((v) => (
		<Link
			key={v.label}
			href={v.href}
			className="block w-48 rounded-lg border border-primary/10 bg-[#131313] hover:border-[#f4c430]/60 hover:shadow-xl transition-all duration-300"
		>
			<div className="w-full  flex items-center justify-center">
				<Image
					src={v.img}
					alt={v.label}
					width={300}
					height={200}
					className="object-contain h-full w-full "
				/>
			</div>
			<div className="px-4 pb-2">
				<h3 className="text-lg font-semibold tracking-tight text-white">
					{v.label}
				</h3>
				<p className="mt-1 font-normal text-sm text-gray-400">
					{v.price}
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
