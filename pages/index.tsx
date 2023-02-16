/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect  } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
import { NewQuestionForm, CategoryFilter, QuestionsList, Loader, Header, OpenAI, Footer, Hero } from "../components";
import { ADMIN_PASS } from "../lib/constats";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home: NextPage = () => {
	const [ showForm, setShowForm ] = useState<boolean>( false );
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [ currentCategory, setCurrentCategory ] = useState( "all" );
	const [ passCode, setPassCode ] = useState( "" );
	const [ users, setUsers ] = useState( "users" );
    
	const  user: any  = useUser();
	
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
			<Header showForm={ showForm } setShowForm={ setShowForm } />
			{showForm && users === "users" ? (
				<NewQuestionForm setQuestions={setQuestions} setShowForm={setShowForm} />
			) : null }
            
            
			<Hero />
            
            
			<div style={{ display: "none"}}>
				{ ( passCode !== ADMIN_PASS && user?.user === undefined ) && <section className="authContainer">
					<h2>ADMIN ACCESS: </h2>
					<div className="control">
						<select onChange={e => setUsers(e.target.value)} className="selectStyles">
							<option value="users">User</option>
							<option value="admin">Admin</option>    
						</select>
						{ users === "admin" && <input
							type='text'
							placeholder='PassCode'
							onChange={e => setPassCode(e.target.value)}
						/> }
					</div>
				</section> }
			</div>
            

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
