'use client'

const GoBackButton = ({ path, type, onClickFunc }: {onClickFunc?: () => void; path: string, type: string }) => {
  
  const handleReload = () => {
    window.location.href = path;
  };

  const handleClick = onClickFunc || handleReload;

  // Define styles based on the type prop
  const buttonBackgroundColor = type === 'standard' ? 'bg-black' : 'bg-white';
  const buttonTextColors = type === 'standard' ? 'text-white' : 'text-black';
  const hoverBackground = type === 'standard' ? 'hover:bg-gray-900' : 'hover:bg-gray-100';
  const hoverTextColors = type === 'standard' ? 'hover:text-white' : 'hover:text-black';
  const hoverDarkBackground = type === 'standard' ? 'dark:hover:bg-gray-800' : 'dark:hover:bg-gray-900';
  const hoverDarkTextColors = type === 'standard' ? 'dark:text-white' : 'dark:text-black';

  return (
    <button
    onClick={handleClick}
    type="button"
      className={`w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm border rounded-lg gap-x-2 sm:w-auto transition-colors duration-200 ${buttonBackgroundColor} ${buttonTextColors} ${hoverBackground} ${hoverTextColors} dark:${hoverDarkBackground} dark:${hoverDarkTextColors}`}
    >
      <svg
        className="w-5 h-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
      </svg>
      <span>Go back</span>
    </button>
  );
};

export default GoBackButton;
