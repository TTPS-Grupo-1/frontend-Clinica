const Card: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="bg-white bg-opacity-90 border-2 border-black rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center text-black">{title}</h2>
    {children}
  </div>
);

export default Card;
