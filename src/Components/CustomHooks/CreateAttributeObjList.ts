import AdvantagesArray from 'Attribute Objects/Advantages';
import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import { useCharacterStore } from 'Global State/store';
import { AttributeObj } from '../../../types';

export const useCreateAttributeObjList = (attributeType: string) => {
  const savedAdvantages = useCharacterStore((state) => state.character.advantages);
  const savedDisadvantages = useCharacterStore((state) => state.character.disadvantages);

  const ObjArray: AttributeObj[] =
    attributeType === 'advantage' ? AdvantagesArray : DisadvantagesArray;

  const savedAttributes: string[] =
    attributeType === 'advantage' ? savedAdvantages : savedDisadvantages;

  const attributeFilter = ObjArray.filter((attObj) => {
    const filteredArr = savedAttributes.includes(attObj.title);
    return filteredArr;
  });
  return attributeFilter;
};
