import { FC } from "react";
import { HeaderProps } from "../../../lib/types";

export const Header: FC<HeaderProps> = ({ showForm, setShowForm, user }) =>  {
	const appTitle = "Improve Health with Help Desk";

	return (
		<header className='header'>
			<div className='logo'>
				<img src='/logo/logo.png' height='68' width='68' alt={appTitle} />
				<h1>{appTitle}</h1>
			</div>

			{ user === "user" && <button
				className='btn btn-large btn-open'
				onClick={() => setShowForm((show: any) => !show)}
			>
				{showForm ? "Close" : "Ask Question"}
			</button> }
		</header>
	);
};