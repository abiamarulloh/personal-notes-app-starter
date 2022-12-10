import PropTypes from 'prop-types';
import './index.css';

export function Button({ title, type, color, onClick }) {
    return (
        <button style={{ color: color }} type={type} onClick={onClick}>{title}</button>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}