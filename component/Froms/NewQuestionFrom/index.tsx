import { useState, FC } from "react";
import { CATEGORIES } from "../../../lib/constats";
import supabase from "../../../lib/supabase";
import {NewQuestionProps } from  "../../../lib/types";

export const NewQuestionForm: FC<NewQuestionProps> = ( { setQuestions, setShowForm } ) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory ] = useState( "" );
	const [ email, setEmail ] = useState( "" );

	const [ isUploading, setIsUploading ] = useState( false );
    
	const titleLength = title.length;
	const descriptionLength = description.length;
    
	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
        

		if (titleLength <= 40 && category && descriptionLength <= 200) {
		
			setIsUploading(true);
			const { data: newQuestion, error } = await supabase
				.from("questions")
				.insert([{ title, description, category, email }])
				.select();
			setIsUploading(false);

	
			if (!error) setQuestions((questions: any) => [questions[0], ...questions]);

		
			setTitle("");
			setDescription("");
			setCategory("");

			setShowForm(false);
		}
	}

	return (
		<form className='fact-form' onSubmit={ handleSubmit }>
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
			<input
				value={email}
				type='email'
				placeholder='email'
				onChange={(e) => setEmail(e.target.value)}
				disabled={isUploading}
			/>
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
	);
};