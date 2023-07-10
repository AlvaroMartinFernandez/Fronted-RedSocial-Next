import Image from 'next/image'
export default function Navbar() {
  return (
    <div className = "bg-white flex h-20 py-6 px-0 w-full  justify-center items-center">
        <Image
              src="/pegma.svg"
              alt="Pegma Logo"
              className="flex-shrink-0 text-gray-900  "
              width={100}
              height={30}
              priority
            />
    </div>
  )
}