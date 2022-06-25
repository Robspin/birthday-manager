import { birthday, PrismaClient } from "@prisma/client"
import { useState } from "react"

const BirthdayItem = ({ b }: { b: birthday }) => {
    const [showEdit, setShowEdit] = useState(false)

    return (
        <ul className="text-orange-400 flex w-[40rem] px-[5rem] justify-between relative" onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)}>
            <li>
                {b.name}
            </li>
            <li>
                {`${b.birthday}`.substring(0,10)}
            </li>
            <li>
                {b.relation}
            </li>
            <li className={`${!showEdit ? 'pointer-events-none' : 'cursor-pointer'} underline absolute right-0 transition-opacity ${!showEdit ? 'opacity-0' : 'opacity-100'} `}>
                edit
            </li>
        </ul>
    )
}


const View = ({ initialBirthdays }: { initialBirthdays: birthday[] }) => {

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <div>
            {initialBirthdays.map(b =>  <BirthdayItem b={b} key={b.id} />)}
            </div>
        </div>
    )
}

export default View

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const birthdays: birthday[] = await prisma.birthday.findMany()

    for (const b of birthdays) {
        b.birthday = JSON.parse(JSON.stringify(b.birthday))
        b.created_at = JSON.parse(JSON.stringify(b.created_at))
    }

    return {
        props: {
            initialBirthdays: birthdays
        }
    }
}
