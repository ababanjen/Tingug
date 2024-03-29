import { useRouter } from "next/navigation";
import Logo from "../icons/logo";

const Header = () => {
  const { push } = useRouter();
  return (
    <div className="z-10 flex flex-col gap-2 md:flex-row w-full justify-between items-center py-4 px-6 md:sticky top-0 bg-coffee shadow">
      <span onClick={() => push("/")} className="cursor-pointer">
        <Logo />
      </span>
      <span className="text-[12px] md:text-sm cursor-pointer text-white px-2 py-1 bg-main rounded">
        Get premium
      </span>
    </div>
  );
};

export default Header;
