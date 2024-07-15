"use client";


import {useGlobalContext} from "@/context";
import Login from "@/components/shared/login";
import {useSession} from "next-auth/react";
import ManageAccount from "@/components/shared/manage-account";
import {Loader} from "lucide-react";
import {useEffect} from "react";

const Page = () => {
    const {account, pageLoader, setPageLoader} = useGlobalContext();
    const {data: session} = useSession();

    useEffect(() => {
        setPageLoader(false)
    }, []);

    if (session === null) return <Login/>
    if (account === null) return <ManageAccount/>
    if (pageLoader) return <Loader/>

    return (
        <div>
            Browse Page
        </div>
    );
};

export default Page;