import { ThreeDots } from 'react-loader-spinner';

export function LoadingSpinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <ThreeDots
        height="80"
        width="80"
        color="#535862"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
