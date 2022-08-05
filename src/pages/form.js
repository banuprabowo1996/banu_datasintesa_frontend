import { useState, useRef } from "react";
import Swal from "sweetalert2";

export default function Form() {

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const uploadZip = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3001', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Upload error!',
                    })
                    throw new Error()
                }
            })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ok',
                    text: 'File uploaded successfully!',
                })
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadZip(e.dataTransfer.files[0])
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            uploadZip(e.target.files[0]);
        }
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-slate-800 text-center mt-24">Upload your file on box below</h1>
            </div>
            <div id="container-form" className="relative">
                <form id="form-file-upload" className="absolute inset-0"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}>
                    <input ref={inputRef} type="file" accept=".gz,.zip" id="input-file-upload" multiple={true} onChange={handleChange} />
                    <label id="label-file-upload" htmlFor="input-file-upload">
                        <div>
                            <p>Drag and drop your file here or</p>
                            <p className="upload-button">Upload a file</p>
                        </div>
                    </label>
                    {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                </form>
            </div>
        </>

    )
}