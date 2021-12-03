import PropTypes from 'prop-types';

const SelectedAdvantages = ({ selectedAdvantagesList }) => (
  <ul>
    {selectedAdvantagesList.map(({ title }) => {
      return (
        <li className="selected-advantages" key={`${title}-selected`} style={{ color: 'seagreen' }}>
          {title}
        </li>
      );
    })}
  </ul>
);

SelectedAdvantages.propTypes = {
  selectedAdvantagesList: PropTypes.array
};

export default SelectedAdvantages;
