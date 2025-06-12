"use server"

import { NextResponse } from "next/server"

export async function SendFirstQuestion(question: string, userId: string) {
  try {
    return "hmm okay"
  } catch (error:any) {
    console.error(`Error :::::::::::::::  ${error.message}`)
    return NextResponse.json(error.message)
  }
}

export async function SendMessage(question: string, userId: string, discussionId: string){
  return "Hey I am Henry, How can I help you today ?"
}