import ProfileUser from "@/components/profileuser"
import Image from 'next/image'
import { dmSans } from "@/app/fonts";
interface User {
  id: number;
  name: string;
  photourl: string;
  description: string;
  Friends: Array<object>;
  Pets: Array<object>;
  status?: number;
}
interface messageError  {
  response:{
    statusCode: number;
    message: string;
    error: string;
  }
  options: {};
  status: number;
  message: string;
  name: string;

}
export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    tag: string
    item: string
  }
}) {
  const json = JSON.stringify(params);
  const id = JSON.parse(json);
  console.log(id)

  const dataUser = async (id: string): Promise<User | number|messageError> => {
    try {
      const res = await fetch(`${process.env.URLBACKEND}/user/${id}`);
      if (!res.ok) {
        throw new Error("Error en la petición HTTP: " + res.status);
      }
      const data:User|messageError = await res.json();
      if(data.status===404){
        return 404;
      }
      return data;
    }
    catch (error:any) {
      console.log(error)
      return error.status;
    }
  };
  const user = await dataUser(id.id);
  console.log(user);
  if (user=== 404) {
    return (
      <div className="flex justify-center items-center">
      <div className="flex-col justify-center items-center mt-20">
        <Image
          src="/empty-box.svg"
          alt="empty-box"
          className="flex-shrink-0 center translate-x-10"
          width={120}
          height={120}
          priority
        />
        <h2 className={`${dmSans.className}text-xl font-semibold text-center text-[#4B4B52]`}>No existe el usuarios</h2>
      </div>
      </div>
    )
  }
  return (

    <>
      <ProfileUser id={id.id} />
      {children}
    </>
  )
}
