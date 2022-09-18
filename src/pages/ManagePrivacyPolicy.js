import { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import { uploadCmsPageDetails, getCmsPage } from '../api/cms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasicCms from '../components/BasicCms';

toast.configure()

const ManagePrivacyPolicy = () => {
    const [slug, setSlug] = useState('privacy-policy');
    const [pageTitle, setPageTitle] = useState('');
    const [pageContent, setPageContent] = useState('')
    const [tempImageSrc, setTempImageSrc] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const UPLOAD_CMS = async (e) => {
        try {
            e.preventDefault();
            const formEl = document.getElementById('privacy-policy-form')
            const form = new FormData(formEl)

            form.append('description', pageContent)

            form.append('slug', slug);

            form.append('status', document.getElementById('activate').checked ? 'Active' : 'Inactive');

            const res = await uploadCmsPageDetails(form)

            if (!res.ok) return toast(res.data.msg)

            toast.success('Privacy Policy Uploaded!')
        } catch (err) {
            console.error(err)
        }
    }

    const GET_CMS_PAGE = async () => {
        try {
            const res = await getCmsPage('privacy-policy');
            if (!res.ok) return;
            if (!res.data.data) return;
            console.log('cms data', res.data.data);
            const cmsData = res.data.data;
            setSlug(cmsData.slug);
            setTempImageSrc(cmsData.image);
            setPageTitle(cmsData.title);
            setPageContent(cmsData.description);
            setIsActive(cmsData.status === 'Active' ? true : false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        GET_CMS_PAGE();
    }, []);

    return (
        <>
            <div className="bg-white px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 h-auto -mt-24">
                <Card>
                    <CardHeader color="orange" contentPosition="none" className="bg-blue">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">Manage Legal And Privacy</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                            <form id="privacy-policy-form">
                                <BasicCms
                                    title={'Legal And Privacy'}
                                    slug={slug}
                                    tempImageSrc={tempImageSrc}
                                    setTempImageSrc={setTempImageSrc}
                                    pageTitle={pageTitle}
                                    pageContent={pageContent}
                                    isActive={isActive}
                                    setPageContent={setPageContent}
                                    UPLOAD_CMS={UPLOAD_CMS}
                                />
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
export default ManagePrivacyPolicy;