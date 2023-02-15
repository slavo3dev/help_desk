import { FC } from "react";
import { HeaderProps } from "../../../lib/types";

export const Header: FC<HeaderProps> = ({ showForm, setShowForm, user }) =>  {
	const appTitle = "Foo (Nomad)";

	return (
		<header className='header'>
			<div className='logo'>
				<img src='/logo/logo.png' height='68' width='68' alt={ appTitle } />
			</div>

			{ user === "user" && <button
				className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
				onClick={() => setShowForm((show: any) => !show)}
			>
				{showForm ? "Close" : "Ask Question"}
			</button> }
		</header>
	);
};