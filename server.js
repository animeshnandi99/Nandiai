import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: userMessage
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {
    res.json({
      reply: "❌ AI error. Check API key or billing."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NandiAi running on port", PORT);
});