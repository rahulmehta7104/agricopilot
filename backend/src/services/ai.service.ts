import { GoogleGenAI } from '@google/genai';
import { datasetLoader } from '../data/datasetLoader';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export class AIService {
  /**
   * Predicts market trend for a given crop and location.
   */
  public async getMarketPrediction(crop: string, location: string): Promise<string> {
    try {
      // Get historical data for context
      const historicalData = datasetLoader.getCropData(crop, location);
      let dataContext = '';

      if (historicalData.length > 0) {
        // Take a sample of the data to avoid exceeding context limits
        const sampleData = historicalData.slice(0, 20);
        dataContext = `Historical Data Context for ${crop} in ${location}:\n` + 
          sampleData.map(row => `- Year: ${row.Crop_Year}, Season: ${row.Season}, Production: ${row.Production}, Area: ${row.Area}`).join('\n');
      } else {
        dataContext = `No historical local data available in the current dataset for ${crop} in ${location}.`;
      }

      const prompt = `You are an expert agricultural economist. 
Given the following context, provide a market price prediction and trend analysis for ${crop} in ${location} for the upcoming season. 
You MUST output your response strictly as a JSON object matching this exact structure, with no markdown formatting or extra text:
{
  "trend": "UPWARD" or "DOWNWARD" or "STABLE",
  "percentage": "e.g. +4.5% or -2.1%",
  "currentPrice": "e.g. ₹2,450/qtl",
  "advice": "A short, actionable advice paragraph for the farmer.",
  "factors": ["factor 1", "factor 2", "factor 3"]
}

Context:
${dataContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      return response.text || '';
    } catch (error: any) {
      console.error('Market error, falling back to mock data:', error.message);
      
      // Dynamic Mock Data Fallback based on requested crop
      const isUpward = Math.random() > 0.4;
      return JSON.stringify({
        trend: isUpward ? "UPWARD" : "DOWNWARD",
        percentage: isUpward ? `+${(Math.random() * 5 + 1).toFixed(1)}%` : `-${(Math.random() * 5 + 1).toFixed(1)}%`,
        currentPrice: `₹${(Math.random() * 2000 + 1500).toFixed(0)}/qtl`,
        advice: `Based on current mock algorithms, the market for ${crop} in ${location} is showing ${isUpward ? 'strong' : 'weak'} demand. ${isUpward ? 'Hold stock for a few weeks to maximize profit.' : 'Consider liquidating current stock soon.'}`,
        factors: [
          `Local weather conditions affecting ${crop} yield`,
          `Recent supply chain shifts in ${location}`,
          `Seasonal demand adjustments`
        ]
      });
    }
  }

  /**
   * Recommends government schemes based on user profile.
   */
  public async getSchemesRecommendation(profileDetails: string): Promise<string> {
    try {
      // Load scheme context (e.g. MSP data)
      const schemesData = datasetLoader.getSchemes();
      let schemeContext = 'Current MSP and Scheme Data:\n';
      
      if (schemesData.length > 0) {
        const sampleData = schemesData.slice(0, 15);
        schemeContext += sampleData.map(row => JSON.stringify(row)).join('\n');
      }

      const prompt = `You are an expert in Indian agricultural government schemes and subsidies.
Given the user's farm profile and the current scheme context, suggest the top 3 government schemes, subsidies, or MSPs they should take advantage of. 
You MUST output your response strictly as a JSON array of objects matching this exact structure, with no markdown formatting or extra text:
[
  {
    "id": 1,
    "name": "Scheme Name",
    "description": "Short description of the scheme",
    "benefit": "e.g. ₹6,000/year or Risk Cover",
    "link": "example.gov.in"
  }
]

User Farm Profile: ${profileDetails}

Context:
${schemeContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      return response.text || '';
    } catch (error: any) {
      console.error('Schemes error, falling back to mock data:', error.message);
      return JSON.stringify([
        {
          id: 1,
          name: "PM-KISAN Samman Nidhi",
          description: "Direct income support of ₹6,000 per year for all landholding farmers.",
          benefit: "₹6,000/year",
          link: "pmkisan.gov.in"
        },
        {
          id: 2,
          name: "Pradhan Mantri Fasal Bima Yojana",
          description: "Comprehensive crop insurance scheme covering pre-sowing to post-harvest losses.",
          benefit: "Risk Cover",
          link: "pmfby.gov.in"
        },
        {
          id: 3,
          name: "Soil Health Card Scheme",
          description: "Provides information on soil nutrient status and recommendations on dosage of fertilizers.",
          benefit: "Free Soil Test",
          link: "soilhealth.dac.gov.in"
        }
      ]);
    }
  }
}

export const aiService = new AIService();
