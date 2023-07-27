import { FC } from "react";
import Link from "next/link";

interface UserCardProps {
  user: User;
}
const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="">
      <Link href="/users/[id]" as={`/users/${user._id}`}>
        <div className="h-24 my-4 bg-gradient-to-r from-amber-100 to-fuchsia-50 flex justify-center items-center p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
          <div className="text-slate-800 flex flex-col items-center text-center">
            <div className="text-2xl flex text-center">
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="font-mono text-base">
              {" "}
              Age: {user.age} Phone: {user.phoneNumber}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
