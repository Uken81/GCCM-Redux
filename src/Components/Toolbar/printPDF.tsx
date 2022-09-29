import React from 'react';
import { useContext } from 'react';
import ReactToPrint from 'react-to-print';

import Button from 'react-bootstrap/Button';

import { ComponentRefContext } from 'context';

import '../Display Attribute Cards/DisplayAttributeCards.styles.scss';

const PrintPDF = () => {
  const componentRefContext = useContext(ComponentRefContext);
  const componentRef = componentRefContext?.componentRef;

  return (
    <div>
      <div className="button-container">
        <ReactToPrint
          trigger={() => (
            <Button className="tool-button" size="lg">
              Download PDF
            </Button>
          )}
          content={() => componentRef?.current}
        />
      </div>
    </div>
  );
};

export default PrintPDF;
