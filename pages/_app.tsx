import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as ga from "../lib/ga";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp ( { Component, pageProps }: AppProps )
{
	const router = useRouter();
  
	useEffect(() => {
		const handleRouteChange = (url: string) => {
			ga.pageview(url);
		};
		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on("routeChangeComplete", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [ router.events ] );
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
				<meta name="description" key="description" content={"AI for Better Life, Travel and Freedom...Your 24/7 Mentor"} />
				<meta name="title" key="title" content={"AI for Better Life, Travel and Freedom...Your 24/7 Mentor"} />
				<meta property="og:title" key="og:title" content={"AI for Better Life, Travel and Freedom...Your 24/7 Mentor"} />
				<meta property="og:locale" key="og:locale" content="en_EU" />
				<meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
				<meta property="og:type" key="og:type" content="website" />
				<meta property="og:description" key="og:description" content={"AI for Better Life, Travel and Freedom...Your 24/7 Mentor"} />
				<meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/lion-favicon.png`} />
				<title>AI for Better Life, Travel and Freedom...Your 24/7 Mentor</title>
			</Head>	
			<UserProvider>
				<Component { ...pageProps } />
			</UserProvider>
		</>
	);
}

export default MyApp;
