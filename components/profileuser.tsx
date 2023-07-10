import Image from 'next/image'
import Tab from "@/components/tab"
interface User {
  id: number;
  name: string;
  photourl: string;
  description: string;
  Friends: Array<object>;
  Pets: Array<object>;

}
export default async function ProfileUser({ id }: { id: string }) {
  const dataUser = async (id: string): Promise<User> => {
    const res = await fetch(`${process.env.URLBACKEND}/user/${id}`);
    const data = await res.json();
    return data;
  };
  const user = await dataUser(id);
  return (
    <>
      <div className="flex justify-center h-40 items-center flex-shrink-0 bg-custom-bg bg-center bg-cover rounded-lg border-white md:bg-auto">
        <div className="w-25 h-25 flex-shrink-0 translate-y-[70px] sm:translate-y-[65px] my-1">
          <Image
            src={user.photourl}
            alt="Avatar Usuario"
            className="flex-shrink-0 border-4 border-white rounded-full "
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
  
      <div className="flex justify-center flex-col items-center mt-10 sm:mt-9 gap-7">
        <h2 className="text-custom-nameuser text-center text-2xl leading-relaxed font-semibold tracking-tighter">{user.name} </h2>
        <div className="flex justify-center items-center sm:px-10 px-4 max-w-lg">
        <p className="text-center self-stretch text-base font-normal leading-6 text-gray-900">{user.description} </p>
        </div>
        <Tab />
      </div>
 

    </>
  )
}