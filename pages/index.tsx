import { LayoutAuth } from "@/components/layouts/auth";
import { ButtonInput } from "@/components/ui-setting";
import { ImageWithFallback } from "@/components/ui-setting/image.with.fallback";
import { config } from "@/config";
import Link from "next/link";

const Home = () => {
  return (
    <LayoutAuth title="Colloquia multimedia crm connector">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 py-6 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Control your expenses, create your quotes, invoices, and manage
              your products inventory.
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-7 font-normal text-gray-500">
              Turn your smartphone or tablet into a powerful tool for creating
              quotes and invoices, and a point-of-sale terminal. Easily manage
              your sales, stock, customers and suppliers
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <Link href={`/register`}>
                <ButtonInput type="button" size="lg" variant="default">
                  Get started
                </ButtonInput>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]">
          <div className="[transform:rotateX(20deg);]">
            <ImageWithFallback
              className="relative z-2 rounded-lg border dark:hidden"
              src="/assets/dashboard-light.png"
              alt={config.company.name as string}
              width={2700}
              height={2074}
            />
            <ImageWithFallback
              className="relative z-2 hidden rounded-lg border dark:block"
              src="/assets/dashboard-dark.png"
              alt={config.company.name as string}
              width={2700}
              height={2074}
            />
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default Home;
