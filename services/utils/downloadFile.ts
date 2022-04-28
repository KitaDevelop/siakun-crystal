import axios from 'axios'

export function downloadFile(fileUrl: string) {
  const fileName = fileUrl.split('/').pop() || `file${fileUrl.slice(-4)}`
  axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  })
}
