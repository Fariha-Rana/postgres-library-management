export default async function asyncHandler(func) {
  try {
    const res = await func();
    return res.rows;
  } catch (error) {
    return {
      errorMessage: error.message,
    };
  }
}
