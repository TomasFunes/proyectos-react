import { useState } from "react";
import { MouseEventHandler } from "react";

export default function Config (props: {
    onEdit: MouseEventHandler<HTMLButtonElement>,
    onDelete: MouseEventHandler<HTMLButtonElement> 
}) {
    const [isActive, setIsActive] = useState(false); 

    return (
        <>
        <button onClick={() => setIsActive(!isActive)} className="config-btn">
            <img src="/settings-icon.png" 
                width={32}
                height={32} 
                alt="A settings icon"
                />
        </button>
        { isActive && 
        <div className="config-options">
            <button onClick={props.onEdit}>Edit</button>
            <button onClick={props.onDelete}>Delete</button>
        </div>  
        }
        </>
    )
}