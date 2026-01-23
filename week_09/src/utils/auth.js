export const signup = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return { status: "NO_USER" };
  }

  if (user.email === email && user.password === password) {
    localStorage.setItem("token", "auth");
    return { status: "SUCCESS" };
  }

  return { status: "INVALID_CREDENTIALS" };
};

export const resetPassword = (email, newPassword) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== email) {
    return false;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ ...user, password: newPassword })
  );
  return true;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
