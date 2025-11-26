import { GoogleGenAI, Type } from "@google/genai";
import type { ColorData } from '../types';

const API_KEY = process.env.API_KEY;

export const isApiKeySet = !!API_KEY;

const ai = isApiKeySet ? new GoogleGenAI({ apiKey: API_KEY as string }) : null;

const colorSchema = {
    type: Type.OBJECT,
    properties: {
        colorName: {
            type: Type.STRING,
            description: "The common, most recognized name for the provided hex color code. e.g., 'Sky Blue', 'Forest Green'."
        },
        hexCode: {
            type: Type.STRING,
            description: "The hex code of the color that was analyzed."
        },
        rgb: {
            type: Type.OBJECT,
            properties: {
                r: { type: Type.INTEGER, description: "The red value (0-255)." },
                g: { type: Type.INTEGER, description: "The green value (0-255)." },
                b: { type: Type.INTEGER, description: "The blue value (0-255)." }
            },
            required: ['r', 'g', 'b']
        },
        mixingGuide: {
            type: Type.ARRAY,
            description: "An array of strings, where each string is a clear, sequential step for mixing the color. Start from a base and add other colors gradually.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ['colorName', 'hexCode', 'rgb', 'mixingGuide']
};

export const getColorDetails = async (hexColor: string): Promise<ColorData> => {
    if (!ai) {
        throw new Error("Application is not configured correctly. The API Key is missing.");
    }

    try {
        const prompt = `Analyze the color with hex code ${hexColor}. Provide its common name and a step-by-step guide for a painter to mix this color. The mixing guide should use only primary colors (specifically Cadmium Red, Cadmium Yellow, and Ultramine Blue) and Titanium White and Mars Black for tinting and shading. The steps should be practical and easy for an artist to follow.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: colorSchema,
                systemInstruction: "You are an expert color theorist and master painter providing advice to fellow artists. Your responses are structured, accurate, and helpful.",
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (!parsedData.colorName || !parsedData.mixingGuide || !parsedData.hexCode) {
            throw new Error("Invalid data structure received from the AI. Please try a different color.");
        }

        return parsedData as ColorData;

    } catch (error) {
        console.error("Error fetching color details from AI service:", error);
        
        let errorMessage = "Failed to get color details. The creative AI may be busy or unavailable. Please try again in a moment.";

        if (error instanceof Error && error.message) {
            const lowerCaseMessage = error.message.toLowerCase();
            if (lowerCaseMessage.includes('permission_denied') || lowerCaseMessage.includes('does not have permission')) {
                errorMessage = "Authentication Error: The provided API key is invalid or does not have the required permissions. Please check your API key and its configuration in the Google AI Studio.";
            } else if (lowerCaseMessage.includes('api key not valid')) {
                 errorMessage = "Authentication Error: The provided API key is not valid. Please ensure you have copied the entire key correctly.";
            }
        }

        throw new Error(errorMessage);
    }
};