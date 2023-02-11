/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";


const Home: NextPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

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
			<Header showForm={showForm} setShowForm={setShowForm} />
			{showForm ? (
				<NewQuestionForm setQuestions={setQuestions} setShowForm={setShowForm} />
			) : null}

			<main className='main'>
				<CategoryFilter setCurrentCategory={setCurrentCategory} />

				{isLoading ? (
					<Loader />
				) : (
					<QuestionsList questions={questions} setQuestions={setQuestions} />
				)}
			</main>
		</>
	);
};

function Loader() {
	return <p className='message'>Loading...</p>;
}

function Header({ showForm, setShowForm }: any) {
	const appTitle = "Improve Your Health your Help Desk";

	return (
		<header className='header'>
			<div className='logo'>
				<img src='/logo/logo.png' height='68' width='68' alt={appTitle} />
				<h1>{appTitle}</h1>
			</div>

			<button
				className='btn btn-large btn-open'
				onClick={() => setShowForm((show: any) => !show)}
			>
				{showForm ? "Close" : "Share Source"}
			</button>
		</header>
	);
}

const CATEGORIES: any = [
	{ name: "Strength", color: "#3b82f6" },
	{ name: "Endurance", color: "#16a34a" },
	{ name: "Mental_Health", color: "#ef4444" },
	{ name: "Heart_Health", color: "#eab308" },
	{ name: "Mushroom_World", color: "#db2777" },
	{ name: "Workout", color: "#14b8a6" },
	{ name: "Science", color: "#f97316" },
	{ name: "News", color: "#8b5cf6" },
];


function NewQuestionForm({ setQuestions, setShowForm }: any) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [ isUploading, setIsUploading ] = useState( false );
    
	const titleLength = title.length;
	const descriptionLength = description.length;
    
	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
		console.log(title, description, category);

		if (titleLength <= 40 && category && descriptionLength <= 200) {
		
			setIsUploading(true);
			const { data: newQuestion, error } = await supabase
				.from("questions")
				.insert([{ title, description, category }])
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
		<form className='fact-form' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Share a fact with the world...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				disabled={isUploading}
			/>
			<span>{200 - descriptionLength}</span>
			<input
				value={title}
				type='text'
				placeholder='Title'
				onChange={(e) => setTitle(e.target.value)}
				disabled={isUploading}
			/>
			<span>{50 - titleLength}</span>
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
	console.log("Questions: ", questions );
	if (questions.length === 0)
		return (
			<p className='message'>
        No facts for this category yet! Create the first one ✌️
			</p>
		);

	return (
		<section>
			<ul className='facts-list'>
				{questions.map((question: { id: Key | null | undefined; }) => (
					<Question key={question.id} question={question} setQuestions={setQuestions} />
				))}
			</ul>
			<p style={{ color: "#1d1e18"}}>There are {questions.length} source. Add your own source!</p>
		</section>
	);
}

function Question({ question, setQuestions }: any) {
	const [isUpdating, setIsUpdating] = useState(false);
	// const badSource =
	// questions.like + questions.exelent < questions.false;
	// console.log( "questions: ", questions );
	console.log("questions !: ", question);
	async function handleVote(columnName: string) {
		setIsUpdating(true);
		const { data: updatedQuestion, error } = await supabase
			.from("questions")
			.update({ [columnName]: question[columnName] + 1 })
			.eq("id", question.id)
			.select();
		setIsUpdating(false);

		if (!error)
			setQuestions((facts: any[]) =>
				facts.map((f: { id: any; }) => (f.id === question.id ? updatedQuestion[0] : f))
			);
	}

	return (
		<li className='fact'>
			<a href="/" className='source'>
				{question.title}
			</a>
			<p>{question.status}</p>
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
		</li>
	);
}

export default Home;
