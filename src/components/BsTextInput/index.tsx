import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface ITextInput extends React.ComponentProps<typeof Form.Control> {
    onChangeText?(text: string): void;
}

function BsTextInput(props: ITextInput) {
    const { onChange, onChangeText, ...restProps } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        if (onChangeText) onChangeText(e.target.value);
    };

    return <Form.Control {...restProps} onChange={handleChange} />;
}

export default BsTextInput;
