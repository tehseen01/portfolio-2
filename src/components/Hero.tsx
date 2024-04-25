import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, Variant } from 'framer-motion';

import { About } from '../utils/interfaces';
import { OpacityTextReveal } from './ui/Animations';
import { useSectionId } from '../utils/sectionContext';

interface HeroProps {
    about: About;
}

const Hero = ({ about }: HeroProps) => {
    const [toggleProjects, setToggleProjects] = useState(false);
    const container = useRef(null);

    const { scrollYProgress } = useScroll({ target: container });

    const xLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
    const xRight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const scaleX = useTransform(scrollYProgress, [0, 1], [1, 2]);

    const { setSectionId } = useSectionId();
    const inView = useInView(container);

    useEffect(() => {
        if (inView) setSectionId('home');
    }, [inView]);

    useEffect(() => {
        const interval = setInterval(() => {
            setToggleProjects(!toggleProjects);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [toggleProjects]);

    const variants = {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '-100%' },
    };

    return (
        <main className="overflow-hidden" ref={container}>
            <div className="h-[calc(100dvh_-_3.5rem)] md:h-[calc(100dvh_-_3rem)] flex flex-col justify-between px-2 md:p-8 border-b border-border">
                <div className="pt-10 sm:pt-20">
                    <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[9rem] tracking-tight leading-none font-medium font-bebas flex sm:items-center justify-between gap-2 max-md:flex-col ">
                        <motion.span style={{ translateX: xLeft }} className="flex-1 text-nowrap">
                            Hello, I'm
                        </motion.span>{' '}
                        <motion.span style={{ scaleX }} className="inline-block flex-1 h-4 bg-foreground max-md:hidden" />
                        <motion.span style={{ translateX: xRight }} className="flex-1 text-nowrap">
                            {about.name}
                        </motion.span>
                    </h2>
                    <h1 className="text-8xl md:text-8xl lg:text-9xl xl:text-[9rem] tracking-tight leading-none text-primary font-bebas font-medium">
                        {about.title}
                    </h1>
                </div>
                <div className="flex justify-between items-end max-md:flex-col max-md:gap-8  max-md:py-10">
                    <div className="flex items-center md:justify-center gap-4 max-md:w-full">
                        <div className="grid size-10 md:size-20 bg-black/90 rounded-full text-white place-items-center text-lg md:text-3xl relative">
                            <AnimatePresence>
                                {toggleProjects && (
                                    <motion.span
                                        variants={variants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        {about.some_total}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {!toggleProjects && (
                                    <motion.span variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
                                        {about.exp_year}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative grid place-items-center h-10">
                            {toggleProjects && (
                                <motion.span
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                    className="md:text-xl block tracking-tight"
                                >
                                    Delivered successful projects.
                                </motion.span>
                            )}
                            <AnimatePresence>
                                {!toggleProjects && (
                                    <motion.span
                                        variants={variants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5 }}
                                        className="md:text-xl tracking-tight absolute inset-y-0 left-0 flex items-center justify-center text-nowrap"
                                    >
                                        Years in the market.
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>{' '}
                    <h2 className="text-2xl md:text-4xl md:text-end text-balance md:w-2/5 ml-auto tracking-tight ">{about.subTitle}</h2>
                </div>
            </div>
            <div id="about">
                <p className="text-2xl md:text-5xl leading-tight text-balance font-medium tracking-tighter py-20 px-2 md:px-8 ">
                    <OpacityTextReveal>{about.description}</OpacityTextReveal>
                </p>
            </div>
        </main>
    );
};

export default Hero;
