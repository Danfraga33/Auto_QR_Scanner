USER JOURNEY
An app where businesses can run email or sms marketing campaigns targeting customers that have been hooked.

1. User scans the QR code or other hook
2. User is redirected to the form, data is saved to mongodb
3. User data is displayed on the dashboard
4. User completes hook (1)
5. User is now a lead to for the product.

#### Pages

1. Landing Page
2. Login
3. Profile
4. Form
5. QR Code
6. Dashboard (Analytics)
7. Campaign Builder

#### Dashboard

- Customers
- Customer revenue (mock up with purchases)
- Calender for owner to play marketing campaign

Components

- Parallel UI
- [Full Calender](https://fullcalendar.io/)

#### User Journey

- User logins in or if no account, user signs up - putting in details such as phone number, email, business name and more. (Clerk Auth + Webhook)
- User is then redirected to dashboard
- User gets a custom QR Code per campaign they make (later can select their own hook)
- Customers signup, adding them to the database
- User creates campaign (selecting audience, method, dates, frequency) - ONLY NEWSLETTER (MVP) -- Selects start date then selects either weekly, monthly or daily
- User Presses "Activate Campaign" button to activate
- User can delete campaign
- User can edit campaign

#### Database Models/Schema

- Business (linked)
- Customer (linked)
- Campaigns (linked)

#### Tools

- Make.com
- Phatom Builder: PAID (Lead collection)
- Anymail finder
- Instantly: Lead Automated Outreach
- Twillo communication API: Send out SMS and Email
- v0 Shadcn project management [Block](https://v0.dev/chat/Gwr1KoyJK0i)
- Setup sentry crons
- [Inngest](https://www.inngest.com/)

#### Ideas

- [Form Layout](https://dribbble.com/shots/24926472-Campaign-Saas-Web-App-Dashboard-Create-Campaign-Component)

#### To Do

- Create new business profile form page (auth)
- Protect Routes (auth)
- Save data from Clerk to MongoDB with Webhooks (auth)
- Create custom signup page on clerk to get additional information. (auth)
- Fix Connection Strings for seperate connections
- Save Business Profiles to DB (auth)
- Toast function when editing or saving.
- Make auth section (Middleware) (auth)
- Set up Email/SMS with twillo
- Add dark mode
- Incorporate Zapier

#### To do Later

- Audience segmentation
- If a business owner wants to run a sms marketing campaign, every friday for one month. There would then be a start and end date. Additionally, scripts to include.
- Instagram Ads
- Google Ads API
- Gamify create new campaign
