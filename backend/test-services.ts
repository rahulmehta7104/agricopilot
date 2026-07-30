import dotenv from 'dotenv';
dotenv.config();

import { aiService } from './src/services/ai.service';
import { weatherService } from './src/services/weather.service';

async function test() {
  try {
    console.log('Testing Weather...');
    const w = await weatherService.getWeather(28, 77);
    console.log(w);
  } catch (e) {
    console.error('Weather error:', e);
  }

  try {
    const { GoogleGenAI } = require('@google/genai');
    const aiTest = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await aiTest.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Hello',
    });
    console.log("gemini-1.5-flash response:", response.text());
  } catch (err) {
    console.error("gemini-1.5-flash error:", err.message);
  }
  try {
    const { GoogleGenAI } = require('@google/genai');
    const aiTest = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await aiTest.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: 'Hello',
    });
    console.log("gemini-1.5-pro response:", response.text());
  } catch (err) {
    console.error("gemini-1.5-pro error:", err.message);
  }
}

test();
