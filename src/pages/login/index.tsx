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
import { HiOutlineAtSymbol, HiOutlineHashtag } from "react-icons/hi";
import LoadingIcon from "../../components/LoadingIcon";
import { Modal } from "react-bootstrap";

function ModalForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const handleForgotPass = async () => {
        if (!email) return toast.error(ERROR_LOGIN_REQUIRED);

        setLoading(true);

        Api.ResetPassword(email)
            .then((mensagem) => {
                handleCloseModal();
                toast.success(mensagem);
            })
            .catch((err) => {
                const message = err.response?.data?.message;
                if (!message) return toast.error(ERROR_UNKNOWN);

                toast.error(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Button variant="link" className="loginPageForgotPass" onClick={handleShowModal}>
                Esqueci minha senha
            </Button>

            <Modal centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Esqueceu sua senha?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text>
                            <HiOutlineAtSymbol />
                        </InputGroup.Text>

                        <FloatingLabel label="Email cadastrado">
                            <BsTextInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </FloatingLabel>
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        id="modalSubmit"
                        type="submit"
                        variant="primary"
                        onClick={handleForgotPass}
                    >
                        <LoadingIcon className={!loading ? "invisible" : ""} />
                        <span className={loading ? "invisible" : ""}>Receber nova senha</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

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

                <ModalForgotPassword />
            </form>
        </div>
    );
}

export default LoginPage;
