'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function BackBtn() {
    const router = useRouter()
    function goBack() {
        router.back()
    }
    return <Button onClick={goBack}>Back</Button>
}