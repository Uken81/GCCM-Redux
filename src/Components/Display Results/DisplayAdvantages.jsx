import { useCharacterStore } from '../../Global State/store';

import './DisplayResults.styles.scss';

const DisplayAdvantages = () => {
  const characterName = useCharacterStore((state) => state.character.characterName);
  const selectedAdvantages = useCharacterStore((state) => state.character.selectedAdvantages);

  const nameText = characterName !== '' ? `${characterName}'s` : '';
  return (
    <div>
      {selectedAdvantages.length > 0 && <h3>{`${nameText} Advantages`}</h3>}
      {/* {selectedAdvantages.map(({ title, points, description, subCategories, extraText }) => { */}
      {selectedAdvantages.map((advantage) => {
        // console.log('tit', title);
        console.log('selectedAdvantages', selectedAdvantages);
        console.log('selectedAdvantages', advantage.title);
        return (
          <div className="results-container" key={`${advantage.title}-container`}>
            <h2>{advantage.title}</h2>
            <p className="points">
              <strong>{advantage.points}</strong>
            </p>
            {/* {description}
            {subCategories &&
              subCategories.map(({ name, text, points }) => {
                return (
                  <div className="sub-category" key={name}>
                    <strong>
                      <p>{name}</p>
                    </strong>
                    {text}
                    <p>
                      <strong>{points}</strong>
                    </p>
                  </div>
                );
              })}
            <i>{extraText}</i> */}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayAdvantages;
