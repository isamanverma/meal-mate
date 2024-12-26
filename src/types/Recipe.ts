export interface Recipe {
  id: number;
  title: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  veryHealthy?: boolean;
  cheap?: boolean;
  veryPopular?: boolean;
  sustainable?: boolean;
  lowFodmap?: boolean;
  weightWatcherSmartPoints?: number;
  gaps?: string;
  preparationMinutes?: number | null;
  cookingMinutes?: number;
  aggregateLikes?: number;
  healthScore?: number;
  creditsText?: string;
  license?: string;
  sourceName?: string;
  pricePerServing?: number;
  extendedIngredients?: RecipeIngredients[];
  image?: string;
  imageType?: string;
  summary?: string;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  occasions?: string[];
  instructions?: string;
  analyzedInstructions?: Instruction[];
  originalId?: number;
  spoonacularScore?: number;
  spoonacularSourceUrl?: string;
}

export interface RecipeIngredients {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: { amount: number; unitShort: string; unitLong: string };
    metric: { amount: number; unitShort: string; unitLong: string };
  };
}

export interface Instruction {
  number: number;
  step: string;
  ingredients: StepUtil[];
  equipment: StepUtil[];
}

export interface StepUtil {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface ApiResponse {
  recipes: Recipe[];
}
