import { CSSProperties } from 'react'
import Dropzone, {
  IFileWithMeta,
  IStyleCustomization,
  StatusValue,
} from '@tuttinator/react-dropzone-uploader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { blobToBase64 } from '@utils/blobToBase64'
import { FiDownload } from 'react-icons/fi'

interface Props {
  isBlank: boolean
}

export const ReceiptDropzone = ({ isBlank }: Props) => {
  const {
    state: { receipt },
    dispatch,
  } = useJournalEntry()

  const replaceReceipt = () => {
    dispatch({ type: 'set_receipt', receipt: '' })
  }

  const handleSubmit = ({ file }: IFileWithMeta, status: StatusValue) => {
    if (status == 'done') {
      blobToBase64(file).then((receiptBase64) => {
        dispatch({ type: 'set_receipt', receipt: receiptBase64 as string })
      })
    }
  }

  return isBlank || receipt == "" ? (
    <Dropzone
      onChangeStatus={handleSubmit}
      maxFiles={1}
      multiple={false}
      inputContent={InputPlaceholder}
      styles={dropzoneStyle}
    />
  ) : (
    <div className="flex gap-1 items-center">
      <a href={receipt} target="_blank" rel='noreferrer' className="btn lowercase">
        <FiDownload className="w-5 h-5 mr-2" />
        {receipt!.split('/').pop()}
      </a>
      <div onClick={replaceReceipt} className="btn btn-sm btn-ghost text-secondary">Replace</div>
    </div>
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
