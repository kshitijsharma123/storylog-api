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

export const getAllEntry = async (req, res) => {
  try {
    const { moodTag, fromDate, toDate, keyword } = req?.query;

    const filter = { createdBy: req.user._id };

    if (moodTag) {
      filter.moodTags = { $in: [moodTag] };
    }

    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    if (keyword && keyword.trim() !== "") {
      const regex = new RegExp(keyword.trim(), "i"); // i = case-insensitive
      filter.$or = [{ title: { $regex: regex } }, { body: { $regex: regex } }];
    }
    const entries = await Entry.find(filter).sort({ date: -1 });

    res.status(200).json({ count: entries.length, entries });
  } catch (error) {
    console.error("Error fetching entries:", error.message);
    res.status(500).json({ message: "Failed to retrieve entries." });
  }
};

export const getEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid entry ID format." });
    }

    const entry = await Entry.findOne({
      _id: id,
      createdBy: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Get Entry By ID Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch entry.",
      error: error.message,
    });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, moodTags, moodScore } = req.body;

    const entry = await Entry.findOne({ _id: id, createdBy: req.user._id });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    
    entry.archive.push({
      title: entry.title,
      body: entry.body,
      moodTags: entry.moodTags,
      moodScore: entry.moodScore,
      wordCount: entry.wordCount,
      updatedAt: new Date(),
    });

    
    if (title) entry.title = title.trim();
    if (body) entry.body = body;
    if (Array.isArray(moodTags)) entry.moodTags = moodTags;
    if (typeof moodScore === "number") entry.moodScore = moodScore;

    
    entry.wordCount = entry.body.trim().split(/\s+/).length;

    await entry.save();

    res.status(200).json({
      message: "Entry updated successfully.",
      entry,
    });
  } catch (error) {
    console.error("Update Entry Error:", error.message);
    res.status(500).json({ message: "Error updating entry.", error: error.message });
  }
};