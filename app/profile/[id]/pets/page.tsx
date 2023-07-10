import Image from "next/image";
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
type Pet = {
  user_id: number;
  id: number;
  name_pet: string;
  species_pet: string;
  photourl: string;
  createdAt: Date;
  updatedAt: Date;
}
interface User {
  id: number;
  name: string;
  photourl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Friends: Array<Friend>;
  Pets: Array<Pet>;

}


export default async function PetProfile({ params }: {
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
  const pet = await dataUser(id.id);
  
  if (pet.Pets.length ===0 ){
    
    return (
      <div className={`${dmSans.className} flex justify-center items-center mt-20`}>
      <div className="flex-col justify-center items-center">
        <Image
          src="/empty-box.svg"
          alt="empty-box"
          className="flex-shrink-0 center"
          width={120}
          height={120}
          priority
        />
        <h2 className="mt-3 text-xl font-semibold text-center text-[#4B4B52]">Aun no tiene</h2>
        <h2 className="mt-3 text-xl font-semibold text-center text-[#4B4B52] translate-y-[-10px]"> mascotas</h2>
      </div>
      </div>
    )
  }
  return (
    <div className="sm:flex sm:px-8 sm:flex-wrap justify-center items-center px-4 ">
      {pet.Pets.map((pet: Pet) => {
        return (
          <ul className="pt-7 flex-col justify-center items-center self-stretch " key={pet.id}>
            <li className="flex p-4 flex-col justify-center items-start gap-3 self-stretch">
              <div className="flex justify-center items-center gap-4">
                <Image
                  src={pet.photourl}
                  alt="mascota"
                  className="flex rounded-full justify-center items-center"
                  width={50}
                  height={50}
                  priority
                />
                <h2 className="text-[#1B141F] text-lg font-normal leading-normal ">{pet.name_pet}</h2>
              </div>
            </li>
          </ul>)
      })}
    </div>
  )
}
