import { useCharacterStore } from '../../../Global State/store';

const SelectedAdvantages = () => {
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);
  return (
    <ul>
      {selectedAdvantages.map(({ label }) => {
        console.log('SA', label);
        return (
          <li className="selected-advantages" key={label} style={{ color: 'seagreen' }}>
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedAdvantages;
