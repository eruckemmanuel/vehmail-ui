export const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/v1/account/user/");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
