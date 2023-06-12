export type User = {
    id: string;
    email: string;
    nickname: string;
    password: string;
    pictureId: string | null;
    games: number;
    wins: number;
    prefferedColorId: number | null;
    enabled: boolean;
};

export type Admin = {
    id: string;
};

export type Picture = {
    id: string;
    link: string;
};

export type Color = {
    id: number;
    hexCode: string;
};

export type QuestionType = {
    id: number;
    type: string;
    description: string;
    colorId: number;
    symbolId: string;
    enabled: boolean;
};

export type QuestionTypeFull = QuestionType & {
    color: Color;
    picture?: Picture;
};
