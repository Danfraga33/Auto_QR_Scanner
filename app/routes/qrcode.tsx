import { Link } from '@remix-run/react';
import { QRCodeSVG } from 'qrcode.react';

function QRCodeRedirect() {
	const formLink = 'http://localhost:5173/dashboard';
	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8">
			<Link to="/">Home</Link>
			<h1>Scan the QR Code to Access the Form</h1>
			<QRCodeSVG value={formLink} />,
			<p>Open your camera and scan the QR code to be redirected to the form.</p>
		</div>
	);
}

export default QRCodeRedirect;
