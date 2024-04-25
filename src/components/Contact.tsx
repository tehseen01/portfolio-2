import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { ArrowUpRight } from './Icons';
import { LineWrapper } from './ui/Animations';
import { Input, Textarea } from './ui/Input';
import { SectionHeader, SectionTitle } from './ui/Section';
import { Link } from 'react-router-dom';
import { About, SocialHandle } from '../utils/interfaces';
import { useSectionId } from '../utils/sectionContext';

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

    const { setSectionId } = useSectionId();
    const inView = useInView(containerRef);

    useEffect(() => {
        if (inView) setSectionId('contact');
    }, [inView]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({ ...prev, [name]: value }));
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
                <div className="row-span-2 bg-black p-6 md:p-10 rounded-2xl text-white/90 space-y-8">
                    <div className="text-4xl tracking-tighter">
                        Enter your <br /> contact info
                    </div>
                    <form className="grid grid-cols-2 gap-4">
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
                    </form>
                    <div className="col-span-2 mt-6">
                        <button className="flex items-center gap-4" disabled={checkEmptyForm !== 4}>
                            <div className="bg-white/20 rounded-full">
                                <motion.span
                                    transition={{ duration: 0.4 }}
                                    className="size-12 md:size-20 grid place-items-center text-primary rounded-full conic-progress"
                                >
                                    {checkEmptyForm === 4 && <ArrowUpRight className="text-white" />}
                                </motion.span>
                            </div>
                            {checkEmptyForm === 4 && <span className="text-2xl md:text-4xl tracking-tighter">Send Message</span>}
                        </button>
                    </div>
                </div>
                <div className=" bg-black p-4 md:p-8 rounded-2xl text-white/90 flex justify-between flex-col">
                    <div>
                        <p className="text-white/40 tracking-tighter pb-2">Have a cool project for us?</p>
                        <LineWrapper className=" group pt-10 mb-10 w-min">
                            <Link to={`mailto:${email}`} className="font-semibold text-2xl md:text-3xl lg:text-4xl">
                                {email}
                            </Link>
                        </LineWrapper>
                        <span className="text-white/50">{about.phoneNumber}</span>
                        <p className="text-white/50">{about.address}</p>
                    </div>
                    <div className="flex items-center justify-between text-white/50 pt-10 flex-wrap gap-4">
                        {socialHandles.map((social) => (
                            <Link to={social.url} target="_blank" key={social._id} className="p-2 border border-white/10 rounded-full px-4">
                                {social.platform}
                            </Link>
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
            <footer className="px-2 md:px-4 pt-10">
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
