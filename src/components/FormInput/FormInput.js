import { useState } from 'react';
import mainStyles from './FormInput.module.scss';

const excludeProps = (props, excludedProps) => {
  return Object.keys(props)
      .filter(key => !excludedProps.includes(key))
      .reduce((result, key) => ({ ...result, [key]: props[key] }), {});
};

const FormInput = (props) => {
  const [lostFocus, setLostFocus] = useState(false);
  const {styles, autoComplete, onChange, errorMessage, ...inputProps} = props;
  const excludedProps = ['note'];
  const requiredProps = excludeProps(inputProps, excludedProps);

  const handleBlur = (e) => {
    setLostFocus(true);
  }

  return (
    <>
      {/* <input
        id={props.id}
        type={props.type}
        className={`${props.styles ? props.styles : ''} input`}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete ? props.autoComplete : undefined}
        onChange={props.onChange}
      /> */}
      <input
        {...requiredProps}
        className={`${styles ? styles : ''} input`}
        autoComplete={autoComplete ? autoComplete : undefined}
        onChange={onChange}
        onBlur={handleBlur}
        focused={lostFocus.toString()}
      />
      <small className={`${mainStyles.errorShow} error`}>{errorMessage}</small>
    </>
  )
}

export default FormInput; 