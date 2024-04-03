export async function fetchFileByteData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const fileData = await response.arrayBuffer();
    // `fileData` is now an ArrayBuffer containing the byte data of the file
    console.log('Byte data of file:', fileData);
    return fileData;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
}

export function downloadFile(byteData, fileName = 'filled.pdf', fileType = 'application/pdf') {
  const blob = new Blob([byteData], { type: fileType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);

  link.click();

  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}
