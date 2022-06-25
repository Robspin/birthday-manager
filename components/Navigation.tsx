import Link from "next/link"
import { useRouter } from 'next/router';

const routes = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Manage',
        href: '/manage'
    }
]

type Props = {
    route: {
        name: string,
        href: string
    },
    current: string
}

const NavItem = ({ route, current }: Props) => {
    const { name, href } = route
    return (
        <Link href={href}>
            <h2 className={`${href === current && 'underline'} mr-4 cursor-pointer select-none text-gray-300`}>
                {name}
            </h2>
        </Link>
    )
}


const Navigation = () => {
    const router = useRouter()

    return (
        <div className="w-full p-2 flex justify-center items-center">
            <div className="w-[30rem] flex">
                {routes.map(route => <NavItem route={route} current={router.pathname} key={route.name} />)}
            </div>
        </div>
    )
}

export default Navigation
