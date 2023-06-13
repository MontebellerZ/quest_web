import "./styles.scss";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../api";
import { ERROR_UNKNOWN, ERROR_LOGIN_REQUIRED } from "../../config/errorMessages";
import BsTextInput from "../../components/BsTextInput";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";
import { HiOutlineHashtag } from "react-icons/hi";
import LoadingIcon from "../../components/LoadingIcon";
import ModalForgotPassword from "../../modal/ModalForgotPassword";
import ModalRegister from "../../modal/ModalRegister";

function LoginPage() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleVisibility = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nickname || !password) return toast.error(ERROR_LOGIN_REQUIRED);

        setLoading(true);

        Api.Login(nickname, password)
            .then((nickname) => {
                navigate("/home");
                toast.success(`Salve, ${nickname}!`);
            })
            .catch((err) => {
                setLoading(false);

                const message = err.response?.data?.message;
                if (!message) return toast.error(ERROR_UNKNOWN);

                toast.error(message);
            });
    };

    return (
        <div id="loginPage">
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputGroup.Text>
                        <HiOutlineHashtag />
                    </InputGroup.Text>

                    <FloatingLabel label="Nickname">
                        <BsTextInput
                            type="text"
                            placeholder="Nickname"
                            value={nickname}
                            onChangeText={setNickname}
                        />
                    </FloatingLabel>
                </InputGroup>

                <InputGroup>
                    <InputGroup.Text>
                        <GiPadlock />
                    </InputGroup.Text>

                    <FloatingLabel label="Senha">
                        <BsTextInput
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </FloatingLabel>

                    <Button variant="outline-secondary" onClick={handleVisibility}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                </InputGroup>

                <Button type="submit" variant="success">
                    <LoadingIcon className={!loading ? "invisible" : ""} />
                    <span className={loading ? "invisible" : ""}>Entrar</span>
                </Button>
            </form>

            <div className="loginPageLinks">
                <ModalForgotPassword />

                <ModalRegister />
            </div>
        </div>
    );
}

export default LoginPage;
