/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key  } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";


const Home: NextPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [ currentCategory, setCurrentCategory ] = useState( "all" );
	const [ passCode, setPassCode ] = useState( "" );
	const [ user, setUser ] = useState( "user" );

	const ADMIN_PASS = "iamAdmin!HelpDesk";
    
	useEffect(
		function () {
			async function getQuestions() {
				setIsLoading(true);

				let query = supabase.from("questions").select("*");

				if (currentCategory !== "all")
					query = query.eq("category", currentCategory);

				const { data: facts, error }: any = await query
					.order("like", { ascending: false })
					.limit(1000);

				if (!error) setQuestions(facts);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getQuestions();
		},
		[currentCategory]
	);
    

	return (
		<>
			<Header showForm={ showForm } setShowForm={ setShowForm } user={user} />
			{showForm && user === "user" ? (
				<NewQuestionForm setQuestions={setQuestions} setShowForm={setShowForm} />
			) : null }
            
			{ ( passCode !== ADMIN_PASS ) && <section className="authContainer">
				<h2>ADMIN ACCESS: </h2>
				<div className="control">
					<select onChange={e => setUser(e.target.value)} className="selectStyles">
						<option value="user">User</option>
						<option value="admin">Admin</option>    
					</select>
					{ user === "admin" && <input
						type='text'
						placeholder='PassCode'
						onChange={e => setPassCode(e.target.value)}
					/> }
				</div>
			</section>}

			{	(passCode === ADMIN_PASS) && <main className='main'>
				<CategoryFilter setCurrentCategory={setCurrentCategory} />

				{isLoading ? (
					<Loader />
				) : (
					<QuestionsList questions={questions} setQuestions={setQuestions} />
				)}
			</main>}
		</>
	);
};


function Loader() {
	return <p className='message'>Loading...</p>;
}

function Header({ showForm, setShowForm, user }: any) {
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
}

const CATEGORIES: any = [
	{ name: "Strength", color: "#3b82f6" },
	{ name: "Endurance", color: "#16a34a" },
	{ name: "Mental_Health", color: "#ef4444" },
	{ name: "Heart_Health", color: "#eab308" },
	{ name: "Insurance", color: "#eab308" },
	{ name: "Mushroom_World", color: "#db2777" },
	{ name: "Workout", color: "#14b8a6" },
	{ name: "Customer_Service", color: "#f97316" },
	{ name: "Payments", color: "#8b5cf6" },
];


function NewQuestionForm ( { setQuestions, setShowForm }: any )
{
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
				value={title}
				type='text'
				placeholder='Title'
				onChange={(e) => setTitle(e.target.value)}
				disabled={isUploading}
			/>
			<span>{ 50 - titleLength }</span>
			<input
				value={email}
				type='text'
				placeholder='email'
				onChange={(e) => setEmail(e.target.value)}
				disabled={isUploading}
			/>
			<span>{50 - titleLength}</span>
			<input
				type='text'
				placeholder='Feel Free to ask any question...'
				value={ description }
				onChange={ ( e ) => setDescription( e.target.value ) }
				disabled={ isUploading }
			/>
			<span>{200 - descriptionLength}</span>
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
}

function CategoryFilter({ setCurrentCategory }: any) {
	return (
		<aside>
			<ul>
				<li className='category'>
					<button
						className='btn btn-all-categories'
						onClick={() => setCurrentCategory("all")}
					>
            All
					</button>
				</li>

				{CATEGORIES.map((cat: any) => (
					<li key={cat.name} className='category'>
						<button
							className='btn btn-category'
							style={{ backgroundColor: cat.color }}
							onClick={() => setCurrentCategory(cat.name)}
						>
							{cat.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function QuestionsList ( { questions, setQuestions }: any )
{
	if (questions.length === 0)
		return (
			<p className='message'>
                No tickets for this category yet! 
			</p>
		);

	return (
		<section>
			<ul className='facts-list'>
				{questions.map((question: { id: Key | null | undefined; }) => (
					<Question key={question.id} question={question} setQuestions={setQuestions} />
				))}
			</ul>
			<p style={{ color: "#1d1e18"}}>There are {questions.length} questions.</p>
		</section>
	);
}

function Question({ question, setQuestions }: any) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [ ticketStatus, setStatus ] = useState( question.status );
	const [ answareInput, setAnswareInput ] = useState( false );
	
	async function updateStatus(columnName: string, message: string) {
		setIsUpdating(true);
		const { data: updatedQuestion, error } = await supabase
			.from("questions")
			.update({ [columnName]: message })
			.eq("id", question.id)
			.select();
		setIsUpdating(false);

		if (!error)
			setQuestions((facts: any[]) =>
				facts.map((f: { id: any; }) => (f.id === question.id ? updatedQuestion[0] : f))
			);
	}
    
	const TICKET_STATUS = ["new", "progress", "resolved"];
	return (
		<li className='fact'>
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
				style={{ backgroundColor: CATEGORIES.find((cat: any) => cat?.name === question?.category).color, padding: "0.4rem"
				}}
			>
				{question.category}
			</span>
			<a href="mailto:webmaster@example.com">{ question.email }</a>
			{!isUpdating ? <button onClick={ () => {
				setAnswareInput( !answareInput );
			} }>Answare</button> : <p>Updating Status</p>}
			{ answareInput && <textarea placeholder="Add Answare" value={ question.answar } onChange={ (e) => { 
				setTimeout(() => {
					updateStatus("answer", e.target.value);
				}, 1000);
				
			} } />}
		</li>
	);
}

export default Home;
