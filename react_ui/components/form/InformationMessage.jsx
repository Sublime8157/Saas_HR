import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";

const InformationMessage = ({ open, onClose, header, message, onConfirm  }) => {
  return (
    <Modal variant="small" open={open} onClose={onClose}>
      <div className=" flex text-sm flex-col">
        <div className="self-start gap-2 font-bold flex flex-row justify-between">
          <span>{header}</span>
          <span className="text-lg text-red-700">
            <ion-icon name="alert-circle-outline"></ion-icon>
          </span>
        </div>
        <div>{message}</div>
        <div className="mt-4 text-xs flex flex-col gap-1">
          <Button
            variant="outline"
            onClick={onConfirm}
          >
            Confirm
          </Button>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InformationMessage;
