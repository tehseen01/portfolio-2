import { useRef } from 'react';
import { motion } from 'framer-motion';

import { formatDate } from '../utils';
import { Timeline as ITimeline } from '../utils/interfaces';
import { SectionHeader, SectionTitle } from './ui/Section';

interface TimelineProp {
    experience: ITimeline[];
    education: ITimeline[];
}

const Timeline = ({ experience, education }: TimelineProp) => {
    const containerRef = useRef(null);

    return (
        <section className="pb-10 " ref={containerRef}>
            <SectionHeader className="mb-10">
                <SectionTitle>Education</SectionTitle>
            </SectionHeader>
            <div className="space-y-5 px-2 md:px-8 pb-10">
                {education.map((timeline) => (
                    <TimelineCard key={timeline._id} timeline={timeline} />
                ))}
            </div>
            <SectionHeader className="mb-10">
                <SectionTitle>Experience</SectionTitle>
            </SectionHeader>
            <div className="space-y-5 px-2 md:px-8">
                {experience.map((timeline) => (
                    <TimelineCard key={timeline._id} timeline={timeline} />
                ))}
            </div>
        </section>
    );
};

export default Timeline;

interface CardProp {
    timeline: ITimeline;
}

const TimelineCard = ({ timeline }: CardProp) => {
    const inViewOpacity = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
    };
    return (
        <div>
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl md:text-6xl font-medium tracking-tight font-bebas">
                        {timeline.jobTitle.split('').map((char, index) => (
                            <motion.span
                                variants={inViewOpacity}
                                initial="initial"
                                whileInView="whileInView"
                                transition={{ delay: 0.05 * index }}
                                viewport={{ once: true }}
                                key={index}
                                className="whitespace-pre"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h3>
                    <motion.p
                        variants={inViewOpacity}
                        initial="initial"
                        whileInView="whileInView"
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="italic tracking-tight flex max-md:flex-col md:gap-2"
                    >
                        <span>{formatDate(timeline.startDate).month + ', ' + formatDate(timeline.startDate).year}</span>
                        <span className="max-md:hidden">-</span>
                        <span>{formatDate(timeline.endDate).month + ', ' + formatDate(timeline.endDate).year}</span>
                    </motion.p>
                </div>
                <motion.div
                    variants={inViewOpacity}
                    initial="initial"
                    whileInView="whileInView"
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                >
                    <span>{timeline.company_name}</span>
                    <span>{timeline.jobLocation}</span>
                </motion.div>
            </div>
            <motion.div className="overflow-hidden border-b border-border pb-4">
                <motion.p
                    variants={inViewOpacity}
                    initial="initial"
                    whileInView="whileInView"
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="py-2 max-sm:text-sm"
                >
                    {timeline.summary}
                </motion.p>
                <motion.ul
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="list-disc list-inside max-sm:text-sm"
                >
                    {timeline.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};
