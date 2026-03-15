import { toPng } from 'html-to-image';

export async function exportCardToPng(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // High resolution
    });

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
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
    });

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
