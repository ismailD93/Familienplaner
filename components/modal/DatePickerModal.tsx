"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type FC, type ReactNode } from "react";
import useLockBodyScroll from "../../hooks/useLockedBody";

export interface DatePickerModalProps {
  onClose: () => void;
  onEditClick?: () => void;
  open: boolean;
  children: ReactNode;
  title?: string;
  onDelete?: () => void;
  share?: boolean;
}

const DatePickerModal: FC<DatePickerModalProps> = ({
  onClose,
  open,
  children,
}) => {
  useLockBodyScroll(open, false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 h-full bg-black-90"
            onClick={() => onClose()}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <div className="flex justify-center">
            <motion.div
              initial={{ top: "100%", translateY: "50%" }}
              animate={{ top: "50%", translateY: "-50%" }}
              exit={{ top: "100%", translateY: "50%" }}
              transition={{ duration: 0.6 }}
              className="fixed z-20 mx-auto px-10 text-green"
            >
              <div className="no-scrollbar mb-12 mt-7 flex flex-col text-green">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DatePickerModal;
