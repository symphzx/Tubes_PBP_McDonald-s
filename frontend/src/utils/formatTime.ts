const formatTime = (time?: string | Date | null): string => {
  if (!time) return "";

  if (time instanceof Date) {
    if (isNaN(time.getTime())) return "";
    const hh = String(time.getHours()).padStart(2, "0");
    const mm = String(time.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  const str = String(time).trim();
  if (!str) return "";

  if (str.includes("T")) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
  }

  const match = str.match(/^(\d{1,2}):(\d{2})/);
  if (match) {
    const hh = match[1].padStart(2, "0");
    return `${hh}:${match[2]}`;
  }

  return "";
};

export default formatTime;