import React from 'react';
import { useContext } from 'react';
import ReactToPrint from 'react-to-print';

import Button from 'react-bootstrap/Button';

import { ComponentRefContext, ComponentRefContextInterface } from 'context';

import '../../Display Results/DisplayResults.styles.scss';

const PrintPDF = () => {
  const { componentRef } = useContext(ComponentRefContext) as ComponentRefContextInterface;

  return (
    <div>
      <div className="button-container">
        <ReactToPrint
          trigger={() => (
            <Button className="tool-button" size="lg">
              Download PDF
            </Button>
          )}
          content={() => componentRef}
        />
      </div>
    </div>
  );
};

export default PrintPDF;
