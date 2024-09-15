import { updateBook } from "@/database/actions/update.actions";
import dbConnection from "@/database/connection";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import ResponseMessage from "../ResponseMessage";

export default async function UpdateBookForm() {
  const _updateBookWithId: (formData: FormData) => Promise<void> =
    updateBook.bind(null, 1);
  const res = await dbConnection.query(
    "SELECT * FROM Books WHERE book_id = $1",
    [1]
  );

  const book = res?.rows[0] || [];
  if (book.length === 0) {
    return <ResponseMessage message="Book not found" />;
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Update Book</h2>
      <form action={_updateBookWithId} className="space-y-4">
        <LabelandInput
          label="Title"
          id="title"
          type="text"
          name="title"
          defaultValue={book.title}
        />
        <LabelandInput
          label="Author ID"
          id="authorId"
          type="number"
          name="authorId"
          defaultValue={book.author_id}
        />
        <LabelandInput
          label="Genre"
          id="genre"
          type="text"
          name="genre"
          defaultValue={book.genre}
        />
        <LabelandInput
          label="Publish Date"
          id="publishDate"
          type="text"
          name="publishDate"
          defaultValue={new Date(book.publish_date).toDateString()}
        />
        <LabelandInput
          label="ISBN Code"
          id="isbn"
          type="text"
          name="isbn"
          defaultValue={book.isbn}
        />
        <LabelandInput
          label="Available Copies"
          id="availableCopies"
          type="number"
          name="availableCopies"
          defaultValue={book.available_copies}
        />
        <SubmitButton label="Update Book" />
      </form>
    </>
  );
}
