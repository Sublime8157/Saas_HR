const MessageBox = ({
    children = "",
    type = "success",
}) => {

    const types = {
        error: "", 
        success: "text-center shadow-sm transition text-xs bg-orange-400 rounded-sm p-2 text-white", 
        info: ""
    }

    return(
        <div className={types[type]}>
            {children}
        </div>
    )
}

export default MessageBox