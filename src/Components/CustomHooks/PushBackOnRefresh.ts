import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCharacterStore } from '../../Global State/store';

export const usePushBackOnRefresh = () => {
  const currentCharacterId = useCharacterStore((state) => state.character.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentCharacterId) {
      navigate('/create-or-manage-page');
    }
    return;
  }, []);
};
