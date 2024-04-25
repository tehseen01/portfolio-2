import { Link } from 'react-router-dom';

import { Service } from '../utils/interfaces';
import { ArrowUpRight } from './Icons';
import { SectionHeader, SectionTitle } from './ui/Section';
import Button from './ui/Button';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useSectionId } from '../utils/sectionContext';

interface IServices {
    services: Service[];
}

const Services = ({ services }: IServices) => {
    const containerRef = useRef(null);

    const { setSectionId } = useSectionId();
    const inView = useInView(containerRef);

    useEffect(() => {
        if (inView) setSectionId('services');
    }, [inView]);

    return (
        <section className="" id="services" ref={containerRef}>
            <SectionHeader className="my-10">
                <SectionTitle>Services</SectionTitle>
            </SectionHeader>
            <div className="max-md:space-y-4 px-2 md:px-4">
                {services.map((service, index) => (
                    <div
                        key={service._id}
                        className="px-4 md:px-10 border border-border rounded-xl md:sticky bg-background"
                        style={{ top: 70 + index * 18 }}
                    >
                        <div className="py-3 md:py-4 border-b border-border flex items-center justify-between">
                            <h3 className="text-2xl md:text-6xl font-medium tracking-tighter">{service.name}</h3>
                            <Button className="size-12">
                                <Link to={'#contact'} className="relative z-10">
                                    <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between py-4 max-md:flex-col-reverse max-md:gap-4">
                            <div className="flex md:items-start items-center flex-col gap-4">
                                <p className="text-xl md:text-2xl tracking-tighter md:w-3/4 max-md:text-center">{service.desc}</p>
                                <Button className="size-auto px-4 py-3">
                                    <Link to={'#contact'} className="flex items-center justify-center gap-1 relative z-10 ">
                                        <ArrowUpRight /> Learn More
                                    </Link>
                                </Button>
                            </div>
                            <img src={service.image.url} width={300} height={300} loading="lazy" alt={service.name} className="rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
