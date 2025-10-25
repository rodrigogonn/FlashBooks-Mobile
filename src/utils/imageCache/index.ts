import * as FileSystem from 'expo-file-system';

const IMAGES_DIR = `${FileSystem.documentDirectory}images`;

function getFileExtensionFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = path.split('/').pop() || '';
    const parts = last.split('.');
    if (parts.length > 1) return parts.pop()!.toLowerCase();
    return 'png';
  } catch {
    return 'png';
  }
}

function getStableKeyFromUrl(url: string): string {
  try {
    const u = new URL(url);
    // Use only pathname as a stable key (ignore query tokens)
    const base = u.pathname;
    // djb2 simple hash
    let hash = 5381;
    for (let i = 0; i < base.length; i++) {
      hash = (hash * 33) ^ base.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  } catch {
    // Fallback to encode URI
    return encodeURIComponent(url);
  }
}

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(IMAGES_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(IMAGES_DIR, { intermediates: true });
  }
}

export async function getCachedImageUri(remoteUrl: string): Promise<string> {
  try {
    await ensureDir();
    const ext = getFileExtensionFromUrl(remoteUrl);
    const key = getStableKeyFromUrl(remoteUrl);
    const fileUri = `${IMAGES_DIR}/${key}.${ext}`;

    const info = await FileSystem.getInfoAsync(fileUri);
    if (info.exists && info.size && info.size > 0) {
      return fileUri;
    }

    const result = await FileSystem.downloadAsync(remoteUrl, fileUri);
    if (result.status === 200) {
      return fileUri;
    }

    return remoteUrl;
  } catch (e) {
    console.warn('[imageCache] error', e);
    return remoteUrl;
  }
}
