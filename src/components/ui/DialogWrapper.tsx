import { motion } from 'framer-motion';
import { menuBoxes } from '../../utils/animate';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { cn } from '../../utils/cn';

interface WrapperProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    className?: string;
}

const DialogWrapper = ({ open, setOpen, children, className }: WrapperProps) => {
    return (
        <div
            className="fixed inset-0 z-50 h-[calc(100dvh_-_5rem)] mb-3 mt-auto flex items-center justify-end gap-2 md:gap-3 px-2 md:px-4"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
            <motion.div
                variants={menuBoxes(open)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
                className={cn(
                    'w-full md:w-[500px] h-full bg-primary dark:text-background text-background rounded-xl p-10 flex flex-col justify-between',
                    className
                )}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default DialogWrapper;
