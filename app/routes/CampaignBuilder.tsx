import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';
const CampaignBuilder = () => {
	const [selected, setSelected] = useState<Date[] | undefined>();
	const [marketingCampaign, setMarketingCampaign] = useState<string>('');
	console.log(selected?.length);
	return (
		// <div className="flex justify-center w-full items-center h-screen ">
		<div className="flex justify-around py-2">
			<div className="flex flex-col gap-4">
				<button className="border-gray-400 border rounded-lg hover:border-2 hover:transition-all ">
					Create New Campaign
				</button>
				<h1>Mass Blast Marketing Campaigns</h1>
				<ul className="border-2 rounded-lg py-1 px-2 border-gray-500 flex-1 flex gap-2 flex-col overflow-scroll">
					<button className="flex justify-start hover:text-lime-500 transition-all">
						<li value="BuyOneGetOne">Free Coffee</li>
					</button>
					<button className="flex justify-start hover:text-lime-500 transition-all">
						<li value="KidsEatForFree">Kids Eat Free</li>
					</button>
					<button className="flex justify-start hover:text-lime-500 transition-all">
						<li value="WeekendFrenzy">Weekend Frenzy</li>
					</button>
					<button className="flex justify-start hover:text-lime-500 transition-all">
						<li value="10offSelectedProducts" id="digitalMarketing">
							10% Off Selected Products
						</li>
					</button>
				</ul>
			</div>
			<div>
				<h1 className="w-1/2">Schedule</h1>
				{!selected?.length ? (
					<>
						<p>Please select a Date</p>
					</>
				) : (
					<ul>
						{selected.map((entry) => (
							<div key={entry.toISOString()}>
								<li>{entry.toISOString()}</li>
							</div>
						))}
					</ul>
				)}
			</div>
			<div className="flex flex-col justify-start gap-1">
				<DayPicker
					mode="multiple"
					selected={selected}
					onSelect={setSelected}
					onDayClick={() => setMarketingCampaign('')}
				/>
				<div className="flex flex-col gap-2">
					<h1 className="font-semibold underline">Filter</h1>
					<div className="flex flex-col gap-2 ">
						<div className="flex items-center gap-2">
							<input
								type="radio"
								id="sms"
								className="border-2 rounded-lg p-1"
								name="group1"
							/>
							<label htmlFor="sms">SMS</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="radio"
								id="email"
								className="border-2 rounded-lg p-1"
								name="group1"
							/>
							<label htmlFor="email">Email</label>
						</div>
					</div>
				</div>
			</div>
			{/* <CalendarComp /> */}
		</div>
	);
};

export default CampaignBuilder;
