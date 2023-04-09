import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai_chat = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({message: 'Hello from PixFusion!!!'});
})

router.route('/chatgpt').get(async (req, res) => {
  try {
    const prompt = "give me some random prompt to generate creative, realistic image using dall-e"

    const chatgptresponse = await openai_chat.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      n: 1,
      temperature: 0.2,
      top_p: 0,
      frequency_penalty: 0,
    });
    const response = chatgptresponse.data.choices[0].text.trim();
    res.status(200).json({success: true, prompt: response})

  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Not able to generate prompt');
  }
})

export default router;