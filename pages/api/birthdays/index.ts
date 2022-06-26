import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../prisma/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const birthdayData = JSON.parse(req.body)

  const savedBirthday = await prisma.birthday.create({
    data: birthdayData
  })

  res.status(200).json(savedBirthday)
}
