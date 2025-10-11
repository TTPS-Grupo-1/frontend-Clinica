import React from 'react';

interface AntecedentesGenitalesProps {
  visible: boolean;
}

const AntecedentesGenitales: React.FC<AntecedentesGenitalesProps> = ({ visible }) => {
  const [valor, setValor] = React.useState('');
  if (!visible) return null;

  return (
    <div className="max-w-xl mx-auto rounded shadow p-6 border-2 border-black bg-white text-black mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Antecedentes Genitales</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-black">Describa los antecedentes genitales:</label>
        <textarea
          className="w-full border border-black rounded px-2 py-1 bg-white text-black"
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="Campo libre"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AntecedentesGenitales;
