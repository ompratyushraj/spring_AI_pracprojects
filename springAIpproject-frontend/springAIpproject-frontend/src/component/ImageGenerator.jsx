import React, { useState } from "react";

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

//   const generateImage = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/generate-image?prompt=${prompt}`);
//       const urls = await response.json();
//       console.log(urls);
//       setImageUrls(urls);
//     } catch (error) {
//       console.error("error generating image : ", error);
//     }
//   };

    const generateImage = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt before generating an image!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/generate-image?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.json();
            console.log(data);

            if (Array.isArray(data)) {
                setImageUrls(data); // expected case
            } else {
                console.error("Unexpected response:", data);
                setImageUrls([]); // reset to empty
            }
        } catch (error) {
            console.error("error generating image : ", error);
            setImageUrls([]);
        }
    };


  return (
    <div className="tab-content">
      <h1>Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt to generate the image"
      />
      <button onClick={generateImage}>Generate Image</button>

      <div className="image-grid">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Generated ${index}`} />
        ))}

        {[...Array(Math.max(0, 4 - imageUrls.length))].map((_, index) => (
          <div key={index + imageUrls.length} className="empty-image-slot"></div>
        ))}
      </div>
    </div>
  );
}

export default ImageGenerator;
