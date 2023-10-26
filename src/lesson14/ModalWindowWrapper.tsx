import { CSSProperties } from "styled-components";
import { UserForm } from "./UserForm";
import { MouseEventHandler } from "react";

interface IModalWindowWrapperProps{
    isHidden: boolean,
    handleIsHidden:()=>void
}

export function ModalWindowWrapper(props:IModalWindowWrapperProps){
    const { isHidden, handleIsHidden } = props

    const ModalWindowStyles:CSSProperties = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: "1000", 
        display: isHidden ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const ContentContainerStyles:CSSProperties = {
        background: "#fff",
        border: "1px solid #ccc", 
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", 
        maxWidth: "80%",
        marginBottom: "5%",
        padding: "30px",
    }

    const handleOnBackgroundClick = ()=>{
        handleIsHidden()
    }

    const handleFormClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
      };

    return (
        <div style={ModalWindowStyles} onClick={handleOnBackgroundClick}>
            <div style={ContentContainerStyles} onClick={handleFormClick}>
                <UserForm handleIsHidden={handleIsHidden}/>
            </div>
        </div>
    )

}