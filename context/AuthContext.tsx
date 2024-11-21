import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// Define types for the context value
interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with the default value of null
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set("authToken", token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // Same-site policy
    });
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
