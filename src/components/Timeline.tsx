import { useEffect, useRef } from 'react';
import { formatDate } from '../utils';
import { Timeline as ITimeline } from '../utils/interfaces';
import { SectionHeader, SectionTitle } from './ui/Section';
import { useSectionId } from '../utils/sectionContext';
import { useInView } from 'framer-motion';

interface TimelineProp {
    timelines: ITimeline[];
}

const Timeline = ({ timelines }: TimelineProp) => {
    const containerRef = useRef(null);

    const { setSectionId } = useSectionId();
    const inView = useInView(containerRef);

    useEffect(() => {
        if (inView) setSectionId('about');
    }, [inView]);

    return (
        <section className="pb-10 " ref={containerRef}>
            <SectionHeader className="mb-10">
                <SectionTitle className="font">Experience History</SectionTitle>
            </SectionHeader>
            <div className="space-y-5 px-2 md:px-8">
                {timelines.map((timeline) => (
                    <div key={timeline._id} className="">
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-4xl md:text-6xl font-medium tracking-tight font-bebas">{timeline.jobTitle}</h3>
                                <p className="italic tracking-tight flex max-md:flex-col md:gap-2">
                                    <span>{formatDate(timeline.startDate).month + ', ' + formatDate(timeline.startDate).year}</span>
                                    <span className="max-md:hidden">-</span>
                                    <span>{formatDate(timeline.endDate).month + ', ' + formatDate(timeline.endDate).year}</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>{timeline.company_name}</span>
                                <span>{timeline.jobLocation}</span>
                            </div>
                            <p className="py-2 max-sm:text-sm">{timeline.summary}</p>
                        </div>
                        <ul className="list-disc list-inside max-sm:text-sm">
                            {timeline.bulletPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
