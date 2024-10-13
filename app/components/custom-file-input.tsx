import { useRef, useState } from 'react'
import { Button } from "~/components/ui/button"
import { Paperclip } from "lucide-react"

export function CustomFileInput() {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // You can perform additional actions with the file here
      console.log('Selected file:', selectedFile.name)
    }
  }

  return (
    <>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-label="File upload"
      />
      <Button
        onClick={(e) => handleButtonClick(e)}
        className="w-10 h-10 p-0"
        aria-label="Open file dialog"
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      {file && <p className="mt-2">Selected file: {file.name}</p>}
    </>
  )
}