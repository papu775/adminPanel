import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

export default function RegularModal({ showModal, setShowModal, selectedData, onChangeForm, SUBMIT, onClose }) {

    return (
        <>
            <Modal size="lg" active={showModal} toggler={() => setShowModal(false)} >
                <ModalHeader toggler={() => setShowModal(false)}>
                    Send Email
                </ModalHeader>
                <ModalBody>
                    <div >
                        <p className="text-base leading-relaxed text-gray-600 font-normal">
                            Message
                        </p>
                        
                        <textarea
                            name="message"
                            style={{
                                width: "100%",
                                height: 120,
                                backgroundColor: '#ccc',
                                padding: 5,
                                marginTop: 5,
                                marginBottom: 20,
                                borderRadius: 5,
                                outlineWidth: 2
                            }}
                            onFocus={e => e.target.style.outlineColor = 'green'}
                            onMouseOut={e => e.target.style.outlineColor = 'none'}
                            value={selectedData.message}
                            disabled
                        ></textarea>
                    </div>
                    <div>
                        <p className="text-base leading-relaxed text-gray-600 font-normal">
                            Reply Message
                        </p>
                        <textarea
                            id='message-textarea'
                            name="message"
                            style={{
                                width: "100%",
                                height: 120,
                                backgroundColor: '#ccc',
                                padding: 5,
                                borderRadius: 5,
                                marginTop: 5,
                                outlineWidth: 2
                            }}
                            onFocus={e => e.target.style.outlineColor = 'green'}
                            onMouseOut={e => e.target.style.outlineColor = 'none'}
                            onChangeCapture={(e) => onChangeForm(e)}
                        ></textarea>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={onClose}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => {
                            SUBMIT(e)
                            setShowModal(false)
                        }}
                        ripple="light"
                    >
                        Send
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}