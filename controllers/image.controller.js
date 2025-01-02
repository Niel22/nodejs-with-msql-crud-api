function uploader(req, res)
{
    if(req.file.filename)
    {
        return res.status(201).json({
            message: 'Image upload Sucessfully',
            file: req.file.filename
        });
    }

    return res.status(500).json({
        message: 'Something went wrong!'
    });
}

module.exports = {
    uploader: uploader
}