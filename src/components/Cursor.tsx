import { useMotionValue, useSpring, motion, Variants } from 'framer-motion';
import { useEffect } from 'react';

import { useVariants } from '../utils/useVariants';

const Cursor = () => {
    const { variant } = useVariants();

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 100 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                // Update position only on animation frame
                cursorX.set(e.clientX - (['NEXT', 'PREV'].includes(variant) ? 50 : 8)); // Adjust offset based on variant
                cursorY.set(e.clientY - (['NEXT', 'PREV'].includes(variant) ? 50 : 8));
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    const variants: Variants = {
        DEFAULT: {
            width: 16,
            height: 16,
            mixBlendMode: 'difference',
        },
        PROJECT: {
            height: 100,
            width: 100,
            backgroundColor: 'hsl(var(--primary))',
            color: 'white',
        },
        CLOSE: {
            height: 100,
            width: 100,
            backgroundColor: 'hsl(var(--primary))',
            color: 'white',
        },
        PREV: {
            width: 100,
            height: 100,
            color: 'white',
            backgroundColor: 'hsl(var(--primary))',
        },
        NEXT: {
            width: 100,
            height: 100,
            color: 'white',
            backgroundColor: 'hsl(var(--primary))',
        },
    };

    return (
        <motion.div
            variants={variants}
            animate={variant}
            style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
            className="fixed top-0 left-0 size-4 rounded-full bg-white grid place-items-center z-50 pointer-events-none max-md:hidden"
        >
            <span>
                {variant === 'PREV' ? 'prev' : variant === 'NEXT' ? 'next' : variant === 'PROJECT' ? 'detail' : variant === 'CLOSE' ? 'close' : ''}
            </span>
        </motion.div>
    );
};

export default Cursor;
