import "./styles.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import Api from "../../api";
import { ERROR_UNKNOWN, ERROR_LOGIN_REQUIRED } from "../../config/errorMessages";
import BsTextInput from "../../components/BsTextInput";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { HiOutlineAtSymbol } from "react-icons/hi";
import LoadingIcon from "../../components/LoadingIcon";
import { Modal } from "react-bootstrap";

function ModalForgotPassword() {
    const [email, setEmail] = useState<string>("");

    const [showModal, setShowModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const clearFields = () => {
        setEmail("");
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        clearFields();
        setShowModal(false);
    };

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

            <Modal
                centered
                show={showModal}
                onHide={handleCloseModal}
                className="modalForgotPasswordHolder"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Esqueceu sua senha?</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalCenter">
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
                        className="modalSubmit"
                        type="submit"
                        variant="danger"
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

export default ModalForgotPassword;
