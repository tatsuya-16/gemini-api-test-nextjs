"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50">
    <div className="h-12 w-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [result, setresult] = useState("")
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setresult("");
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt }),
      });
      const data = await response.json();
      console.log('Response:', data);
      
      if (response.ok) {
        setresult(data.response)
      } else {
        console.error("Error:", data.error);
        setresult("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setresult("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen space-y-4">
      {loading && <Spinner />}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input 
          placeholder="Enter the words" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          disabled={loading}
        />
        <Button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
      <ScrollArea className="h-[200px] w-full max-w-sm rounded-md border p-4">
        <div>{result}</div>
      </ScrollArea>
    </div>
  )
}