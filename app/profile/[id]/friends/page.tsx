import Image from "next/image";
import Link from "next/link";
import { dmSans } from "@/app/fonts";

type UserFriend = {
  name: string;
  photourl: string;
}
type Friend = {
  user_id: number;
  friend_id: number;
  id: string
  createdAt: Date;
  updatedAt: Date;
  friendUser: UserFriend;
}
interface User {
  id: number;
  name: string;
  photourl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Friends: Array<Friend>;
  Pets: Array<object>;

}

export default async function FriendProfile({ params }: {
  params: { slug: string }
}) {
  const json = JSON.stringify(params);
  const id = JSON.parse(json);
  const dataUser = async (id: string): Promise<User> => {
    try{
    const res = await fetch(`${process.env.URLBACKEND}/user/${id}`);
    const data = await res.json();
    return data;
    }
    catch(error){
      console.log(error);
      return  {id: 0,
      name: '',
      photourl: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      Friends: [],
      Pets: []}
      
    }
  };
  const user = await dataUser(id.id);

  if (user.Friends.length ===0){
    
    return (
      <div className={`${dmSans.className} flex justify-center items-center mt-20`}>
      <div className="flex-col justify-center items-center">
        <Image
          src="/empty-box.svg"
          alt="empty-box"
          className="flex-shrink-0 center translate-x-5"
          width={120}
          height={120}
          priority
        />
        <h2 className="mt-3 text-xl font-semibold text-center text-[#4B4B52]">No hay usuarios</h2>
      </div>
      </div>
    )
  }
  return (
    <div className="sm:flex sm:px-8 sm:flex-wrap justify-center items-center px-4">
      {user.Friends.map((friend: Friend) => {
        return (
          <ul className="pt-7 flex-col justify-center items-center self-stretch " key={friend.friend_id}>
            <Link  href={`/profile/${friend.friend_id}`}>
            <li className="flex p-4 flex-col justify-center items-start gap-3 self-stretch hover:scale-105">
              <div className="flex justify-center items-center gap-4">
                <Image
                  src={friend.friendUser.photourl}
                  alt="mascota"
                  className="flex rounded-full justify-center items-center"
                  width={50}
                  height={50}
                  priority
                />
                <h2 className="text-[#1B141F] font-rubik text-lg font-normal leading-normal ">{friend.friendUser.name}</h2>
              </div>
            </li></Link>
          </ul>)
      })}
    </div>
  )
}
