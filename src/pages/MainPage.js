import { Link } from 'react-router';
import MainLayout from '../layouts/MainLayout';

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <div>MainPage</div>
      </MainLayout>
      <Link to={'/mail'}>mail</Link>
    </>
  );
};
export default MainPage;
