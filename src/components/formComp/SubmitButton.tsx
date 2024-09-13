function SubmitButton({ label }: { label: string }) {
  return (
    <div className="flex justify-center">
      <button type="submit" className="submitBtn">
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
