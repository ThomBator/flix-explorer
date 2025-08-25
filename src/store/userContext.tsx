import { createContext, useState, useEffect, useMemo, useContext } from "react";
import userService from "@/services/user";
import { all } from "axios";

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
      console.log("stored", storedUser);
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
    console.log("Handle signup fired ", userObj);

    allUsers.forEach((savedUser) => {
      if (userObj.email === savedUser.username) {
        alert("Username already exists. Please try again");
        return;
      }
    });

    userService.setUsers([
      ...allUsers,
      { email: userObj.email, password: userObj.password },
    ]);

    userService.setCurrentUser(userObj);

    setAllUsers((prevAllUsers) => [...prevAllUsers, userObj]);
    setUser(userObj);
  };

  return handleSignup;
};

export const useAuth = () => {
  const { user, setUser, allUsers } = useContext(UserContext);
  const handleAuth = (userObj) => {
    console.log(userObj, allUsers);
    allUsers.forEach((savedUser) => {
      if (userObj.email === savedUser.email) {
        if (userObj.password === savedUser.password) {
          userService.setCurrentUser(userObj);
          setUser(userObj);
        } else {
          alert("Incorrect user name or password, please try again");
        }
      }
    });
  };

  return handleAuth;
};

export const useLogout = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    console.log("Logout fired");
    userService.setCurrentUser(null);
    setUser(null);
  };
  return handleLogout;
};
