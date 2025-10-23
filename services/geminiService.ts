import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { MenuItem } from '../types';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set");
}

const menuSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      originalName: {
        type: Type.STRING,
        description: 'The name of the menu item in its original language as it appears on the menu.',
      },
      translatedName: {
        type: Type.STRING,
        description: 'The English translation of the menu item name.',
      },
      description: {
        type: Type.STRING,
        description: 'A detailed, appetizing description of the dish in an easy-to-understand way. Include main ingredients, preparation style, and cultural origin if relevant.',
      },
      allergens: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: 'A list of common potential allergens present in the dish (e.g., "Dairy", "Gluten", "Nuts", "Shellfish"). If none, return an empty array.',
      },
      spiceLevel: {
        type: Type.STRING,
        enum: ['None', 'Mild', 'Medium', 'Spicy', 'Very Spicy'],
        description: 'The spice level of the dish. Choose one from the provided options.',
      },
      dietaryNotes: {
          type: Type.ARRAY,
          items: {
              type: Type.STRING
          },
          description: 'A list of dietary notes like "Vegetarian", "Vegan", "Gluten-Free", "Halal". If none apply, return an empty array.'
      },
      pairingSuggestion: {
          type: Type.STRING,
          description: 'A brief suggestion for a drink pairing (e.g., "Pairs well with a crisp Sauvignon Blanc" or "Great with a light lager"). If no specific pairing, provide a general suggestion like "Water or a soft drink".'
      }
    },
    required: ['originalName', 'translatedName', 'description', 'allergens', 'spiceLevel', 'dietaryNotes', 'pairingSuggestion'],
  },
};

export const processMenuImage = async (base64Image: string, mimeType: string): Promise<MenuItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
  const model = 'gemini-2.5-flash';
  
  const prompt = `You are a friendly food guide. Your job is to make menus easy for everyone to understand. Look at the menu picture provided. For each food or drink item you see, explain it in a simple and clear way.
- **Description:** Describe what the dish is, what's in it, and how it's made. Use everyday words. For example, instead of 'sautéed', you can say 'cooked in a pan with a little oil'. Make it sound delicious!
- **Spice Level:** Say how spicy it is.
- **Dietary Notes:** Point out if it's "Vegetarian", "Vegan", etc.
- **Pairing Suggestion:** Suggest a drink that would go well with it.
Your response must be ONLY the JSON array of objects, following the schema. Do not add any other text.`;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: menuSchema,
      }
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedData)) {
      throw new Error("AI response was not in the expected array format.");
    }

    return parsedData as MenuItem[];
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("The AI had trouble reading the menu. Please try a clearer picture.");
  }
};

export const generateMenuItemImage = async (itemName: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
        const prompt = `A delicious, professional food photography shot of "${itemName}", plated beautifully on a clean, simple background.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image data found in the response.");
    } catch (error) {
        console.error(`Failed to generate image for ${itemName}:`, error);
        // Return a placeholder on error
        return 'https://placehold.co/400x300/292524/e7e5e4/png?text=Image+Not+Found';
    }
};
