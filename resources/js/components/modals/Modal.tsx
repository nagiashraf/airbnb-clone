import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "@/components/Button";

type ModalProps = {
  isOpen?: boolean;
  title?: string;
  body?: React.JSX.Element;
  footer?: React.JSX.Element;
  actionLable: string;
  secondaryActionLable?: string;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
}

const Modal = ({
  isOpen,
  title,
  body,
  footer,
  actionLable,
  secondaryActionLable,
  disabled,
  onClose,
  onSubmit,
  secondaryAction
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); // delay for animations
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
          {/* CONTENT */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLable && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLable}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLable}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
