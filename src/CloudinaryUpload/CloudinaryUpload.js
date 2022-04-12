import { useDispatch } from "react-redux";
const CloudinaryUpload = (props) => {
    const dispatch = useDispatch()
    const handleFileInput = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            props.alterImagePreview(reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
        const imageBlob = e.target.files[0]
        dispatch({ type: "SETIMAGEBLOB", payload: { imageBlob } })
    }
   
   
    return <div>
        <input type="file" onChange={handleFileInput} />
    </div>
}

export default CloudinaryUpload;