import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Spinner,
  Center,
} from "@chakra-ui/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const ComponentModal: React.FC<ModalProps> = ({
  onClose,
  open,
  title,
  loading = false,
  children,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={open}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {loading && (
            <div className="absolute w-full h-full flex items-center justify-center bg-white bg-opacity-75">
              <Center height="200px" className="flex flex-col gap-2">
                <Spinner size="lg" />
                <p>Salvando..</p>
              </Center>
            </div>
          )}
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentModal;
