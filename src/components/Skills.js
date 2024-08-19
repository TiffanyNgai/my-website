import React, { useState } from 'react';

const skillsData = [
    { skill: 'Python', category: 'programming', level: 'advanced' },
    { skill: 'C', category: 'programming', level: 'intermediate' },
    { skill: 'C++', category: 'programming', level: 'intermediate' },
    { skill: 'Matlab', category: 'programming', level: 'beginner' },
    { skill: 'SQL', category: 'programming', level: 'beginner' },
    { skill: 'Git', category: 'programming', level: 'intermediate' },
    { skill: 'Excel VBA', category: 'data-analysis', level: 'intermediate' },
    { skill: 'Pandas', category: 'data-analysis', level: 'advanced' },
    { skill: 'NumPy', category: 'data-analysis', level: 'advanced' },
    { skill: 'Linear Algebra', category: 'mathematics', level: 'advanced' },
    { skill: 'Multivariable Calculus', category: 'mathematics', level: 'advanced' },
    { skill: 'Keras', category: 'machine-learning', level: 'advanced' },
    { skill: 'TensorFlow', category: 'machine-learning', level: 'advanced' },
    { skill: 'PyTorch', category: 'machine-learning', level: 'intermediate' },
    { skill: 'Natural Language Processing', category: 'machine-learning', level: 'intermediate' },
    { skill: 'Computer Vision', category: 'machine-learning', level: 'beginner' },
    { skill: 'Google Cloud Platform', category: 'machine-learning', level: 'intermediate' },
    { skill: 'SHAP', category: 'machine-learning', level: 'intermediate' },
    { skill: 'Multimodal Model', category: 'machine-learning', level: 'intermediate' },
    { skill: 'Slurm', category: 'programming', level: 'intermediate' },
    { skill: 'Transformers', category: 'machine-learning', level: 'advanced' },
    { skill: 'React', category: 'web-development', level: 'beginner' },
    { skill: 'Django', category: 'web-development', level: 'beginner' },
    { skill: 'Docker', category: 'programming', level: 'beginner' },
    { skill: 'SolidWorks', category: 'programming', level: 'beginner' }
];

const filterCategories = [
    { name: 'All', category: 'all', count: skillsData.length },
    { name: 'Programming', category: 'programming', count: skillsData.filter(skill => skill.category === 'programming').length },
    { name: 'Data Analysis', category: 'data-analysis', count: skillsData.filter(skill => skill.category === 'data-analysis').length },
    { name: 'Mathematics', category: 'mathematics', count: skillsData.filter(skill => skill.category === 'mathematics').length },
    { name: 'Machine Learning', category: 'machine-learning', count: skillsData.filter(skill => skill.category === 'machine-learning').length },
    { name: 'Web Development', category: 'web-development', count: skillsData.filter(skill => skill.category === 'web-development').length }
];

const SkillsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filterSkills = () => {
        return selectedCategory === 'all'
            ? skillsData
            : skillsData.filter(skill => skill.category === selectedCategory);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <section id="skills">
            <h2>Skills</h2>
            <div className="filter-container">
                <div className="filter-bar">
                    {filterCategories.map(category => (
                        <span
                            key={category.category}
                            className={`filter-item ${selectedCategory === category.category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.category)}
                        >
                            {category.name} <sup>{category.count}</sup>
                        </span>
                    ))}
                </div>
            </div>
            <div className="skills-grid">
                {filterSkills().length > 0 ? (
                    filterSkills().map((skillObj, index) => (
                        <div key={index} className={`skill-tag skill-${skillObj.level}`}>
                            {skillObj.skill}
                        </div>
                    ))
                ) : (
                    <p>No skills found for this category.</p>
                )}
            </div>
            <p style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'left', marginTop: '20px', color: '#cfcfcf' }}>
                *lighter colour = better
            </p>
        </section>
    );
};

export default SkillsSection;
