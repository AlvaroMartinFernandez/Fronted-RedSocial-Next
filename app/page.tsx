import SearchUsers from "@/components/searchusers";

interface User {
  id: number;
  name: string;
  photourl: string;
}

export default async function Home() {

  const fetchUser = async (): Promise<User[]> => {
    try {
      const res = await fetch(`${process.env.URLBACKEND}/user`, { next: { revalidate: 0 } });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const users = await fetchUser();
  console.log(users);

  return (
    <>
      <SearchUsers users={users} />
    </>
  );
}



