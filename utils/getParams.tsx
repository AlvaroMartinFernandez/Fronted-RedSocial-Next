'use client';
import {useParams} from "next/navigation";

export default function GetParams() {
    const param = useParams();
    return param;
}