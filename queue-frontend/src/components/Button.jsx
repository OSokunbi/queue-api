import PropTypes from 'prop-types';

export default function Button({ disabled, className, children, onClick }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`${className} text-white font-bold py-2 px-4 rounded-md`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: () => {},
};
