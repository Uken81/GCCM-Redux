 export interface CharacterObj {
    characterName: string;
    selectedAdvantages: AttributeObj[];
    selectedDisadvantages: AttributeObj[],
    currentCharacterId: string;
}

export interface AttributeObj {
    title: string;
    type: string;
    points: string;
    description: JSX.Element;
    subCategories?: SubCategoryObj[];
    extraText? : any;
}

interface SubCategoryObj {
    name: string | JSX.Element;
    text: JSX.Element;
    points?: string;
}

export interface SelectOptionObj {
    category: string;
    label: string;
    value: AttributeObj;
}