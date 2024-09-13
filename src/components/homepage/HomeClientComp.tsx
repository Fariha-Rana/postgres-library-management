"use client";
import { ReactNode, useState } from "react";
import TabButton from "@/components/homepage/TabButton";
import ActiveTabButtons from "@/components/homepage/ActiveTabButtons";

const HomeClientComponent = ({
  addBookForm,
  addAuthorForm,
  addMemberForm,
  addTransactionForm,
  updateBookForm,
  updateAuthorForm,
  updateMemberForm,
  updateTransactionForm,
}: {
  addBookForm: ReactNode;
  addAuthorForm: ReactNode;
  addMemberForm: ReactNode;
  addTransactionForm: ReactNode;
  updateBookForm: ReactNode;
  updateAuthorForm: ReactNode;
  updateMemberForm: ReactNode;
  updateTransactionForm: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState("Book");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState("");

  const tabs = [
    {
      label: "Books",
      value: "Book",
      addComp: addBookForm,
      updateComp: updateBookForm,
    },
    {
      label: "Authors",
      value: "Author",
      addComp: addAuthorForm,
      updateComp: updateAuthorForm,
    },
    {
      label: "Members",
      value: "Member",
      addComp: addMemberForm,
      updateComp: updateMemberForm,
    },
    {
      label: "Transactions",
      value: "Transaction",
      addComp: addTransactionForm,
      updateComp: updateTransactionForm,
    },
  ];

  const openModal = (action: string) => {
    setAddModalOpen(true);
    setModalActionType(action);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setModalActionType("");
  };

  return (
    <section className="flex flex-col gap-2 items-center justify-center p-4 ">
      <h2>Library management section</h2>
      <div className="flex gap-8 m-6">
        {tabs.map((tab) => (
          <div key={tab.value}>
            <TabButton
              label={tab.label}
              isActive={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            />
            {activeTab === tab.value && isAddModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-70">
                <div className="mt-16  bg-gray-200 py-6 px-8 rounded-lg shadow-lg">
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-sm hover:opacity-70 bg-red-500 text-white rounded-md"
                    >
                      X
                    </button>
                  </div>
                  {modalActionType === "Add"
                    ? tab.addComp
                    : modalActionType === "Update"
                    ? tab.updateComp
                    : null}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ActiveTabButtons activeTab={activeTab} openModal={openModal} />
    </section>
  );
};
export default HomeClientComponent;
