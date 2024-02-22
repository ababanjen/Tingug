import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full justify-center flex flex-col bg-[#595959] px-4 py-6">
      <div className="flex w-full justify-center">
        <Image
          width={100}
          height={100}
          src="/logov1.png"
          alt="logo"
          loader={() => "/logov1.png"}
        />
      </div>
      <p className="text-white flex w-full text-center p-10 text-sm">
        {`Sing your heart out with our brand new karaoke web app! Founded by Jen Ababan on February 20, 2024 and ready to bring the music to your fingertips. Start belting out your favorite tunes with friends. Let's make every day a karaoke night!`}
      </p>
      <span className="w-full flex justify-center text-white text-xs">
        &copy; {new Date().getFullYear()}
      </span>
    </div>
  );
};

export default Footer;
