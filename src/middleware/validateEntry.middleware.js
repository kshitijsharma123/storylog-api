export const validateEntry = (req, res, next) => {
  const { body, moodTags } = req.body;

  
  const wordCount = typeof body === "string" ? body.trim().split(/\s+/).length : 0;
  if (wordCount < 10) {
    return res.status(400).json({
      message: "The body must contain at least 10 words.",
    });
  }

  
  if (!Array.isArray(moodTags) || moodTags.length === 0) {
    return res.status(400).json({
      message: "At least one mood tag is required.",
    });
  }

  next();
};
