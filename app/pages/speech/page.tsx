"use client";



import Display from "@/components/SpeechTranscribe/displaytext/display"
import Mic from "@/components/SpeechTranscribe/mic/mic"
import { TruckElectric } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Pause from "@/components/SpeechTranscribe/pause/pause";




export default function Page() {
    const [stopRecord, setstopRecord] = useState<boolean>(false);
    const [text, settext] = useState<string>("");
    const [isRecording, setisRecording] = useState<boolean>(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksref = useRef<Blob[]>([]);
    const startRecording = async () => {
        setisRecording(true);
        settext("something's cooking")


        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksref.current = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunksref.current.push(event.data);
        };
        mediaRecorder.start();
    }

    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
        };

    }, []
    );

    const recordingComplete = async () => {
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.stop();
        setisRecording(false);

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksref.current, {
                type: "audio/webm"
            });
            const formData = new FormData();
            formData.append("file", audioBlob, "speech.webm");

            const res = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            settext(data.text);
            setstopRecord(true);

        }

    };

    const handleToggleRecording = () => {
        console.log("clicked");
        setisRecording(!isRecording)
        if (!isRecording) {
            startRecording();
        }
        else {
            recordingComplete();
        }
    }



    console.log(isRecording);

    return (
        <div className="h-full flex flex-col gap-2 items-center justify-center ">
            {isRecording && (
                <div className="bg-amber-200"> Listenning...</div>
            )
            }

           {stopRecord && (<Display text={text} />)}


            {
                !isRecording ? (
                    <Mic handleClick={handleToggleRecording} />
                ) : (
                    <Pause handleClick={handleToggleRecording} />
                )
            }

        </div>

    )
}