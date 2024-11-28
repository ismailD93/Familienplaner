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
  login: (token: string) => boolean;
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

  const login = (token: string): boolean => {
    Cookies.set("authToken", token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Check if the cookie was successfully set
    const cookieValue = Cookies.get("authToken");

    if (cookieValue === token) {
      setAuthToken(token); // Assuming this updates your application state
      return true; // Cookie successfully set
    } else {
      console.error("Failed to set authToken cookie.");
      return false; // Cookie setting failed
    }
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
