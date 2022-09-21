export interface NewCharacterStatsObj {
  name: string;
  advantages: string[];
  disadvantages: string[];
}

export interface CharacterObj {
  name: string | null;
  advantages: string[];
  disadvantages: string[];
  id: string | null;
}

export interface AttributeObj {
  title: string;
  type: string;
  points: string;
  description?: JSX.Element;
  subCategories?: SubCategoryObj[];
  extraText?: JSX.Element;
}

interface SubCategoryObj {
  name?: string | JSX.Element;
  text: JSX.Element;
  points?: string;
}

export interface SelectOptionObj {
  label: string;
  category: string;
  value: AttributeObj;
}
