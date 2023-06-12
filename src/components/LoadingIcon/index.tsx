import "./styles.scss";
import { HTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingIcon(props: HTMLAttributes<HTMLDivElement>) {
    const { className, ...restProps } = props;
    return (
        <div {...restProps} className={"loadingIcon " + className}>
            <AiOutlineLoading3Quarters />
        </div>
    );
}

export default LoadingIcon;
