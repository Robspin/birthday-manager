import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../prisma/prisma"
import { birthday } from "@prisma/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const birthdayData = JSON.parse(req.body)

    const { id } = req.query
    await prisma.birthday.update({
        where: { id: Number(id) },
        data: birthdayData,
    })

    const birthdays: birthday[] = await prisma.birthday.findMany({
        orderBy: [{
            id: 'asc'
        }]
    })

    res.status(200).json(birthdays)
}
