import React from 'react';
import 'Pages/toolBar.styles.scss';
import CopyToClipboard from 'Components/Toolbar/CopyToClipboard';
import ResetCharacter from 'Components/Toolbar/ResetCharacter/ResetCharacter';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

export const GuestPageToolbar: React.FC<{ divRef: React.MutableRefObject<null> }> = ({
  divRef
}) => (
  <div className="toolbar-container">
    <span className="toolbar-header">Tools</span>
    <div className="category-container" style={{ height: '12rem' }}>
      <ResetCharacter />
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
