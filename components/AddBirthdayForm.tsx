import { Dispatch } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {birthday} from "@prisma/client"

const saveBirthday = async (birthday: birthday) => {
    const res = await fetch('/api/birthdays', {
        method: 'POST',
        body: JSON.stringify(birthday)
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

type Props = {
    editMode: boolean
    setEditMode: Dispatch<boolean>
    setBirthdays: Dispatch<birthday[]>
    birthdays: birthday[]
}

const AddBirthdayForm = ({ editMode, setEditMode, setBirthdays, birthdays }: Props) => {
    const { register, handleSubmit } = useForm()

    const onSubmit: SubmitHandler<any> = async (data: birthday, e: any) => {
        try {
            data.birthday = new Date(data.birthday || '')
            const res = await saveBirthday(data)
            res.birthday = res.birthday.substring(0, 10)
            setBirthdays([...birthdays, res])
            e.target.reset()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="mb-20" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="px-[5rem] text-white text-lg mb-2">
                {editMode ? 'Edit person' : 'Create new person'}
            </h2>
            <div className="flex justify-between text-white w-[40rem] px-[5rem] relative">
                <input {...register("name", { required: true })} className="bg-slate-700 mr-2 text-center outline-none w-32" />
                <input {...register("birthday", { required: true })} type="date" className=" bg-slate-700 mr-2 text-center outline-none w-32" />
                <input {...register("relation", { required: true })} className="bg-slate-700 text-center outline-none w-32"/>
            </div>
            <div className="w-full px-[5rem] flex">
                {editMode &&
                    <button onClick={() => setEditMode(false)} className="text-white underline">
                        Cancel
                    </button>
                }
                <button className="text-white underline ml-auto" type="submit">
                    {editMode ? 'Save' : 'Add'}
                </button>
            </div>
        </form>
    )
}

export default AddBirthdayForm
