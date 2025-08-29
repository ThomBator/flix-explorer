import { createContext, useState, useEffect, useMemo, useContext } from "react";
import userService from "@/services/user";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  //I think useMemo is good here to avoid re-renders unless these values change?
  const value = useMemo(
    () => ({
      user,
      setUser,
      allUsers,
      setAllUsers,
    }),
    [user, allUsers]
  );

  //Get user from local storage (or DB in future iteration) on mount
  useEffect(() => {
    const storedUser = userService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    const allStoredUsers = userService.getUsers();
    if (allStoredUsers.length > 0) {
      setAllUsers(allStoredUsers);
    }
  }, []);

  return <UserContext value={value}>{children}</UserContext>;
}

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
};

export const useSignUp = () => {
  const { user, setUser, allUsers, setAllUsers } = useContext(UserContext);

  const handleSignup = (userObj) => {
    let existingUser = false;

    allUsers.forEach((savedUser) => {
      if (userObj.email === savedUser.email) {
        existingUser = true;
        return;
      }
    });

    if (existingUser) {
      alert("Username already exists. Please try again");
      return;
    }

    userService.setUsers([
      ...allUsers,
      {
        firstName: userObj.firstName,
        email: userObj.email,
        password: userObj.password,
      },
    ]);

    userService.setCurrentUser(userObj);

    setAllUsers((prevAllUsers) => [...prevAllUsers, userObj]);
    setUser({
      firstName: userObj.firstName,
      email: userObj.email,
      password: userObj.password,
    });
  };

  return handleSignup;
};

export const useAuth = () => {
  const { user, setUser, allUsers } = useContext(UserContext);
  const handleAuth = (userObj) => {
    let userFound = false;

    allUsers.forEach((savedUser) => {
      if (userObj.email === savedUser.email) {
        if (userObj.password === savedUser.password) {
          userService.setCurrentUser(savedUser);
          setUser(savedUser);
          userFound = true;
        } else {
          setUser(null);
          userService.setCurrentUser(null);
          alert("Incorrect user name or password, please try again");
        }
      }
    });
    if (!userFound) {
      alert("Incorrect user name or password, please try again");
    }
  };

  return handleAuth;
};

export const useLogout = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    userService.setCurrentUser(null);
    setUser(null);
  };
  return handleLogout;
};
