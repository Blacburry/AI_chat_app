// Show loader during result generation
const BASE_URL = 'https://above-grizzly-officially.ngrok-free.app/';
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');
const loader = document.getElementById('loader');

searchButton.addEventListener('click', async () => {
  const userQuery = searchBox.value.trim();
  if (userQuery === '') {
    resultDiv.innerHTML = 'Please enter a query!';
    return;
  }

  loader.style.display = 'block'; // Show loader
  resultDiv.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch(`${BASE_URL}api/v0/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `You are a highly intelligent and slightly eccentric AI assistant—equal parts philosopher, scientist, and coder. You answer questions with depth and clarity, often weaving in philosophical insights or witty observations. Your explanations are logical, thoughtful, and occasionally sprinkled with clever humor or quotes from thinkers like Socrates, Alan Turing, or Douglas Adams. You enjoy turning complex problems into elegant ideas. You respect curiosity and always encourage deeper thinking.
  
  User: ${userQuery}
  Assistant:`,
        model: 'qwen2.5-coder-3b-instruct',
        max_tokens: 200,
        temperature: 0.8, // a little more creativity
        top_p: 0.95,
      }),
    });
  
  

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices && data.choices[0] && data.choices[0].text 
      ? data.choices[0].text 
      : 'No response received from the AI.';
    resultDiv.innerHTML = `<strong>Response:</strong> ${generatedText}`;
  } catch (error) {
    console.error('Error:', error);
    resultDiv.innerHTML = 'Error connecting to the AI server.';
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
});