
import React, { useState } from 'react';
import './App.css';
import ImageGenerator from './component/ImageGenerator';
import ChatComponent from './component/ChatComponent';
import RecipeGenerator from './component/RecipeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div>
        <div className="App">
          <button
            className={activeTab === 'image-generator' ? 'active' : ''}
            onClick={() => handleTabChange('image-generator')}
          >
            Image Generator
          </button>
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => handleTabChange('chat')}
          >
            Chat Generator
          </button>
          <button
            className={activeTab === 'recipe-generator' ? 'active' : ''}
            onClick={() => handleTabChange('recipe-generator')}
          >
            Recipe Generator
          </button>
          <div>
            {activeTab === 'image-generator' && <ImageGenerator/>}
            {activeTab === 'chat' && <ChatComponent/>}
            {activeTab === 'recipe-generator' && <RecipeGenerator/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
