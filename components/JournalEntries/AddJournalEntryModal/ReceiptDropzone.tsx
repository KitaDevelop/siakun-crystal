import { CSSProperties } from 'react'
import Dropzone, { IFileWithMeta, IStyleCustomization, StatusValue } from '@tuttinator/react-dropzone-uploader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { blobToBase64 } from '@utils/blobToBase64'

export const ReceiptDropzone = () => {
  const getUploadParams = () => ({ url: 'https://httpbin.org/post' })

  const handleSubmit = ({ file, meta, remove }: IFileWithMeta, status: StatusValue) => {
    console.log(file)
    blobToBase64(file).then((res: any) => console.log(res))
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleSubmit}
      maxFiles={1}
      multiple={false}
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
