import { FC } from "react";
import { TextEffect } from "../Elements/TextEffect";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export const Hero: FC = () =>
{
	const { user } = useUser();
	return (
		<section className="bg-white text-black p-6">
			<div
				className="hidden lg:block absolute inset-0 w-1/2 ml-auto bg-blueGray-100 z-0"
				style={{ "zIndex": "-1" }}
			></div>
			<div className="container">
				<div className="flex flex-wrap items-center -mx-3">
					<div className="w-full lg:w-1/2 px-3">
						<div className="py-12">
							<div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
								<h2 className="text-3xl lg:text-5xl mb-4 font-bold font-heading wow animate__animated animate__fadeIn">
                      Committed to{" "}
									<span className="text-blue-500">Your</span>{" "}
                      Future & Growth
								</h2>
								<p className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn">
                      Foo (Nomad){" "}
									<strong className="text-blue-500">
                                        connects you with Professionals! <br />
									</strong><br />
                                      Feel Free to ask them for advice, suggestion, a learning roadmap, etc.</p><br />
								<p> With the Power of AI, your Mentor will be{" "}
									<span className="typewrite d-inline text-brand">
										<TextEffect
											text1="Andrew Huberman!"
											text2="David Sinclair!"
										/>
									</span>
								</p>
								<h4 className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn mt-3 text-xl">
                                AI is targeting answers based on suggestions from<br/><strong>Andrew Huberman & David Sinclair!</strong> 
								</h4>
							</div>
							<div className="text-center lg:text-left">
								<Link
									className="tracking-wide hover-up-2 block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded wow animate__animated animate__fadeIn"
									href={`/api/auth/${user ? "logout" : "login"}`}
								>
									{user ? "Logout" : "Login" }
								</Link>
								<Link
									className="block hover-up-2 sm:inline-block py-4 px-8 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded wow animate__animated animate__fadeIn"
									data-wow-delay=".3s"
									href={`/api/auth/${user ? "#openai" : "login"}`}
								>
                                    AI Mentor
								</Link>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10 md:p-2">
						<div className="flex items-center justify-center">
							<img
								className="lg:max-w-lg lg:scale-100"
								src="/images/components/team.svg"
								alt="Foo(Nomad) - Consulting/Metorship Platform"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};