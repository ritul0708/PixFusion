import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apikey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from PixFusion!'})
})

router.route('/').post( async (req, res) => {
  try {
    const prompt = 'Generate a random prompt to generate a creative image using dall-e api.';

    const gptresponse = await openai.createCompletion({
      engine: 'davinci',
      prompt,
      max_tokens: 50,
      n: 1,
      stop: '\n'
    })

    const newPrompt = gptresponse.data.choices[0].text.trim();
    res.status(200).json({prompt: newPrompt});
    console.log(newPrompt);
  } catch (error) {
    console.log(error);
    alert('Not able to generate random prompt, try again after some time!!');
    res.status(500).send(error?.response.data.error.message || 'Not able generate prompt');
  }
})

export default router;