import Link from "next/link"


const Home = () => {
  return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl text-orange-400 font-bold tracking-widest mt-[12rem]">
                    BIRTHDAY DATABASE
                </h1>
                <Link href="/manage">
                    <h4 className="text-orange-100 underline text-2xl cursor-pointer mt-4">
                        View & Edit
                    </h4>
                </Link>
            </div>
        </div>
  )
}

export default Home

