'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { usePathname } from 'next/navigation'
 interface TabActive {
    Friend: boolean;   
    Pet: boolean;
    Post: boolean;
 }
export default function Tab() {

    const param = useParams();
    const pathname:string = usePathname();
    const pathArray:Array<string> = pathname.split("/");
    const tabActive:TabActive = GetTabActive(pathArray[3]);

    const [active, setActive] = useState(tabActive);
    const handleClickPost = () => setActive({ Friend: false, Pet: false, Post: true });
    const handleClickPet = () => setActive({ Friend: false, Pet: true, Post: false });
    const handleClickFriend = () => setActive({ Friend: true, Pet: false, Post: false });


    return (

        <div className="flex  justify-center items-center gap-6">
            <ul className="flex flex-wrap -mb-px md:gap-15 sm:gap-10">
                <li className={`flex w-118 px-4 py-2 justify-center items-start flex-shrink-0 rounded-lg ${active.Friend ?"bg-[#FDF9F7]":"bg-white"} hover:scale-105`}>
                    <button onClick={handleClickFriend}>  <Link href={`/profile/${param.id}/friends`} className={`text-center text-14 font-libre-franklin leading-24 ${active.Friend ? "text-[#ED8936] font-medium bg-[#FDF9F7]" : "text-[#4B4B52] font-semibold bg-white"
                        }`}
                        aria-current={active.Friend ? "page" : undefined}>Amigos</Link></button>
                </li>
                <li className={`flex w-118 px-4 py-2 justify-center items-start flex-shrink-0 rounded-lg ${active.Pet ?"bg-[#FDF9F7]":"bg-white"} hover:scale-105`}>
                    <button onClick={handleClickPet}> <Link href={`/profile/${param.id}/pets`} className={`text-center text-14 font-libre-franklin leading-24 ${active.Pet ? "text-[#ED8936] font-medium bg-[#FDF9F7]" : "text-[#4B4B52] font-semibold bg-white"
                        }`}
                        aria-current={active.Pet ? "page" : undefined}>Mascotas</Link></button>
                </li>
                <li className={`flex w-118 px-4 py-2 justify-center items-start flex-shrink-0 rounded-lg ${active.Post ?"bg-[#FDF9F7]":"bg-white"} hover:scale-105`}>
                    <button onClick={handleClickPost}> <Link href={`/profile/${param.id}`} className={`text-center text-14 font-libre-franklin leading-24 ${active.Post ? "text-[#ED8936] font-medium bg-[#FDF9F7]" : "text-[#4B4B52] font-semibold bg-white"
                        }`}
                        aria-current={active.Post ? "page" : undefined}>Comentarios</Link></button>
                </li>
            </ul>
        </div>

    )
}

const GetTabActive =(TabActive:string)=>{
    if(TabActive==="friends"){
        return { Friend: true, Pet: false, Post: false }
    }
    if(TabActive==="pets"){
        return { Friend: false, Pet: true, Post: false }
    }
    else
    {
        return { Friend: false, Pet: false, Post: true }        
    }
}