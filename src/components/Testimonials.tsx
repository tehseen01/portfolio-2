import { useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { Testimonial } from '../utils/interfaces';
import { motion } from 'framer-motion';
import { useVariants } from '../utils/useVariants';

interface TestimonialProps {
    testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialProps) => {
    const [activeCard, setActiveCard] = useState(0);
    const { setVariant } = useVariants();
    const containerRef = useRef(null);

    const handleNextClick = () => {
        setActiveCard((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const handlePrevClick = () => {
        setActiveCard((prev) => (prev === 0 ? 0 : prev - 1));
    };

    return (
        <section className="relative" ref={containerRef}>
            <div className="absolute top-0 left-0 w-full h-[calc(100%_-_3rem)] grid grid-cols-2 z-10 max-md:hidden">
                {activeCard > 0 ? (
                    <button
                        className="relative"
                        onClick={handlePrevClick}
                        onMouseEnter={() => setVariant('PREV')}
                        onMouseLeave={() => setVariant('DEFAULT')}
                    />
                ) : (
                    <span></span>
                )}
                <button
                    className="relative"
                    onClick={handleNextClick}
                    onMouseEnter={() => setVariant('NEXT')}
                    onMouseLeave={() => setVariant('DEFAULT')}
                />
            </div>
            <div className="md:pl-20 py-10 overflow-hidden flex relative">
                <motion.div
                    initial={{ x: 0 }}
                    animate={activeCard > 0 ? { x: `calc(-24rem * ${activeCard})` } : { x: 0 }}
                    transition={{ duration: 0.8, bounce: 0.2, type: 'spring' }}
                    className="flex flex-nowrap shrink-0 divide-x divide-black/10"
                >
                    <div className="aspect-square bg-white p-4 md:p-8 w-[24rem] md:w-[28rem] flex gap-8 justify-center items-center flex-col">
                        <h3 className="text-6xl font-black tracking-tighter text-black/70">
                            What our <br /> client say
                        </h3>
                        <span className="text-xl font-extrabold text-black/30">{testimonials.length} Reviews</span>
                    </div>
                    {testimonials.map((test) => (
                        <div
                            key={test._id}
                            className="aspect-square bg-white p-4 md:p-8 w-[24rem] md:w-[28rem] flex justify-between flex-col snap-center"
                        >
                            <p className="text-lg md:text-xl max-md:leading-none tracking-tighter text-black/30 font-extrabold flex flex-wrap gap-1">
                                "
                                {test.review.split(' ').map((words, index) => (
                                    <span key={index} className={cn(testimonialKeywords.includes(words.toLowerCase()) && 'text-black/90')}>
                                        {words}
                                    </span>
                                ))}
                                "
                            </p>
                            <div className="flex flex-col">
                                <span className="text-xl font-semibold tracking-tight">{test.name}</span>
                                <span className="text-black/50 font-medium tracking-tight">{test.position}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex items-center justify-center gap-3">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={cn('size-2 rounded-full bg-black/20 dark:bg-white/50', activeCard === index && 'bg-black dark:bg-white')}
                        onClick={() => setActiveCard(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;

const testimonialKeywords = [
    'communication',
    'high-quality',
    'design',
    'ui/ux',
    'user-friendly',
    'highly',
    'professionalism',
    'problem-solving',
    'work',
    'ethic',
    'creativity',
    'skilled',
    'developer',
    'technical',
    'skills',
    'coding',
    'ability',
    'software',
    ' development',
    'process',
    'technical',
    'expertise',
    'artistic',
    'vision',
    'professionalism',
    'writing',
    'ability',
    'editing',
    'skills',
    'content',
    'expertise',
    'talented',
    'impressive',
    'top-notch',
    'exceptional',
    'outstanding',
    'reliable',
    'dependable',
    'excellent',
    'communicator',
    'clear',
    'articulate',
    'collaborative',
    'easy to work with',
    'professional',
    'reliable',
    'dependable',
    'trustworthy',
    'punctual',
    'organized',
    'problem',
    'solver',
    'critical',
    'thinker',
    'resourceful',
    'analytical',
    'proactive',
    'hard-working',
    'dedicated',
    'motivated',
    'passionate',
    'results-oriented',
    'creative',
    'innovative',
    'imaginative',
    'original',
    'insightful',
    'proficient in',
    'knowledgeable',
    'experienced',
    'well-versed',
    'Agile',
    'Scrum',
    'Waterfall',
    'DevOps',
    'version',
    'control',
    'mastery',
    'lighting',
    'composition',
    'post-processing',
    'knowledgeable in',
    'recommend',
    'exceeded',
    'expectations',
    'pleasure',
    'work with',
    'valuable',
    'asset',
];
