import React, { useState } from 'react';

function App() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.REACT_APP_OPENAI_API_KEY
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Write a blog post about ${topic}` }]
        })
      });

      const data = await response.json();
      setResult(data.choices?.[0]?.message?.content || "No response from OpenAI");
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GravityWrite Clone</h1>
      <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter topic..." />
      <button onClick={generateContent} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{result}</div>
    </div>
  );
}

export default App;
