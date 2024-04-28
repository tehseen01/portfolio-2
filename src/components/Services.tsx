import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import { Service } from '../utils/interfaces';
import { ArrowUpRight } from './Icons';
import { SectionHeader, SectionTitle } from './ui/Section';
import Button from './ui/Button';

interface IServices {
    services: Service[];
}

const Services = ({ services }: IServices) => {
    const containerRef = useRef(null);

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
                            <h3 className="text-2xl md:text-6xl font-medium tracking-tighter">
                                {service.name.split('').map((char, index) => (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.05 * index }}
                                        viewport={{ once: true }}
                                        key={index}
                                        className="whitespace-pre"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </h3>
                            <Button className="size-12">
                                <Link to={'#contact'} className="relative z-10">
                                    <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between py-4 max-md:flex-col-reverse max-md:gap-4">
                            <div className="flex md:items-start items-center flex-col gap-4">
                                <motion.p
                                    initial={{ y: 16, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    viewport={{ once: true }}
                                    className="text-xl md:text-2xl tracking-tighter md:w-3/4 max-md:text-center"
                                >
                                    {service.desc}
                                </motion.p>
                                <motion.div
                                    initial={{ y: 16, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    viewport={{ once: true }}
                                >
                                    <Button className="size-auto px-4 py-3">
                                        <Link to={'#contact'} className="flex items-center justify-center gap-1 relative z-10 ">
                                            <ArrowUpRight /> Learn More
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                            <motion.img
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                viewport={{ once: true }}
                                src={service.image.url}
                                width={300}
                                height={300}
                                loading="lazy"
                                alt={service.name}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
