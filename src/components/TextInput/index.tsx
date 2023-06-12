import { ChangeEvent, InputHTMLAttributes } from "react";

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    onChangeText?(text: string): void;
}

function TextInput(props: ITextInput) {
    const { onChange, onChangeText, ...restProps } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (onChangeText) onChangeText(e.target.value);
    };

    return <input {...restProps} onChange={handleChange} />;
}

export default TextInput;
