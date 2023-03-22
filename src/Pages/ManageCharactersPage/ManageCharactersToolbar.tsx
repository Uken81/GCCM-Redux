import { ToEditCharacter } from 'Components/Header/Navigation Links/navigationLinks';
import CopyToClipboard from 'Components/Toolbar/CopyToClipboard';
import DeleteCharacter from 'Components/Toolbar/DeleteCharacter/DeleteCharacter';
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

export const ManageCharactersToolbar: React.FC<{
  divRef: React.MutableRefObject<null>;
  setShowAlert: (value: boolean) => void;
}> = ({ divRef, setShowAlert }) => (
  <div className="toolbar-container">
    <span className="toolbar-header">Character Toolbar</span>
    <div className="category-container">
      <ToEditCharacter />
      <DeleteCharacter handleClick={() => setShowAlert(true)} />
    </div>
    <span className="toolbar-header">Output Tools</span>
    <div className="category-container">
      <ReactToPrint
        trigger={() => (
          <Button size="lg" variant="outline-primary">
            Download PDF
          </Button>
        )}
        content={() => divRef.current}
      />
      <CopyToClipboard />
    </div>
  </div>
);
