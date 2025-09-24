"use server";

import { supabase } from "../utils/supabase/client";

export async function getUserSession() {
  try {
    // get the existing session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
    }

    let authData: any;

    if (sessionError || !session) {
      // If no session exists, sign in anonymously
      const { data, error: anonError } =
        await supabase.auth.signInAnonymously();

      if (anonError) {
        console.error("Anonymous auth error:", anonError);
        return null;
      }

      authData = {
        user: data.user,
        session: data.session,
        cart:null
      };
    } else {
      // Session already exists
      authData = {
        user: session.user,
        session: session,
        cart: {}
      };
    }

    return authData;
  } catch (error) {
    console.error("Unexpected error in auth endpoint:", error);
    return null;
  }
}
