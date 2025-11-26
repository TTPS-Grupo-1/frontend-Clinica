import type { FC } from 'react';

interface OpcionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const OpcionCard: FC<OpcionCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-md transition hover:shadow-lg"
    >
      {icon && <div className="mb-3 text-4xl text-blue-500">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default OpcionCard;
