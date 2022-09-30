import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Input from '@material-tailwind/react/Input';
import { addRoyalty,getRoyalty } from "../api/royalty";



const ManageRoyalty = () => {
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");


const FETCH_ROYALTY = async ()=>{
    try {
        const res = await getRoyalty();
        console.log(res.data.data[0].title);
        setTitle(res.data.data[0].title);
        setDescription(res.data.data[0].description);
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
    FETCH_ROYALTY();
},[]);

const Edit_Royalty = async (e)=>{
    // edit-royalty-form
    //  console.log(data);
    try {
        e.preventDefault();
        // const form = document.getElementById("edit-royalty-form");
        // const formData = new FormData(form);
        // console.log(formData);
        // console.log(title);
        const res = await addRoyalty({title,description});
        console.log(res);
        if(res.ok){
          toast.success(res.data.msg);
        }else{
          toast.error(res.data.msg)
        }
        // addCategory
        // const res = await addCategory(data);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
}

  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Manage Royalty</h2>
          </div>
        </CardHeader>
        <CardBody>
        <form id="edit-royalty-form" onSubmit={(e) => Edit_Royalty(e)}>
               {/* <input type="hidden" name="roy" /> */}
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div className='admin-images flex-wrap mt-10 font-light' style={{ flexBasis: '100%' }}>
                        <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }}>Title</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={title}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // setPageContent(data)
                            setTitle(data);
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
            <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                  <label
                    // className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="description"
                    style={{ fontWeight: 'bold' }}
                  >
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="description"
                    type="text"
                    value={description}
                    placeholder="Enter Category Bottom Text"
                    onChange={e=>setDescription(e.target.value)}
                  ></textarea>
            </div>
                          
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='flex justify-center'>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light forsubmit">
                            <Input
                                type="submit"
                                value='submit'
                                placeholder={''}
                                style={{
                                    height: 40,
                                    padding: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'blue',
                                    color: '#000',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
        </form>
        </CardBody>
      </Card>
    </div>
    </>
  )
}

export default ManageRoyalty