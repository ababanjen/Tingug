import Logo from "../icons/logo";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center py-4 px-6 sticky top-0 bg-coffee shadow">
      <span>
        <Logo />
      </span>
      <span className="text-sm cursor-pointer text-white px-2 py-1 bg-main rounded">
        Get premium
      </span>
    </div>
  );
};

export default Header;
