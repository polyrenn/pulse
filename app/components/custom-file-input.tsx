import { useRef, useState } from 'react'
import { Button } from "~/components/ui/button"
import { Paperclip } from "@phosphor-icons/react/dist/csr/Paperclip"

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
        className="shadow-none px-4 py-4 bg-[#f7f7f8] mx-2 hover:bg-[#f7f7f8]"
        aria-label="Open file dialog"
      >
        <Paperclip color='#1a1a1a' className="w-4 h-4" />
      </Button>
      <div className={`${file ? 'block' : 'hidden'}  absolute -top-10 left-0 w-full `}>
         {file && <p className="mt-2 text-purple-500 text-center align-middle">{`File selected: ${file.name} `}</p>}
      </div>
    </>
  )
}