import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { ArrowUpRight } from './Icons';
import { LineWrapper } from './ui/Animations';
import { Input, Textarea } from './ui/Input';
import { SectionHeader, SectionTitle } from './ui/Section';
import { Link } from 'react-router-dom';
import { About, SocialHandle } from '../utils/interfaces';
import Button from './ui/Button';
import { toast } from 'sonner';

interface IContact {
    email: string;
    socialHandles: SocialHandle[];
    about: About;
}

const Contact = ({ email, socialHandles, about }: IContact) => {
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const containerRef = useRef(null);

    const MotionLink = motion(Link);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            ...formValues,
            toEmail: 'ayushbhardwaj5718@gmail.com',
            toName: about.name,
        };

        try {
            toast.success('Message send successfully!');
            console.log(body);
        } catch (error: any) {
            toast.warning(error.message);
            console.error('Error sending message:', error.message);
        }
    };

    const calculateFormProgress = () => {
        const totalFields = Object.keys(formValues).length;
        const filledFields = Object.values(formValues).filter((value) => value !== '').length;
        const progress = Math.floor((filledFields / totalFields) * 360); // Ensure integer value for CSS deg unit
        return `${progress}deg`;
    };

    // Update form-prog style dynamically based on formValues
    useEffect(() => {
        const formProgress = calculateFormProgress();
        document.documentElement.style.setProperty('--form-prog', formProgress);
    }, [formValues]); // Re-run useEffect whenever formValues change

    const checkEmptyForm = Object.values(formValues).filter((value) => value !== '').length;

    return (
        <section className="pt-10 relative" id="contact" ref={containerRef}>
            <SectionHeader className="relative">
                <SectionTitle>Let's get started</SectionTitle>
            </SectionHeader>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 pt-10 px-2 md:px-4">
                <form className="row-span-2 bg-black p-6 md:p-10 rounded-2xl text-white/90 space-y-8" onSubmit={handleSubmit} autoComplete="off">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, type: 'sp' }}
                        viewport={{ once: true }}
                        className="text-4xl tracking-tighter"
                    >
                        Enter your <br /> contact info
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4">
                        <LineWrapper>
                            <Input placeholder="Full name" name="fullName" onChange={handleOnChange} />
                        </LineWrapper>
                        <LineWrapper>
                            <Input placeholder="Email" type="email" name="email" onChange={handleOnChange} />
                        </LineWrapper>
                        <LineWrapper className="col-span-2">
                            <Input placeholder="Subject" name="subject" type="text" className="col-span-2" onChange={handleOnChange} />
                        </LineWrapper>
                        <LineWrapper className="col-span-2">
                            <Textarea placeholder="Message" name="message" className="col-span-2" onChange={handleOnChange} />
                        </LineWrapper>
                    </div>
                    <div className="col-span-2 mt-6">
                        <button className="flex items-center gap-4 group" disabled={checkEmptyForm !== 4}>
                            <div className="bg-white/20 rounded-full size-12 md:size-20 grid place-items-center text-primary relative overflow-hidden z-10">
                                <span className="absolute inset-0 w-full h-full bg-primary translate-y-full group-hover:translate-y-0 transition-transform -z-10 rounded-full" />
                                <motion.span transition={{ duration: 0.4 }} className="overflow-hidden relative">
                                    <ArrowUpRight className="text-white group-hover:-translate-y-full transition-transform" />
                                    <ArrowUpRight className="text-white absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform" />
                                </motion.span>
                            </div>
                            {checkEmptyForm === 4 && (
                                <SectionTitle className="text-2xl md:text-4xl tracking-tighter font-inter">Send Message</SectionTitle>
                            )}
                        </button>
                    </div>
                </form>
                <div className=" bg-black p-4 md:p-8 rounded-2xl text-white/90 flex justify-between flex-col">
                    <div>
                        <p className="text-white/40 tracking-tighter pb-2">Have a cool project for us?</p>
                        <LineWrapper className=" group pt-10 mb-10 w-min">
                            <MotionLink to={`mailto:${email}`} className="font-semibold text-2xl md:text-3xl lg:text-4xl">
                                {email.split('').map((char, index) => (
                                    <motion.span
                                        initial={{ x: 16 }}
                                        whileInView={{ x: 0 }}
                                        transition={{ delay: 0.1 * index, type: 'spring' }}
                                        viewport={{ once: true }}
                                        key={index}
                                        className="whitespace-pre"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </MotionLink>
                        </LineWrapper>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                            viewport={{ once: true }}
                            className="text-white/50"
                        >
                            {about.phoneNumber}
                        </motion.span>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                            viewport={{ once: true }}
                            className="text-white/50"
                        >
                            {about.address}
                        </motion.p>
                    </div>
                    <div className="flex items-center justify-between text-white/50 pt-10 flex-wrap gap-4">
                        {socialHandles.map((social, index) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 * index, type: 'spring' }}
                                viewport={{ once: true }}
                                key={social._id}
                            >
                                <Button className="size-auto">
                                    <Link to={social.url} target="_blank" className="p-2 border border-white/10 rounded-full px-4 z-10">
                                        {social.platform}
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="bg-black p-4 md:p-8 rounded-2xl flex flex-col gap-10">
                    <p className="text-white/50 text-3xl tracking-tighter">{about.quote}</p>
                    <div className="flex items-center gap-3">
                        <img
                            src={about.avatar.url}
                            alt={about.name}
                            width={60}
                            height={60}
                            className="aspect-square rounded-full object-cover row-span-2"
                        />
                        <div>
                            <span className="text-white text-xl block">{about.name}</span>
                            <span className="text-white/30 text-sm font-light block">{about.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="px-2 md:px-4">
                <div className="flex items-center justify-between py-4">
                    <p>{new Date().getFullYear()} &copy; ThePortfolio</p>
                    <Link to={'https://twitter.com/tehseen_type'} target="_blank" className="hover:underline">
                        @tehseen_type
                    </Link>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
