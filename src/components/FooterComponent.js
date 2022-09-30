import React, { useEffect, useState } from "react";
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Checkbox from "@material-tailwind/react/Checkbox"
import {getFooterStart,editFooterStart} from '../api/footerStart'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FooterComponent = () => {
    const [tempImageSrc,setTempImageSrc] = useState("");
    const [text,setText] = useState("");
    const [isActive,setIsActive] = useState(null);
    useEffect(()=>{
        FETCH();
   },[])
    const FETCH = async ()=>{
        const res = await getFooterStart();
        setTempImageSrc(res.data.data.logo.uri);
        setText(res.data.data.text)
        setIsActive(res.data.data.isActive);
        console.log(res.data.data.isActive);
    }

    // const Edit_Footer_End = async (e)=>{
    //     // edit-royalty-form
    //     //  console.log(data);
    //     try {
    //         e.preventDefault();
    //         const form = document.getElementById("manage-footer-start");
    //         const formData = new FormData(form);
    //         console.log(formData);
    //         // console.log(formData);
    //         // console.log(title);
    //         console.log(text);
    //         // {...formData,text,isActive}
    //         const res = await editFooterStart(formData);
    //         console.log(res);
    //         if(res.ok){
    //           toast.success(res.data.msg);
    //         }else{
    //           toast.error(res.data.msg)
    //         }
    //         // addCategory
    //         // const res = await addCategory(data);
    //         // console.log(res);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //   }

    const Edit_Footer_End = async (e) => {
        try {
            e.preventDefault();
            const formEl = document.getElementById('manage-footer-start')
            const form = new FormData(formEl)

            form.append('text', text)


            form.append('isActive', document.getElementById('activate').checked ? true : false );

            const res = await editFooterStart(form)

            if (!res.ok) return toast(res.data.msg)

            toast.success(res.data.msg)
        } catch (err) {
            console.error(err)
        }
    }



  return (
    <>
    <form id="manage-footer-start">
    <br />
    <h1 style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>Manage Footer Start</h1>

    <div className="flex flex-wrap mt-10">
        <div className="w-full lg:w-12/12 pr-4 mb-10" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontWeight: 'bold' }}>Logo</label>
            <img src={tempImageSrc} style={{ width: 400, height: 250 }} alt='' />
            <Input
                type="file"
                color="purple"
                name='logo'
                placeholder=''
                onChange={e => {
                    const tempUrl = URL.createObjectURL(e.target.files[0]);
                    setTempImageSrc(tempUrl);
                }}
            />
        </div>
        {/* <div className="w-full lg:w-12/12 pr-4 mb-10" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontWeight: 'bold' }}>Title</label>
            <Input
                type="text"
                color="purple"
                name='title'
                defaultValue={pageTitle}
                placeholder=''
            />
        </div> */}
        {/* <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontWeight: 'bold' }}>Text</label>
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
        </div> */}
    </div>
    {/* <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Header End Text</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        name="text"
                        value={text}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // setPageContent(data)
                            setText(data);
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                    
    </div> */}
    <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Footer Start Text</label>
                    <textarea
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="text"
      rows="3"
      value={text}
      onChange={e=>setText(e.target.value)}
      placeholder="Your message"
    ></textarea>
                    
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
            <Button style={{ margin: '0 auto', cursor: 'pointer' }} color='orange' onClick={Edit_Footer_End}>Submit</Button>
        </div>
    </div>
    </form>
</>
  )
}

export default FooterComponent