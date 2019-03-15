import Footer from '../components/footer';
import Head from 'next/head';
import '../index.scss';

export default props => {
	return (
		<main className="flex flex-col w-full min-h-screen bg-signal">
			<Head>
				<title>Can I Play Yet...</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" /> <meta charSet="UTF-8" /> <meta name="description" content="Bracket Display Tool" />
				<meta name="keywords" content="Challonge,Friendlies,Setups,Tournaments" /> <meta name="author" content="Simon Fessehaye" />
				<link
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
					integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
					crossOrigin="anonymous"
				/>
			</Head>
			{props.children}
			<Footer />
		</main>
	);
};
