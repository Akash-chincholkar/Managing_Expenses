"use client"

import AddExpenseForm from "@/components/form/Addexpense"
import VoiceRecorder from "@/components/SpeechTranscribe/voiceRecorder/Voicerecorder"



export default function TestPage() {
  return <div className="min-h-screen bg-red-500 flex items-center justify-center text-white text-4xl">
    <AddExpenseForm/>
  </div>
}