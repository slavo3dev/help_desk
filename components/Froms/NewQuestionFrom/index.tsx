import { useState, FC } from "react";
import { CATEGORIES } from "../../../lib/constats";
// import supabase from "../../../lib/supabase";
import axios from "axios";
import {NewQuestionProps } from  "../../../lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";

export const NewQuestionForm: FC<NewQuestionProps> = ( { setQuestions, setShowForm } ) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory ] = useState( "" );
	const [ isUploading, setIsUploading ] = useState( false );
    
	const titleLength = title.length;
	const descriptionLength = description.length;
    
	const { user } = useUser();
    
	const email = user?.user !== undefined ? user.user : "";
    
	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
        

		if (titleLength <= 40 && category && descriptionLength <= 200) {
	
			try {
				setIsUploading(true);
				const res: { data: { ticket: string } } = await axios.post( "api/createTicket", {
					title, description, category, email
				} );
				setQuestions( ( questions: any ) => [ questions[ 0 ], ...questions ] );
                
				setTimeout(() => {
					setTitle("");
					setDescription("");
					setCategory( "" );
					setIsUploading(false);
					setShowForm(false);
				}, 1500);
				
	
			} catch (error) {
				throw new Error("Something Went Wrong Message was not saved!!!");
            
			}

		}
	}

	return (
		<>
			{ isUploading && <h3 style={ { color:"red", textDecoration: "underline", backgroundColor: "white", padding: "10px"}}>Please Wait, We are Submiting your Question - you will got email with answare in 48h</h3>}
			<form className='question-form' onSubmit={ handleSubmit }>
				<input
					type='text'
					placeholder='Aks Question/Description...'
					value={ description }
					onChange={ ( e ) => setDescription( e.target.value ) }
					disabled={ isUploading }
				/>
				{/* <span>{ 200 - descriptionLength }</span> */}
				<input
					value={title}
					type='text'
					placeholder='Title'
					onChange={(e) => setTitle(e.target.value)}
					disabled={isUploading}
				/>
				{/* <span>{ 50 - titleLength }</span> */}
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					disabled={isUploading}
				>
					<option value=''>Choose category:</option>
					{CATEGORIES.map((cat: any) => (
						<option key={cat.name} value={cat.name}>
							{cat.name.toUpperCase()}
						</option>
					))}
				</select>
				<button className='btn btn-large' disabled={isUploading}>
        Submit
				</button>
			</form>
		</>
	);
};