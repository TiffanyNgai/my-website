import React, { useState } from 'react';

const PuzzlePiece = ({ title, company, time, description, isExpanded }) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className={`puzzle-piece ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <h3>{title}</h3>
      <h4>{company}</h4>
      <span>{time}</span>
      {isOpen && <p>{description}</p>}
    </div>
  );
};

export default PuzzlePiece;
