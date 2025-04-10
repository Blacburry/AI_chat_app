// Show loader during result generation
const BASE_URL = 'http://localhost:8000/';
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
        prompt: userQuery,
        model: 'llama-3.2-1b-instruct',
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
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