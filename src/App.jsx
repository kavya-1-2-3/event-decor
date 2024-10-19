import React, { useState } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import NavBar from './NavBar';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchImages = async (searchTerm) => {
    const apiKey = 'iW8KYQUreCy5Bv4UreXPBmvADX1L3nFUVXtPsu5SX58J08arPznjvhmr'; 
    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching images for: ${searchTerm}`); // Fixed string interpolation
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=5`, { // Fixed the URL
        headers: {
          Authorization: apiKey,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Fixed string interpolation
      }

      const data = await response.json();
      console.log('API Response:', data);
      setImages(data.photos);
    } catch (error) {
      setImages([]); // Ensure images are cleared on error
      setError(error.message); // Set the error message for display
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSelectedCategory(''); 
    fetchImages(term); 
  };

  const handleCategorySelect = (category) => {
    console.log(`Category selected: ${category}`); // Fixed string interpolation
    setSelectedCategory(category);
    fetchImages(category); 
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <NavBar onCategorySelect={handleCategorySelect} />
      {error && <div className="error-message">{error}</div>}
      <MainContent 
        images={images} 
        loading={loading} 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect}
      />
      <Footer />
    </div>
  );
};

export default App;
