"use client";
import useGetUsersHook from "@/hooks/userHooks/getUsersHook";
import UserCard from "@/modules/User";
import { useUserContext } from "@/context/UserContext";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const Users = () => {
  const { state } = useUserContext();
  const { users, loading } = useGetUsersHook();

  if (!state.user) return <MustLogin />;
  else if (state.user.role !== "instructor") return <OnlyInstructor />;
  else if (loading) return <Loading />;
  return (
    <main className="w-full h-full">
      <SearchBar type="users" />
      <h1 className="marginTopUntilSm text-center text-2xl font-bold p-5">
        Users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users
          .filter((user) => user.id !== state.user?.id)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>
    </main>
  );
};

export default Users;
