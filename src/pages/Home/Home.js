import authService from "../../services/authService";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
  
    authService.logout()
      .then(resp => {
        authService.removeUserToken();
        navigate('/login');
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  return (
    <>
        <div>Home page</div>
        <button type="button" onClick={logout}>logout</button>
    </>
  )
}


export default Home;