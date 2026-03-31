import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export type SubscriptionStatus = "trial" | "active" | "expired" | "none";

export interface UserProfile {
  uid: string;
  email: string | null;
  trialStart?: any;
  trialEnd?: any;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  trialDaysLeft: number | null;
  isTrialActive: boolean;
  isSubscribed: boolean;
  hasAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const loadProfile = async (u: User) => {
    const ref = doc(db, "users", u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const trialStart = new Date();
      const trialEnd = new Date(trialStart);
      trialEnd.setDate(trialEnd.getDate() + 7);
      const newProfile: UserProfile = {
        uid: u.uid,
        email: u.email,
        trialStart,
        trialEnd,
        subscriptionStatus: "trial",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(ref, newProfile);
      setProfile({ ...newProfile, trialStart, trialEnd } as any);
    } else {
      const data = snap.data() as UserProfile;
      setProfile({ ...data, uid: u.uid, email: u.email });
    }
  };

  const refreshProfile = async () => {
    if (user) await loadProfile(user);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });

  return unsubscribe;
}, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await loadProfile(cred.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const trialDaysLeft = (() => {
    if (!profile || !profile.trialEnd) return null;
    const end = profile.trialEnd?.toDate ? profile.trialEnd.toDate() : new Date(profile.trialEnd);
    const now = new Date();
    const diff = daysBetween(now, end);
    return diff;
  })();

  const isTrialActive = !!(
    profile?.subscriptionStatus === "trial" &&
    trialDaysLeft !== null &&
    trialDaysLeft >= 0
  );

  const isSubscribed = profile?.subscriptionStatus === "active";

  const hasAccess = isTrialActive || isSubscribed;

  useEffect(() => {
    // auto-expire trial if past end date
    const checkAndUpdate = async () => {
      if (!user || !profile) return;
      if (profile.subscriptionStatus !== "trial") return;
      const end = profile.trialEnd?.toDate ? profile.trialEnd.toDate() : new Date(profile.trialEnd);
      const now = new Date();
      if (now > end) {
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, { subscriptionStatus: "expired", updatedAt: serverTimestamp() });
        setProfile(p => p ? { ...p, subscriptionStatus: "expired" } : p);
      }
    };
    checkAndUpdate();
  }, [user, profile?.trialEnd, profile?.subscriptionStatus]);

  const value: AuthContextType = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    refreshProfile,
    trialDaysLeft,
    isTrialActive,
    isSubscribed,
    hasAccess
  };

  return <AuthContext.Provider value={{ user }}> {!loading && children}
</AuthContext.Provider>
}
