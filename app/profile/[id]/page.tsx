import Image from "next/image";

interface DataPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
type Post = DataPost[]


export default async function PostProfile({ params }: {
  params: { slug: string }
}) {
  const json = JSON.stringify(params);
  const id = JSON.parse(json);
  const dataUser = async (id: string): Promise<Post> => {
    try {
      const res = await fetch(`${process.env.URLBACKEND}/post/${id}`);
      const data = await res.json();
      return data;
    }
    catch (error) {
      console.log(error);
      return [];
    }
  };
  const post = await dataUser(id.id);
  console.log(post);
  if (post.length === 0) {

    return (
      <div className="flex justify-center items-center mt-20">
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
          <h2 className="mt-3 text-xl font-semibold text-center text-[#4B4B52]">comentarios</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="sm:px-8 md:px-0 flex-col justify-center mt-7">
      {post.map((post) => {
        return (

          <ul className="flex p-4 flex-col gap-4 items-start self-stretch border-b border-gray-300 border-opa" key={post.id}>
            <li><p className="text-[#9795B5] text-sm font-dm-sans font-normal leading-6">{'"'}{post.body}{'"'}</p></li>
            <li><h2 className="text-[##5D5A88] text-sm font-dm-sans font-bold leading-5 ">{post.title}</h2></li>
          </ul>
        )

      })}
    </div>

  )
}