"use client";

import { useState } from "react";
import Button from "@/components/shared/button";
import { useToastStore } from "@/store/toastStore";
import EditableInputProps from "../shared/editable-input";
import { updateUserProfile } from "@/actions/profile";
import { ProfileFormProps } from "@/utils/types";

export default function ProfileForm({
  profile,
}: {
  profile: ProfileFormProps;
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { profile, error } = await updateUserProfile(userProfile);
      if (error) {
        showToast(error, "error");
        return;
      }
      setUserProfile(profile);
      showToast("Account updated!", "success");
    } catch (error: unknown) {
      showToast(
        error instanceof Error ? error.message : "An error occurred",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-1 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Account Information</h1>

      <form
        onSubmit={submitEdit}
        className="flex flex-col gap-4 text-sm l:text-base"
      >
        <EditableInputProps
          name="name"
          value={userProfile.name}
          onChange={handleInputChange}
          placeholder="Name"
          isEditing={isEditing}
          required
        />
        <EditableInputProps
          name="address"
          value={userProfile.address}
          onChange={handleInputChange}
          placeholder="Address"
          isEditing={isEditing}
          type="textarea"
        />
        <Button
          loading={isLoading}
          onClick={() => setIsEditing(!isEditing)}
          className="!p-3 mt-4 w-fit self-end"
          type="submit"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </form>
    </div>
  );
}
