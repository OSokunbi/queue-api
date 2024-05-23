import PropTypes from 'prop-types';

export default function Card({ className, title, children }) {
  return (
    <div className={`${className} break-words text-wrap flex flex-col shadow-md rounded-lg`}>
      <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Card.defaultProps = {
  className: '',
  title: '',
};