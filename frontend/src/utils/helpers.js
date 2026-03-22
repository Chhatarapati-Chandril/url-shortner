export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export const downloadCanvasImage = (canvas) => {
  if (!canvas) return;

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "qr.png";
  link.click();
};

export const normalizeUrl = (url) => {
  if (!url) return null;

  let formatted = url.trim();

  // If no protocol, add https
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = "https://" + formatted;
  }

  try {
    new URL(formatted);
    return formatted;
  } catch {
    return null;
  }
};

export const saveToHistory = (shortId, url) => {
  const existing = JSON.parse(localStorage.getItem("history")) || [];

  const newEntry = {
    shortId,
    url,
    createdAt: new Date().toISOString(),
  };

  const updated = [newEntry, ...existing];

  localStorage.setItem("history", JSON.stringify(updated));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};