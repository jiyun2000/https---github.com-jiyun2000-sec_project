import BasicMenu from './BasicMenu';

const MainLayout = ({ children }) => {
  return (
    <div className="h-[100%] w-[100%] m-0 flex flex-row">
      <div className="w-[15%] min-w-[200px] relative">
        <BasicMenu />
      </div>
      <div className="w-[85%]">{children}</div>
    </div>
  );
};
export default MainLayout;
