import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import ComponentButton from "../ComponentButton";

interface DialogProps {
  title: string;
  subTitle?: string;
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}

const ComponentDialog: React.FC<DialogProps> = ({ title, subTitle, onClose, onClick, open }) => {
  const finalRef = React.useRef(null);
  return (
    <AlertDialog isCentered isOpen={open} leastDestructiveRef={finalRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{subTitle}</AlertDialogBody>

          <AlertDialogFooter className="flex gap-2">
            <ComponentButton variant="outline" onClick={onClose} title="Cancelar" />
            <ComponentButton
              onClick={() => {
                onClick();
                onClose();
              }}
              title="Apagar"
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ComponentDialog;
