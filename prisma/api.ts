import { birthday } from '@prisma/client'

export const createBirthday = async (birthday: birthday) => {
    const res = await fetch('/api/birthdays', {
        method: 'POST',
        body: JSON.stringify(birthday)
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

export const updateBirthday = async (birthday: birthday) => {
    const res = await fetch(`/api/birthdays/${birthday.id}`, {
        method: 'PUT',
        body: JSON.stringify(birthday)
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}
