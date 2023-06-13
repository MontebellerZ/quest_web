import "./styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import Api from "../../api";
import {
    ERROR_UNKNOWN,
    ERROR_REGISTER_REQUIRED,
    ERROR_PASSWORD_EQUAL,
} from "../../config/errorMessages";
import BsTextInput from "../../components/BsTextInput";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";
import { HiOutlineAtSymbol, HiOutlineHashtag } from "react-icons/hi";
import LoadingIcon from "../../components/LoadingIcon";
import { Modal } from "react-bootstrap";

function ModalRegister() {
    const [email, setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const clearFields = () => {
        setEmail("");
        setNickname("");
        setPassword("");
        setConfirmPassword("");
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        clearFields();
        setShowModal(false);
    };

    const handleShowPass = () => {
        setShowPassword((show) => !show);
    };
    const handleShowConfirmPass = () => {
        setShowConfirmPassword((show) => !show);
    };

    const handleRegister = async () => {
        if (!email || !nickname || !password) return toast.error(ERROR_REGISTER_REQUIRED);

        if (password !== confirmPassword) return toast.error(ERROR_PASSWORD_EQUAL);

        setLoading(true);

        Api.CreateUser(email, nickname, password)
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
            <Button variant="link" className="loginPageLink" onClick={handleShowModal}>
                Não tem login? Cadastre-se!
            </Button>

            <Modal
                centered
                show={showModal}
                onHide={handleCloseModal}
                className="modalRegisterHolder"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crie sua conta!</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalCenter">
                    <InputGroup>
                        <InputGroup.Text>
                            <HiOutlineAtSymbol />
                        </InputGroup.Text>

                        <FloatingLabel label="Email">
                            <BsTextInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </FloatingLabel>
                    </InputGroup>

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

                        <Button variant="outline-secondary" onClick={handleShowPass}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>
                            <GiPadlock />
                        </InputGroup.Text>

                        <FloatingLabel label="Confirme sua Senha">
                            <BsTextInput
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirme sua Senha"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </FloatingLabel>

                        <Button variant="outline-secondary" onClick={handleShowConfirmPass}>
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        className="modalSubmit"
                        type="submit"
                        variant="success"
                        onClick={handleRegister}
                    >
                        <LoadingIcon className={!loading ? "invisible" : ""} />
                        <span className={loading ? "invisible" : ""}>Cadastrar-se</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRegister;
