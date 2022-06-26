import { birthday } from "@prisma/client"
import prisma from "../../prisma/prisma"
import BirthdayItem from "../../components/BirthdayItem"
import AddBirthdayForm from "../../components/AddBirthdayForm"
import {useState} from "react"

const View = ({ initialBirthdays }: { initialBirthdays: birthday[] }) => {
    const [birthdays, setBirthdays] = useState<birthday[]>(initialBirthdays)
    const [editMode, setEditMode] = useState(false)

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <AddBirthdayForm editMode={editMode} setEditMode={setEditMode} setBirthdays={setBirthdays} birthdays={birthdays} />
            <div>
            {birthdays.map(b =>  <BirthdayItem b={b} key={b.id} setEditMode={setEditMode} />)}
            </div>
        </div>
    )
}

export default View

export async function getServerSideProps() {
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
