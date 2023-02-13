
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
        answar: string
    };

    setQuestions: (arg: any) => void 
}

export interface NewQuestionProps {
    setQuestions: ( arg: any ) => void; 
    setShowForm: any
}