import { CircleXIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

interface Props {
  status?: unknown;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  actionButton?: React.ReactNode;
}

function subscribe(callback: () => void) {
  window.addEventListener("online", () => callback);
  window.addEventListener("offline", () => callback);
  return () => {
    window.removeEventListener("online", () => callback);
    window.removeEventListener("offline", () => callback);
  };
}

const getSnapshot = () => window.navigator.onLine;

const ErrorFile = ({
  title,
  description,
  className = "relative mx-auto justify-center",
}: Props) => {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <div className={className}>
      <div className="inset-x-0 top-0 m-8 grid place-items-center">
        <div className="mx-auto max-w-max text-red-600">
          <CircleXIcon className="size-28" />
        </div>
        <p className="text-8xl font-bold dark:text-white">
          {isOnline ? title : "500"}
        </p>

        <ul className="mt-3 flex items-center justify-center space-x-6 sm:space-x-8">
          <li className="items-center">
            <span className="text-xl font-bold text-gray-500">
              {isOnline ? description : "No internet"}
            </span>
          </li>
        </ul>

        <ul className="mt-3 flex items-center justify-center space-x-6 sm:space-x-8">
          <li className="items-center">
            {!isOnline ? (
              <span className="mt-1 font-bold text-gray-500">
                ERR_INTERNET_DISCONNECTED
              </span>
            ) : null}
          </li>
        </ul>
        {/* <Result
            status={isOnline ? status : '500'}
            title={
              <p className="text-8xl font-bold dark:text-white">
                {isOnline ? title : '500'}
              </p>
            }
            subTitle={
              <>
                <div className="mx-auto max-w-xl text-center">
                  {isOnline ? (
                    <Link href={'/'}>
                      <ButtonInput size="default" variant="info" type="button">
                        Back To Home
                      </ButtonInput>
                    </Link>
                  ) : null}

                  <ul className="mt-2 flex items-center justify-center space-x-6 sm:space-x-8">
                    <li className="items-center">
                      <span className="text-xl font-bold dark:text-gray-500">
                        {isOnline ? description : 'No internet'}
                      </span>
                    </li>
                  </ul>
                  <ul className="mt-2 flex items-center justify-center space-x-6 sm:space-x-8">
                    <li className="items-center">
                      {!isOnline ? (
                        <span className="mt-1 font-bold dark:text-gray-500">
                          ERR_INTERNET_DISCONNECTED
                        </span>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </>
            }
          /> */}
      </div>
    </div>
  );
};

export { ErrorFile };
