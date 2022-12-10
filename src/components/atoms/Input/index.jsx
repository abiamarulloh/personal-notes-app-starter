import PropTypes from 'prop-types';
import './index.css';

export function Input({ type, value, placeholder, onChange }) {
    return (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}