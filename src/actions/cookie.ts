import { cookies } from "next/headers";

export function getCookie(name: string) {
    let myCookie 
    async () => {
        const cookieStore = await cookies();
        myCookie = cookieStore.get(name);
        return
    }
}