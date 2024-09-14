export default async function asyncHandler(func) {
  try {
    const res = await func();
    return {
      rows: res?.rows || [],
      errorMessage: null,
    };
  } catch (error) {
    console.error(error.message);
    return {
      errorMessage: error.message,
      rows: [],
    };
  }
}
