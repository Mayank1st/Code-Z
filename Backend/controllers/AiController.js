import { GoogleGenerativeAI } from "@google/generative-ai";

class AiController {
  constructor() {
    const apiKey = process.env.API_KEY; // Ensure the API key is loaded
    if (!apiKey) {
      throw new Error("API key is not defined");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = null;

    // Call the async function to initialize the model
    this.initializeModel();
  }

  // Initialize the model asynchronously
  async initializeModel() {
    try {
      this.model = await this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log("Model initialized successfully");
    } catch (error) {
      console.error("Error initializing model:", error);
    }
  }

  // Method to generate content based on a prompt
  async generateContent(req, res) {
    const { prompt } = req.body; // Assuming prompt is sent in the request body

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Check if the model is initialized
    if (!this.model) {
      return res.status(500).json({ error: "Generative model is not initialized" });
    }

    try {
      const result = await this.model.generateContent(prompt);
      return res.status(200).json({ text: result.response.text() });
    } catch (error) {
      console.error("Error generating content:", error);
      return res.status(500).json({ error: "Error generating content" });
    }
  }
}

export default AiController;
