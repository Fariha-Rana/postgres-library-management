interface ActiveTabButtonProps {
  activeTab: string;
  openModal: (actionType: string) => void;
}

function ActiveTabButtons({ activeTab, openModal }: ActiveTabButtonProps) {
  return (
    <div className="flex gap-4 w-4/6 justify-center items-center ">
      {["Add", "Update", "Delete"].map((action, i) => (
        <button
          key={i}
          onClick={() => openModal(action)}
          className={`mb-4 px-4 py-2 text-gray-200 rounded-md  hover:opacity-70 
            ${action === "Add" && "bg-green-600 "}
            ${action === "Update" && "bg-orange-600 "}
            ${action === "Delete" && "bg-red-600 "}
             `}
        >
          {action} a {activeTab}
        </button>
      ))}
    </div>
  );
}

export default ActiveTabButtons;
