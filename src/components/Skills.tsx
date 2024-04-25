import { Skill } from '../utils/interfaces';
import InfiniteScroll from './ui/InfiniteScroll';

interface ISkills {
    skills: Skill[];
}
const Skills = ({ skills }: ISkills) => {
    return (
        <div className="space-y-3">
            <InfiniteScroll>
                {skills.map((skill) => (
                    <li
                        key={skill._id}
                        className="flex items-center justify-center py-3 md:py-6 px-4 md:px-8 rounded-full border border-border gap-2"
                    >
                        <span>
                            <img src={skill.image.url} alt={skill.name} loading="lazy" className="size-6 md:size-8" />
                        </span>
                        <span className="max-md:text-sm">{skill.name}</span>
                    </li>
                ))}
            </InfiniteScroll>
            <InfiniteScroll direction="left">
                {skills.map((skill) => (
                    <li
                        key={skill._id}
                        className="flex items-center justify-center py-3 md:py-6 px-4 md:px-8 rounded-full border border-border gap-2"
                    >
                        <span>
                            <img src={skill.image.url} alt={skill.name} loading="lazy" className="size-6 md:size-8" />
                        </span>
                        <span className="max-md:text-sm">{skill.name}</span>
                    </li>
                ))}
            </InfiniteScroll>
            <InfiniteScroll>
                {skills.map((skill) => (
                    <li
                        key={skill._id}
                        className="flex items-center justify-center py-3 md:py-6 px-4 md:px-8 rounded-full border border-border gap-2"
                    >
                        <span>
                            <img src={skill.image.url} alt={skill.name} loading="lazy" className="size-6 md:size-8" />
                        </span>
                        <span className="max-md:text-sm">{skill.name}</span>
                    </li>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default Skills;
