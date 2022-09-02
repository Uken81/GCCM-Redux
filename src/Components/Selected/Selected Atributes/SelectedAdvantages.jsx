import { useCharacterStore } from '../../../Global State/store';

const SelectedAdvantages = () => {
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);
  return (
    <ul>
      {selectedAdvantages.map(({ title }) => {
        return (
          <li
            className="selected-advantages"
            key={`${title}-selected`}
            style={{ color: 'seagreen' }}>
            {title}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedAdvantages;
