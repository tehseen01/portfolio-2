import { Link } from 'react-router-dom';
import { Project } from '../utils/interfaces';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github, XMark } from './Icons';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader, SectionTitle } from './ui/Section';
import { useMediaQuery } from '../utils/useMediaQuery';
import Button from './ui/Button';
import { useVariants } from '../utils/useVariants';
import { menuBoxes } from '../utils/animate';
import { useSectionId } from '../utils/sectionContext';

interface ProjectProps {
    projects: Project[];
}
const Projects = ({ projects }: ProjectProps) => {
    const [hover, setHover] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [openProject, setOpenProject] = useState<Project | null>(null);

    const containerRef = useRef(null);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const { setVariant } = useVariants();
    const { setSectionId } = useSectionId();

    const inView = useInView(containerRef);

    useEffect(() => {
        if (inView) setSectionId('projects');
    }, [inView]);

    const handleMouseEnter = (id: string) => {
        setHover(id);
        setVariant('PROJECT');
    };

    const handleMouseLeave = () => {
        setHover(null);
        setVariant('DEFAULT');
    };

    return (
        <section className="py-10" id="work" ref={containerRef}>
            <SectionHeader>
                <SectionTitle>Selected work</SectionTitle>
            </SectionHeader>
            <div className="px-2 md:px-4">
                <motion.div className="grid sm:grid-cols-2 gap-4 md:gap-8 py-10">
                    {projects.slice(0, showMore ? projects.length : 4).map((project) => (
                        <motion.div
                            key={project._id}
                            className="relative rounded-xl group overflow-hidden"
                            onMouseEnter={() => handleMouseEnter(project._id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setOpenProject(project)}
                        >
                            <div className="space-y-2 pb-4">
                                <h3 className="text-4xl tracking-tighter font-medium">{project.title}</h3>
                                <div className="flex gap-2 flex-wrap items-center">
                                    {project.techStack.map((stack, index) => (
                                        <motion.span key={index} className="px-2 py-1 rounded-full text-sm border border-black/30">
                                            {stack}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <motion.img
                                    animate={isMobile ? { scale: 1 } : hover === project._id ? { scale: 1.05 } : { scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    src={project.image.url}
                                    alt={project.title}
                                    loading="lazy"
                                    className="object-cover aspect-video"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <AnimatePresence>
                    {openProject && (
                        <div
                            className="fixed inset-0 md:w-[calc(100%_-_4rem)] z-50 h-[calc(100dvh_-_5rem)] mb-3 mt-auto flex items-center justify-end gap-2 md:gap-3 px-2 md:px-4"
                            onClick={(e) => e.target === e.currentTarget && setOpenProject(null)}
                        >
                            <motion.div
                                variants={menuBoxes(openProject && true)}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="w-full md:w-[500px] h-full bg-black text-background rounded-xl p-4 md:p-10 flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-end md:hidden">
                                    <button onClick={() => setOpenProject(null)}>
                                        <XMark />
                                    </button>
                                </div>
                                <img src={openProject?.image.url} alt={openProject?.title} className="aspect-video rounded-xl object-cover" />
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-3xl tracking-tighter flex-1">{openProject.title}</h3>
                                    <Button className="bg-white/90 text-black">
                                        <Link to={openProject.githuburl} target="_blank" className="relative z-10">
                                            <Github />
                                        </Link>
                                    </Button>
                                    <Button className="bg-white/90 text-black">
                                        <Link to={openProject.liveurl} target="_blank" className="relative z-10">
                                            <ArrowUpRight />
                                        </Link>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    {openProject.techStack.map((stack, index) => (
                                        <motion.span key={index} className="px-2 py-1 rounded-full text-sm border border-white/30">
                                            {stack}
                                        </motion.span>
                                    ))}
                                </div>
                                <p className="text-white/60">{openProject.description}</p>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-center">
                    <motion.button
                        whileHover="hover"
                        initial="initial"
                        onClick={() => setShowMore(!showMore)}
                        className="py-6 px-8 rounded-full bg-black text-white flex items-center justify-center gap-4"
                    >
                        <motion.span className="">{showMore ? 'show less' : 'show more'}</motion.span>
                        <div className="flex items-center justify-center relative overflow-hidden">
                            <motion.span
                                variants={{ initial: { x: -20 }, hover: { x: 0 } }}
                                transition={{ type: 'spring', bounce: 0.3 }}
                                className="absolute left-0"
                            >
                                <ArrowUpRight className="rotate-45" />
                            </motion.span>
                            <motion.span
                                variants={{ initial: { x: 0 }, hover: { x: 20 } }}
                                transition={{ type: 'spring', bounce: 0.3 }}
                                className="inline-block"
                            >
                                <ArrowUpRight className="rotate-45" />
                            </motion.span>
                        </div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Projects;