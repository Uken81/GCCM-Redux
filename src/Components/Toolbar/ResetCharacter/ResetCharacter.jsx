import Button from 'react-bootstrap/Button';
import useResetCharacterOnLoad from '../../CustomHooks/ResetCharacter';

const ResetCharacter = () => {
  const reset = useResetCharacterOnLoad();

  return (
    <div className="button-container">
      <Button className="tool-button" size="lg" onClick={reset}>
        Reset Character
      </Button>
    </div>
  );
};

export default ResetCharacter;
