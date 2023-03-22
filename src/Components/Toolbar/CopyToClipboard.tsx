import React from 'react';
import Button from 'react-bootstrap/Button';

const CopyToClipboard = () => {
  const copyToClipboard = () => {
    const sectionToCopy = document.getElementById('results');
    const rangeCount = document.getSelection()?.rangeCount;
    let currentRange: boolean | Range | undefined;

    if (rangeCount && rangeCount > 0) {
      currentRange = document.getSelection()?.getRangeAt(0);
      if (currentRange) {
        window.getSelection()?.removeRange(currentRange);
      }
    } else {
      currentRange = false;
    }

    const copyRange = document.createRange();
    if (sectionToCopy) {
      copyRange.selectNode(sectionToCopy);
    }
    window.getSelection()?.addRange(copyRange);
    document.execCommand('copy');

    window.getSelection()?.removeRange(copyRange);

    if (currentRange) {
      window.getSelection()?.addRange(currentRange);
    }
    window.alert(
      'Advantages and Disadvantages are copied to your clipboard. You can now paste in your prefered text editor'
    );
  };

  return (
    <Button size="lg" variant="outline-primary" onClick={copyToClipboard}>
      Copy to Clipboard
    </Button>
  );
};

export default CopyToClipboard;
