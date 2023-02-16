import { FC } from "react";

export const MainLayout: FC = ( { children}: any ) =>  {

	return (
		<div className="flex items-center justify-center">
			{children}
		</div>

	);
};