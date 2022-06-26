export default function getCurrentId() {
    if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'));
        return user.userId;
    }else{
        return 0;
    }
}