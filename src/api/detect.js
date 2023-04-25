import request from '@/utils/request';
import { storageData } from "@/utils/storage-data"


export const runcodeAPI = (qid, code) => {
    const data = {
        userid: storageData.get("userid"),
        Questionid: qid,
        Code: code
    }

    return request.post('detect/runcode',data);
}

export const checkfuncvarAPI = ({qid,funcs,vars,signal, code}) => {
    const data = {
        userid: storageData.get("userid"),
        questionid: qid,
        funcs: funcs,
        vars: vars,
        signal: signal,
        code: code
    }

    return request.post('detect/checkfuncvar',data);
}


