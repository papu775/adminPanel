import React from "react";
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Checkbox from "@material-tailwind/react/Checkbox"


const BasicCms = ({
    title,
    setPageContent,
    setTempImageSrc,
    tempImageSrc,
    pageTitle,
    pageContent = '',
    isActive = null,
    UPLOAD_CMS,
}) => {
    return (
        <>
            <br />
            <h1 style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>{title}</h1>

            <div className="flex flex-wrap mt-10">
                <div className="w-full lg:w-12/12 pr-4 mb-10" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Image</label>
                    <img src={tempImageSrc} style={{ width: 400, height: 250 }} alt='' />
                    <Input
                        type="file"
                        color="purple"
                        name='image'
                        placeholder=''
                        onChange={e => {
                            const tempUrl = URL.createObjectURL(e.target.files[0]);
                            setTempImageSrc(tempUrl);
                        }}
                    />
                </div>
                <div className="w-full lg:w-12/12 pr-4 mb-10" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Title</label>
                    <Input
                        type="text"
                        color="purple"
                        name='title'
                        defaultValue={pageTitle}
                        placeholder=''
                    />
                </div>
                <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Description</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={pageContent}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setPageContent(data)
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
            </div>

            <div>
                {
                    isActive
                        ?
                        <Checkbox
                            color="lightBlue"
                            text="Activate"
                            id="activate"
                            className="m-3"
                            defaultChecked={true}
                        />
                        :
                        <Checkbox
                            color="lightBlue"
                            text="Activate"
                            id="activate"
                            className="m-3"
                        />
                }
            </div>

            <br />
            <br />

            <div className='flex justify-center'>
                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light forsubmit">
                    <Button style={{ margin: '0 auto', cursor: 'pointer' }} color='orange' onClick={UPLOAD_CMS}>Submit</Button>
                </div>
            </div>
        </>
    )
}

export default BasicCms;