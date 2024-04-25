import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { HTMLAttributes, ReactNode, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ILineWrapper {
    children: ReactNode;
    className?: string;
}

const LineWrapper = ({ children, className }: ILineWrapper) => {
    const [hover, setHover] = useState(false);

    return (
        <motion.div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={cn('relative', className)}>
            {children}
            <motion.div className="absolute bottom-0 left-0 w-full h-px bg-white/20 overflow-hidden">
                <AnimatePresence>
                    {hover && (
                        <motion.div
                            key="line"
                            initial={{ x: '-100%' }}
                            animate={hover ? { x: '0%' } : { x: '-100%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, bounce: 0.1 }}
                            className="w-full h-full bg-white/90"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export const OpacityTextReveal = (props: HTMLAttributes<HTMLSpanElement>) => {
    const textRef = useRef(null);

    useGSAP(
        () => {
            gsap.to(textRef.current, {
                backgroundPositionX: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: textRef.current,
                    scrub: 1,
                    start: 'top bottom',
                    end: 'bottom center',
                },
            });
        },
        { revertOnUpdate: true }
    );

    return <span {...props} ref={textRef} className={cn('text-reveal', props.className)} />;
};

export { LineWrapper };
