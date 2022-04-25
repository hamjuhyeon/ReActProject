export const postUploadImage = (req, res) => {
    const url = req.file.location;
    res.send(url);
  };