import { toCurrency } from "@/app/helpers/numbers";
import Button from "../common/formComponents/Button";
import GcashIcon from "../icons/gCash";
import GotymeIcon from "../icons/goTyme";
import PayMayaIcon from "../icons/maya";

const Section4 = () => {
  const paymentMethods = [
    {
      name: "G-Cash",
      Icon: GcashIcon,
    },
    {
      name: "Pay Maya",
      Icon: PayMayaIcon,
    },
    {
      name: "GoTyme",
      Icon: GotymeIcon,
    },
  ];

  const subscriptions = [
    {
      title: "Tingug Premium",
      amount: 2,
      limit: 2,
      limitType: "hours",
      description:
        "With unlimited song selection for 2 hours, you'll have access to a vast library of music from all genres and eras. ",
    },
    {
      title: "Tingug Premium",
      amount: 30,
      limit: 1,
      limitType: "day",
      description:
        "With unlimited song selection for 1 day, you can enjoy a non-stop music experience tailored to your preferences. ",
    },
    {
      title: "Tingug Premium",
      amount: 85,
      limit: 1,
      limitType: "month",
      description:
        "With unlimited song selection for 1 month, you can enjoy a non-stop music experience tailored to your preferences. ",
    },
    {
      title: "Tingug Premium",
      amount: 150,
      limit: 1,
      limitType: "year",
      description:
        "Enjoy the freedom to, discover new artists, and soundtrack every moment of your life with unlimited song selection for an entire year.",
    },
  ];
  return (
    <section className="bg-faded-gray bg-opacity-20 px-4 lg:px-10 py-8">
      <div className="flex flex-col justify-center lg:px-32">
        <div className="flex flex-col gap-2">
          <span className="font-semibold flex text-based capitalize">
            Choose your payment method
          </span>
          <div className="flex flex-col lg:flex-row gap-2">
            {paymentMethods.map(({ Icon, name }) => (
              <div
                className="cursor-pointer px-4 py-2 flex  justify-center items-center w-32 bg-white rounded"
                key={name}
              >
                <span className="flex justify-center items-center w-full">
                  <Icon />
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-4 py-2 bg-white rounded justify-center">
              <div className="flex flex-col gap-2 border-b px-4 lg:px-0 lg:border-b-0 lg:border-r lg:pr-4 border-black">
                <span className="font-semibold text-sm">
                  {subscriptions[0].title}
                </span>
                <span className="font-semibold text-md">
                  {toCurrency(subscriptions[0].amount)}{" "}
                  <span className="text-xs font-light">
                    /{" "}
                    {`${subscriptions[0].limit} ${subscriptions[0].limitType}`}
                  </span>
                </span>
              </div>
              <span className="text-sm py-2 px-4 lg:px-0">
                {subscriptions[0].description}
              </span>
              <div className="flex items-center justify-center">
                <Button label="Subscribe" className="py-2 px-4 w-40" />
              </div>
            </div>
            <div className="flex gap-2 overflow-auto lg:overflow-hidden">
              {subscriptions.map(
                (subscription) =>
                  subscription.limitType !== "hours" && (
                    <div
                      key={subscription.limitType}
                      className="flex flex-col px-4 gap-4 py-6  bg-white rounded "
                    >
                      <span className="font-semibold text-sm">
                        {subscription.title}
                      </span>
                      <span className="font-semibold text-md">
                        {toCurrency(subscription.amount)}{" "}
                        <span className="text-xs font-light">
                          / {`${subscription.limit} ${subscription.limitType}`}
                        </span>
                      </span>
                      <span className="text-xs lg:text-sm py-2 px-4 lg:px-8">
                        {subscription.description}
                      </span>
                      <div className="flex items-center justify-center">
                        <Button label="Subscribe" className="py-2 px-4 w-40" />
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
