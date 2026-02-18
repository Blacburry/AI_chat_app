const BASE_URL = 'https://above-grizzly-officially.ngrok-free.app/';
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');
const loader = document.getElementById('loader');
const modeSelector = document.getElementById('modeSelector');
const animeImage = document.getElementById('animeImage');
const customPromptBox = document.getElementById('customPromptBox'); // ✅ Make sure this input exists in HTML

// Mode-specific prompts
const prompts = {
  creative: "You're a wildly imaginative AI with a flair for storytelling and poetic expressions. Embrace creativity and go wild with metaphors, analogies, and style!",
  philosophical: "You're a deeply reflective AI who thinks like Socrates and Kant had a baby. Every answer is layered with wisdom, abstract thought, and introspection.",
  problem: "You're a razor-sharp analyst with a knack for practical, logical, and direct problem solving. No fluff, just brain.",
  code: "You're a genius programmer AI. You're built from code, for code. Help users write, fix, or optimize their code like a pro.",
  friend: "You're a chill, supportive, and slightly sarcastic BFF AI who listens, encourages, and gives advice like a real one."
};

// Local anime girl image paths (💅 slay per mode)
const imageMap = {
  creative: "images/creative.jpg",
  philosophical: "images/philosophical.jpg",
  problem: "images/problem.jpg",
  code: "images/code.jpg",
  friend: "images/friend.jpg",
  custom: "images/custom.jpg" // Optional: custom image if you want
};

// 💫 Switch anime image + show custom box if needed
modeSelector.addEventListener("change", () => {
  const selectedMode = modeSelector.value;
  const newImage = imageMap[selectedMode];

  if (newImage) animeImage.src = newImage;

  // 👀 Show input box only for "custom" mode
  customPromptBox.style.display = selectedMode === 'custom' ? 'block' : 'none';
});

// 🧠 Fetch response ONLY when user clicks Generate
searchButton.addEventListener('click', async () => {
  const userQuery = searchBox.value.trim();
  const selectedMode = modeSelector.value;
  const customPrompt = customPromptBox.value.trim();

  if (userQuery === '') {
    resultDiv.innerHTML = 'Please enter a query!';
    return;
  }

  let promptText;
  if (selectedMode === 'custom') {
    if (customPrompt === '') {
      resultDiv.innerHTML = 'Please enter a custom prompt!';
      return;
    }
    promptText = `You are now roleplaying strictly as: "${customPrompt}". Respond to the following prompt in one paragraph, staying completely in character at all times.
  
    User: ${userQuery}
      
    Assistant:`; 
  } else {
    promptText = `${prompts[selectedMode]}\n\nUser: ${userQuery}\nAssistant:`;
  }

  loader.style.display = 'block';
  resultDiv.innerHTML = '';

  try {
    const response = await fetch(`${BASE_URL}api/v0/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptText,
        model: 'Llama-3.2-3B-Instruct-uncensored',
        max_tokens: 200,
        temperature: 0.8,
        top_p: 0.95,
      }),      
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const generatedText = data.choices?.[0]?.text ?? 'No response received from the AI.';
    
    // Remove weird characters like <|end_of_text|> and <|begin_of_text|> and clean up response
    const cleanText = generatedText
      .replace(/<\|.*?\|>/g, '')  // Remove <|end_of_text|> tags
      .replace(/\n+/g, ' ')      // Flatten newlines
      .trim();

    resultDiv.innerHTML = `<strong>Response:</strong> ${cleanText}`;
  } catch (error) {
    console.error('Error:', error);
    resultDiv.innerHTML = 'Error connecting to the AI server.';
  } finally {
    loader.style.display = 'none';
  }
});
