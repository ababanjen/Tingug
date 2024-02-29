import Button from "../common/formComponents/Button";

const Section5 = () => {
  return (
    <div className="flex w-full justify-center py-4 px-4 lg:px-8">
      <div className="bg-white lg:w-[40%] py-2 px-4 flex-col lg:flex-row justify-between rounded flex gap-4">
        <span className="text-based lg:text-lg italic">Looking for a business solution?</span>
        <div className="flex justify-center">
          <Button label="Request an appointment" />
        </div>
      </div>
    </div>
  );
};

export default Section5;
