import Entry from "./../model/Entry.model.js";

export const createEntry = async (req, res) => {
  console.log(req.user);
  try {
    const { title, body, moodTags = [], moodScore = 0 } = req.body;

    if (!title || !body || title.trim() === "" || body.trim() === "") {
      return res.status(400).json({ message: "Title and body are required." });
    }

    const entry = await Entry.create({
      title: title.trim(),
      body: body.trim(),
      moodTags,
      moodScore,
      createdBy: req.user.id,
      date: new Date(),
    });

    res.status(201).json({
      message: "Entry created successfully!",
      entry,
    });
  } catch (error) {
    console.error("Create entry error:", error.message);
    res.status(500).json({
      message: "Failed to create entry. Please try again.",
      error: error.message,
    });
  }
};
