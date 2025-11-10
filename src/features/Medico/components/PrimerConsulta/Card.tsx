const Card: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="bg-white bg-opacity-90 border-2 border-gray-300 rounded-xl shadow-lg w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8 p-4 md:p-6 lg:p-8 flex flex-col">
    {title && (
      <h2 className="text-2xl font-bold mb-6 text-black break-words text-center w-full">{title}</h2>
    )}
    <div className="flex-1 w-full">{children}</div>
  </div>
);

export default Card;
