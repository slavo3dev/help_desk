import { FC } from "react";
import { Question } from "../Question";
import { QuestionListProps } from "../../lib/types";

export const QuestionsList: FC<QuestionListProps> =  ( questions, setQuestions  ) => 
{
	if ( questions.length === 0)
		return (
			<p className='message'>
                No tickets for this category yet! 
			</p>
		);

	return (
		<section>
			<ul className='facts-list'>
				{ questions.map((question: any) => (
					<Question key={question.id} question={question} setQuestions={setQuestions} />
				))}
			</ul>
			<p style={ { color: "#1d1e18" } }>There are { ( questions as any ).length} questions.</p>
		</section>
	);
};