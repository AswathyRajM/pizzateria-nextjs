import { fetchUserProfile } from "@/actions/profile";
import ProfileForm from "@/components/profile/profile-form";

export default async function AccountPage() {
  const profile = await fetchUserProfile();
  return (
    <div>
      <ProfileForm profile={profile} />
    </div>
  );
}
