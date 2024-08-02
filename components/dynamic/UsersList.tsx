"use client";
import React from "react";
import useGetUsersHook from "@/hooks/userHooks/getUsersHook";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { useSearchContext } from "@/context/SearchContext";
import UserCard from "@/modules/User";
import Loading from "@/components/shared/Loading";
import SearchBar from "@/components/shared/SearchBar";

const UsersList = () => {
  const { state: userState } = useUserContext();
  const { state: searchState } = useSearchContext();
  const { users, loading } = useGetUsersHook();

  if (loading) return <Loading />;
  return (
    <>
      <SearchBar items={users} />
      <div className="marginTopUntilSm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchState.finalResults.length > 0 ? (
          <>
            {searchState.finalResults
              .filter((user): user is UserProps => "role" in user)
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </>
        ) : (
          <>
            {users
              .filter((user) => user.id !== userState.user?.id)
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default UsersList;
