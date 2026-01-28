import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LinkToMaterials() {
    return (
        <Link
            href="/dashboard/materials"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="font-medium">К материалам</span>
        </Link>
    )
}