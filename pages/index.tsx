/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect  } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
import { NewQuestionForm, CategoryFilter, QuestionsList, Loader, Header, OpenAI, Footer, Hero } from "../components";
import { ADMIN_PASS } from "../lib/constats";

const Home: NextPage = () => {
	const [ showForm, setShowForm ] = useState<boolean>( false );
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [ currentCategory, setCurrentCategory ] = useState( "all" );
	const [ passCode, setPassCode ] = useState( "" );
	const [ user, setUser ] = useState( "user" );
    

	useEffect(
		function () {
			async function getQuestions() {
				setIsLoading(true);

				let query = supabase.from("questions").select("*");
				if (currentCategory !== "all")
					query = query.eq("category", currentCategory);

				const { data: question, error }: any = await query
					.order("like", { ascending: false })
					.limit(1000);
                
				if (!error) setQuestions(question);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getQuestions();
		},
		[currentCategory, showForm ]
	);
	
	return (
		<>
			<Header showForm={ showForm } setShowForm={ setShowForm } user={ user } />
			{showForm && user === "user" ? (
				<NewQuestionForm setQuestions={setQuestions} setShowForm={setShowForm} />
			) : null }
            
			<Hero />
            
			<div className="flex items-center justify-center p-5">
				{ user === "user" && <OpenAI /> }
			</div>
            
            
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
			</section> }
            

			{	(passCode === ADMIN_PASS) && <main className='main'>
				<CategoryFilter setCurrentCategory={setCurrentCategory} />

				{isLoading ? (
					<Loader title={"Loading..."} />
				) : (
					<QuestionsList questions={questions} setQuestions={setQuestions} />
				)}
			</main> }
			<Footer />
		</>
	);
};


export default Home;
