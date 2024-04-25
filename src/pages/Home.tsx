import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Services from '../components/Services';
import { User } from '../utils/interfaces';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import Cursor from '../components/Cursor';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

function Home() {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const userId = '65b3a22c01d900e96c4219ae'; //John doe

    const BASE_URL = 'https://portfolio-backend-30mp.onrender.com/api/v1';

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.cookie = `portfolio-name=portfolio1`;
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get/user/${params?.user ?? userId}`);

                const userData = await response.json();

                document.title = `${userData?.user?.about?.name + ' - ' + userData?.user?.about?.title}`;
                setUser(userData?.user);
                setIsLoading(false);
                document.body.classList.remove('loaded');
            } catch (error) {
                navigate('/');
                setIsLoading(true);
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [params?.user, userId, navigate]);

    useEffect(() => {
        if (location.hash) {
            const targetElement = document.querySelector(location.hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else if (!location.hash && location.pathname === '/') {
            scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center text-center">Loading..</div>;
    }

    if (!user) return;

    const filteredServices = user?.services?.filter((item) => item.enabled);
    const sortedFilteredSkills = user?.skills?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const filteredSocialHandles = user?.social_handles?.filter((item) => item.enabled);
    const filteredTestimonials = user?.testimonials?.filter((item) => item.enabled);
    const sortedFilteredProject = user?.projects?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const filteredExperience = user?.timeline?.filter((item) => !item.forEducation && item.enabled);

    return (
        <>
            <Cursor />
            <Header />
            <div className="md:grid grid-cols-[calc(100%-4rem)_4rem] divide-x divide-border">
                <div>
                    <Hero about={user.about} />
                    <Timeline timelines={filteredExperience} />
                    <Skills skills={sortedFilteredSkills} />
                    <Projects projects={sortedFilteredProject} />
                    <Services services={filteredServices} />
                    <Testimonials testimonials={filteredTestimonials} />
                    <Contact email={user.email} socialHandles={filteredSocialHandles} about={user.about} />
                </div>
                <Sidebar socialHandle={filteredSocialHandles} />
            </div>
        </>
    );
}

export default Home;
