import HomeClientComponent from "@/components/homepage/HomeClientComp";

import UpdateBookForm from "@/components/updateForm/UpdateBook";
import UpdateAuthorForm from "@/components/updateForm/UpdateAuthor";
import UpdateMemberForm from "@/components/updateForm/UpdateMember";
import UpdateTransactionForm from "@/components/updateForm/UpdateTransaction";

import SearchComponent from "@/components/homepage/SearchComponent";

function HomePage() {
  return (
    <>
      <HomeClientComponent
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
