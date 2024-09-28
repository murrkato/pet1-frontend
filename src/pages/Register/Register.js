import { useState } from 'react';
import styles from './Register.module.scss';
import FormInput from '../../components/FormInput/FormInput';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // const [username, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmedPass, setConfirmedPass] = useState('');
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPass: ''
  });

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'username',
      placeholder: 'Username',
      errorMessage: 'Username should be 3-16 characters and shouldn\'t include any special character',
      autoComplete: '',
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      errorMessage: 'Invalid email address',
      autoComplete: '',
      required: true
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      note: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      autoComplete: 'new-password',
      required: true
    },
    {
      id: 4,
      type: 'password',
      name: 'confirmedPass',
      placeholder: 'Confirmed Password',
      errorMessage: 'Passwords don\'t match',
      pattern: values.password,
      autoComplete: 'new-password',
      required: true
    }
  ];

  const validateForm = () => {
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // let data = new FormData(e.target);
    // console.log('qq', Object.fromEntries(data.entries()));

    let isValid = true;

    if (isValid) {
      let userData = {...values};
      delete userData.confirmedPass;

      console.log('userData', userData);

      authService.register(userData)
        .then((resp) => {
          console.log('registered', resp);
        })
        .catch((error) => {
          console.log('error', error);
          // navigate('/home');
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
            <div className={`${styles['auth-form']} d-column`}>
              <div>
                <h1 className='h-main'>Register</h1>
                <h3 className='h-main-3'>To get started, fill out the registration form below</h3>
              </div>
              <div>
                <form action="" className="form auth-form" onSubmit={handleSubmit}>
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
                      <span className="text">Get started</span>
                    </button>
                  </div>
                </form>
                <div className="sm-accent-text text-center mt-2 mb-2">
                  Already have an account?&nbsp;
                  <a className="simple-link">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;