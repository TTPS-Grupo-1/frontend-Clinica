import type { FC } from "react";

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
      className="cursor-pointer bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition"
    >
      {icon && <div className="text-blue-500 text-4xl mb-3">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
};

export default OpcionCard;