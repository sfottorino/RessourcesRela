export default function authHeader() {
    if (localStorage.getItem('user')){
        return true;
    }else{
        return false;
    }
}