import { toPng } from 'html-to-image';

// Safari and iOS have a known bug where `html-to-image` returns a blank canvas on the first pass
// Generating the image multiple times forces the browser to fully render external assets
// Note: cacheBust is NOT used here as it breaks blob/data URLs from file uploads
const generateImageSafely = async (element: HTMLElement) => {
  const options = { quality: 1.0, pixelRatio: 2 };
  
  // First pass to trigger asset loading (we ignore any errors here)
  await toPng(element, options).catch(() => {});
  
  // Brief pause to allow the browser to paint
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Final pass to capture the actual image
  return await toPng(element, options);
};

export async function exportCardToPng(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await generateImageSafely(element);

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export image', error);
    throw error;
  }
}

export async function shareCardImage(elementId: string, filename: string, title: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await generateImageSafely(element);

    // Convert dataUrl to File
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text: 'Here is my Fuel Pass card!',
        files: [file],
      });
    } else {
      throw new Error('Web Share API not supported in this browser or cannot share files.');
    }
  } catch (error) {
    console.error('Failed to share', error);
    throw error;
  }
}
