import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';
import { Form, Link, json, useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { createCampaign, getCampaign } from '~/utils/actions';
import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunction } from '@remix-run/node';
import { UserButton } from '@clerk/remix';
type Campaign = {
	campaignName: string;
	startDate: string;
	endDate: string;
};

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData();
	const name = body.get('name') as string;
	const campaignType = body.get('campaignType') as string;
	const startDate = body.get('startDate') as string;
	const endDate = body.get('endDate') as string;
	const method = body.get('method') as string;
	const response = createCampaign({
		method,
		startDate,
		endDate,
		campaignType,
		name,
	});
	console.log(response);
	redirect('/');
	return response;
}

// export const loader: LoaderFunction = async (args) => {
// 	return {};
// };

export const loader: LoaderFunction = async (args) => {
	const { userId } = await getAuth(args);
	if (!userId) {
		return redirect('/');
	}
	const data = await getCampaign();
	return json(data);
};

const CampaignBuilder = () => {
	const [campaignDates, setCampaignDates] = useState<Date[] | undefined>();
	const [newCampaignDates, setNewCampaignDates] = useState<
		Date[] | undefined
	>();

	const campaigns = useLoaderData<typeof loader>();

	const [marketingCampaign, setMarketingCampaign] = useState<any>({
		campaignName: '',
		startDate: '',
		endDate: '',
	});

	const marketingCampaignDates: Date[] = [new Date()];
	campaigns?.map((campaign) => {
		const date = new Date(campaign.startDate);
		console.log(date);
		marketingCampaignDates.push(new Date());
	});

	console.log(marketingCampaignDates);

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

	return (
		// <div className="flex justify-center w-full items-center h-screen ">
		<div className="flex justify-around py-2">
			<div className="flex flex-col gap-4">
				<UserButton />
				<Link to="/Dashboard">Dashboard</Link>
				<hr />
				<div className="underline "> New Campaign</div>
				<Form method="post" className="flex flex-col">
					<label htmlFor="campaignName">Campaign Name</label>
					<input
						defaultValue="Untitled"
						type="text"
						name="name"
						id="campaignName"
						className="border-2 border-gray-300 rounded-lg px-1"
						required
					/>
					<label htmlFor="">Select campaign type</label>
					<div className="flex flex-col gap-2">
						<select
							name="campaignType"
							id="campaignType"
							className="border-2 rounded-lg px-1"
							required
						>
							<option value="oneOff">One-Off</option>
							<option value="period">Period</option>
						</select>
						<label htmlFor="date">Select "Send-out" start date</label>
						<select
							id="date"
							className="border-2 border-gray-300 rounded-lg px-1"
							name="startDate"
							defaultValue="Random Date"
							required
						>
							<option value="Start Date">Put</option>
							<option value="">a</option>
							<option value="">Calendar</option>
							<option value="">Here</option>
						</select>
						<label htmlFor="date">Select "Send-out" end-date</label>
						<select
							id="date"
							className="border-2 border-gray-300 rounded-lg px-1"
							name="endDate"
							defaultValue="Random Date"
							required
						>
							<option value="End Date">Put</option>
						</select>
					</div>
					<label htmlFor="method">Method</label>
					<select
						name="method"
						id="Method"
						className="border-2 border-gray-300 rounded-lg px-1"
						required
					>
						<option value="SMS">SMS</option>
						<option value="Email">Email</option>
					</select>
					<label htmlFor="frequency">Frequency</label>
					<select
						name="frequency"
						id="frequency"
						className="border-2 border-gray-300 rounded-lg px-1"
						required
					>
						<option value="weekly">insert</option>
						<option value="Email">calender</option>
						<option value="Email">or </option>
						<option value="Email">some other form </option>
					</select>
					<div className="flex flex-col gap-1 mt-2 border-lg border-1 ">
						<button className="text-sm border-lg border-1">SMS Template</button>
						<button>Email Template</button>
					</div>
					<button type="submit">Add Campaign</button>
				</Form>
				<hr />
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
									campaign.name,
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
								<h1 className="font-semibold">{campaign.name}</h1>
								<p className="text-start">
									Start Date:
									<br />
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
						<div className="flex flex-col gap-2 ">
							<button className="border rounded-lg px-1 inline border-orange-400">
								Change Frequency
							</button>
							<div className="flex gap-1 w-full">
								<button className="border rounded-lg p-1 border-red-600 bg-gray-200 ">
									Delete
								</button>
								<button className="border rounded-lg p-1 border-yellow-200 bg-gray-200 ">
									Edit
								</button>
							</div>
						</div>
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

// export async function loader() {
// 	try {
// 		connectDB();
// 		const data = await Customer.find();
// 		console.log(data);
// 		return json(data, { status: 200 });
// 	} catch (err) {
// 		console.error(err);
// 		return json({ error: err }, { status: 500 });
// 	}
// }

// const Dashboard = () => {
// 	const data = useLoaderData<typeof loader>();
// 	let totalRevenue = data.reduce(
// 		(total: number, customer) => total + customer.amount,
// 		0
// 	);

// 	// Add delete functionality
// 	return (
// 		<div className="flex justify-center items-center h-screen  flex-col">
// 			<div className="flex flex-col justify-between gap-2">
// 				<Link to="/" className="flex justify-center item">
// 					Home
// 				</Link>
// 				<h2 className="flex justify-center item">Customers:</h2>
// 				{data.map((customer) => (
// 					<div key={customer._id}>
// 						<div>{customer.name}</div>
// 						<div>{customer.email}</div>
// 						<label htmlFor="purchased" className="mr-2">
// 							Purchased
// 						</label>
// 						{customer.Purchased ? (
// 							<input type="checkbox" id="purchased" checked readOnly />
// 						) : (
// 							<input type="checkbox" id="purchased" readOnly />
// 						)}

// 						<p>
// 							Amount Purchased: <span> {customer.amount}</span>
// 						</p>
// 					</div>
// 				))}
// 				<h3>Total Campaign Revenue: {totalRevenue}</h3>
// 			</div>
// 		</div>
// 	);
// };
