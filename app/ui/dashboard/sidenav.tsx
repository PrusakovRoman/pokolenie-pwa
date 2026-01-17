import Link from "next/link"

export default function SideNav() {
    return (<div>
        <p>sidenav</p>
        <Link href="/dashboard" className="block">dashboard</Link>
        <Link href="/dashboard/materials">materials</Link>
    </div>)
}