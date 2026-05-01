interface KategoriSchedule {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  startTime?: string | null;
  endTime?: string | null;
}

export function isKategoriAvailable(kategori: KategoriSchedule): boolean {
  const now = new Date();

  const hasDateRange = !!kategori.startDate && !!kategori.endDate;
  const hasTimeRange = !!kategori.startTime && !!kategori.endTime;

  if (!hasDateRange && !hasTimeRange) {
    return true;
  }

  if (hasDateRange) {
    const today = stripTime(now);

    if (kategori.startDate) {
      const start = stripTime(new Date(kategori.startDate));
      if (today < start) return false;
    }

    if (kategori.endDate) {
      const end = stripTime(new Date(kategori.endDate));
      if (today > end) return false;
    }
  }

  if (hasTimeRange) {
    console.log("DEBUG startTime:", kategori.startTime, typeof kategori.startTime);
    console.log("DEBUG endTime:", kategori.endTime, typeof kategori.endTime);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = parseTimeToMinutes(kategori.startTime!);
    const endMinutes = parseTimeToMinutes(kategori.endTime!);

    if (startMinutes <= endMinutes) {
      if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
        return false;
      }
    } else {
      if (currentMinutes < startMinutes && currentMinutes > endMinutes) {
        return false;
      }
    }
  }

  return true;
}

/** Hilangkan jam/menit/detik agar perbandingan murni per tanggal */
function stripTime(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Konversi "HH:mm" atau "HH:mm:ss" menjadi total menit dari midnight */
function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || hours < 0 || hours > 23) {
    throw new Error(`Invalid hours: "${time}"`);
  }

  if (isNaN(minutes) || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid minutes: "${time}"`);
  }
  
  return hours * 60 + minutes;
}
