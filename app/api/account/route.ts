import {connectToDatabase} from "@/lib/mongoose";
import {NextResponse} from "next/server";
import Account from "@/database/account";
import {hash} from "bcryptjs"


export const dynamic = "force-dynamic";


// TODO: CREATE ACCOUNT
export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const {name, pin, uid} = await req.json();
        const isExists = await Account.findOne({name});
        const allAccounts = await Account.find({uid});

        if (isExists) {
            return NextResponse.json({success: false, message: "Account already exists"});
        }

        if (allAccounts && allAccounts.length === 4) {
            return NextResponse.json({success: false, message: "You can create only 4 accounts"});
        }

        const hashPin = await hash(pin, 10);
        const account = await Account.create({name, pin: hashPin, uid});

        return NextResponse.json({success: true, data: account});
    } catch (e) {
        return NextResponse.json({success: false, message: "Something went wrong"});
    }
}


// TODO: GET ALL ACCOUNTS

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const {searchParams} = new URL(req.url)
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json({success: false, message: "Account id not found"});
        }

        const accounts = await Account.find({uid});
        return NextResponse.json({success: true, data: accounts})
    } catch (e) {
        return NextResponse.json({success: false, message: "Something went wrong"});
    }
}


// TODO: DELETE ACCOUNT

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({success: false, message: "Account id not found"});
        }

        await Account.findOneAndDelete({id});
        return NextResponse.json({success: true, message: "Account deleted successfully"})
    } catch (e) {
        return NextResponse.json({success: false, message: "Something went wrong"});
    }
}













