const MessageBox = ({
    children = "",
    type = "success",
    className = "",
}) => {

    const types = {
        error: "border border-red-500 bg-red-300", 
        success: "border-yellow-600 bg-yellow-300", 
        info: ""
    }

    return(
        <div className={`text-center shadow-sm transition text-xs rounded-sm p-2 ${types[type]} ${className}`}>
            {children}
        </div>
    )
}

export default MessageBox