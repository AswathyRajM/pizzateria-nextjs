'use server'
import { createClient } from "@/utils/supabase/server";
import { ProfileFormProps } from "@/utils/types";

export const fetchUserProfile = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) return null;
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const updateUserProfile = async ({
  id,
  name,
  address,
  avatar_img_url,
}: ProfileFormProps) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
        ...(avatar_img_url !== undefined && { avatar_img_url }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { success: true, profile: data };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
