const Card: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="bg-opacity-90 mx-auto mb-8 flex w-full max-w-2xl flex-col rounded-xl border-2 border-gray-300 bg-white p-4 shadow-lg md:max-w-3xl md:p-6 lg:max-w-4xl lg:p-8">
    {title && (
      <h2 className="mb-6 w-full text-center text-2xl font-bold break-words text-black">{title}</h2>
    )}
    <div className="w-full flex-1">{children}</div>
  </div>
);

export default Card;
