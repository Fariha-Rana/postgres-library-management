import HomeClientComponent from "@/components/homepage/HomeClientComp";

import AddAuthorForm from "@/components/addForm/addAuthorForm";
import AddBookForm from "@/components/addForm/addBookForm";
import AddMemberForm from "@/components/addForm/addMember";
import AddTransactionForm from "@/components/addForm/addTransaction";

import UpdateBookForm from "@/components/updateForm/UpdateBook";
import UpdateAuthorForm from "@/components/updateForm/UpdateAuthor";
import UpdateMemberForm from "@/components/updateForm/UpdateMember";
import UpdateTransactionForm from "@/components/updateForm/UpdateTransaction";

import SearchComponent from "@/components/homepage/SearchComponent";

function HomePage() {
  return (
    <>
      <HomeClientComponent
        addBookForm={<AddBookForm />}
        addAuthorForm={<AddAuthorForm />}
        addMemberForm={<AddMemberForm />}
        addTransactionForm={<AddTransactionForm />}
        updateBookForm={<UpdateBookForm />}
        updateAuthorForm={<UpdateAuthorForm />}
        updateMemberForm={<UpdateMemberForm />}
        updateTransactionForm={<UpdateTransactionForm />}
      />
      <SearchComponent />
    </>
  );
}

export default HomePage;
