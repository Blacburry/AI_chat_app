const BASE_URL = 'http://localhost:8000/'; // Base URL for LM Studio API
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', async () => {
  // Fetch user input from the search box
  const userQuery = searchBox.value.trim();
  if (userQuery === '') {
    resultDiv.innerHTML = 'Please enter a query!';
    return;
  }

  try {
    // Make a POST request to the LM Studio API
    const response = await fetch(`${BASE_URL}api/v0/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userQuery,
        model: 'llama-3.2-1b-instruct', // Use the model name in LM Studio
        max_tokens: 200,               // Set the maximum token limit
        temperature: 0.3,              // Adjust for creativity
        top_p: 0.7,                    // Adjust for diversity
      }),
    });

    // Handle the API response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Full API Response:', data); // For debugging

    // Display the AI response in the result div using the correct property
    const generatedText = data.choices && data.choices[0] && data.choices[0].text 
      ? data.choices[0].text 
      : 'No response received from the AI.';
    resultDiv.innerHTML = `<strong>Response:</strong> ${generatedText}`;
  } catch (error) {
    console.error('Error:', error);
    resultDiv.innerHTML = 'Error connecting to the LM Studio API. Please ensure it is running and accessible.';
  }
});