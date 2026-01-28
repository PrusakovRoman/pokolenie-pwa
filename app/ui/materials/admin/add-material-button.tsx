import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAdminCheck } from "@/app/ui/materials/hooks/use-admin-check"

export default function AddMaterialButton() {
    const isAdmin = useAdminCheck()

    if (!isAdmin) return null

    return (
        <Link href='/modifyMaterial/create'>
            <Button variant='outline'
                className="border border-primary hover:bg-primary/5 hover:text-primary"
            >
                Добавить материал
            </Button>
        </Link>
    )
}