import { Pencil } from "lucide-react"
import { useAdminCheck } from "@/app/ui/materials/hooks/use-admin-check"
import Link from "next/link"

interface ModifyMaterialButtonProps {
    materialId: string
}

export default function ModifyMaterialButton({ materialId }: ModifyMaterialButtonProps) {
    const isAdmin = useAdminCheck()

    if (!isAdmin) return null

    return (
        <div className="flex items-center justify-end gap-2 absolute bottom-4 right-4" >
            <div className="backdrop-blur-md bg-white/40 dark:bg-black/20 p-2 rounded-xl shadow-lg border border-white/30 dark:border-black/30">
                <div className="flex items-center">
                    <Link
                        href={`/modifyMaterial/edit/${materialId}`}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Редактировать"
                    >
                        <Pencil className="w-5 h-5 text-green-700/80 hover:text-green-700  drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
                    </Link>
                </div>
            </div>
        </div>
    )
}