import { useState } from 'react';
import campaigns from '~/lib/data/campaigns.json';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';
import { Link } from '@remix-run/react';
type Campaign = {
	campaignName: string;
	startDate: string;
	endDate: string;
};

const CampaignBuilder = () => {
	const [campaignDates, setCampaignDates] = useState<Date[] | undefined>();
	const [newCampaignDates, setNewCampaignDates] = useState<
		Date[] | undefined
	>();
	const [marketingCampaign, setMarketingCampaign] = useState<any>({
		campaignName: '',
		startDate: '',
		endDate: '',
	});

	const marketingCampaignDates: Date[] = [];
	campaigns.map((campaign) => {
		const date = new Date(campaign.startDate);
		marketingCampaignDates.push(date);
	});
	const updateCampaign = (
		campaignName: string,
		campaignStartDate: string,
		campaignEndDate: string
	) => {
		setMarketingCampaign((prevCampaign: Campaign) => ({
			...prevCampaign,
			campaignName: campaignName,
			startDate: campaignStartDate,
			endDate: campaignEndDate,
		}));
	};

	const handleNewCampaign = (date) => {
		setNewCampaignDates(date);
	};

	if (newCampaignDates) {
		console.log(newCampaignDates[4] ?? '');
	}

	return (
		// <div className="flex justify-center w-full items-center h-screen ">
		<div className="flex justify-around py-2">
			<div className="flex flex-col gap-4">
				<Link
					className="border-gray-400 border rounded-lg hover:border-2 hover:transition-all"
					to="/Create"
				>
					Create New Campaign
				</Link>
				<form className="flex flex-col">
					<label htmlFor="campaignName">Campaign Name</label>
					<input
						type="text"
						id="campaignName"
						className="border-2 border-gray-300 rounded-lg px-1"
					/>
					<label htmlFor="date">Select "Send-out" date</label>
					<select
						id="date"
						className="border-2 border-gray-300 rounded-lg px-1  "
					>
						<option value="">Put</option>
						<option value="">a</option>
						<option value="">Calendar</option>
						<option value="">Here</option>
					</select>
					<label htmlFor="method">Method</label>
					<select
						name="method"
						id="Method"
						className="border-2 border-gray-300 rounded-lg px-1  "
					>
						<option value="">SMS</option>
						<option value="">Email</option>
					</select>
					<div className="flex flex-col gap-1 mt-2 border-lg border-1 ">
						<button className="text-sm border-lg border-1">SMS Template</button>
						<button>Email Template</button>
					</div>
					<button type="submit">Add Campaign</button>
				</form>
				<hr />
				<button className="border-gray-400 border rounded-lg hover:border-2 hover:transition-all ">
					Edit Campaign Campaign
				</button>
				<button className="border-red-500 border rounded-lg hover:border-2 hover:transition-all ">
					Delete Campaign
				</button>
				<hr />
				<h1 className="underline ">Mass Blast Marketing Campaigns</h1>
				{campaigns.map((campaign) => (
					<ul
						className="border-2 rounded-lg p-3 border-gray-500 flex-1 flex gap-2 flex-col overflow-scroll"
						key={campaign.id}
					>
						<button
							className="flex justify-start hover:text-lime-500 transition-all"
							onClick={() =>
								updateCampaign(
									campaign.campaignName,
									campaign.startDate,
									campaign.endDate
								)
							}
						>
							<li
								value="BuyOneGetOne"
								id={campaign.type}
								className="flex flex-col gap-2"
							>
								<h1 className="font-semibold">{campaign.campaignName}</h1>
								<p className="text-start">
									Start Date: <br />
									<span>{campaign.startDate}</span>
								</p>
								<p className="text-start">
									End Date: <br />
									<span>{campaign.endDate}</span>
								</p>
							</li>
						</button>
					</ul>
				))}
			</div>
			<div>
				<h1 className="w-1/2">Schedule</h1>
				{!campaignDates?.length ? (
					<>
						<p>Please select a Date</p>
					</>
				) : (
					<ul>
						{campaignDates?.map((entry) => (
							<div key={entry.toString()}>
								{/* <h1>{marketingCampaign.campaignName}</h1> */}
								<li>{entry.toString()}</li>
							</div>
						))}
					</ul>
				)}
				{!marketingCampaign.campaignName ? (
					<p>Select a campaign</p>
				) : (
					<div>
						<h1 className="font-semibold">{marketingCampaign.campaignName}</h1>
						<p>
							Start Date: <span>{marketingCampaign.startDate}</span>
						</p>
						<p>
							End Date: <span>{marketingCampaign.endDate}</span>
						</p>
					</div>
				)}
			</div>
			<div className="flex flex-col justify-start gap-1">
				<DayPicker
					mode="multiple"
					// selected={selected}
					selected={marketingCampaignDates}
					onSelect={setNewCampaignDates}
					onDayClick={() => console.log('Hello')}
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
