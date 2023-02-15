import { FC } from "react";
import { LoaderProp } from "../../../lib/types";


export const Loader: FC<LoaderProp> = ( { title = "Loading..." } ) =>  {
	return <p className='message'>{title}</p>;
};