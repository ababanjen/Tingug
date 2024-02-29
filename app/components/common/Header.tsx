import Logo from "../icons/logo";

const Header = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row w-full justify-between items-center py-4 px-6 sticky top-0 bg-coffee shadow">
      <span>
        <Logo />
      </span>
      <span className="text-[12px] md:text-sm cursor-pointer text-white px-2 py-1 bg-main rounded">
        Get premium
      </span>
    </div>
  );
};

export default Header;
