import { birthday } from "@prisma/client"
import prisma from "../../prisma/prisma"
import BirthdayItem from "../../components/BirthdayItem"
import BirthdayForm from "../../components/BirthdayForm"
import { useState } from "react"

const View = ({ initialBirthdays }: { initialBirthdays: birthday[] }) => {
    const [birthdays, setBirthdays] = useState<birthday[]>(initialBirthdays)
    const [editMode, setEditMode] = useState(false)
    const [editItem, setEditItem] = useState<birthday | null>(null)

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <BirthdayForm editMode={editMode} setEditMode={setEditMode} setBirthdays={setBirthdays} birthdays={birthdays} setEditItem={setEditItem} editItem={editItem} />
            <div>
            {birthdays.map(b =>  <BirthdayItem b={b} key={b.id} setEditMode={setEditMode} setEditItem={setEditItem} />)}
            </div>
        </div>
    )
}

export default View

export async function getServerSideProps() {
    const birthdays: birthday[] = await prisma.birthday.findMany({
        orderBy: [{
            id: 'asc'
        }]
    })

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
