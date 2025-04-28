import React, { useState } from 'react';

const skillsData = [
    // Programming Languages
    { skill: 'Python', category: 'programming', level: 'advanced' },
    { skill: 'C', category: 'programming', level: 'intermediate' },
    { skill: 'C++', category: 'programming', level: 'intermediate' },
    { skill: 'SQL', category: 'programming', level: 'beginner' },
    { skill: 'Git', category: 'programming', level: 'intermediate' },
    { skill: 'JavaScript', category: 'programming', level: 'beginner' },
    { skill: 'HTML/CSS', category: 'programming', level: 'intermediate' }, 
    { skill: 'Matlab', category: 'programming', level: 'intermediate'  }, 
    { skill: 'Excel VBA', category: 'programming', level: 'intermediate'  }, 
    { skill: 'SolidWorks', category: 'programming', level: 'beginner' }, 

    // Machine Learning & Data Science
    { skill: 'PyTorch', category: 'machine-learning', level: 'advanced' },
    { skill: 'TensorFlow', category: 'machine-learning', level: 'advanced' },
    { skill: 'scikit-learn', category: 'machine-learning', level: 'advanced' },
    { skill: 'XGBoost', category: 'machine-learning', level: 'intermediate' },
    { skill: 'Optuna', category: 'machine-learning', level: 'beginner' }, 
    { skill: 'SHAP', category: 'machine-learning', level: 'intermediate' }, 

    // Computer Vision & 3D Processing
    { skill: 'OpenCV', category: 'computer-vision', level: 'intermediate' }, 
    { skill: 'Open3D', category: 'computer-vision', level: 'beginner' },
    { skill: 'Three.js', category: 'computer-vision', level: 'intermediate' },
    { skill: 'Blender', category: 'computer-vision', level: 'intermediate' },

    // Cloud & Distributed Computing
    { skill: 'AWS', category: 'cloud', level: 'intermediate' },
    { skill: 'GCP', category: 'cloud', level: 'intermediate' },
    { skill: 'Slurm', category: 'cloud', level: 'intermediate' },
    { skill: 'Docker', category: 'cloud', level: 'intermediate' },
    { skill: 'PySpark', category: 'cloud', level: 'beginner' }, 

    // Web Development
    { skill: 'React.js', category: 'web-development', level: 'beginner' }, 
    { skill: 'Django', category: 'web-development', level: 'intermediate' },
    { skill: 'FastAPI', category: 'web-development', level: 'beginner' },

    // Mathematics
    { skill: 'Linear algebra', category: 'mathematics', level: 'advanced' },
    { skill: 'Multivariable calculus', category: 'mathematics', level: 'advanced' },
];


const filterCategories = [
    { name: 'All', category: 'all', count: skillsData.length },
    { name: 'Programming Languages', category: 'programming', count: skillsData.filter(skill => skill.category === 'programming').length },
    { name: 'Machine Learning & Data Science', category: 'machine-learning', count: skillsData.filter(skill => skill.category === 'machine-learning').length },
    { name: 'Computer Vision & 3D Processing', category: 'computer-vision', count: skillsData.filter(skill => skill.category === 'computer-vision').length },
    { name: 'Cloud & Distributed Computing', category: 'cloud', count: skillsData.filter(skill => skill.category === 'cloud').length },
    { name: 'Web Development', category: 'web-development', count: skillsData.filter(skill => skill.category === 'web-development').length },
    { name: 'Mathematics', category: 'mathematics', count: skillsData.filter(skill => skill.category === 'mathematics').length },
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
