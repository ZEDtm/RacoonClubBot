import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalProvider.module.css'
import Icons from "../../ui/Icons/Icons";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [modalLabel, setModalLabel] = useState("Уведомление");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUnSuccess, setUnSuccess] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isInfo, setInfo] = useState(false);



    const openModal = ({ success = false, unSuccess = false, info = false, content, label}) => {
        setModalContent(content);
        setModalLabel(label);
        setSuccess(success);
        setInfo(info);
        setUnSuccess(unSuccess);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Modal isOpen={isModalOpen} isSuccess={isSuccess} isUnSuccess={isUnSuccess} isInfo={isInfo} label={modalLabel} onClose={closeModal}>
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    );
};

const Modal = ({ isOpen, onClose, children, isSuccess, isUnSuccess, isInfo, label }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={isSuccess ? styles.modalHeaderSuccess: isUnSuccess ? styles.modalHeaderUnSuccess: isInfo ? styles.modalHeaderInfo : styles.modalHeaderInfo}>
                </div>
                <div className={styles.modalLabel}>{label}</div>
                <div className={styles.modalInfo}>
                    <span className={styles.modalIcon}>
                        {isSuccess ? <Icons type="success" width="2rem" height="2rem" color="#008000FF" />:
                            isUnSuccess ? <Icons type="unSuccess" width="2rem" height="2rem" color="#DC143CFF" /> :
                                isInfo ? <Icons type="info" width="2rem" height="2rem" color="#DAA520FF" />:
                            <Icons type="info" width="2rem" height="2rem" color="#DAA520FF"/>}
                    </span>
                    <div className={styles.modalContent}>{children}</div>
                </div>
                <div className={styles.modalButton}>
                    <button className={styles.buttonClose} onClick={onClose}>OK</button>
                </div>
            </div>
        </div>,
        document.getElementById('app')
    );
};