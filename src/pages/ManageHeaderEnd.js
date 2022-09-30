import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from '@material-tailwind/react/Input';
import { editHeaderEnd,getHeaderEnd } from "../api/headerEnd";
import Checkbox from "@material-tailwind/react/Checkbox"

const ManageHeaderEnd = () => {
  const [headerEndText,setHeaderEndText] = useState("");
  const [headerEndButtonText,setHeaderEndButtonText] = useState("");
  const [isActive,setIsActive] = useState(true);
  const Edit_Header_End = async (e)=>{
    // edit-royalty-form
    //  console.log(data);
    try {
        e.preventDefault();
        // const form = document.getElementById("edit-royalty-form");
        // const formData = new FormData(form);
        // console.log(formData);
        // console.log(title);
        const res = await editHeaderEnd({headerEndText,headerEndButtonText,isActive});
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
  
  const FETCH_HEADER_END = async ()=>{
    try {
        const res = await getHeaderEnd();
        // console.log(res.data.data[0].title);
        setHeaderEndText(res.data.data.headerEndText);
        setHeaderEndButtonText(res.data.data.headerEndButtonText);
        setIsActive(res.data.data.isActive);
    } catch (error) {
        console.log(error);
    }
  }
  
  useEffect(()=>{
    FETCH_HEADER_END();
  },[])
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Manage Header End </h2>
          </div>
        </CardHeader>
        <CardBody>
        <form id="edit-royalty-form" onSubmit={(e) => Edit_Header_End(e)}>
               {/* <input type="hidden" name="roy" /> */}
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div className='admin-images flex-wrap mt-10 font-light' style={{ flexBasis: '100%' }}>
                        <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }} htmlFor="headerEndText">Header End Text</label>
                    {/* <CKEditor
                        editor={ClassicEditor}
                        data={headerEndText}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // setPageContent(data)
                            setHeaderEndText(data);
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    /> */}
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
      id="headerEndText"
      rows="3"
      value={headerEndText}
      onChange={e=>setHeaderEndText(e.target.value)}
      placeholder="Your message"
    ></textarea>
                        </div>
                        <div className="w-full lg:w-12/12 pr-2 mb-10 font-light" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontWeight: 'bold' }} htmlFor="headerEndButtonText">Header Button Text</label>
                    {/* <CKEditor
                        editor={ClassicEditor}
                        data={headerEndButtonText}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // setPageContent(data)
                            setHeaderEndButtonText(data);
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    /> */}
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
      onChange={e=>setHeaderEndButtonText(e.target.value)}
      value={headerEndButtonText}
      id="headerEndButtonText"
      rows="3"
      placeholder="Your message"
    ></textarea>
            </div>
          
                          
                        </div>
                    </div>
                    <br />
                    <br />
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
                            onChange={e=>setIsActive(false)}
                        />
                        :
                        <Checkbox
                            color="lightBlue"
                            text="Activate"
                            id="activate"
                            className="m-3"
                            onChange={e=>setIsActive(true)}
                        />
                }
                    </div>
                    <br />
                    <br/>
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

                   

            <br />
            <br />
                
        </form>
        </CardBody>
      </Card>
    </div>
    </>
  )
}

export default ManageHeaderEnd