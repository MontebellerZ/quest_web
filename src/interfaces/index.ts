import { Color, QuestionTypeFull, User } from "../types";

export interface IResDataLogin {
    user: User;
    token: string;
    expirationTime: string;
}

export interface IResDataGetAllColors {
    colors: Color[];
}

export interface IResDataGetAllQuestionTypes {
    questionTypes: QuestionTypeFull[];
}
