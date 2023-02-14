import { useState, FC } from "react";
import supabase from "../../lib/supabase";
import { CATEGORIES } from "../../lib/constats";
import {QuestionProps } from "../../lib/types";


export const Question: FC<QuestionProps> =  ( { question, setQuestions } ) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [ ticketStatus, setStatus ] = useState( question.status );
	const [ answareText, setAnswareText ] = useState(question.answer);
	const [ answareInput, setAnswareInput ] = useState( false );
    
    
	const styleCategories: any = CATEGORIES;
	
	console.log("Question: ", question);
	async function updateStatus(columnName: string, message: string) {
		setIsUpdating(true);
		const { data: updatedQuestion, error } = await supabase
			.from("questions")
			.update({ [columnName]: message })
			.eq("id", question.id)
			.select();
		setTimeout(() => {
			setIsUpdating(false);
		}, 900);
		

		if (!error)
			setQuestions((questions: any[]) =>
				questions.map((f: { id: any; }) => (f.id === question.id ? updatedQuestion[0] : f))
			);
	}
    
	const TICKET_STATUS = ["new", "progress", "resolved"];
	return (
		<li className='question'>
			<a href={`/question/${question.id}`} className='source'>
				{question.title}
			</a>
			<select value={ticketStatus} onChange={e => {setStatus(e.target.value), updateStatus("status", ticketStatus);}} className="selectStatus">
				{TICKET_STATUS.map(status => <option value={status}>{status}</option>)}
			</select>
			<p>
				{question.description}
			</p>
			<span
				className='tag'
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style={{ backgroundColor: styleCategories.find((cat: any) => cat?.name === question?.category).color, padding: "0.4rem"
				}}
			>
				{question.category}
			</span>
			<a className="question_email" href={question.email}>{ question.email }</a>
			{!isUpdating ? <button onClick={ () => {
				setAnswareInput( !answareInput );
			} }>Answer</button> : <p>Updating Status</p>}
			{ answareInput && <textarea placeholder="Answer the question" value={ answareText } onChange={ ( e ) =>
			{ 
				setAnswareText(e.target.value);
				setTimeout(() => {
					updateStatus("answer", e.target.value);
				}, 1000);
				
			} } />}
		</li>
	);
};