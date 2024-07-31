
export const test = (req,res)=>{
    res.status(200).json("get test")
}

export const signout = async(req,res,next)=>{
    try {
        res.clearCookie("access-token").status(200).json("user signout success")
    } catch (error) {
        next(error)
    }
}

