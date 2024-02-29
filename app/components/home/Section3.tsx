import DeviceIcon from "../icons/device";
import MicIcon from "../icons/mic";
import YoutubeIcon from "../icons/youtube";

const Section3 = () => {
  const features = [
    {
      title: "Play in any browser device",
      description:
        "Transform your computer, mobile device, or smart TV into a karaoke machine and enjoy singing wherever and whenever you want.",
      Icon: DeviceIcon,
    },
    {
      title: "Sing all YouTube Karaoke",
      description:
        "Gain access to high-quality YouTube karaoke songs and a wide selection of themed playlists.",
      Icon: YoutubeIcon,
    },
    {
      title: "Sing anytime anywhere!",
      description:
        "Locate the closest karaoke spot with Tingug Karaoke, select a song, and take the stage to showcase your talent.",
      Icon: MicIcon,
    },
  ];
  return (
    <section className="bg-faded-gray-500 px-10 py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-center lg:px-32">
        {features.map(({ title, description, Icon }) => (
          <div key={title} className="flex justify-center flex-col gap-4">
            <div className="flex w-full justify-center">
              <div className="relative w-28 h-28 overflow-hidden bg-faded-gray border border-main rounded-full flex justify-center">
                <span className="flex w-16 items-center">
                  <Icon />
                </span>
              </div>
            </div>
            <span className="text-center font-semibold text-based">{title}</span>
            <span className="text-center text-sm">{description}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section3;
