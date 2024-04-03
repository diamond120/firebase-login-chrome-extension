import JSZip from 'jszip';

export async function getZipFilesContent(data) {
  const zipContent = [];
  const promises = [];
  const zip = await JSZip.loadAsync(data);
  zip.forEach(async (relativePath, file) => {
    const promise = file.async('arraybuffer');
    promises.push(promise);
    zipContent.push({
      file: relativePath,
      content: await promise,
    });
  });

  await Promise.all(promises);
  return zipContent;
}

export const compressZip = files => {
  const zip = new JSZip();
  files.forEach(file => {
    zip.file(file.filename, file.content);
  });

  // Generate the zip file asynchronously
  zip.generateAsync({ type: 'blob' }).then(content => {
    // Create a Blob object from the zip content
    const zipBlob = new Blob([content]);

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute and file name
    link.download = 'compressed.zip';

    // Set the link's href to the URL of the Blob object
    link.href = URL.createObjectURL(zipBlob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Click the link programmatically to trigger the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  });
};
