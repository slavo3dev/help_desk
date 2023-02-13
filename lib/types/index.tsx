
export interface HeaderProps
{
    showForm: boolean;
    user: string;
    setShowForm: ( arg: any ) => void
}

export interface CurrentCategoryProps {
    setCurrentCategory: (arg: string) => void
}

export interface QuestionListProps {
    [ x: string ]: any;
    questions: any[]
    setQuestions: (arg: any) => void
}

export interface QuestionProps { 
    question: {
        status: string,
        id: number,
        title: string,
        description: string, 
        category: string,
        email: string
        answer: string
    };

    setQuestions: (arg: any) => void 
}

export interface NewQuestionProps {
    setQuestions: ( arg: any ) => void; 
    setShowForm: any
}