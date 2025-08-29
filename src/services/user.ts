const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  return users;
};
const setUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const getCurrentUser = () => {
  const users = JSON.parse(localStorage.getItem("current-user"));
  return users;
};

const setCurrentUser = (userObj) => {
  localStorage.setItem("current-user", JSON.stringify(userObj));
};

export default { getUsers, setUsers, getCurrentUser, setCurrentUser };
