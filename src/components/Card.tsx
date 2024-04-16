import React from 'react';

interface CardProps {
  name: string;
  title: string;
  onClick: () => void;
  highlighted: boolean;
}

const CardComponent: React.FC<CardProps> = React.memo(({ name, title, onClick, highlighted }) => {
  return (
    <div
      className={`p-4 border cursor-pointer overflow-auto max-h-24 ${highlighted ? 'bg-slate-200' : ''}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{name}</p>
    </div>
  );
});

export default CardComponent;
