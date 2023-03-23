
const validation = (schema:any) => {

    return (req:any, res:any, next:any) => {

        const {error} = schema.validate(req.body, {abortEarly:false, details: true});
        if (error) {
            const errors = error.details.map((err: { message: any; }) => err.message);
            return res.json({message:"error in validation", data: errors});
        }
        next();
    }

}

export default validation;