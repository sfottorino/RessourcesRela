export default function logOut(){
    if(localStorage.getItem('user')){
        localStorage.removeItem('user');
    }
}