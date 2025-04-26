export interface StatItem {
    totalMB: string;  
    date: string;
  }

export interface Statistics {
    stat: StatItem[];
}

export const estadisticas: Statistics = {
    stat: [
      { totalMB: "4",  date: "2025-04-19" },
      { totalMB: "25",  date: "2025-04-20" },
      { totalMB: "28",  date: "2025-04-21" },
      { totalMB: "42",  date: "2025-04-21" },
      { totalMB: "0", date: "2025-04-23" },
      { totalMB: "42",  date: "2025-04-24" },
      { totalMB: "27",  date: "2025-04-25" },
      { totalMB: "0",  date: "2025-04-26" },
      { totalMB: "1",  date: "2025-04-27" },
    ]
  };