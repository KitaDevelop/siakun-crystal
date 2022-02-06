import { CSSProperties, useEffect } from 'react'
import Dropzone, { IFileWithMeta, IStyleCustomization, StatusValue } from '@tuttinator/react-dropzone-uploader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { blobToBase64 } from '@utils/blobToBase64'
import { dataURLtoFile } from '@utils/dataUrlToFile'

interface Props {
  initialFiles: File[]
}

export const ReceiptDropzone = ({ initialFiles }: Props) => {
  const { dispatch } = useJournalEntry()

  const handleSubmit = ({ file, meta, remove }: IFileWithMeta, status: StatusValue) => {
    if (status == 'done') {
      blobToBase64(file).then((receiptBase64) => {
        dispatch({ type: 'set_receipt', receipt: receiptBase64 as string })
      })
    }
  }

  return (
    <Dropzone
      onChangeStatus={handleSubmit}
      maxFiles={1}
      multiple={false}
      inputContent={InputPlaceholder}
      styles={dropzoneStyle}
      initialFiles={initialFiles}
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
