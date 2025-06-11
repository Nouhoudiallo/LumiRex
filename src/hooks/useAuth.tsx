"use client"
import { useEffect, useState } from "react";

export async function useAuth(email: string) {
  const [session, setSession] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const req = await fetch(`https://ai-agent-v2.onrender.com/api/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `1gjonypg3igrpg8ul13mnh`
      }
      // body: JSON.stringify({ email })
    })

    const res = await req.json()

    if (res.error) {
      console.error("Error fetching user:", res.error, res?.details);
      setSession(null);
    } 

    console.log("User fetched successfully:", res);
    

    setSession(res.user)
    setLoading(false);

    return res.user
  }

  useEffect(()=> {
    fetchUser()
  }), [email]


  return {
    session,
    loading
  }

}