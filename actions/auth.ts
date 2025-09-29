import { createClient } from "@/utils/supabase/client";

export async function getUserSession() {
  try {
    const supabase = createClient();

    const {
      data: { session },
      error,
    }: any = await supabase.auth.getSession();

    if (error) console.error("Session error:", error);

    if (session) {
      // Check if expired
      if (Date.now() / 1000 > session.expires_at) {
        // Refresh session
        const { data: refreshedData, error: refreshError } =
          await supabase.auth.refreshSession();
        if (refreshError) {
          console.error("Refresh error:", refreshError);
          return null;
        }
        return {
          user: refreshedData.user,
          session: refreshedData.session,
          cart: {},
        };
      }
      return { user: session.user, session, cart: {} };
    }

    // No session, create anonymous session
    const { data, error: anonError } = await supabase.auth.signInAnonymously();
    if (anonError) {
      console.error("Anonymous auth error:", anonError);
      return null;
    }
    return { user: data.user, session: data.session, cart: null };
  } catch (err) {
    console.error("Unexpected auth error:", err);
    return null;
  }
}

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const handleSignup = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const supabase = createClient();
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    });
    if (error) throw error;

    const userId = authData.user?.id;
    if (!userId) throw new Error("User ID not found after signup");

    const { error: profileError } = await supabase.from("profiles").upsert([
      {
        id: userId,
        name,
      },
    ]);

    if (profileError) throw profileError;

    return { success: true };
  } catch (error: unknown) {
    console.log({ error });

    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const userLogout = async () => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
