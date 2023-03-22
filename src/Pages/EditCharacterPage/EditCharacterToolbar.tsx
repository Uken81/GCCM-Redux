import React from 'react';
import EditCharacter from 'Components/Toolbar/EditCharacter';
import ResetChanges from 'Components/Toolbar/ResetChanges';

export const EditCharacterToolbar: React.FC = () => (
  <div className="toolbar-container">
    <span className="toolbar-header">Character Toolbar</span>
    <div className="category-container">
      <ResetChanges />
      <EditCharacter />
    </div>
  </div>
);
