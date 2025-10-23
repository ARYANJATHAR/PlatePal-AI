export interface MenuItem {
  originalName: string;
  translatedName: string;
  description: string;
  allergens: string[];
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Spicy' | 'Very Spicy';
  dietaryNotes: string[];
  pairingSuggestion: string;
}
