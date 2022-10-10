import { useAppSelector } from './reduxHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const usePushBackOnRefresh = () => {
  const currentCharacterId = useAppSelector((state) => state.character.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentCharacterId) {
      navigate('/create-or-manage-page');
    }
    return;
  }, []);
};
