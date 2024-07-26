"use client";
import useGetUsersHook from "@/hooks/userHooks/getUsersHook";
import { UserProps } from "@/types/UserTypes";
import UserCard from "@/modules/User";
import { useUserContext } from "@/context/UserContext";
import { useSearchContext } from "@/context/SearchContext";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const Users = () => {
  const { state: userState } = useUserContext();
  const { state: searchState } = useSearchContext();
  const { users, loading } = useGetUsersHook();

  if (!userState.user) return <MustLogin />;
  if (userState.user.role !== "instructor") return <OnlyInstructor />;
  if (loading) return <Loading />;
  return (
    <main className="w-full h-full">
      <SearchBar items={users} />
      <h1 className="marginTopUntilSm text-center text-2xl font-bold p-5">
        Users
      </h1>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
          searchState.finalResults.length > 0 && "hidden"
        }`}
      >
        {users
          .filter((user) => user.id !== userState.user?.id)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchState.finalResults
          .filter((user): user is UserProps => "role" in user)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>
    </main>
  );
};

export default Users;
