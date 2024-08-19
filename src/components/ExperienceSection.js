// ExperienceSection.js
import React, {useState} from 'react';
import PuzzlePiece from './PuzzlePiece';

const experiences = [
  {
    title: 'Undergraduate Research Assistant',
    company: 'University of Waterloo',
    time: 'Jan 2024 - Present',
    description: 'Developing computational programs for large molecular data analysis and an AI tool for molecular docking. Contributing to research efforts in ArGan’s lab.'
  },
  {
    title: 'Researcher',
    company: 'Harvard Medical School and Massachusetts General Hospital',
    time: 'Aug 2023 - Present',
    description: 'Trained multi-modal machine learning models using Slurm for Alzheimer’s disease case-control and age onset prediction, integrating multi-omics (genomic, proteomic, metabolomic) and EHR data. Identified biomarkers through explainable AI methods, specifically SHAP, and applied early and late fusion techniques to combine diverse data modalities. Worked in the Genetics and Aging Research Unit under the supervision of Dr. Dmitry Prokopenko and Dr. Rudy Tanzi.'
  },
  {
    title: 'Undergraduate Research Assistant',
    company: 'University of Waterloo',
    time: 'May 2023 - Aug 2023',
    description: 'Finetuned and benchmarked various state-of-the-art models for Alzheimer’s disease severity classification using MRI images in PyTorch. Conducted a comprehensive literature review on medical image classification for Alzheimer’s disease. Contributed to research in the Vision and Image Processing lab under the supervision of Amy Tai.'
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Gridspace',
    time: 'Jan 2023 - Apr 2023',
    description: 'Developed and implemented large language models for abstractive dialogue summarization utilizing Transformers, PyTorch, and NLTK libraries on a Linux virtual machine in Google Cloud Platform (GCP). Addressed model bias issues by augmenting data points and enhanced the summarization model\'s input token limit twofold through an effective compression method.'
  },
  {
    title: 'Firmware Developer',
    company: 'onsemi',
    time: 'May 2022 - Aug 2022',
    description: 'Developed a 16x16 MNIST shallow neural network model using TensorFlow and Keras, along with a sample application for handwritten digit recognition inference in C, utilizing the DSP math library. Implemented new features, such as a sigmoid function, FIR filter, and Biquad filter, enhancing the capabilities of the hearing aid DSP math library. Additionally, developed BEHAVE automated test scripts and C programs for memory sharing between the LPDSP32 processor and Cortex-M33 MCU to test the DSP math library.'
  },
  {
    title: 'Web Developer',
    company: 'Canada Robotix',
    time: 'Jan 2022 - Apr 2022',
    description: 'Developed a pricing updating application for the company’s website, incorporating web scraping techniques using Python. Conducted data analysis to support and optimize pricing strategies.'
  },
  {
    title: 'Application Developer',
    company: 'SG Wireless',
    time: 'Aug 2021 - Dec 2021',
    description: 'Developed a 1.6kbps vocoder firmware, achieving an 80-fold bandwidth reduction while maintaining signal quality. Optimization of 12.2kbps and 4.75kbps decoders was completed, with both implemented on a Cortex-M4F MCU. Applied data analytics and signal processing techniques to ensure accurate execution of complex algorithms. Additionally, Excel macros were created to enhance data analysis and visualization efforts.'
  },
  {
    title: 'Data Analyst',
    company: 'Bombardier',
    time: 'Jan 2021 - Apr 2021',
    description: 'Maintained and developed KPI data and trends using SQL, analyzed data to create visualizations for KPI reports, managed and optimized the database, and tracked and reported Daily First Article Inspection results to ensure quality and efficiency.'
  },
  // Add more experiences as needed
];

const ExperienceSection = () => {
    const [expandAll, setExpandAll] = useState(false);
  
    const handleExpandAll = () => {
      setExpandAll(true);
    };
  
    const handleCollapseAll = () => {
      setExpandAll(false);
    };
  
  return (
    <section id="experience">
      <h2>Experience</h2>
      <div className="expand-collapse-buttons">
        <button
          onClick={handleExpandAll}
          className={expandAll ? 'active' : ''}
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className={!expandAll ? 'active' : ''}
        >
          Collapse All
        </button>
      </div>
      <div className="experience-section">
        {experiences.map((exp, index) => (
          <PuzzlePiece
            key={index}
            title={exp.title}
            company={exp.company}
            time={exp.time}
            description={exp.description}
            isExpanded={expandAll}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
