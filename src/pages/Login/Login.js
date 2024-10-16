import { useState } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import authService from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const validationPatterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
  }

  const inputs = [
    {
      id: 1,
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      errorMessage: 'Invalid email address',
      autoComplete: '',
      required: true
    },
    {
      id: 2,
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      errorMessage: 'Enter password',
      autoComplete: 'new-password',
      required: true
    }
  ];

  const validateForm = (values) => {
    const isFilled = values && Object.keys(values)?.length;
    let valid = false;

    if (isFilled) {
      let isFieldsValid = {
        email: false,
        password: false
      }

      isFieldsValid.email = validationPatterns.email.test(values.email);
      isFieldsValid.password = validationPatterns.password.test(values.password);

      valid = Object.values(isFieldsValid).every(v => v);

      return valid;
    }

    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = validateForm(values);

    if (isValid) {
      authService.login(values)
        .then((resp) => {
          const result = resp?.data;

          if (result?.data?.accessToken) {
            localStorage.setItem('pet1-token', result.data.accessToken);
            navigate('/home');
          }
        })
        .catch((error) => {
          console.log('error', error);
        })
    }
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <div className="layout-container bg justify-content-center">
      <div className="container-fluid d-column auth-main-container">
        <div className="row">
          <div className="col centered-col g-0">
            <div className="auth-form d-column">
              <div>
                <h1 className='h-main'>Login</h1>
              </div>
              <div>
                <form action="" className="form" onSubmit={handleSubmit}>
                  {inputs.map((input) => (
                    <div className="f-field-row" key={input.id}>
                      <FormInput
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                      />
                      {/* {input.note && <span className='sm-notes'>{input.note}</span> } */}
                    </div>
                  ))}
                  <div className="btn-container el-bottom-align">
                    <button type="submit" className="btn-prim w-100">
                      <span className="text">Login</span>
                    </button>
                  </div>
                </form>
                <div className="sm-accent-text text-center mt-2 mb-2">
                  Don't have an account?&nbsp;
                  <Link to="/" className="simple-link">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;