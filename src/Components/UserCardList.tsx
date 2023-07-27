import { FC } from "react";
import UserCard from "./UserCard";

interface UserCardListProps {
  users: User[];
  className: string;
}

const UserCardList: FC<UserCardListProps> = ({
  users,
  className,
  ...props
}) => {
  console.log(users);

  return (
    <div className={className} {...props}>
      {users &&
        users.length &&
        users.map((user: User) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default UserCardList;
