import "./config";
import axios from "axios";
import { IResDataGetAllColors, IResDataGetAllQuestionTypes, IResDataLogin } from "../interfaces";
import { SaveToken, SaveUser } from "./storage";
import { Color, QuestionTypeFull } from "../types";

class Api {
    static async Login(nickname: string, password: string): Promise<string> {
        const link = "/user/login";
        const obj = { nickname, password };
        const data: IResDataLogin = await axios.post(link, obj).then((res) => res.data);
        SaveToken(data.token, data.expirationTime);
        SaveUser(data.user);
        return data.user.nickname;
    }

    static async ResetPassword(email: string): Promise<string> {
        const link = "/user/resetPassword";
        const obj = { email };
        const data = await axios.put(link, obj).then((res) => res.data);
        return data.message;
    }

    static async GetAllColors(): Promise<Color[]> {
        const link = "/color/getAll";
        const data: IResDataGetAllColors = await axios.get(link).then((res) => res.data);
        return data.colors;
    }

    static async GetDefaultQuestionTypes(): Promise<QuestionTypeFull[]> {
        const link = "/questionType/getDefaults";
        const data: IResDataGetAllQuestionTypes = await axios.get(link).then((res) => res.data);
        return data.questionTypes;
    }
}

export default Api;
