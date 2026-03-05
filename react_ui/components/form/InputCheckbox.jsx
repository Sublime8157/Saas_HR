const CheckBox = ({
    label = "", 
    className = "", 
    checked = "", 
    onChange = ""
}) => {
    return(
        <div className={`flex flex-row gap-2 items-center ${className}`}>
            <label className="text-sm" >{label}</label>
            <input type="checkbox" name="active" checked={checked} onChange={onChange}></input>
        </div>
    )
}

export default CheckBox