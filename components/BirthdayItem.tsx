import { birthday } from "@prisma/client"
import { Dispatch, useState } from "react"

type Props = {
    b: birthday,
    setEditMode: Dispatch<boolean>
}

const BirthdayItem = ({ b, setEditMode }: Props) => {
    const [showEdit, setShowEdit] = useState(false)

    return (
        <ul className="text-orange-400 flex w-[40rem] px-[5rem] justify-between relative" onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)}>
            <li className="w-32">
                {b.name}
            </li>
            <li className="w-32 text-center">
                {`${b.birthday}`.substring(0,10)}
            </li>
            <li className="w-32 text-end">
                {b.relation}
            </li>
            <li onClick={() => setEditMode(true)} className={`${!showEdit ? 'pointer-events-none' : 'cursor-pointer'} underline absolute right-0 transition-opacity ${!showEdit ? 'opacity-0' : 'opacity-100'} `}>
                edit
            </li>
        </ul>
    )
}

export default BirthdayItem
