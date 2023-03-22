import React from 'react';
import 'Pages/toolBar.styles.scss';
import CopyToClipboard from 'Components/Toolbar/CopyToClipboard';
import ResetCharacter from 'Components/Toolbar/ResetCharacter/ResetCharacter';
import SaveCharacter from 'Components/Toolbar/SaveCharacter/SaveCharacter';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

export const NewCharacterToolbar: React.FC<{
  setAlertType: (value: string) => void;
  divRef: React.MutableRefObject<null>;
}> = ({ setAlertType, divRef }) => (
  <div className="toolbar-container">
    <span className="toolbar-header">Character Tools</span>
    <div className="category-container">
      <ResetCharacter />
      <SaveCharacter setAlertType={setAlertType} />
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
