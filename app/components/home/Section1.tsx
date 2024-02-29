import Button from "../common/formComponents/Button";

const Section1 = () => {
  return (
    <section className="mt-16 mb-6 lg:mb-44 flex flex-col gap-8 mx-4  lg:mx-32 lg:my-16">
      <h1 className="text-4xl text-white drop-shadow-lg font-bold shadow-black lg:w-[50%]">
        Sing Your Heart Out: The Ultimate Karaoke Experience Await You!
      </h1>
      <h2 className=" text-white lg:w-[50%]">
        That sounds like a fun way to enjoy singing at home! Tingug karaoke is a
        youtube based karaoke and a great platform to showcase your singing
        skills.
      </h2>
      <span className="flex">
        <Button
          label="Sing for free!"
          className="py-2"
          labelClassName="text-lg"
        />
      </span>
    </section>
  );
};

export default Section1;
