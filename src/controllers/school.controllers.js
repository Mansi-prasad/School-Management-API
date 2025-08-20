import pool from "../db/connect.js";
import calculateDistance from "../utils/distance.js";
// 1. create school

export const createSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body || {};
    console.log(name, address, latitude, longitude);
    // input validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Name is required and must be a string" });
    }

    if (!address || typeof address !== "string" || address.trim() === "") {
      return res
        .status(400)
        .json({ error: "Address is required and must be a string" });
    }

    if (
      latitude === undefined ||
      isNaN(latitude) ||
      Number(latitude) < -90 ||
      Number(latitude) > 90
    ) {
      return res
        .status(400)
        .json({ error: "Latitude must be a number between -90 and 90" });
    }

    if (
      longitude === undefined ||
      isNaN(longitude) ||
      Number(longitude) < -180 ||
      Number(longitude) > 180
    ) {
      return res
        .status(400)
        .json({ error: "Longitude must be a number between -180 and 180" });
    }

    // insert query for school data
    const sql =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    await pool.query(sql, [name.trim(), address.trim(), latitude, longitude]);

    return res
      .status(201)
      .json({ message: "School has been created successfully!" });
  } catch (error) {
    console.error("Error creating school:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. List school

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    // validate user inputs
    if (
      latitude === undefined ||
      isNaN(latitude) ||
      Number(latitude) < -90 ||
      Number(latitude) > 90
    ) {
      return res
        .status(400)
        .json({ error: "Latitude must be a number between -90 and 90" });
    }

    if (
      longitude === undefined ||
      isNaN(longitude) ||
      Number(longitude) < -180 ||
      Number(longitude) > 180
    ) {
      return res
        .status(400)
        .json({ error: "Longitude must be a number between -180 and 180" });
    }

    // fetch all school data
    const [rows] = await pool.query("SELECT * FROM schools");

    // add distance field for each school
    const userLat = Number(latitude);
    const userLon = Number(longitude);

    const schoolsWithDistance = rows.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return { ...school, distance: Number(distance.toFixed(2)) }; // rounds for 2 decimal place
    });

    // sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json(schoolsWithDistance);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
