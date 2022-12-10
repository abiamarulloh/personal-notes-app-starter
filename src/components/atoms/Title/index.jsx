import PropTypes from 'prop-types';
import './index.css';

export function Title({title, size, align, color}) {
    return (
       <h1 style={{fontSize: size, textAlign: align, color: color }}>{title}</h1>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    align: PropTypes.string,
    color: PropTypes.string,
}