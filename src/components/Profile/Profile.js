import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore"; // Ensure this is correctly set up for state management

// Assuming useAuthStore is correctly set up for state management
async function fetchProfile(userName) {
  const accessToken = useAuthStore.getState().accessToken;
  const response = await fetch(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
}

async function updateAvatar({ avatarUrl, userName }) {
  const accessToken = useAuthStore.getState().accessToken;
  const response = await fetch(
    `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/media`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function Profile() {
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const userName = useAuthStore((state) => state.userName);

  useEffect(() => {
    fetchProfile(userName)
      .then((profileData) => {
        setProfile(profileData);
      })
      .catch(console.error);
  }, [userName]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateAvatar({
        avatarUrl: data.avatar,
        userName,
      });
      console.log("Avatar updated successfully:", updatedUser);
      setProfile((prevState) => ({ ...prevState, avatar: updatedUser.avatar }));
      reset(); // Reset form fields after submission
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-4">
        {profile && (
          <>
            <div className="flex flex-col items-center mb-4">
              <img
                src={profile.avatar}
                alt="Profile Avatar"
                className="w-32 h-32 object-cover rounded-full"
              />
              <p className="mt-2 font-semibold">{profile.name}</p>
              <p>{profile.email}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              <input
                {...register("avatar", { required: true })}
                placeholder="Avatar URL"
                className="border p-2 w-3/4 self-center"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 self-center"
              >
                Update Avatar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
