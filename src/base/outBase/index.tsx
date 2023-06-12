import "./styles.scss";
import { Outlet } from "react-router-dom";
import QuestLogo from "../../assets/imgs/quest_logo.png";
import { useEffect, useState } from "react";
import Api from "../../api";
import { QuestionTypeFull } from "../../types";

function onlyCapitalLetters(str: string) {
    return str.replace(/[^A-Z]+/g, "");
}

function ItemQuestionType(questionType: QuestionTypeFull) {
    const colorHexCode = questionType.color.hexCode;
    const linkSymbol = questionType.picture?.link;
    const reducedType = onlyCapitalLetters(questionType.type);

    return (
        <div id="TypeCircle" title={questionType.type} style={{ backgroundColor: colorHexCode }}>
            {linkSymbol ? <img src={linkSymbol} /> : reducedType}
        </div>
    );
}

function ListQuestionType({ questionTypes }: { questionTypes: QuestionTypeFull[] }) {
    return (
        <div id="ListQuestionType">
            {questionTypes.map((questionType, i) => (
                <ItemQuestionType key={i} {...questionType} />
            ))}
        </div>
    );
}

function OutBase() {
    const [qTypes, setQTypes] = useState<QuestionTypeFull[]>([]);

    useEffect(() => {
        Api.GetDefaultQuestionTypes()
            .then(setQTypes)
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div id="outBase">
            <div className="outBaseFrame">
                <div className="outBaseLogoHolder">
                    <img className="outBaseLogo" src={QuestLogo} />
                </div>

                <h1 className="outBaseTitle">Quest</h1>

                <ListQuestionType questionTypes={qTypes} />

                <Outlet />
            </div>
        </div>
    );
}

export default OutBase;
