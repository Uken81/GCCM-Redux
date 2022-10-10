import AdvantagesArray from 'Attribute Objects/Advantages';
import DisadvantagesArray from 'Attribute Objects/Disadvantages';
import { AttributeObj } from '../../../types';
import { useAppSelector } from './reduxHooks';

export const useCreateAttributeObjList = (attributeType: string) => {
  const savedAdvantages = useAppSelector((state) => state.character.advantages);
  const savedDisadvantages = useAppSelector((state) => state.character.disadvantages);

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
