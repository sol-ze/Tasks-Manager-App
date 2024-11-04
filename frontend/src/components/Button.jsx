import { memo } from "react";
import PropTypes from "prop-types";

const buttonOptions = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "light",
  dark: "dark",
};

const Button = ({ btnOption, children, onClick }) => {
  return (
    <button
      className={`btn btn-${btnOption} mt-0 mb-2 ms-2 rtl-text text-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnOption: PropTypes.oneOf(Object.values(buttonOptions)), //convert object values to array of values
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  btnOption: buttonOptions.primary,
  disabled: false,
};

export { buttonOptions };
export default memo(Button);
