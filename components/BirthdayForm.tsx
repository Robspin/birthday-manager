import {Dispatch, useEffect, useRef} from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { birthday } from "@prisma/client"
import { createBirthday, updateBirthday } from "../prisma/api"

type Props = {
    editMode: boolean
    setEditMode: Dispatch<boolean>
    setBirthdays: Dispatch<birthday[]>
    setEditItem: Dispatch<null>
    editItem: birthday | null
    birthdays: birthday[]
}

const BirthdayForm = ({ editMode, setEditMode, setBirthdays, birthdays, editItem, setEditItem }: Props) => {
    const { register, handleSubmit, setValue } = useForm()
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (!editItem) return
        const { name, birthday, relation } = editItem
        setValue('name', name)
        // @ts-ignore
        setValue('birthday', birthday.substring(0, 10))
        setValue('relation', relation)
    }, [editItem])

    const create: SubmitHandler<any> = async (data: birthday, e: any) => {
        try {
            data.birthday = new Date(data.birthday || '')
            const res = await createBirthday(data)
            res.birthday = res.birthday.substring(0, 10)
            setBirthdays([...birthdays, res])
            e.target.reset()
            setEditMode(false)
        } catch (e) {
            console.log(e)
        }
    }

    const update: SubmitHandler<any> = async (data: birthday, e: any) => {
        if (!editItem) return
        try {
            const { id } = editItem
            data.id = id

            data.birthday = new Date(data.birthday || '')
            const birthdays = await updateBirthday(data)

            for (const b of birthdays) {
                b.birthday = JSON.parse(JSON.stringify(b.birthday))
                b.created_at = JSON.parse(JSON.stringify(b.created_at))
            }
            setBirthdays(birthdays)

            if (formRef.current) {
                formRef.current.reset()
            }

        } catch (e) {
            console.log(e)
        }
    }

    const cancelEditing = () => {
        setEditItem(null)
        setEditMode(false)
        if (formRef.current) {
            formRef.current.reset()
        }
    }

    return (
        <form className="mb-20" ref={formRef} onSubmit={handleSubmit(editMode ? update : create)}>
            <h2 className="px-[5rem] text-white text-lg mb-2">
                {editMode ? 'Edit person' : 'Create new person'}
            </h2>
            <div className="flex justify-between text-white w-[40rem] px-[5rem] relative">
                <input {...register("name", { required: true })} className="bg-slate-700 mr-2 text-center outline-none w-32" />
                <input {...register("birthday", { required: true })} type="date" className=" bg-slate-700 mr-2 text-center outline-none w-32" />
                <input {...register("relation", { required: true })} className="bg-slate-700 text-center outline-none w-32"/>
            </div>
            <div className="w-full px-[5rem] flex flex-row-reverse">
                <button className="text-white underline ml-auto" type="submit">
                    {editMode ? 'Save' : 'Add'}
                </button>
                {editMode &&
                    <button onClick={cancelEditing} className="text-white underline">
                        Cancel
                    </button>
                }
            </div>
        </form>
    )
}

export default BirthdayForm
