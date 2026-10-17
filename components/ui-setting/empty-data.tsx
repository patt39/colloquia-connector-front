import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty';

interface Props {
  title?: React.ReactNode;
  image?: React.ReactNode;
  description?: React.ReactNode;
}

const EmptyData = ({ title, image, description }: Props) => {
  return (
    <div className="mt-4 relative justify-center text-center">
      <div className="inset-x-0 top-0 grid place-items-center justify-items-center">
        <Empty className="w-full border-0 bg-transparent p-2 md:p-4">
          <EmptyHeader>
            {image ? <EmptyMedia>{image}</EmptyMedia> : null}
            {title ? (
              <EmptyTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </EmptyTitle>
            ) : null}
            {description ? (
              <EmptyDescription className="font-medium text-gray-600 dark:text-gray-300">
                {description}
              </EmptyDescription>
            ) : null}
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  );
};

export { EmptyData };
