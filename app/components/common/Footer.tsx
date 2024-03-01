import Image from "next/image";

const Footer = () => {
  const navs = [
    "About",
    "Support",
    "Privacy",
    "Policy",
    " Terms of Use",
    "Contact Us",
  ];
  const description =
    "Sing your heart out with our brand new karaoke web app! We’re ready to bring the music to your fingertips. Start belting out your favorite tunes with friends. Let's make every day a karaoke night!";

  return (
    <div className="w-full text-white gap-6 justify-center flex md:flex-col  bg-footer-dark  py-4 px-6">
      <div className="flex gap-4 w-full justify-center flex-col md:flex-row">
        {navs.map((nav) => (
          <span
            key={nav}
            className="text-white text-xs cursor-pointer hover:underline"
          >
            {nav}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-center text-xs">{description}</p>
        <div className="w-full justify-center gap-2 flex flex-col">
          <span className="w-full flex justify-center text-xs">
            &#169; Tingug Ltd. All rights reserved. {new Date().getFullYear()}
          </span>
          <div className="flex w-full justify-center">
            <Image
              width={100}
              height={100}
              src="/logov2.png"
              alt="logo"
              loader={() => "/logov2.png"}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
