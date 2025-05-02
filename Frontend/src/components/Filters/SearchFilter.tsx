// components/Filters/SearchFilter.tsx
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface SearchFilterProps {
  onSearch: (term: string) => void; // Eliminar prop innecesaria
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, marca o modelo"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchFilter;