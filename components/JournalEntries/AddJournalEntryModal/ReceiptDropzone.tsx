import { CSSProperties } from 'react'
import Dropzone, { IFileWithMeta, IStyleCustomization } from '@tuttinator/react-dropzone-uploader'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export const ReceiptDropzone = () => {
  const getUploadParams = () => ({ url: 'https://httpbin.org/post' })

  const handleSubmit = (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => {
    console.log(files.map((f) => f))
    allFiles.forEach((f) => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onSubmit={handleSubmit}
      inputContent={InputPlaceholder}
      styles={dropzoneStyle}
    />
  )
}

const InputPlaceholder = () => {
  return (
    <div className="flex flex-col items-center text-base-content">
      <AiOutlineCloudUpload className="w-8 h-8" />
      <div className="text-base font-normal mb-2">Drag and drop files here or</div>
      <div className="btn btn-xs btn-primary">browse</div>
    </div>
  )
}

const dropzoneStyle: IStyleCustomization<CSSProperties> = {
  dropzone: { maxHeight: '12rem', overflowX: 'hidden', overflowY: 'auto', borderRadius: '8px' },
}
