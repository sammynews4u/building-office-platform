
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Initialize GoogleGenAI instance right before making an API call to ensure it uses the latest API key.

export const getProjectInsights = async (projectData: any) => {
  try {
    // Initialize client inside the function to ensure up-to-date API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this construction project data and provide risk analysis and cost-saving tips: ${JSON.stringify(projectData)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING },
            summary: { type: Type.STRING },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            costSavingsPrediction: { type: Type.STRING }
          },
          required: ["riskLevel", "summary", "actionItems"]
        }
      }
    });
    return JSON.parse(response.text ?? '{}');
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};

export const getDeepIntelligence = async (context: 'cost' | 'delay' | 'risk' | 'benchmarking', data: any) => {
  try {
    // Initialize client inside the function to ensure up-to-date API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompts = {
      cost: "Predict potential cost overruns for this project based on current spending velocity and remaining tasks. Provide a confidence score.",
      delay: "Analyze the project timeline and task dependencies to identify potential schedule bottlenecks and delay risks.",
      risk: "Evaluate safety incidents, compliance gaps, and environmental factors to provide a holistic risk score and mitigation plan.",
      benchmarking: "Compare these internal material costs with global and regional benchmarks. Identify overspending."
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `${prompts[context]}. Data: ${JSON.stringify(data)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Confidence or Risk score from 0-100" },
            headline: { type: Type.STRING },
            projection: { type: Type.STRING },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "headline", "projection", "warnings", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text ?? '{}');
  } catch (error) {
    console.error(`Gemini Intelligence Error (${context}):`, error);
    return null;
  }
};

export const generateBOQEstimate = async (description: string) => {
  try {
    // Initialize client inside the function to ensure up-to-date API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate a simplified Bill of Quantities (BOQ) for the following construction scope: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              description: { type: Type.STRING },
              unit: { type: Type.STRING },
              quantity: { type: Type.NUMBER },
              unitRate: { type: Type.NUMBER },
              total: { type: Type.NUMBER }
            },
            required: ["item", "quantity", "unitRate"]
          }
        }
      }
    });
    return JSON.parse(response.text ?? '[]');
  } catch (error) {
    console.error("BOQ Generation Error:", error);
    return null;
  }
};

export const generateSEOSuggestions = async (companyData: any) => {
  try {
    // Initialize client inside the function to ensure up-to-date API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this construction company profile, suggest 5 high-converting SEO keywords and a meta-description to help them rank locally: ${JSON.stringify(companyData)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            metaDescription: { type: Type.STRING },
            score: { type: Type.NUMBER }
          },
          required: ["keywords", "metaDescription", "score"]
        }
      }
    });
    return JSON.parse(response.text ?? '{}');
  } catch (error) {
    console.error("SEO Generation Error:", error);
    return null;
  }
};

export const analyzeJobOpportunities = async (jobs: any[], companyProfile: any) => {
  try {
    // Initialize client inside the function to ensure up-to-date API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Match these job opportunities to the company profile. Return match scores (0-100) and brief reasons. Jobs: ${JSON.stringify(jobs)}. Profile: ${JSON.stringify(companyProfile)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              jobId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text ?? '[]');
  } catch (error) {
    console.error("Job Analysis Error:", error);
    return null;
  }
};
