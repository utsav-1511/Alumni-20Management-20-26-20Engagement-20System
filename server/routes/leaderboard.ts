import { Request, Response } from "express";

// Mock alumni data (Replace this later with real database queries)
const mockAlumniData = [
  { alumniId: "1", name: "Aditya Tiwari", dailyActivity: 9, eventsAttended: 5, mentorships: 3 },
  { alumniId: "2", name: "Aman", dailyActivity: 7, eventsAttended: 4, mentorships: 2 },
  { alumniId: "3", name: "Akhilesh Pal", dailyActivity: 8, eventsAttended: 3, mentorships: 2 },
  { alumniId: "4", name: "Aditya Tiwari", dailyActivity: 6, eventsAttended: 3, mentorships: 1 },
  { alumniId: "5", name: "Anisha", dailyActivity: 5, eventsAttended: 2, mentorships: 2 },
  { alumniId: "6", name: "Siddhatth", dailyActivity: 4, eventsAttended: 2, mentorships: 1 },
];

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboardData = mockAlumniData.map((alumnus) => ({
      alumniId: alumnus.alumniId,
      name: alumnus.name,
      dailyActivity: alumnus.dailyActivity,
      eventsAttended: alumnus.eventsAttended,
      mentorships: alumnus.mentorships,
      points:
        alumnus.dailyActivity * 5 +
        alumnus.eventsAttended * 10 +
        alumnus.mentorships * 20,
    }));

    leaderboardData.sort((a, b) => b.points - a.points);

    res.json(leaderboardData);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ error: "Failed to generate leaderboard" });
  }
};