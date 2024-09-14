function ResponseMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-400 text-center text-white">{message}.</div>
  );
}

export default ResponseMessage;
