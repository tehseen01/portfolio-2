import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { About, SocialHandle } from '../utils/interfaces';
import { OpacityTextReveal } from './ui/Animations';
import { Link } from 'react-router-dom';

interface HeroProps {
    about: About;
    socialHandles: SocialHandle[];
}

const Hero = ({ about, socialHandles }: HeroProps) => {
    const [toggleProjects, setToggleProjects] = useState(false);
    const container = useRef(null);

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
            <div className="absolute top-60 -left-10 blur-[200px] -z-10 dark:hidden">
                <span className="inline-block h-48 w-64 rounded-full bg-[#003cd5]"></span>
                <span className="inline-block h-48 w-64 rounded-full bg-[#00ffa3] translate-y-28 -translate-x-28"></span>
                <span className="inline-block h-48 w-64 rounded-full bg-[#ff8a00] -translate-x-48"></span>
            </div>
            <div className="h-[calc(100dvh_-_3.5rem)] md:h-[calc(100dvh_-_3rem)] flex flex-col justify-between px-2 md:p-8 border-b border-border">
                <div className="flex items-center justify-between max-md:justify-center max-md:flex-col-reverse max-md:gap-4 max-md:pt-10">
                    <h1 className="">
                        <span className="text-[2.5rem] md:text-[5rem] leading-none font-thin tracking-tighter overflow-hidden inline-block">
                            {"I'm".split('').map((char, index) => (
                                <motion.span
                                    initial={{ y: '100%' }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="whitespace-pre inline-block hoverText"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>{' '}
                        <span className="text-[2.5rem] md:text-[5rem] leading-none font-thin tracking-tighter overflow-hidden inline-block">
                            {about.name.split('').map((char, index) => (
                                <motion.span
                                    initial={{ y: '100%' }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="whitespace-pre inline-block hoverText"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <div className="inline-flex md:pl-5 items-center md:justify-center max-md:flex">
                            <motion.img
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                                src={about.avatar.url}
                                alt={about.name}
                                width={90}
                                height={90}
                                className="inline aspect-square rounded-xl object-cover origin-center"
                            />
                        </div>
                        <span className="text-5xl md:text-[8rem] leading-none font-light tracking-tight font-bebas block overflow-hidden text-primary">
                            {about.title.split('').map((char, index) => (
                                <motion.span
                                    initial={{ y: '100%' }}
                                    whileInView={{ y: 0 }}
                                    transition={{ delay: 0.5 + 0.02 * index, type: 'spring', bounce: 0.2 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="whitespace-pre inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="text-[2.5rem] md:text-[5rem] leading-none font-thin tracking-[-0.1em] md:pr-48 inline-block overflow-hidden">
                            {about.subTitle.split('').map((char, index) => (
                                <motion.span
                                    initial={{ y: '100%', opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + 0.01 * index, type: 'spring', bounce: 0.2 }}
                                    viewport={{ once: true }}
                                    key={index}
                                    className="whitespace-pre inline-block hoverText"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-between max-md:gap-8  max-md:py-10"
                >
                    <div className="flex items-center md:justify-center gap-4 max-md:w-full max-md:hidden">
                        <motion.div className="grid size-10 md:size-16 bg-black/90 rounded-full text-white place-items-center text-lg md:text-3xl relative">
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
                        </motion.div>

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
                    </div>
                    <ul className="flex items-center justify-center gap-5 pt-4">
                        {socialHandles.map((social, index) => (
                            <motion.li
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                                viewport={{ once: true }}
                                key={social._id}
                            >
                                <Link to={social.url} target="_blank">
                                    <span>{social.platform}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
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
