interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`w-full py-2 px-4 font-semibold text-lg hover:opacity-70  ${
        isActive ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-600"
      } rounded-md`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
