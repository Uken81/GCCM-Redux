import React from 'react';
import '../Display Selected/displaySelected.styles.scss';
import { useAppSelector } from 'features/reduxHooks';
import { Card, ListGroup } from 'react-bootstrap';

type AttributeType = 'advantages' | 'disadvantages';

export const SelectedAttributes: React.FC<{ attributeType: AttributeType }> = ({
  attributeType
}) => {
  const selectedAdvantages = useAppSelector((state) => state.character.advantages);
  const selectedDisadvantages = useAppSelector((state) => state.character.disadvantages);

  const attributes = attributeType === 'advantages' ? selectedAdvantages : selectedDisadvantages;
  const title = attributeType === 'advantages' ? 'Advantages' : 'Disadvantages';
  const textColor = attributeType === 'advantages' ? 'seagreen' : 'brown';

  const Selected: React.FC<{ attributeType: AttributeType }> = () => (
    <Card border="light" style={{ textAlign: 'center', backgroundColor: 'black', width: '16rem' }}>
      <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold', color: textColor }}>
        {title}
      </Card.Title>
      <ListGroup style={{ backgroundColor: '#343a40' }} variant="flush">
        {attributes.map((attribute) => (
          <ListGroup.Item
            key={`${attribute}-selected`}
            style={{ color: textColor, backgroundColor: 'black', fontWeight: 'bold' }}>
            {attribute}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );

  return <Selected attributeType={attributeType} />;
};
